import { Mail, ArrowUpRight } from "lucide-react"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/LanguageContext"

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
      icon: <Mail className="w-m h-m text-primary-500" />,
      dark: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/esuprun",
      href: "https://linkedin.com/in/esuprun",
      icon: (
        <svg className="w-m h-m text-primary-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      dark: false,
    },
    {
      label: "PDF",
      value: t.resume,
      href: lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf",
      icon: <span className="font-body text-caption font-bold text-white/70">CV</span>,
      dark: true,
    },
  ]

  return (
    <section id="contact" className="py-xl md:py-3xl bg-secondary overflow-hidden">
      <div className="max-w-container mx-auto px-m grid md:grid-cols-2 gap-2xl items-center">
        <div>
          <p className="font-body text-overline uppercase text-primary-700 mb-s">{t.label}</p>
          <h2 className="font-heading text-h2 text-primary-900 mb-l leading-tight">
            {t.heading}
          </h2>
          <p className="font-body text-body text-primary-700 leading-relaxed max-w-sm">
            {t.body}
          </p>
        </div>

        <div className="flex flex-col gap-s">
          {links.map((link) => (
            <Magnetic key={link.label} strength={0.25} className="block">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={`flex items-center justify-between px-m py-s rounded-2xl border transition-all group ${
                  link.dark
                    ? "bg-primary-900 border-primary-900 text-white hover:bg-primary-700"
                    : "bg-white border-primary-100 text-primary-900 hover:border-primary-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-s">
                  {link.icon && (
                    <div className={`w-xl h-xl flex items-center justify-center ${link.dark ? "bg-white/10" : "bg-secondary"}`} style={{ borderRadius: 8 }}>
                      {link.icon}
                    </div>
                  )}
                  <div>
                    <p className="font-body text-caption text-primary-500 mb-micro">
                      {link.label}
                    </p>
                    <p className={`font-body font-medium ${link.dark ? "text-white" : "text-primary-900"}`}>
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-s h-s animate-nudge-ur text-primary-500" />
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  )
}
