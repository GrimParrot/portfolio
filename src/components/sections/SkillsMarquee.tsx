import { useLang } from "@/i18n/LanguageContext"
import { CurvedMarquee } from "@/components/CurvedMarquee"

const copy = {
  pl: ["Strategia produktowa", "Badania użytkowników", "Design Systems", "Prototypowanie", "Discovery & Delivery", "B2B SaaS", "End-to-End", "Visual Craft", "UI", "UX", "AI"],
  en: ["Product Strategy", "User Research", "Design Systems", "Prototyping", "Discovery & Delivery", "B2B SaaS", "End-to-End", "Visual Craft", "UI", "UX", "AI"],
}

export function SkillsMarquee() {
  const { lang } = useLang()
  const phrases = copy[lang]
  const text = phrases.join(" • ") + " • "

  return (
    <section className="absolute inset-x-0 bottom-0 z-20 overflow-hidden py-4">
      <div aria-hidden="true">
        <CurvedMarquee text={text} pathType="wave" amplitude={20} wavelength={300} speed={85} fontSize={28} height={88} color="#0A0A0A" separatorColor="#858585" />
      </div>
      <span className="sr-only">{phrases.join(", ")}</span>
    </section>
  )
}
