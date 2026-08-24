const { join } = require("path")

/** Chromium normally lands in ~/.cache/puppeteer, which Vercel does not carry
 *  between builds — every deploy would download it again. node_modules/.cache
 *  is part of the build cache, so it is fetched once and reused.
 *
 *  On Vercel it is not fetched at all: that build is missing the shared
 *  libraries Chrome for Testing links against, so the download is 150 MB of
 *  binary that cannot start. scripts/prerender.mjs launches the Amazon Linux
 *  build from @sparticuz/chromium there instead. */
module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
  skipDownload: !!process.env.VERCEL,
}
