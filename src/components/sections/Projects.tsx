import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { projects, type ProjectTag, type Project } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"
import { ProjectModal } from "@/components/ProjectModal"
import { NaturalniePage } from "@/pages/NaturalniePage"
import { KafejetoPage } from "@/pages/KafejetoPage"
import { BannerozaPage } from "@/pages/BannerozaPage"
import { StatsPage } from "@/pages/StatsPage"

type Filter = "all" | ProjectTag

const modalContent: Record<string, () => React.ReactNode> = {
  "/ui/naturalnie": () => <NaturalniePage embedded />,
  "/ui/kafejeto": () => <KafejetoPage embedded />,
  "/case-study/banneroza": () => <BannerozaPage embedded />,
  "/ui/stats": () => <StatsPage embedded />,
}

const copy = {
  pl: {
    label: "Portfolio",
    caseStudyHeading: "Case study",
    otherHeading: "Pozostałe projekty",
    filters: [
      { id: "all" as Filter, label: "Wszystkie" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Web" as Filter, label: "Web" },
    ],
  },
  en: {
    label: "Portfolio",
    caseStudyHeading: "Case study",
    otherHeading: "Other projects",
    filters: [
      { id: "all" as Filter, label: "All" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Web" as Filter, label: "Web" },
    ],
  },
}

function ProjectTile({ project, showTag, onOpen }: { project: Project; showTag: boolean; onOpen: (project: Project) => void }) {
  const { lang } = useLang()

  return (
    <div
      onClick={() => onOpen(project)}
      className="group cursor-pointer rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-colors duration-200 overflow-hidden relative"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Image — full height */}
      <div className={`absolute inset-0 ${project.bg}`}>
        {"image" in project && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: project.imagePosition ?? "center" }}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.color} transition-transform duration-500 group-hover:scale-105`} />
        )}
      </div>

      {/* Bottom overlay — tag, title, arrow, on a darkened transparent scrim */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pt-10 pb-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
        {showTag && (
          <span className="inline-block text-sm font-semibold px-3.5 py-2 rounded-xl text-white mb-2" style={{ backgroundColor: "rgba(255,255,255,0.16)", backdropFilter: "blur(4px)" }}>
            {project.tag}
          </span>
        )}
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold text-white leading-snug">{lang === "pl" && project.title_pl ? project.title_pl : project.title}</p>
          <span className="flex-shrink-0 rounded-xl flex items-center justify-center" style={{ width: 32, height: 32, border: "1px solid rgba(255,255,255,0.4)" }}>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </span>
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = copy[lang]

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  // Filter UI (t.filters) hidden for now — not needed yet, easy to re-add.
  const filtered = rest

  const openFeatured = (project: Project) => {
    if ("href" in project && project.href) navigate(project.href)
  }
  const openInModal = (project: Project) => setOpenProject(project)

  return (
    <section id="projects" className="pt-10 pb-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs tracking-widest uppercase text-slate-400 mb-3">{t.label}</p>

        {/* Case study — featured, unfiltered */}
        <h2 className="text-3xl font-black text-slate-900 mb-6">{t.caseStudyHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {featured.map((project) => (
            <ProjectTile key={project.title} project={project} showTag={false} onOpen={openFeatured} />
          ))}
        </div>

        {/* Other projects */}
        <h2 className="text-3xl font-black text-slate-900 mb-12">{t.otherHeading}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ProjectTile project={project} showTag={false} onOpen={openInModal} />
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal open={openProject !== null} onClose={() => setOpenProject(null)}>
        {openProject?.href && modalContent[openProject.href]?.()}
      </ProjectModal>
    </section>
  )
}
