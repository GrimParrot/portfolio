import { useReducedMotion } from "motion/react"
import { useLang } from "@/i18n/LanguageContext"

const copy = {
  pl: ["Strategia produktowa", "Badania użytkowników", "Design Systems", "Prototypowanie", "Discovery & Delivery", "B2B SaaS"],
  en: ["Product Strategy", "User Research", "Design Systems", "Prototyping", "Discovery & Delivery", "B2B SaaS"],
}

function MarqueeRow({ phrases, ariaHidden }: { phrases: string[]; ariaHidden?: boolean }) {
  return (
    <div className="flex items-center flex-shrink-0" aria-hidden={ariaHidden}>
      {phrases.map((phrase, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="text-xl md:text-2xl font-bold text-white px-6">{phrase}</span>
          <span className="text-[#8B5CF6] text-lg" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  )
}

export function SkillsMarquee() {
  const reduceMotion = useReducedMotion()
  const { lang } = useLang()
  const phrases = copy[lang]

  if (reduceMotion) {
    return (
      <section className="overflow-hidden bg-[#0B1220] py-8 border-y border-white/10">
        <MarqueeRow phrases={phrases} />
      </section>
    )
  }

  return (
    <section className="overflow-hidden bg-[#0B1220] py-8 border-y border-white/10">
      <style>{`
        @keyframes skills-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .skills-marquee-track {
          animation: skills-marquee-scroll 42s linear infinite;
        }
      `}</style>
      <div className="flex skills-marquee-track" style={{ width: "max-content" }}>
        <MarqueeRow phrases={phrases} />
        <MarqueeRow phrases={phrases} ariaHidden />
      </div>
    </section>
  )
}
