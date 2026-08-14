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

  useEffect(() => {
    // On the hero, the switch to the solid pill should happen exactly when
    // the hero section scrolls out from under the navbar — not after an
    // arbitrary scroll distance, which flips too early on a tall hero.
    const heroTarget = dark ? document.getElementById("hero-dark") : null

    if (heroTarget) {
      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { rootMargin: "-88px 0px 0px 0px", threshold: 0 }
      )
      observer.observe(heroTarget)
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
      <nav className="fixed top-4 inset-x-4 md:top-5 md:inset-x-8 z-50">
        <div
          className={`max-w-[1200px] mx-auto rounded-2xl px-6 h-16 flex items-center justify-between transition-all duration-300 border ${
            open
              ? "bg-transparent shadow-none border-transparent"
              : scrolled || dark
                ? "bg-white/35 backdrop-blur-[20px] backdrop-saturate-[1.4] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-black/[0.08]"
                : "bg-transparent shadow-none border-transparent"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            <img src="/pixelnow.svg" alt="Pixel Now" className="h-8" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-foreground">
            <a href="#projects" onClick={handleProjects} className="px-3 py-1.5 rounded-md transition-colors cursor-pointer hover:text-slate-900 hover:bg-secondary">{t.projects}</a>
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md transition-colors hover:text-slate-900 hover:bg-secondary">CV</a>
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md transition-colors hover:text-slate-900 hover:bg-secondary">LinkedIn</a>

            <div className="flex items-center gap-1 text-sm font-medium">
              <button onClick={() => setLang("pl")} className={`transition-colors ${lang === "pl" ? "text-[#474747] font-bold" : "text-[#858585] hover:text-slate-600"}`}>PL</button>
              <span className="text-[#474747]">/</span>
              <button onClick={() => setLang("en")} className={`transition-colors ${lang === "en" ? "text-[#474747] font-bold" : "text-slate-400 hover:text-slate-600"}`}>EN</button>
            </div>

            <Button size="sm" className="px-5 bg-[#0F172A] text-white hover:bg-[#1E293B]" onClick={handleContact}>
              <Mail className="w-4 h-4" /> {t.contact}
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 transition-colors text-slate-700 hover:text-slate-900"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          className="fixed inset-0 z-40 bg-white pt-16 flex flex-col px-6 py-8 gap-6 text-lg font-medium text-slate-700 md:hidden"
        >
          <a href="#projects" onClick={handleProjects} className="py-3 border-b border-slate-100">{t.projects}</a>
          <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer" className="py-3 border-b border-slate-100" onClick={() => setOpen(false)}>CV</a>
          <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer" className="py-3 border-b border-slate-100" onClick={() => setOpen(false)}>LinkedIn</a>

          <div className="flex items-center gap-3 py-3 border-b border-slate-100">
            <button onClick={() => { setLang("pl"); setOpen(false) }} className={`transition-colors ${lang === "pl" ? "text-slate-900 font-bold" : "text-slate-400"}`}>PL</button>
            <span className="text-slate-200">/</span>
            <button onClick={() => { setLang("en"); setOpen(false) }} className={`transition-colors ${lang === "en" ? "text-slate-900 font-bold" : "text-slate-400"}`}>EN</button>
          </div>

          <Button className="bg-[#0F172A] hover:bg-[#1E293B] w-full mt-2" onClick={handleContact}>{t.contact}</Button>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
