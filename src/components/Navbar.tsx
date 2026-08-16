import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LangToggle } from "@/components/LangToggle"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useLang } from "@/i18n/LanguageContext"
import { Menu, X, Mail } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { smoothScrollTo } from "@/lib/lenis"

const copy = {
  pl: { projects: "Projekty", contact: "Kontakt" },
  en: { projects: "My work", contact: "Contact" },
}

// Text swaps to a bolder duplicate sliding up from below on hover, instead
// of the flat color/background change the rest of the site uses for links.
function NavLink({
  href,
  onClick,
  target,
  rel,
  children,
}: {
  href: string
  onClick?: (e: React.MouseEvent) => void
  target?: string
  rel?: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      // text-base, not the inherited 18px body size: the links sit in one row
      // with the Kontakt button and now match it. leading-6 stays — the
      // slide-up needs both copies to be exactly the h-6 container tall.
      className="group relative inline-block overflow-hidden h-6 text-base leading-6"
    >
      {/* Solid pf-subtle, not foreground/60. The two shades were a hair apart
          (#6C6C6C composited vs #737373), but the real problem was the alpha:
          the navbar pill is bg-white/35 with a blur, so a translucent label
          mixes with whatever scrolls behind it and drifts, while the language
          toggle beside it stays put. Resting now matches the inactive
          language, hover matches the active one — two colours in the whole
          bar. */}
      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="text-pf-subtle">{children}</span>
        <span className="text-pf-ink font-semibold">{children}</span>
      </span>
    </a>
  )
}

export function Navbar({ dark = false }: { dark?: boolean }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLang()
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
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 md:top-5 z-50 w-[calc(100%-2rem)] md:w-auto">
        <div
          className={`w-full rounded-2xl px-6 h-16 flex items-center justify-between gap-x-6 md:gap-x-8 transition-all duration-300 border ${
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
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#projects" onClick={handleProjects}>{t.projects}</NavLink>
            <NavLink href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">CV</NavLink>
            <NavLink href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer">LinkedIn</NavLink>

            <LangToggle className="text-base" />

            <Button onClick={handleContact}>
              <Mail className="w-4 h-4" /> {t.contact}
            </Button>
          </div>

          {/* Hamburger. The primitive forces icons to 16px via [&_svg]:size-4,
              which is right for a label+icon button and too small for an icon
              that carries the whole control, hence the one override. */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden [&_svg]:size-6"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
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
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-white pt-16 flex flex-col px-6 py-8 gap-6 text-lg font-medium text-pf-700 md:hidden"
        >
          <a href="#projects" onClick={handleProjects} className="py-3 border-b border-pf-50">{t.projects}</a>
          <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer" className="py-3 border-b border-pf-50" onClick={() => setOpen(false)}>CV</a>
          <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer" className="py-3 border-b border-pf-50" onClick={() => setOpen(false)}>LinkedIn</a>

          <LangToggle className="gap-3 py-3 border-b border-pf-50" onSwitch={() => setOpen(false)} />

          <Button className="w-full mt-2" onClick={handleContact}>
            <Mail className="w-4 h-4" /> {t.contact}
          </Button>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
