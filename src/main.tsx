import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import { SmoothScroll } from './components/SmoothScroll.tsx'
import { DocumentMeta } from './components/DocumentMeta.tsx'
import { HeroLab } from './pages/HeroLab.tsx'
import { MarqueeLab } from './pages/MarqueeLab.tsx'
import { RaportyV1Page } from './pages/RaportyV1Page.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'
import { galleryPaths } from './data/projects.ts'
import { Analytics } from '@vercel/analytics/react'
import { ScrollToTop } from './components/ScrollToTop.tsx'

// scripts/prerender.mjs ships every route as finished HTML so crawlers that do
// not run JavaScript still get the text. React clears #root itself when it
// mounts, but a project route also carries a prerendered copy of the modal —
// which is a portal into <body>, outside #root, and would otherwise sit there
// under the live one. The prerender marks it; this takes it away.
document.querySelectorAll('[data-prerendered]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <DocumentMeta />
          <Routes>
            <Route path="/" element={<App />} />
            {/* Every project is a modal, not a page — but each keeps a real
                URL so opening one registers as a navigation in analytics and
                can be linked to directly. They render the homepage; the modal
                opens because Projects reads the path. */}
            {galleryPaths().map((path) => (
              <Route key={path} path={path} element={<App />} />
            ))}
            {/* Pre-redesign Raporty case study, parked at its own address.
                It is not in data/projects.ts, so it needs a route of its own —
                the generated ones only cover projects the gallery links to. */}
            <Route path="/case-study/raporty-v1" element={<RaportyV1Page />} />
            <Route path="/hero-lab" element={<HeroLab />} />
            <Route path="/marquee-lab" element={<MarqueeLab />} />
            {/* Without this every unknown path renders a blank white page —
                including /case-study/localo, which was a real URL until the
                Client Acquisition redesign replaced that page. */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* No route/path props on purpose: passing them would set
              disableAutoTrack and hand us the job of firing a pageview per
              navigation. Left alone, Vercel's own script tracks SPA
              navigations, which is what makes each project modal count as its
              own view instead of everything landing on "/".
              The React entry, not /next — this is Vite, and /next imports
              next/navigation. Only reports from a Vercel deployment. */}
          <Analytics />
        </SmoothScroll>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
