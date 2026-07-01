import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"

interface ProjectNavProps {
  currentHref: string
}

const copy = {
  pl: { back: "Wróć do portfolio", next: "Następny projekt" },
  en: { back: "Back to portfolio", next: "Next project" },
}

export function ProjectNav({ currentHref }: ProjectNavProps) {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = copy[lang]
  const currentIndex = projects.findIndex((p) => p.href === currentHref)
  const next = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="flex items-center justify-between mb-8">
      <Link
        to="/"
        onClick={() => setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 animate-bounce-left" /> {t.back}
      </Link>
      {next.href && (
        <button
          onClick={() => navigate(next.href!)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          {t.next} <ArrowRight className="w-4 h-4 animate-bounce-right" />
        </button>
      )}
    </div>
  )
}
