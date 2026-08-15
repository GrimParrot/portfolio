import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import Lenis from "lenis"
import { LENIS_OPTIONS } from "@/lib/lenis"

export function ProjectModal({ open, onClose, layoutId, children }: { open: boolean; onClose: () => void; layoutId?: string; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [gutter, setGutter] = useState(0)

  useLayoutEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    // html has `scrollbar-gutter: stable`, so with the page scroll locked the
    // fixed containing block stops ~15px short of the viewport's right edge.
    // Measure that strip and stretch the overlay over it — otherwise the
    // backdrop ends early and leaves a bright band down the right side.
    setGutter(Math.max(0, document.documentElement.clientWidth - document.body.getBoundingClientRect().width))
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      setGutter(0)
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
          className="fixed inset-y-0 left-0 w-full z-[100] flex items-center justify-center p-4"
          style={{ width: `calc(100% + ${gutter}px)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
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
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
            <div ref={scrollRef} className="pretty-scrollbar h-full overflow-y-auto rounded-3xl" data-lenis-prevent>
              <div ref={contentRef} className="max-w-[1200px] mx-auto">
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
