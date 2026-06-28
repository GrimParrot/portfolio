import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"

const tags = [
  "Lead product designer",
  "B2B",
  "B2C",
  "SaaS",
  "8+ years exp",
  "AI-augmented",
]

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 bg-gradient-to-b from-violet-50/60 to-white">
      <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#0F172A] mb-8" style={{ lineHeight: 1.35 }}>
        Znajduję złoty środek<br />
        między{" "}
        <span className="font-black">Użytkownikami</span><br />
        a{" "}
        <span className="font-black">Biznesem</span>
      </h1>

      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
        Cześć, jestem <strong className="text-slate-700">Edyta</strong>👋— projektuję cyfrowe produkty B2B end to end. Pomagam zespołom zdecydować, co budować — i czego nie budować.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
            {tag}
          </Badge>
        ))}
      </div>

      <button
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" })}
        className="mt-8 text-slate-400 hover:text-violet-500 transition-colors animate-bounce cursor-pointer"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  )
}
