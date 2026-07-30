import { useLang } from "@/i18n/LanguageContext"

const copy = {
  pl: {
    heading: "Chcesz porozmawiać o tym projekcie?",
    body: "Chętnie opowiem więcej o procesie, decyzjach i kontekście — w tym o tym, czego nie widać na screenshotach.",
    cta: "Napisz do mnie →",
  },
  en: {
    heading: "Want to talk about this project?",
    body: "Happy to share more about the process, decisions, and context — including what's not visible in the screenshots.",
    cta: "Get in touch →",
  },
}

export function ContactCTA() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <div className="mt-l bg-primary-900 rounded-2xl px-xl py-l flex flex-col md:flex-row items-center justify-between gap-m">
      <div>
        <p className="font-heading text-h4 text-white mb-micro">{t.heading}</p>
        <p className="font-body text-body text-white/50">{t.body}</p>
      </div>
      <a
        href="mailto:suprun.edyta@gmail.com"
        className="w-full md:w-auto text-center whitespace-nowrap bg-white text-primary-900 font-semibold px-m py-s rounded-xl hover:bg-primary-50 transition-colors"
      >
        {t.cta}
      </a>
    </div>
  )
}
