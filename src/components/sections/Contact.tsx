import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Mail, ArrowUpRight } from "lucide-react"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/LanguageContext"
import { Plasma } from "./hero-v2/Plasma"

const copy = {

  pl: {
    heading: "Porozmawiajmy",
    body: "Chcesz porozmawiać o projekcie, dowiedzieć się więcej o procesach, decyzjach i kontekście? Wpadnij na LinkedIn albo po prostu napisz maila : )",
    resume: "Zobacz CV",
  },
  en: {
    heading: "Let's talk",
    body: "Want to talk about a project, learn more about the process, decisions, and context? Find me on LinkedIn or just send an email : )",
    resume: "View resume",
  },
}

export function Contact() {
  const { lang } = useLang()
  const t = copy[lang]

  // Reveal effect: the footer is pinned to the bottom of the window as if it
  // had been sitting there the whole time, and the page above slides up to
  // uncover it.
  //
  // The uncovering is done by clipping the footer to the part of the spacer
  // that has already scrolled into view — not by stacking the page on top of
  // it. Stacking would mean giving every section above an opaque background
  // and a z-index across the six pages that render <Contact />, and any
  // container whose background spans the spacer would cover the footer right
  // where it is supposed to appear. Clipping keeps all of that local to here.
  const spacerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const measure = () => {
      const h = footer.offsetHeight
      setHeight(h)
      // A footer taller than the window would have its top cut off with
      // nothing able to scroll it back, so short viewports keep it in flow.
      setPinned(h > 0 && h <= window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(footer)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    if (!pinned) {
      footer.style.clipPath = ""
      return
    }
    // Written straight to the node rather than through state — this runs on
    // every scroll frame and re-rendering the plasma canvas and the magnetic
    // links that often would be wasteful.
    const update = () => {
      const spacer = spacerRef.current
      if (!spacer) return
      const h = footer.offsetHeight
      const hidden = spacer.getBoundingClientRect().top - (window.innerHeight - h)
      const clip = Math.min(Math.max(hidden, 0), h)
      // Fractional document heights leave a sub-pixel sliver of the page
      // showing across the footer's top edge at full scroll — snap it shut.
      footer.style.clipPath = `inset(${clip < 1 ? 0 : clip}px 0 0 0)`
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [pinned, height])

  const links = [
    {
      label: "Email",
      value: "suprun.edyta@gmail.com",
      href: "mailto:suprun.edyta@gmail.com",
      icon: <Mail className="w-6 h-6 text-white/60" />,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/esuprun",
      href: "https://linkedin.com/in/esuprun",
      icon: (
        <svg className="w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "PDF",
      value: t.resume,
      href: lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf",
      icon: <span className="text-sm font-bold text-white/60">CV</span>,
    },
  ]

  return (
    // The spacer holds the footer's place in the document so the page can still
    // be scrolled past it, and carries #contact so the navbar's Kontakt button
    // still has something in the flow to scroll to.
    <div id="contact" ref={spacerRef} style={pinned ? { height } : undefined}>
    <section
      ref={footerRef}
      className={`${pinned ? "fixed bottom-0 left-0 w-full z-0" : "relative"} pt-[clamp(3.5rem,8vw,6rem)] pb-36 md:pb-[calc(clamp(2.5rem,13.15vw,24rem)*0.85+4rem)] min-h-[340px] md:min-h-[clamp(340px,42vw,480px)] flex items-start bg-[#0A0A0A] overflow-hidden`}
    >
      <div className="absolute inset-0">
        {/* Literal hex on purpose: Plasma feeds this to hexToRgb() for the
            WebGL shader, and a var() would not parse. Mirrors --pf-primary-50. */}
        <Plasma color="#F5F5F5" scale={0.8} opacity={0.25} iterations={45} mouseInteractive={false} renderScale={0.55} />
      </div>

      {/* Oversized wordmark bleeding off the bottom edge — a quiet signature
          behind the contact links, never competing with them for attention. */}
      <p
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 text-center font-black text-white/[0.05] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{
          fontFamily: "'Bricolage Grotesque', 'Manrope', system-ui, sans-serif",
          fontSize: "clamp(2.5rem, 13.15vw, 24rem)",
          transform: "translate(-4px, calc(15% + 8px))",
        }}
      >
        EDYTA SUPRUN
      </p>

      {/* Film-grain texture — sits above the plasma AND the wordmark (but
          below the contact links), so the whole dark background reads as
          one textured surface instead of a flat digital fill. Tiled SVG
          turbulence, no image request. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <h1
            className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-8"
            style={{ lineHeight: 1.15 }}
          >
            {t.heading}
          </h1>
          <p className="text-white/60 leading-relaxed max-w-sm mx-auto lg:mx-0">
            {t.body}
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-3 w-full">
          {links.map((link) => (
            <Magnetic key={link.label} strength={0.25} className="block w-full max-w-full lg:max-w-[400px]">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center justify-between gap-4 w-full min-w-0 lg:min-w-[240px] max-w-full lg:max-w-[400px] pl-3 pr-5 py-3 rounded-2xl border transition-all group bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {link.icon && (
                    <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white/10" style={{ borderRadius: 8 }}>
                      {link.icon}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-[13px] mb-0.5 text-white/40">
                      {link.label}
                    </p>
                    <p className="font-medium text-white truncate">
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 animate-nudge-ur text-white/40" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}
