export type ProjectTag = "UI" | "Case Study"

export const tagStyles: Record<ProjectTag, string> = {
  "UI": "bg-[#0F172A] text-white",
  "Case Study": "bg-[#0ABA53] text-white",
}

export interface Project {
  title: string
  title_pl?: string
  description?: string
  description_en?: string
  tag: ProjectTag
  color: string
  bg: string
  image?: string
  imagePosition?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: "Reporting · Localo",
    title_pl: "Raportowanie · Localo",
    description: "Automatyzacja, która robi raport za specjalistę.",
    description_en: "Automation that does the report for the specialist.",
    tag: "Case Study",
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-indigo-50",
    image: "/raporty-cover.png",
    imagePosition: "left center",
    href: "/case-study/raporty",
  },
  {
    title: "Client Acquisition · Localo",
    title_pl: "Pozyskiwanie klientów · Localo",
    description: "Od dwóch osobnych narzędzi do jednego flow end-to-end.",
    description_en: "Two separate tools replaced by one flow — from lead to client onboarding.",
    tag: "Case Study",
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-violet-50",
    image: "/Sales mode.png",
    href: "/case-study/localo",
  },
  {
    title: "Naturalnie.pl",
    description: "Projekt mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    description_en: "Mobile UI concept for a natural cosmetics and personal care online store.",
    tag: "UI",
    color: "from-[#32685B] to-[#1a3d34]",
    bg: "bg-[#eaf2f0]",
    image: "/naturalnie.png",
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
    title: "Banner Revolution",
    title_pl: "Szyldowe rewolucje",
    description: "Strona konkursu dla projektantów walczącego z chaosem reklamowym w przestrzeni miejskiej.",
    description_en: "Competition website for designers fighting advertising chaos in urban space.",
    tag: "Case Study",
    color: "from-[#FEC400] to-[#d4a300]",
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
