export type ProjectTag = "UI" | "Case Study" | "Web"

export const tagStyles: Record<ProjectTag, string> = {
  "UI": "bg-[#0F172A] text-white",
  "Case Study": "bg-[#0ABA53] text-white",
  "Web": "bg-[#466AFA] text-white",
}

export interface Project {
  title: string
  title_pl?: string
  description?: string
  description_en?: string
  tag: ProjectTag
  featured?: boolean
  color: string
  bg: string
  image?: string
  imagePosition?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: "Reporting",
    title_pl: "Raportowanie",
    description: "Automatyzacja, która robi raport za specjalistę.",
    description_en: "Automation that does the report for the specialist.",
    tag: "Case Study",
    featured: true,
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-indigo-50",
    image: "/raporty-cover.webp",
    imagePosition: "left center",
    href: "/case-study/raporty",
  },
  {
    title: "Client Acquisition",
    title_pl: "Pozyskiwanie klientów",
    description: "Od dwóch osobnych narzędzi do jednego flow end-to-end.",
    description_en: "Two separate tools replaced by one flow — from lead to client onboarding.",
    tag: "Case Study",
    featured: true,
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-violet-50",
    image: "/client-acquisition-cover.webp",
    href: "/case-study/localo",
  },
  {
    title: "Naturalnie.pl",
    description: "Projekt mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    description_en: "Mobile UI concept for a natural cosmetics and personal care online store.",
    tag: "UI",
    color: "from-[#32685B] to-[#1a3d34]",
    bg: "bg-[#eaf2f0]",
    image: "/naturalnie-cover.webp",
    href: "/ui/naturalnie",
  },
  {
    title: "Kafejeto.pl",
    description: "Sklep internetowy dla polskiej palarni kawy specialty — świeża kawa, akcesoria, szkolenia.",
    description_en: "Online store for a Polish specialty coffee roastery — fresh coffee, accessories, training.",
    tag: "UI",
    color: "from-[#8EBD3F] to-[#5a7a28]",
    bg: "bg-[#f2f7e8]",
    image: "/kafejeto/okladka.jpg",
    href: "/ui/kafejeto",
  },
  {
    title: "Stats Redesign",
    description: "Przeprojektowałam kluczowy ekran statystyk — nowy układ, wykresy zamiast surowych liczb.",
    description_en: "Redesigned the core stats screen — new layout, charts instead of raw numbers.",
    tag: "Web",
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-slate-50",
    image: "/stats-cover.webp",
    href: "/ui/stats",
  },
  {
    title: "Banner Revolution",
    title_pl: "Szyldowe rewolucje",
    description: "Strona konkursu dla projektantów walczącego z chaosem reklamowym w przestrzeni miejskiej.",
    description_en: "Competition website for designers fighting advertising chaos in urban space.",
    tag: "Web",
    color: "from-[#FEC400] to-[#d4a300]",
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
