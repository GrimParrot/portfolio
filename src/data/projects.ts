export type ProjectTag = "UI" | "Case Study"

export interface Project {
  title: string
  description?: string
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
    tag: "Case Study",
    color: "from-[#466AFA] to-indigo-500",
    bg: "bg-violet-50",
    image: "/Sales mode.png",
    href: "/case-study/localo",
  },
  {
    title: "Naturalnie.pl",
    description: "Projekt mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    tag: "UI",
    color: "from-[#32685B] to-[#1a3d34]",
    bg: "bg-[#eaf2f0]",
    image: "/naturalnie.png",
    href: "/ui/naturalnie",
  },
  {
    title: "Kafejeto.pl",
    description: "Sklep internetowy dla polskiej palarni kawy specialty — świeża kawa, akcesoria, szkolenia.",
    tag: "UI",
    color: "from-[#8EBD3F] to-[#5a7a28]",
    bg: "bg-[#f2f7e8]",
    image: "/kafejeto/okladka.jpg",
    href: "/ui/kafejeto",
  },
  {
    title: "Banneroza",
    description: "Strona konkursu dla projektantów walczącego z chaosem reklamowym w przestrzeni miejskiej.",
    tag: "Case Study",
    color: "from-[#FEC400] to-[#d4a300]",
    bg: "bg-[#fffbeb]",
    image: "/banneroza/cover2.jpg",
    href: "/case-study/banneroza",
  },
]
