import { Mail, ArrowUpRight } from "lucide-react"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/LanguageContext"
import { Plasma } from "./hero-v2/Plasma"

const copy = {

  pl: {
    label: "Kontakt",
    heading: "Porozmawiajmy",
    body: "Chcesz porozmawiać o projekcie, dowiedzieć się więcej o procesach, decyzjach i kontekście? Wpadnij na LinkedIn albo po prostu napisz maila : )",
    resume: "Zobacz CV",
  },
  en: {
    label: "Contact",
    heading: "Let's talk",
    body: "Want to talk about a project, learn more about the process, decisions, and context? Find me on LinkedIn or just send an email : )",
    resume: "View resume",
  },
}

export function Contact() {
  const { lang } = useLang()
  const t = copy[lang]

  const links = [
    {
      label: "Email",
      value: "suprun.edyta@gmail.com",
      href: "mailto:suprun.edyta@gmail.com",
      icon: <Mail className="w-6 h-6 text-white/60" />,
      accent: false,
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
      accent: false,
    },
    {
      label: "PDF",
      value: t.resume,
      href: lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf",
      icon: <span className="text-sm font-bold text-[#0A0A0A]/70">CV</span>,
      accent: true,
    },
  ]

  return (
    <section id="contact" className="relative pt-24 md:pt-32 pb-56 md:pb-72 min-h-[640px] flex items-start bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <Plasma color="#F5F5F5" scale={0.8} opacity={0.25} iterations={45} mouseInteractive={false} renderScale={0.55} />
      </div>

      {/* Oversized wordmark bleeding off the bottom edge — a quiet signature
          behind the contact links, never competing with them for attention. */}
      <p
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 text-center font-black text-white/[0.06] leading-none select-none pointer-events-none whitespace-nowrap"
        style={{ fontSize: "clamp(2.5rem, 11vw, 10rem)", transform: "translateY(15%)" }}
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

      <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">{t.label}</p>
          <h2 className="text-3xl font-black text-white mb-8 leading-tight">
            {t.heading}
          </h2>
          <p className="text-white/60 leading-relaxed max-w-sm">
            {t.body}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <Magnetic key={link.label} strength={0.25} className="block">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all group ${
                  link.accent
                    ? "bg-white border-white text-[#0A0A0A] hover:bg-slate-200"
                    : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon && (
                    <div className={`w-12 h-12 flex items-center justify-center ${link.accent ? "bg-black/5" : "bg-white/10"}`} style={{ borderRadius: 8 }}>
                      {link.icon}
                    </div>
                  )}
                  <div>
                    <p className={`text-[13px] mb-0.5 ${link.accent ? "text-[#0A0A0A]/50" : "text-white/40"}`}>
                      {link.label}
                    </p>
                    <p className={`font-medium ${link.accent ? "text-[#0A0A0A]" : "text-white"}`}>
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className={`w-4 h-4 animate-nudge-ur ${link.accent ? "text-[#0A0A0A]/40" : "text-white/40"}`} />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  )
}
