import { projectTags } from "@/data/projectTags"

export type ProjectTag = "UI" | "Case Study" | "Web"

export interface Project {
  title: string
  title_pl?: string
  description?: string
  description_en?: string
  tag: ProjectTag
  /** Etykiety w stopce kafla, po trzy: typ pracy, domena, specjalizacja.
   *  Te same w obu językach — to terminy branżowe, których się nie tłumaczy. */
  tags?: string[]
  featured?: boolean
  bg: string
  image: string
  imagePosition?: string
  video?: string
  href?: string
}

/** Paths that open a project modal over the homepage instead of a page of
 *  their own — which is now every project with an address. The router, the
 *  scroll guard and the modal all read this one list, so an entry cannot end
 *  up addressable in one of them and not the others.
 *
 *  This used to be derived from `!featured`, back when the two featured case
 *  studies had pages of their own. They don't: `featured` now means only
 *  "large tile in the highlighted row" and says nothing about routing. */
export const galleryPaths = (): string[] =>
  projects.filter((p) => p.href).map((p) => p.href as string)

export const projects: Project[] = [
  {
    title: "Localo · Report Builder",
    title_pl: "Localo · Kreator raportów",
    description:
      "Agencje sklejały raporty dla swoich klientów ze zrzutów, kilka godzin miesięcznie. Dziś 60% użytkowników raportów generuje je i wysyła automatycznie.",
    description_en:
      "Agencies used to piece client reports together from screenshots, several hours a month. Today 60% of report users generate and send them automatically.",
    tag: "Case Study",
    tags: projectTags.raporty,
    featured: true,
    bg: "bg-indigo-50",
    image: "/raporty-ds-cover.webp",
    imagePosition: "left center",
    href: "/case-study/raporty",
  },
  {
    title: "Codete · Four B2B products",
    title_pl: "Codete · Cztery produkty B2B",
    description:
      "Wewnętrzna platforma enterprise, narzędzie do uzgadniania danych, narzędzie dla deweloperów i platforma danych w MVP. Wszystkie cztery potrzebowały design systemu od zera.",
    description_en:
      "An internal enterprise platform, a data-reconciliation tool, a developer tool and a data platform at MVP. All four needed a design system built from scratch.",
    tag: "Case Study",
    tags: projectTags.codete,
    featured: true,
    bg: "bg-slate-50",
    image: "/codete-cover.webp",
    href: "/case-study/codete",
  },
  {
    title: "Localo · Client Acquisition",
    title_pl: "Localo · Pozyskiwanie klientów",
    description:
      "Prawie nikt nie uruchamiał funkcji sam, wartość docierała do ludzi dopiero na callu z Customer Success. Po redesignie sesji na funkcji przybyło 2,5×, a mediana czasu na niej wydłużyła się o 81%.",
    description_en:
      "Almost nobody switched the feature on themselves — its value only landed on a call with Customer Success. After the redesign, sessions on the feature grew 2.5× and median time on it rose 81%.",
    tag: "Case Study",
    tags: projectTags.clientAcquisition,
    featured: true,
    bg: "bg-violet-50",
    image: "/client-acquisition-cover.webp",
    href: "/case-study/client-acquisition",
  },
  {
    title: "PlanujemyTo",
    description: "Darmowa aplikacja do planowania wydarzeń — marka, produkt i design system.",
    description_en: "Free event-planning app — brand, product and design system.",
    tag: "UI",
    tags: projectTags.planujemyto,
    bg: "bg-[#eeeeff]",
    image: "/planujemyto-cover.webp",
    href: "/ui/planujemyto",
  },
  {
    title: "Naturalnie.pl",
    description: "Projekt mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    description_en: "Mobile UI concept for a natural cosmetics and personal care online store.",
    tag: "UI",
    tags: projectTags.naturalnie,
    bg: "bg-[#eaf2f0]",
    image: "/naturalnie-cover.webp",
    href: "/ui/naturalnie",
  },
  {
    title: "Kafejeto.pl",
    description: "Sklep internetowy dla polskiej palarni kawy specialty — świeża kawa, akcesoria, szkolenia.",
    description_en: "Online store for a Polish specialty coffee roastery — fresh coffee, accessories, training.",
    tag: "UI",
    tags: projectTags.kafejeto,
    bg: "bg-[#f2f7e8]",
    image: "/kafejeto/okladka.jpg",
    href: "/ui/kafejeto",
  },
  {
    title: "Stats Redesign",
    title_pl: "Redesign statystyk",
    description: "Przeprojektowałam kluczowy ekran statystyk — nowy układ, wykresy zamiast surowych liczb.",
    description_en: "Redesigned the core stats screen — new layout, charts instead of raw numbers.",
    tag: "Web",
    tags: projectTags.stats,
    bg: "bg-pf-50",
    image: "/stats-cover.webp",
    href: "/ui/stats",
  },
  {
    title: "Profile Dashboard",
    title_pl: "Pulpit profilu",
    description: "Główny pulpit Localo — widoczność, zadania, recenzje i konkurencja w jednym widoku.",
    description_en: "Localo's main dashboard — visibility, tasks, reviews and competitors in one view.",
    tag: "Web",
    tags: projectTags.dashboard,
    bg: "bg-pf-50",
    image: "/dashboard-cover.webp",
    href: "/ui/dashboard",
  },
  {
    title: "Banner Revolution",
    title_pl: "Szyldowe rewolucje",
    description: "Strona konkursu dla projektantów walczącego z chaosem reklamowym w przestrzeni miejskiej.",
    description_en: "Competition website for designers fighting advertising chaos in urban space.",
    tag: "Web",
    tags: projectTags.banneroza,
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
