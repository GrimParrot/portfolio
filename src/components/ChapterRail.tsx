import { useEffect, useState } from "react"
import { smoothScrollTo } from "@/lib/lenis"

export interface Chapter {
  id: string
  label: string
}

/** Fixed chapter rail down the right edge of a case study.
 *
 * Three pages had grown their own version of this. Raporty and Client
 * Acquisition carried byte-identical copies of a pill that expands to show its
 * label; Banneroza had a dot that revealed the same label as a dark tooltip
 * off to the left. The pill wins here — it is the pattern on the two most
 * developed case studies, and the tooltip introduced a second visual language
 * for the same job.
 *
 * The one idea taken from Banneroza is the accent: colouring the active dot
 * with the project's own accent says where you are and whose page you are on
 * at the same time. Pages without a per-project accent fall back to near-black.
 *
 * Hidden below lg — a fixed rail has nowhere to sit next to a phone-width
 * column, and would overlap the content it is meant to index.
 */
/** The rail runs in two places that scroll differently: a normal page, where
 *  Lenis drives the window, and the project modal, which scrolls inside its own
 *  container marked data-lenis-prevent. Walk up for a scrollable ancestor and
 *  drive that one directly; fall through to Lenis when the page is the
 *  scroller. Calling window.scrollTo in the modal case would move the page
 *  behind the modal instead of the content in it. */
function nearestScroller(el: HTMLElement): HTMLElement | null {
  let p = el.parentElement
  while (p) {
    const oy = getComputedStyle(p).overflowY
    if ((oy === "auto" || oy === "scroll") && p.scrollHeight > p.clientHeight + 1) return p
    p = p.parentElement
  }
  return null
}

export function ChapterRail({
  chapters,
  accent = "var(--pf-primary-900)",
  topOffset = 100,
}: {
  chapters: Chapter[]
  accent?: string
  /** Clearance above the target — the fixed navbar on a page, much less in the
   *  modal, which has no navbar of its own. */
  topOffset?: number
}) {
  const [active, setActive] = useState(chapters[0]?.id)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  return (
    <nav
      aria-label="Chapters"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-0.5"
    >
      {chapters.map((c) => {
        const isActive = active === c.id
        const on = isActive || hovered === c.id

        return (
          <button
            key={c.id}
            type="button"
            // The label is inside the button, so it is the accessible name once
            // revealed; aria-current is what marks the section you are in.
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              const el = document.getElementById(c.id)
              if (!el) return
              const box = nearestScroller(el)
              if (box) {
                const top =
                  box.scrollTop +
                  el.getBoundingClientRect().top -
                  box.getBoundingClientRect().top -
                  topOffset
                box.scrollTo({ top, behavior: "smooth" })
              } else {
                smoothScrollTo(`#${c.id}`, { offset: -topOffset })
              }
            }}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-end rounded-full border-0 bg-transparent cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{
              gap: on ? 10 : 0,
              padding: on ? "7px 14px 7px 16px" : "7px 8px",
              backgroundColor: on ? "rgba(255,255,255,.86)" : "transparent",
              backdropFilter: on ? "blur(12px)" : "none",
              boxShadow: on ? "var(--pf-ring)" : "none",
              transition: "all var(--pf-duration) var(--pf-ease)",
            }}
          >
            <span
              className="whitespace-nowrap overflow-hidden"
              style={{
                font: "600 13px/1 var(--pf-font-body)",
                letterSpacing: ".04em",
                color: isActive ? accent : "var(--pf-text-muted)",
                maxWidth: on ? 200 : 0,
                opacity: on ? 1 : 0,
                transition:
                  "max-width var(--pf-duration) var(--pf-ease), opacity var(--pf-duration) var(--pf-ease)",
              }}
            >
              {c.label}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 rounded-full"
              style={{
                width: isActive ? 8 : 6,
                height: isActive ? 8 : 6,
                background: isActive
                  ? accent
                  : on
                    ? "var(--pf-text-muted)"
                    : "var(--pf-primary-200)",
                transition: "var(--pf-transition)",
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
