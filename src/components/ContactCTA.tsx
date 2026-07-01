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
    <div className="mt-8 bg-[#0F172A] rounded-2xl px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p className="text-white font-black text-xl mb-1">{t.heading}</p>
        <p className="text-white/50">{t.body}</p>
      </div>
      <a
        href="mailto:suprun.edyta@gmail.com"
        className="w-full md:w-auto text-center whitespace-nowrap bg-white text-[#0F172A] font-semibold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors"
      >
        {t.cta}
      </a>
    </div>
  )
}
