export type ProjectTag = "UI" | "Case Study" | "Web"

export interface Project {
  title: string
  title_pl?: string
  description?: string
  description_en?: string
  tag: ProjectTag
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
    title: "Case Study - Automated Reporting",
    title_pl: "Case study - Automatyczne raporty",
    description: "Automatyzacja, która robi raport za specjalistę.",
    description_en: "Automation that does the report for the specialist.",
    tag: "Case Study",
    featured: true,
    bg: "bg-indigo-50",
    image: "/raporty-ds-cover.webp",
    imagePosition: "left center",
    href: "/case-study/raporty",
  },
  {
    title: "Case Study - Client Acquisition",
    title_pl: "Case study - Moduł pozyskiwania klientów",
    description: "Od dwóch osobnych narzędzi do jednego flow end-to-end.",
    description_en: "Two separate tools replaced by one flow — from lead to client onboarding.",
    tag: "Case Study",
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
    bg: "bg-[#eeeeff]",
    image: "/planujemyto-cover.webp",
    href: "/ui/planujemyto",
  },
  {
    title: "Naturalnie.pl",
    description: "Projekt mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    description_en: "Mobile UI concept for a natural cosmetics and personal care online store.",
    tag: "UI",
    bg: "bg-[#eaf2f0]",
    image: "/naturalnie-cover.webp",
    href: "/ui/naturalnie",
  },
  {
    title: "Kafejeto.pl",
    description: "Sklep internetowy dla polskiej palarni kawy specialty — świeża kawa, akcesoria, szkolenia.",
    description_en: "Online store for a Polish specialty coffee roastery — fresh coffee, accessories, training.",
    tag: "UI",
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
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
