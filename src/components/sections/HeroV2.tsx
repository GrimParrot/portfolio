import { ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/lang"
import { smoothScrollTo } from "@/lib/lenis"
import { Plasma } from "./hero-v2/Plasma"

const copy = {
  pl: {
    name: "Cześć, jestem Edyta, Product Designer",
    headingLine1: "Tworzę produkty end-to-end",
    headingLine2: "z AI i z okiem na realnych ludzi.",
    workBtn: "Zobacz moje projekty",
    // B2B, B2C i SaaS zapisuje się po polsku tak samo — tłumaczy się tu tylko
    // to, co naprawdę jest zdaniem, a nie skrótem branżowym.
    tags: ["B2B", "B2C", "SaaS", "8+ lat doświadczenia", "zorientowana na AI"],
  },
  en: {
    name: "Hi, I'm Edyta, Product Designer",
    headingLine1: "I build products end-to-end",
    headingLine2: "with AI and eyes on real people.",
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
        {/* Eyebrow, nie zdanie: wersaliki robi CSS, więc źródłowy tekst zostaje
            normalnie zapisany i nie psuje się przy przełączeniu języka.

            Cięższe rozstrzelenie dopiero od md. PL ma tu 37 znaków i przy
            0.18em samo rozstrzelenie zjada 80px — na 375px wiersz potrzebował
            336px przy 327px dostępnych i łamał się po "EDYTA,", zostawiając
            osierocone "DESIGNER". 0.12em oddaje te 27px i mieści go w jednej linii. */}
        <p className="text-muted-foreground text-xs md:text-sm font-semibold uppercase tracking-[0.12em] md:tracking-[0.18em] mb-6">{t.name}</p>

        {/* Dwa twarde wiersze, nie zawijanie — nagłówek jest teraz zdaniem, a nie
            dwoma słowami.

            Dzielnik 15.4 to zmierzona szerokość najszerszego wiersza w wadze 500
            z tracking-tight: "with AI and eyes on real people." zajmuje ~14.3em,
            mimo że PL ma więcej znaków — decyduje szerokość liter (w, m), nie ich
            liczba. Reszta to zapas na różnice w renderowaniu fontu.

            Każda zmiana wagi zmienia ten dzielnik: 900 → 15.1em, 700 → 14.9em,
            500 → 14.3em, 400 → 14.4em. Przy podmianie font-* przelicz go, inaczej
            drugi wiersz cicho pęknie na trzeci w jednym z języków.

            Wartości brane z realnego renderu, nie z pomiaru na ukrytym elemencie:
            ten drugi zaniża o ~3% i przy zbyt luźnym dzielniku angielski wiersz
            pęka na trzeci (potrzebował 1155px przy kontenerze 1152px).

            calc(100vw - 48px), nie samo vw: px-6 zabiera 24px z każdej strony,
            a przy czystym vw drugi wiersz EN pękał na trzeci na 375px. */}
        <h1
          className="font-medium text-[#0A0A0A] tracking-tight leading-[1.05] mb-12"
          style={{ fontSize: "clamp(1.1rem, calc((100vw - 48px) / 15.4), 3.75rem)" }}
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
