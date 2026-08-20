import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useLang } from "@/i18n/LanguageContext"
import { projects } from "@/data/projects"

const SITE = "https://edytasup.run"
const NAME = "Edyta Suprun"

/** Homepage copy. index.html ships the Polish version statically — this is what
 *  replaces it once the visitor turns out to be on EN. */
const home = {
  pl: {
    title: `${NAME} · Product Designer`,
    description:
      "Product Designer z 8+ latami doświadczenia w B2B i B2C SaaS. Case studies z Localo: automatyczny kreator raportów, moduł pozyskiwania klientów, redesign statystyk.",
  },
  en: {
    title: `${NAME} · Product Designer`,
    description:
      "Product designer with 8+ years in B2B and B2C SaaS. Case studies from Localo: an automatic report builder, a client acquisition module, a stats redesign.",
  },
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

/** Passing null removes the tag — a page we do not want indexed should carry no
 *  canonical at all, rather than one pointing somewhere else. */
function setCanonical(href: string | null) {
  const el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!href) {
    el?.remove()
    return
  }
  if (el) {
    el.setAttribute("href", href)
    return
  }
  const link = document.createElement("link")
  link.setAttribute("rel", "canonical")
  link.setAttribute("href", href)
  document.head.appendChild(link)
}

function setRobots(content: string | null) {
  const el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')
  if (!content) {
    el?.remove()
    return
  }
  upsertMeta("name", "robots", content)
}

/** Keeps the document head in step with the route and the language.
 *
 *  Every project is a modal over the homepage, but each one owns a URL, so each
 *  one needs its own title and description — otherwise fifteen open tabs all
 *  read the same thing. The copy comes from data/projects.ts rather than a
 *  second list here, so a project renamed there is renamed in search too.
 *
 *  Anything that is neither the homepage nor a listed project — the archived
 *  case study, the lab routes — is deliberately kept out of the index. */
export function DocumentMeta() {
  const { pathname } = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    const project = projects.find((p) => p.href === pathname)
    const indexable = pathname === "/" || !!project

    const title = project
      ? `${(lang === "pl" && project.title_pl) || project.title} · ${NAME}`
      : home[lang].title
    const description =
      (project && (lang === "pl" ? project.description : project.description_en ?? project.description)) ||
      home[lang].description

    document.title = title
    document.documentElement.lang = lang

    upsertMeta("name", "description", description)
    upsertMeta("property", "og:title", title)
    upsertMeta("property", "og:description", description)
    upsertMeta("property", "og:url", SITE + (indexable ? pathname : "/"))
    upsertMeta("property", "og:locale", lang === "pl" ? "pl_PL" : "en_US")
    upsertMeta("name", "twitter:title", title)
    upsertMeta("name", "twitter:description", description)

    setCanonical(indexable ? SITE + pathname : null)
    setRobots(indexable ? null : "noindex, follow")
  }, [pathname, lang])

  return null
}
