import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"

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
    <div className="flex items-center justify-between mb-l">
      <Link
        to="/"
        onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
        className="flex items-center gap-xs font-body text-caption text-primary-500 hover:text-primary-900 transition-colors"
      >
        <ArrowLeft className="w-s h-s animate-bounce-left" /> {t.back}
      </Link>
      {next.href && (
        <button
          onClick={() => navigate(next.href!)}
          className="flex items-center gap-xs font-body text-caption text-primary-500 hover:text-primary-900 transition-colors"
        >
          {t.next} <ArrowRight className="w-s h-s animate-bounce-right" />
        </button>
      )}
    </div>
  )
}
