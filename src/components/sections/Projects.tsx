import { useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useLocation, useNavigate } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { projects, type ProjectTag, type Project } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"
import { ProjectModal } from "@/components/ProjectModal"
import { NaturalniePage } from "@/pages/NaturalniePage"
import { KafejetoPage } from "@/pages/KafejetoPage"
import { BannerozaPage } from "@/pages/BannerozaPage"
import { StatsPage } from "@/pages/StatsPage"
import { DashboardPage } from "@/pages/DashboardPage"

type Filter = "all" | ProjectTag

const modalContent: Record<string, () => React.ReactNode> = {
  "/ui/naturalnie": () => <NaturalniePage />,
  "/ui/kafejeto": () => <KafejetoPage />,
  "/case-study/banneroza": () => <BannerozaPage />,
  "/ui/stats": () => <StatsPage />,
  "/ui/dashboard": () => <DashboardPage />,
}

const copy = {
  pl: {
    caseStudyHeading: "Wybrane case study",
    otherHeading: "Galeria projektów",
    filters: [
      { id: "all" as Filter, label: "Wszystkie" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Web" as Filter, label: "Web" },
    ],
  },
  en: {
    caseStudyHeading: "Selected case study",
    otherHeading: "Project gallery",
    filters: [
      { id: "all" as Filter, label: "All" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Web" as Filter, label: "Web" },
    ],
  },
}

/** Tile cover video — plays only while hovered, pauses and rewinds on mouse leave. */
function HoverVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.pause()
        el.currentTime = 0
      }}
    />
  )
}

function ProjectTile({ project, showTag, onOpen }: { project: Project; showTag: boolean; onOpen: (project: Project) => void }) {
  const { lang } = useLang()

  return (
    // This is the only way into a case study from the homepage, so it has to
    // work from the keyboard. It stays a div rather than becoming a <button>:
    // the tile is laid out by an aspect-ratio box holding an absolutely
    // positioned image, and a button's own layout defaults fight that.
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen(project)
        }
      }}
      className="group cursor-pointer rounded-2xl border border-pf-line hover:border-pf-200 hover:shadow-sm transition-colors duration-200 overflow-hidden relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Image — full height */}
      <div className={`absolute inset-0 ${project.bg}`}>
        {project.video ? (
          <HoverVideo src={project.video} poster={project.image} />
        ) : "image" in project && project.image ? (
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
  const navigate = useNavigate()
  const location = useLocation()
  const { lang } = useLang()
  const t = copy[lang]

  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  // Filter UI (t.filters) hidden for now — not needed yet, easy to re-add.
  const filtered = rest

  // Which modal is open is read off the URL rather than held in state, so a
  // gallery project has a real address: analytics counts it as a view, the
  // link can be shared, and Back closes the modal without extra wiring.
  const openProject = projects.find((p) => p.href === location.pathname) ?? null

  // Featured projects navigate to their own page, gallery projects to their
  // modal URL — same call either way, the router decides what that path means.
  const open = (project: Project) => {
    if (project.href) navigate(project.href)
  }

  return (
    <section id="projects" className="pt-24 pb-40 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Case study — featured, unfiltered */}
        <h2 className="text-3xl font-black text-pf-ink mb-6">{t.caseStudyHeading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
          {featured.map((project) => (
            <ProjectTile key={project.title} project={project} showTag={false} onOpen={open} />
          ))}
        </div>

        {/* Other projects */}
        <h2 className="text-3xl font-black text-pf-ink mb-12">{t.otherHeading}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              layoutId={`project-card-${project.title}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ProjectTile project={project} showTag={false} onOpen={open} />
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>

      <ProjectModal
        open={openProject !== null}
        onClose={() => navigate("/")}
        layoutId={openProject ? `project-card-${openProject.title}` : undefined}
      >
        {openProject?.href && modalContent[openProject.href]?.()}
      </ProjectModal>
    </section>
  )
}
