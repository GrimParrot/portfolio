import { useLang } from "@/i18n/LanguageContext"
import { CurvedMarquee } from "@/components/CurvedMarquee"

const copy = {
  pl: ["Strategia produktowa", "Badania użytkowników", "Design Systems", "Prototypowanie", "Discovery & Delivery", "B2B SaaS", "End-to-End", "Visual Craft", "UI", "UX", "AI"],
  en: ["Product Strategy", "User Research", "Design Systems", "Prototyping", "Discovery & Delivery", "B2B SaaS", "End-to-End", "Visual Craft", "UI", "UX", "AI"],
}

export function SkillsMarquee() {
  const { lang } = useLang()
  const phrases = copy[lang]
  const text = phrases.join("   ✦   ") + "   ✦   "

  return (
    <section className="absolute inset-x-0 bottom-0 z-20 py-4">
      {/* Fades the plasma's hard bottom edge (hero ends exactly here) into
          the white section that follows, instead of a ruler-straight cut.
          Sits below the marquee text (z-0) so the gradient covers only the
          shader, never the phrases scrolling on top of it. */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 pointer-events-none"
        style={{
          height: "800px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.7) 88%, rgba(255,255,255,0.92) 96%, #ffffff 100%)",
        }}
      />

      <div className="relative z-10" aria-hidden="true">
        <CurvedMarquee text={text} pathType="wave" amplitude={20} wavelength={300} speed={85} fontSize={28} height={88} color="var(--pf-primary-900)" separator="   ✦   " separatorColor="var(--pf-text-muted)" />
      </div>
      <span className="sr-only">{phrases.join(", ")}</span>
    </section>
  )
}
