import { Mail, ExternalLink } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

const copy = {

  pl: {
    label: "Kontakt",
    heading: "Porozmawiajmy.",
    body: "Jeśli pracujesz nad produktem, który wymaga przemyślanego designu — chętnie porozmawiam. Wpadnij na LinkedIn albo po prostu napisz maila : )",
    resume: "Zobacz CV",
  },
  en: {
    label: "Contact",
    heading: "Let's talk.",
    body: "If you're working on a product that needs thoughtful design — I'd love to chat. Find me on LinkedIn or just send an email : )",
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
      icon: <Mail className="w-6 h-6 text-slate-500" />,
      dark: false,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/esuprun",
      href: "https://linkedin.com/in/esuprun",
      icon: (
        <svg className="w-6 h-6 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      dark: false,
    },
    {
      label: "PDF",
      value: t.resume,
      href: "/cv.pdf",
      icon: null,
      dark: true,
    },
  ]

  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs tracking-widest uppercase text-slate-400 mb-3">{t.label}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            {t.heading}
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-sm">
            {t.body}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl border transition-all group ${
                link.dark
                  ? "bg-slate-900 border-slate-900 text-white hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                {link.icon && (
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center" style={{ borderRadius: 8 }}>
                    {link.icon}
                  </div>
                )}
                <div>
                  <p className="text-[13px] text-slate-400 mb-0.5">
                    {link.label}
                  </p>
                  <p className={`font-medium ${link.dark ? "text-white" : "text-slate-900"}`}>
                    {link.value}
                  </p>
                </div>
              </div>
              <ExternalLink className={`w-4 h-4 ${link.dark ? "text-slate-400" : "text-slate-400"}`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
