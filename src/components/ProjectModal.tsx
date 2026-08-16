import { useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import Lenis from "lenis"
import { Button } from "@/components/ui/button"
import { LENIS_OPTIONS } from "@/lib/lenis"

export function ProjectModal({ open, onClose, layoutId, children }: { open: boolean; onClose: () => void; layoutId?: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)

    const html = document.documentElement
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    const prevGutter = html.style.scrollbarGutter
    document.body.style.overflow = "hidden"

    // html sets `scrollbar-gutter: stable`, which keeps reserving a strip on the
    // right even now that the scroll lock removed the scrollbar. A fixed overlay
    // can't reach into that strip, so the modal would either stop short of it
    // (bright band beside the backdrop) or, once stretched over it, sit flush
    // against the scrollbar on platforms that draw one.
    //
    // Instead, drop the reservation while the modal is open and hand the same
    // width back as body padding: the page behind keeps its exact layout, and
    // the viewport has no gutter left for the frame to collide with. Where
    // scrollbars are overlays (macOS, touch) the gutter measures 0 and this is
    // all a no-op.
    const gutter = Math.max(0, html.clientWidth - document.body.getBoundingClientRect().width)
    if (gutter > 0) {
      html.style.scrollbarGutter = "auto"
      document.body.style.paddingRight = `${gutter}px`
    }

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
      html.style.scrollbarGutter = prevGutter
    }
  }, [open, onClose])

  // The page's own Lenis instance is scoped to the window and would otherwise
  // eat wheel events over the modal too (data-lenis-prevent below stops that).
  // This second instance is scoped to just the modal's own scroll container,
  // so scrolling inside it feels exactly like scrolling the rest of the site.
  useEffect(() => {
    if (!open) return
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || !scrollRef.current || !contentRef.current) return

    const modalLenis = new Lenis({ ...LENIS_OPTIONS, wrapper: scrollRef.current, content: contentRef.current })

    let rafId: number
    function raf(time: number) {
      modalLenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      modalLenis.destroy()
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            // #0A0A0A is the Contact footer's background — the frame around the
            // modal reads as the same dark as the bottom of the page.
            className="absolute inset-0 bg-[#0A0A0A] backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            layoutId={layoutId}
            className="relative bg-white w-full h-full rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } }}
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
            <div ref={scrollRef} className="pretty-scrollbar h-full overflow-y-auto rounded-3xl" data-lenis-prevent>
              {/* Full frame width: a case study bleeds its section backgrounds
                  to the edge of the modal, and the column its text sits on is
                  the content's own business. The div stays despite carrying no
                  classes — it is the content element the modal's Lenis measures
                  the scroll height from. */}
              <div ref={contentRef}>
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
