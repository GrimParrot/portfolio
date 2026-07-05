import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom"
import { projects, tagStyles, type ProjectTag } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"

type Filter = "all" | ProjectTag

const copy = {
  pl: {
    label: "Portfolio",
    heading: "Wybrane projekty",
    filters: [
      { id: "all" as Filter, label: "Wszystkie" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Case Study" as Filter, label: "Case Study" },
    ],
  },
  en: {
    label: "Portfolio",
    heading: "Selected projects",
    filters: [
      { id: "all" as Filter, label: "All" },
      { id: "UI" as Filter, label: "UI" },
      { id: "Case Study" as Filter, label: "Case Study" },
    ],
  },
}

export function Projects() {
  const [active, setActive] = useState<Filter>("all")
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = copy[lang]

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.tag === active)

  return (
    <section id="projects" className="pt-10 pb-24 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-slate-400 mb-3">{t.label}</p>
            <h2 className="text-3xl font-black text-slate-900">
              {t.heading}
            </h2>
          </div>

          <div className="flex w-full sm:w-auto sm:inline-flex items-center bg-white rounded-xl p-1 gap-0.5 relative border border-slate-200">
            {t.filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className="relative flex-1 px-4 py-1.5 rounded-lg text-sm font-medium z-10 transition-colors duration-200 text-center whitespace-nowrap"
                style={{ color: active === f.id ? "white" : undefined }}
              >
                {active === f.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-[#0F172A] rounded-lg shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={active === f.id ? "text-white" : "text-slate-500 hover:text-slate-700"}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <div
              key={project.title}
              onClick={() => "href" in project && project.href ? navigate(project.href) : undefined}
              className="group cursor-pointer rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-colors duration-200 overflow-hidden bg-white relative"
              style={{ height: 300 }}
              onMouseEnter={e => { const panel = e.currentTarget.querySelector<HTMLElement>(".panel"); if (panel) panel.style.height = panel.scrollHeight + "px" }}
              onMouseLeave={e => { const panel = e.currentTarget.querySelector<HTMLElement>(".panel"); if (panel) panel.style.height = "52px" }}
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

              {/* Tag — top left of image */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${tagStyles[project.tag]}`}>
                  {project.tag}
                </span>
              </div>

              {/* White panel — expands on hover */}
              <div className="panel absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-4 overflow-hidden transition-all duration-300" style={{ height: 52 }}>
                <p className="font-semibold text-slate-900 leading-snug">{lang === "pl" && project.title_pl ? project.title_pl : project.title}</p>
                {"description" in project && (lang === "en" ? project.description_en : project.description) && (
                  <p className="text-slate-500 text-[15px] mt-4 leading-snug">
                    {lang === "en" ? project.description_en : project.description}
                  </p>
                )}
              </div>
            </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
