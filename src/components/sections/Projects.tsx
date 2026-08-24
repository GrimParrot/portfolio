import { useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useLocation, useNavigate } from "react-router-dom"
import { projects, type ProjectTag, type Project } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"
import { ProjectModal } from "@/components/ProjectModal"
import { RaportyCaseStudy } from "@/pages/RaportyCaseStudy"
import { ClientAcquisitionCaseStudy } from "@/pages/ClientAcquisitionCaseStudy"
import { PlanujemyToPage } from "@/pages/PlanujemyToPage"
import { NaturalniePage } from "@/pages/NaturalniePage"
import { KafejetoPage } from "@/pages/KafejetoPage"
import { BannerozaPage } from "@/pages/BannerozaPage"
import { StatsPage } from "@/pages/StatsPage"
import { DashboardPage } from "@/pages/DashboardPage"

type Filter = "all" | ProjectTag

const modalContent: Record<string, () => React.ReactNode> = {
  "/case-study/raporty": () => <RaportyCaseStudy />,
  "/case-study/client-acquisition": () => <ClientAcquisitionCaseStudy />,
  "/ui/planujemyto": () => <PlanujemyToPage />,
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
      className="w-full h-full object-cover"
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

type TileSize = "lg" | "sm"

// The same tile renders in a two-column grid (~570px) and a three-column one
// (~360px). The scale travels as a prop rather than a breakpoint, because what
// decides it is the section the tile stands in, not the width of the window.
// The clamp differs too: a case study's description carries the numbers it is
// there for, and two lines cut them off. The gallery's one-liners fit in two.
const tileScale: Record<TileSize, { title: string; description: string }> = {
  lg: { title: "text-[22px]", description: "text-[15px] line-clamp-4" },
  sm: { title: "text-[18px]", description: "text-[14px] line-clamp-2" },
}

function ProjectTile({
  project,
  size,
  showTag,
  onOpen,
}: {
  project: Project
  size: TileSize
  showTag: boolean
  onOpen: (project: Project) => void
}) {
  const { lang } = useLang()
  const scale = tileScale[size]
  const title = lang === "pl" && project.title_pl ? project.title_pl : project.title
  const description = lang === "pl" ? project.description : project.description_en ?? project.description

  return (
    // This is the only way into a case study from the homepage, so it has to
    // work from the keyboard. It stays a div rather than becoming a <button>:
    // a button's content model is phrasing content, and the card holds an <h3>.
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
      className="group flex h-full cursor-pointer flex-col gap-4 rounded-3xl border border-pf-line bg-white p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_6px_14px_-6px_rgba(0,0,0,0.07),0_2px_5px_-3px_rgba(0,0,0,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Cover — its own rounded block inside the card, not the card itself.
          The scaling layer sits over the media so a video zooms like a photo. */}
      <div
        className={`relative overflow-hidden rounded-2xl ring-1 ring-black/5 ${project.bg}`}
        style={{ aspectRatio: "4/3" }}
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]">
          {project.video ? (
            <HoverVideo src={project.video} poster={project.image} />
          ) : (
            <img
              src={project.image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: project.imagePosition ?? "center" }}
            />
          )}
        </div>
      </div>

      {/* Title and description — flex-1 so the tag line stays pinned to the
          bottom even when a neighbouring card in the row is taller. */}
      <div className="flex flex-1 flex-col gap-2 px-1">
        {showTag && (
          <span className="inline-block self-start rounded-xl bg-pf-surface-subtle px-3.5 py-2 text-sm font-semibold text-pf-body">
            {project.tag}
          </span>
        )}
        <h3 className={`${scale.title} font-semibold leading-snug tracking-tight text-pf-ink`}>{title}</h3>
        {description && (
          <p className={`${scale.description} leading-normal text-pf-subtle`}>{description}</p>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <p className="px-1 pb-1 text-[12px] tracking-tight text-pf-muted">{project.tags.join(" · ")}</p>
      )}
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

  // Every project navigates to its own URL, and that URL renders the homepage
  // with a modal over it — being featured changes the tile, not the opening.
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
            <ProjectTile key={project.title} project={project} size="lg" showTag={false} onOpen={open} />
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
              className="h-full"
            >
              <ProjectTile project={project} size="sm" showTag={false} onOpen={open} />
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
