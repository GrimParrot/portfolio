import type Lenis from "lenis"

export const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
}

let instance: Lenis | null = null

export function setLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis(): Lenis | null {
  return instance
}

/** Smooth-scrolls to a target via Lenis when available, falling back to native scrollIntoView/scrollTo (e.g. under prefers-reduced-motion, where Lenis never mounts). */
export function smoothScrollTo(target: string | HTMLElement | number, options?: { offset?: number }) {
  if (instance) {
    instance.scrollTo(target, options)
    return
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" })
    return
  }

  const el = typeof target === "string" ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: "smooth" })
}
