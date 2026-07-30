import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useLang } from "@/i18n/LanguageContext"
import { Menu, X, Mail } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { smoothScrollTo } from "@/lib/lenis"

const copy = {
  pl: { projects: "Projekty", contact: "Kontakt" },
  en: { projects: "My work", contact: "Contact" },
}

export function Navbar({ dark = false }: { dark?: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang } = useLang()
  const t = copy[lang]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Only the unscrolled top-of-page state sits directly over page content —
  // once scrolled, the pill's own light background already gives contrast
  // regardless of what's underneath.
  const lightOnDark = dark && !scrolled

  useEffect(() => {
    // On a dark hero, the switch to the light pill should happen exactly
    // when the dark section scrolls out from under the navbar — not after
    // an arbitrary scroll distance, which flips too early on a tall hero.
    const darkTarget = dark ? document.getElementById("hero-dark") : null

    if (darkTarget) {
      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { rootMargin: "-88px 0px 0px 0px", threshold: 0 }
      )
      observer.observe(darkTarget)
      return () => observer.disconnect()
    }

    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dark])

  const handleProjects = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (location.pathname === "/") {
      smoothScrollTo("#projects")
    } else {
      navigate("/")
      setTimeout(() => smoothScrollTo("#projects"), 300)
    }
  }

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    smoothScrollTo("#contact")
  }

  return (
    <>
      <nav className="fixed top-s inset-x-s md:top-m md:inset-x-l z-50">
        <div
          className={`max-w-container mx-auto rounded-2xl px-m h-2xl flex items-center justify-between transition-all duration-300 border ${
            open
              ? "bg-transparent shadow-none border-transparent"
              : scrolled
                ? "bg-primary-50/90 backdrop-blur-md shadow-lg shadow-primary-900/[0.08] border-white/40"
                : dark
                  ? "bg-primary-900/60 backdrop-blur-md shadow-none border-white/10"
                  : "bg-transparent shadow-none border-transparent"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/pixelnow.svg" alt="Pixel Now" className={`h-l transition-[filter] duration-300 ${lightOnDark && !open ? "brightness-0 invert" : ""}`} />
          </Link>

          {/* Desktop */}
          <div className={`hidden md:flex items-center gap-l font-body text-caption transition-colors duration-300 ${lightOnDark ? "text-white/80" : "text-primary-700"}`}>
            <a href="#projects" onClick={handleProjects} className={`px-s py-xs rounded-md transition-colors cursor-pointer ${lightOnDark ? "hover:text-white hover:bg-white/10" : "hover:text-primary-900 hover:bg-secondary"}`}>{t.projects}</a>
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer" className={`px-s py-xs rounded-md transition-colors ${lightOnDark ? "hover:text-white hover:bg-white/10" : "hover:text-primary-900 hover:bg-secondary"}`}>CV</a>
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer" className={`px-s py-xs rounded-md transition-colors ${lightOnDark ? "hover:text-white hover:bg-white/10" : "hover:text-primary-900 hover:bg-secondary"}`}>LinkedIn</a>

            <div className="flex items-center gap-micro font-body text-caption font-medium">
              <button onClick={() => setLang("pl")} className={`transition-colors ${lang === "pl" ? (lightOnDark ? "text-white font-bold" : "text-primary-900 font-bold") : (lightOnDark ? "text-white/40 hover:text-white/70" : "text-primary-500 hover:text-primary-700")}`}>PL</button>
              <span className={lightOnDark ? "text-white/20" : "text-primary-300"}>/</span>
              <button onClick={() => setLang("en")} className={`transition-colors ${lang === "en" ? (lightOnDark ? "text-white font-bold" : "text-primary-900 font-bold") : (lightOnDark ? "text-white/40 hover:text-white/70" : "text-primary-500 hover:text-primary-700")}`}>EN</button>
            </div>

            <Button
              size="sm"
              className={`px-m transition-colors duration-300 ${lightOnDark ? "bg-white text-primary-900 hover:bg-primary-50" : "bg-primary-900 text-white hover:bg-primary-700"}`}
              onClick={handleContact}
            >
              <Mail className="w-s h-s" /> {t.contact}
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden p-xs transition-colors ${lightOnDark && !open ? "text-white/80 hover:text-white" : "text-primary-700 hover:text-primary-900"}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-m h-m" /> : <Menu className="w-m h-m" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-40 bg-white pt-2xl flex flex-col px-m py-l gap-m font-body text-body font-medium text-primary-700 md:hidden"
        >
          <a href="#projects" onClick={handleProjects} className="py-s border-b border-primary-100">{t.projects}</a>
          <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer" className="py-s border-b border-primary-100" onClick={() => setOpen(false)}>CV</a>
          <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer" className="py-s border-b border-primary-100" onClick={() => setOpen(false)}>LinkedIn</a>

          <div className="flex items-center gap-s py-s border-b border-primary-100">
            <button onClick={() => { setLang("pl"); setOpen(false) }} className={`transition-colors ${lang === "pl" ? "text-primary-900 font-bold" : "text-primary-500"}`}>PL</button>
            <span className="text-primary-300">/</span>
            <button onClick={() => { setLang("en"); setOpen(false) }} className={`transition-colors ${lang === "en" ? "text-primary-900 font-bold" : "text-primary-500"}`}>EN</button>
          </div>

          <Button className="bg-primary-900 hover:bg-primary-700 w-full mt-xs" onClick={handleContact}>{t.contact}</Button>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
