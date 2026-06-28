import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LocaloCaseStudy } from './pages/LocaloCaseStudy.tsx'
import { NaturalniePage } from './pages/NaturalniePage.tsx'
import { KafejetoPage } from './pages/KafejetoPage.tsx'
import { BannerozaPage } from './pages/BannerozaPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-study/localo" element={<LocaloCaseStudy />} />
        <Route path="/ui/naturalnie" element={<NaturalniePage />} />
        <Route path="/ui/kafejeto" element={<KafejetoPage />} />
        <Route path="/case-study/banneroza" element={<BannerozaPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
