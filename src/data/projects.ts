export type ProjectTag = "UI" | "Case Study"

export interface Project {
  title: string
  description?: string
  description_en?: string
  tag: ProjectTag
  color: string
  bg: string
  image?: string
  href?: string
}

export const projects: Project[] = [
  {
    title: "Client Acquisition · Localo",
    description: "Dwa oddzielne narzędzia zastąpione jednym flow — od leada do onboardingu klienta.",
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
    title: "Banneroza",
    description: "Strona konkursu dla projektantów walczącego z chaosem reklamowym w przestrzeni miejskiej.",
    description_en: "Competition website for designers fighting advertising chaos in urban space.",
    tag: "Case Study",
    color: "from-[#FEC400] to-[#d4a300]",
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
