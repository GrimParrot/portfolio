import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
import './index.css'
import App from './App.tsx'
import { LocaloCaseStudy } from './pages/LocaloCaseStudy.tsx'
import { NaturalniePage } from './pages/NaturalniePage.tsx'
import { KafejetoPage } from './pages/KafejetoPage.tsx'
import { BannerozaPage } from './pages/BannerozaPage.tsx'
import { RaportyCaseStudy } from './pages/RaportyCaseStudy.tsx'
import { StatsPage } from './pages/StatsPage.tsx'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/case-study/localo" element={<LocaloCaseStudy />} />
          <Route path="/ui/naturalnie" element={<NaturalniePage />} />
          <Route path="/ui/kafejeto" element={<KafejetoPage />} />
          <Route path="/case-study/banneroza" element={<BannerozaPage />} />
          <Route path="/case-study/raporty" element={<RaportyCaseStudy />} />
          <Route path="/ui/stats" element={<StatsPage />} />
          <Route path="/ui/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
