import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { getLenis } from './lib/lenis'

function ScrollToTop() {
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
import './index.css'
import App from './App.tsx'
import { SmoothScroll } from './components/SmoothScroll.tsx'
import { HeroLab } from './pages/HeroLab.tsx'
import { MarqueeLab } from './pages/MarqueeLab.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'
import { galleryPaths } from './data/projects.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            {/* Every project is a modal, not a page — but each keeps a real
                URL so opening one registers as a navigation in analytics and
                can be linked to directly. They render the homepage; the modal
                opens because Projects reads the path. */}
            {galleryPaths().map((path) => (
              <Route key={path} path={path} element={<App />} />
            ))}
            <Route path="/hero-lab" element={<HeroLab />} />
            <Route path="/marquee-lab" element={<MarqueeLab />} />
            {/* Without this every unknown path renders a blank white page —
                including /case-study/localo, which was a real URL until the
                Client Acquisition redesign replaced that page. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
