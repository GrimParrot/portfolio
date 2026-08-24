/**
 * Turns the built SPA into real HTML.
 *
 * Every route in this app renders client-side, so a crawler that does not run
 * JavaScript — Google's fallback pass, link unfurlers, and the LLM fetchers
 * behind "paste a link into a chat" — used to receive the same 4 KB empty
 * shell no matter which URL it asked for. This script serves dist/ locally,
 * visits each indexable route in headless Chrome, and writes the resulting DOM
 * back to disk as dist/<route>/index.html. Vercel checks the filesystem before
 * it applies the SPA rewrite in vercel.json, so those files win and the rewrite
 * stays as the fallback for everything else.
 *
 * Nothing about the app had to change for this: motion keeps its content in the
 * DOM and only animates opacity (`whileInView`, never a conditional mount), and
 * no route is code-split behind React.lazy, so one snapshot after load already
 * holds the full text of a page.
 */
import { createServer } from "node:http"
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join, extname, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import puppeteer from "puppeteer"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const DIST = join(ROOT, "dist")
const SITE = "https://www.edytasup.run"

/** The routes worth prerendering are exactly the ones DocumentMeta treats as
 *  indexable: the homepage plus every project that owns a URL. Reading them out
 *  of data/projects.ts rather than restating them here keeps a project that is
 *  added, renamed or unpublished there from silently missing its static page —
 *  the same single source of truth the router and the gallery read. */
async function routes() {
  const src = await readFile(join(ROOT, "src/data/projects.ts"), "utf8")
  // No project literal nests a brace, so each {...} is exactly one entry —
  // enough to read its href and whether it is featured without pulling a TS
  // parser in just to build a sitemap.
  const entries = [...src.matchAll(/\{[^{}]*\}/g)]
    .map((m) => ({ href: m[0].match(/href:\s*"([^"]+)"/)?.[1], featured: /featured:\s*true/.test(m[0]) }))
    .filter((e) => e.href)
  return [{ href: "/", featured: true }, ...entries]
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".lottie": "application/octet-stream",
}

/** Stands in for Vercel while we snapshot: static file if one exists, the SPA
 *  shell otherwise. */
function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname)
    let file = join(DIST, path)
    if (!existsSync(file) || !extname(file)) file = join(DIST, "index.html")
    try {
      const body = await readFile(file)
      res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" })
      res.end(body)
    } catch {
      res.writeHead(404).end("not found")
    }
  })
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }))
  })
}

/** Runs inside the page, just before the snapshot is taken. */
function clean() {
  // The shell's <noscript> block is a hand-written summary of the homepage. It
  // existed because there was nothing else for a script-less reader to see;
  // now there is, and leaving it in would append that same summary to the text
  // of every single page.
  document.querySelectorAll("noscript").forEach((el) => el.remove())

  // A project route renders the homepage with the modal already open, and the
  // modal locks scrolling while it is. Baking that lock into the file would
  // hand a script-less visitor a page they cannot scroll.
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
  document.documentElement.style.scrollbarGutter = ""

  // The modal is a portal into <body>, so it sits outside #root. React clears
  // #root on mount but knows nothing about that sibling, and would mount a
  // second copy of the modal beside the prerendered one. Marking it lets
  // main.tsx take it away first.
  for (const el of document.body.children) {
    if (el.id === "root" || el.tagName === "SCRIPT") continue
    el.setAttribute("data-prerendered", "")
  }
}

async function sitemap(list) {
  // Priorities mirror the hand-written sitemap this replaced: homepage first,
  // the featured case studies next, everything else level. No <lastmod> — it
  // would be rewritten on every deploy and claim a change that did not happen.
  const priority = (r) => (r.href === "/" ? "1.0" : r.featured ? "0.9" : "0.7")
  const urls = list
    .map((r) => `  <url>\n    <loc>${SITE}${r.href}</loc>\n    <priority>${priority(r)}</priority>\n  </url>`)
    .join("\n")
  await writeFile(
    join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    "utf8",
  )
}

const list = await routes()
const { server, port } = await serve()
const browser = await puppeteer.launch({
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    // The hero paints through WebGL (ogl). Headless has no GPU, so without a
    // software rasteriser the canvas fails to initialise and the hero throws
    // partway through the render we are trying to capture.
    "--enable-unsafe-swiftshader",
    "--use-gl=angle",
    "--use-angle=swiftshader",
  ],
})

let failed = 0
for (const { href: route } of list) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  // Reduced motion is the honest state for a snapshot: it makes motion skip its
  // hidden initial state, so elements land in the file at their final opacity
  // instead of frozen at 0, and it keeps Lenis from mounting.
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])
  try {
    await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "load", timeout: 60_000 })
    // React has rendered once #root has children; the pause after that is for
    // DocumentMeta's effect, which is what puts the route's own title,
    // description, canonical and og:url into the head we are about to save.
    await page.waitForFunction(() => document.getElementById("root")?.childElementCount > 0, { timeout: 30_000 })
    await new Promise((r) => setTimeout(r, 1500))
    await page.evaluate(clean)
    const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML)
    const dir = route === "/" ? DIST : join(DIST, route)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, "index.html"), html, "utf8")
    console.log(`prerendered ${route} (${(html.length / 1024).toFixed(0)} KB)`)
  } catch (err) {
    failed++
    console.error(`FAILED ${route}: ${err.message}`)
  }
  await page.close()
}

await sitemap(list)
await browser.close()
server.close()

// A route that silently ships as an empty shell is the exact bug this script
// exists to fix, so a miss fails the build rather than deploying quietly.
if (failed) {
  console.error(`${failed} route(s) failed to prerender`)
  process.exit(1)
}
console.log(`prerendered ${list.length} routes + sitemap.xml`)
