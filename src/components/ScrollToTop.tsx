import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getLenis } from "@/lib/lenis"
import { galleryPaths } from "@/data/projects"

/** Sends the page back to the top on a real navigation. Moved out of main.tsx,
 *  which is the entry point and exports nothing — a component declared there
 *  can never be a hot-reload boundary. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  // A gallery path renders the homepage with a modal over it, so opening or
  // closing one is not a page change and must not move the page underneath —
  // otherwise you lose your place in the grid every time you shut a project.
  const page = galleryPaths().includes(pathname) ? "/" : pathname
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [page])
  return null
}
