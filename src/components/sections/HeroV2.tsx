import { ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"
import { Plasma } from "./hero-v2/Plasma"

const copy = {
  pl: {
    name: "Cześć, jestem Edyta",
    headingLine1: "Product",
    headingLine2: "Designer",
    workBtn: "Zobacz moje projekty",
    // B2B, B2C i SaaS zapisuje się po polsku tak samo — tłumaczy się tu tylko
    // to, co naprawdę jest zdaniem, a nie skrótem branżowym.
    tags: ["B2B", "B2C", "SaaS", "8+ lat doświadczenia", "zorientowana na AI"],
  },
  en: {
    name: "Hi, I'm Edyta",
    headingLine1: "Product",
    headingLine2: "Designer",
    workBtn: "See my work",
    tags: ["B2B", "B2C", "SaaS", "8+ years exp", "AI-oriented"],
  },
}

export function HeroV2() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-white">
      <div className="absolute inset-0">
        {/* Literal hex on purpose: Plasma feeds this to hexToRgb() for the
            WebGL shader, and a var() would not parse. Mirrors --pf-primary-900. */}
        <Plasma
          color="#0A0A0A"
          scale={0.5}
          opacity={0.3}
          iterations={45}
          mouseInteractive={false}
          renderScale={0.55}
        />
      </div>

      {/* z-30, not z-10: SkillsMarquee sits at the bottom of this section on
          z-20 and carries an 800px white gradient that fades the plasma's hard
          edge. At z-10 that gradient washed over the tags and the CTA — the
          button reads #0A0A0A but painted out around #6B6B6B, because it lands
          where the fade is already 40% white. The copy belongs above it. */}
      <div className="relative z-30 w-full max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center pointer-events-none">
        <p className="text-foreground text-base md:text-lg font-medium mb-5">{t.name}</p>

        <h1
          className="font-black text-[#0A0A0A] leading-[0.9] mb-12"
          style={{ fontSize: "clamp(2.75rem, 13vw, 13rem)" }}
        >
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {t.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-black/5 text-[#0A0A0A] hover:bg-black/10">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Magnetic strength={0.3} className="pointer-events-auto inline-block">
            <Button size="lg" onClick={() => smoothScrollTo("#projects")}>
              {t.workBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
