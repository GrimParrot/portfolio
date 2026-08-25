import { projectTags } from "@/data/projectTags"

export type Product = {
  eyebrow: string
  title: string
  tags: string[]
  intro: React.ReactNode
  roleHeading: string
  /** The scope runs in two columns, and they are not one list cut in half:
   *  the left one is the ground I was working on, the right one what I built.
   *  Balancing them automatically would shuffle the two together. */
  roleLeft: React.ReactNode[]
  roleRight: React.ReactNode[]
  /** One or two pictures closing the product. Two sit side by side, weighted
   *  by their own aspect ratios rather than split down the middle. */
  images: { src: string; alt: string; aspect?: string }[]
}

type CodeteCopy = {
  chapters: Record<"intro" | "management" | "reconciliation" | "devtools" | "analytics", string>
  heroEyebrow: string
  heroTags: string[]
  heroTitle: string
  /** Trailing half of the title, set in the page's own purple. */
  heroTitleAccent: string
  heroLead: React.ReactNode
  ndaNote: React.ReactNode
  metaBar: { label: string; value: string }[]
  productsHeading: string
  coverAlt: string
  coverCaption: string
  /** Sits under every product, the same sentence each time. */
  imageNote: string
  ndaLabel: string
  products: Product[]
}

export const copy: { pl: CodeteCopy; en: CodeteCopy } = {
  pl: {
    chapters: {
      intro: "Intro",
      management: "Management platform",
      reconciliation: "Data reconciliation",
      devtools: "Dev tools",
      analytics: "Data analytics",
    },
    heroEyebrow: "PROJECTS · CODETE",
    heroTags: projectTags.codete,
    heroTitle: "Dwa lata,",
    heroTitleAccent: "cztery produkty",
    heroLead: (
      <>
        Podczas mojej 2-letniej pracy w Codete zaprojektowałam cztery złożone produkty B2B, każdy w innej domenie: wewnętrzna platforma enterprise, narzędzie do umów i uzgadniania danych, narzędzie dla deweloperów i platforma analityczna w MVP. Każdy z nich wymagał design systemu zbudowanego od zera, trzy także nowego logo i brandu. Przy każdym pracowałam end-to-end: architektura informacji, flow, UI, dokumentacja i handoff dla zespołów developerskich.
      </>
    ),
    ndaNote: (
      <strong>
        Ze względu na NDA nie mogę pokazać nazw, materiałów ani szczegółów technicznych. Chętnie opowiem więcej o procesie i decyzjach na spotkaniu.
      </strong>
    ),
    metaBar: [
      { label: "MOJA ROLA", value: "Senior UX/UI Designer" },
      { label: "Design Team", value: "1-3" },
      { label: "SKALA", value: "0→1 i redesign" },
      { label: "DESIGN SYSTEMY", value: "4" },
    ],
    productsHeading: "Products",
    coverAlt:
      "Cztery ciemne makiety interfejsów, ułożone pod kątem na falistym fioletowym tle: platforma do zarządzania, narzędzie deweloperskie, uzgadnianie danych i analityka. Ilustracja poglądowa, nie zrzuty rzeczywistych produktów.",
    coverCaption: "Materiał poglądowy, ze względu na NDA nie mogę pokazać rzeczywistych projektów",
    imageNote:
      "Ze względów NDA nie mogę upubliczniać materiałów. Jeśli chcesz dowiedzieć się więcej o tym projekcie daj znać :)",
    ndaLabel: "Objęte NDA",
    products: [
      {
        eyebrow: "01 · MANAGEMENT PLATFORM",
        title: "Redesign platformy do zarządzania",
        tags: ["Redesign", "Enterprise", "Internal tools"],
        intro: (
          <>
            Platforma była <strong>centralnym systemem operacyjnym firmy</strong>: kontrahenci i partnerzy, katalog produktów i usług, zamówienia, konfiguracja techniczna i rozliczenia w jednym miejscu. Pracowało w niej <strong>kilkaset osób z czterech departamentów</strong>, z których każdy przychodził do tego samego systemu po zupełnie inne rzeczy.
          </>
        ),
        roleHeading: "Mój zakres",
        roleLeft: [
          <>system klasy enterprise, <strong>ponad 100 ekranów</strong></>,
          "duże wolumeny przetwarzanych danych i rozbudowana struktura zależności między obiektami",
          <><strong>cztery departamenty</strong>, każdy z własnymi procesami i ścieżkami</>,
          "analiza zachowań użytkowników i celów biznesowych",
          "persony dla każdego z czterech departamentów wraz z ich głównymi flow",
          <><strong>architektura informacji</strong> dla całego systemu</>,
        ],
        roleRight: [
          <>uproszczenie <strong>złożonych procesów B2B</strong> do przewidywalnych ścieżek</>,
          "osobne ścieżki i dashboardy produktowe dla czterech departamentów",
          "dwuskładnikowy system logowania",
          "makiety, prototypy i finalny design",
          <><strong>design system od zera</strong>: zmienne, style, komponenty, wraz z dokumentacją</>,
          "nowe logo i brand guide",
          "ścisła, zwinna praca z Product Ownerem i zespołem developerskim",
        ],
        images: [
          { src: "/codete-01-information-architecture.webp", alt: "Rozmyta mapa architektury informacji platformy do zarządzania: kilkadziesiąt połączonych węzłów, nieczytelnych ze względu na NDA.", aspect: "916 / 169" },
        ],
      },
      {
        eyebrow: "02 · DATA RECONCILIATION",
        title: "Platforma do negocjacji umów i danych",
        tags: ["0→1 Design", "B2B SaaS", "Design System"],
        intro: (
          <>
            Narzędzie, w którym dwie firmy <strong>zawierały umowy i uzgadniały podlegające im dane</strong>. Użytkownik mapował pola między dwoma systemami, dzięki czemu narzędzie <strong>porównywało pliki automatycznie i wskazywało rozbieżności</strong>. Każda rozbieżność trafiała do <strong>modułu negocjacji</strong>, w którym obie strony dochodziły do wspólnej wersji.
          </>
        ),
        roleHeading: "Mój zakres",
        roleLeft: [
          "użytkownik produktu to managerowie i C-level",
          "niska tolerancja na niedociągnięcia",
          <strong>jedyna projektantka w zespole</strong>,
          "hi-fi i klikalne prototypy od pierwszego dnia",
          <strong>wywiady z użytkownikami</strong>,
          "badanie ścieżek błędów i duży nacisk na ich niwelację",
          "architektura informacji i flow całego produktu",
          "upraszczanie złożonych procesów",
        ],
        roleRight: [
          <>proces <strong>mapowania pól między systemami</strong></>,
          "moduł uzgadniania rozbieżności",
          "dashboard umów i proces zawierania nowej umowy",
          <><strong>design system od zera</strong> (variables, style, komponenty) wraz z dokumentacją</>,
          "nowe logo i brand guide",
          "ścisła, zwinna praca z Product Ownerem i developerami",
        ],
        images: [
          { src: "/codete-02-product-logic.webp", alt: "Rozmyty diagram logiki produktu i mapowania pól między systemami, nieczytelny ze względu na NDA.", aspect: "687 / 176" },
          { src: "/codete-02-user-interviews.webp", alt: "Rozmyte notatki z wywiadów z użytkownikami, nieczytelne ze względu na NDA.", aspect: "172 / 181" },
        ],
      },
      {
        eyebrow: "03 · DEV TOOLS",
        title: "Narzędzie dla zespołów technicznych",
        tags: ["0→1 Design", "B2B SaaS", "Information Architecture"],
        intro: (
          <>
            <strong>Deploymenty, pipeline'y, środowiska i ich stany</strong> w jednym widoku, a z tego samego miejsca <strong>kontrolowane release'y</strong>. <strong>Siedem połączonych ze sobą obszarów</strong>, w których deweloper widzi stan na pierwszym ekranie i schodzi głębiej dopiero wtedy, kiedy sam tego chce. Domena na wskroś techniczna: narzędzie miało sens tylko wtedy, gdy dawało obraz szybciej, niż deweloper sprawdziłby go sam.
          </>
        ),
        roleHeading: "Mój zakres",
        roleLeft: [
          <>bardzo techniczna domena, <strong>siedem połączonych ze sobą obszarów</strong></>,
          <>cały produkt, <strong>50+ widoków</strong></>,
          "krótki czas realizacji, około pół roku",
          "ekosystem projektowany równolegle z innymi projektantami",
          "rozmowy z deweloperami, którzy mieli z tego korzystać",
        ],
        roleRight: [
          "architektura informacji i flow",
          <><strong>end-to-end product design</strong> całego produktu</>,
          "upraszczanie skomplikowanych procesów",
          <strong>design system od zera</strong>,
          "wspólne patterny, biblioteki, zmienne i style dla całego ekosystemu",
          "nowe logo i brand guide",
          "ścisła, zwinna praca z Product Ownerem i developerami",
        ],
        images: [
          { src: "/codete-03-architecture.webp", alt: "Rozmyty diagram architektury narzędzia dla zespołów technicznych, nieczytelny ze względu na NDA.", aspect: "4096 / 1034" },
        ],
      },
      {
        eyebrow: "04 · DATA ANALYTICS",
        title: "MVP platformy do analizy danych",
        tags: ["MVP", "Enterprise", "Team Leadership"],
        intro: (
          <>
            Każdy etap pracy z danymi był <strong>osobnym, złożonym procesem</strong>: zbieranie surowych plików, kolejne etapy obróbki, katalogi, <strong>modelowanie i integracje</strong> po obu stronach. Do tego moduł użytkowników, ról i uprawnień. <strong>Na działające MVP były trzy miesiące</strong>.
          </>
        ),
        roleHeading: "Mój zakres",
        roleLeft: [
          "3 miesiące na realizację",
          <strong>spotkania z analitykami danych</strong>,
          <strong>architektura informacji</strong>,
          "flow dla kolejnych etapów pracy z danymi",
          "zbieranie surowych danych z data lake",
          "tworzenie pipeline'ów",
          "pluginy po stronie source i destination",
          "moduł użytkowników, ról i uprawnień razem z definicjami i klasyfikacją",
          "ekrany i klikalny prototyp całego MVP",
        ],
        roleRight: [
          <><strong>design system od zera</strong> (style, variables, typografia, kolory, komponenty, interakcje, motion, wzorce projektowe)</>,
          <><strong>prowadzenie zespołu projektantów</strong>: podział pracy, feedback, nadzór nad efektami</>,
          "mentoring młodszych projektantów",
          "procesy pracy zespołu przeniesione z poprzedniego projektu",
          "ścisła współpraca z Product Ownerem i zespołem developerskim",
        ],
        images: [
          { src: "/codete-04-data-flow.webp", alt: "Rozmyty diagram przepływu danych w platformie analitycznej, nieczytelny ze względu na NDA.", aspect: "907 / 225" },
        ],
      },
    ],
  },
  en: {
    chapters: {
      intro: "Intro",
      management: "Management platform",
      reconciliation: "Data reconciliation",
      devtools: "Dev tools",
      analytics: "Data analytics",
    },
    heroEyebrow: "PROJECTS · CODETE",
    heroTags: projectTags.codete,
    heroTitle: "Two years,",
    heroTitleAccent: "four products",
    heroLead: (
      <>
        Over my two years at Codete I designed four complex B2B products, each in a different domain: an internal enterprise platform, a tool for contracts and data reconciliation, a developer tool and an analytics platform at MVP. Every one of them needed a design system built from scratch, and three of them a new logo and brand as well. On each I worked end to end: information architecture, flows, UI, documentation and handoff to the development teams.
      </>
    ),
    ndaNote: (
      <strong>
        NDA means I cannot show names, materials or technical details. I am happy to talk through the process and the decisions in person.
      </strong>
    ),
    metaBar: [
      { label: "MY ROLE", value: "Senior UX/UI Designer" },
      { label: "Design Team", value: "1-3" },
      { label: "SCALE", value: "0→1 and redesign" },
      { label: "DESIGN SYSTEMS", value: "4" },
    ],
    productsHeading: "Products",
    coverAlt:
      "Four dark interface mockups laid out at an angle on a wavy purple background: a management platform, a developer tool, data reconciliation and analytics. Indicative artwork, not screenshots of the real products.",
    coverCaption: "Indicative artwork — NDA means I cannot show the real projects",
    imageNote:
      "NDA means I cannot publish the materials. If you would like to hear more about this project, let me know :)",
    ndaLabel: "Under NDA",
    products: [
      {
        eyebrow: "01 · MANAGEMENT PLATFORM",
        title: "Management platform redesign",
        tags: ["Redesign", "Enterprise", "Internal tools"],
        intro: (
          <>
            The platform was the <strong>company's central operating system</strong>: counterparties and partners, the catalogue of products and services, orders, technical configuration and billing in one place. <strong>Several hundred people across four departments</strong> worked in it, and each of them came to the same system for something entirely different.
          </>
        ),
        roleHeading: "My scope",
        roleLeft: [
          <>an enterprise-class system, <strong>over 100 screens</strong></>,
          "large volumes of processed data and a deep structure of dependencies between objects",
          <><strong>four departments</strong>, each with its own processes and paths</>,
          "analysis of user behaviour and business goals",
          "personas for each of the four departments, along with their main flows",
          <><strong>information architecture</strong> for the whole system</>,
        ],
        roleRight: [
          <>complex <strong>B2B processes simplified</strong> into predictable paths</>,
          "separate paths and product dashboards for the four departments",
          "two-factor sign-in",
          "wireframes, prototypes and the final design",
          <><strong>a design system from scratch</strong>: variables, styles, components, with documentation</>,
          "a new logo and brand guide",
          "close, agile work with the Product Owner and the development team",
        ],
        images: [
          { src: "/codete-01-information-architecture.webp", alt: "Blurred information-architecture map of the management platform: dozens of connected nodes, illegible for NDA reasons.", aspect: "916 / 169" },
        ],
      },
      {
        eyebrow: "02 · DATA RECONCILIATION",
        title: "Contract and data reconciliation platform",
        tags: ["0→1 Design", "B2B SaaS", "Design System"],
        intro: (
          <>
            A tool where two companies <strong>signed contracts and reconciled the data those contracts covered</strong>. The user mapped fields between the two systems, which let the tool <strong>compare files automatically and flag the mismatches</strong>. Every mismatch went to a <strong>negotiation module</strong>, where both sides worked their way to one agreed version.
          </>
        ),
        roleHeading: "My scope",
        roleLeft: [
          "the product's users are managers and C-level",
          "low tolerance for rough edges",
          <strong>the only designer on the team</strong>,
          "hi-fi and clickable prototypes from day one",
          <strong>user interviews</strong>,
          "studying the error paths, with a heavy focus on heading them off",
          "information architecture and flows for the whole product",
          "simplifying complex processes",
        ],
        roleRight: [
          <>the <strong>field-mapping process between systems</strong></>,
          "the mismatch reconciliation module",
          "a contract dashboard and the process for signing a new one",
          <><strong>a design system from scratch</strong> (variables, styles, components) with documentation</>,
          "a new logo and brand guide",
          "close, agile work with the Product Owner and the developers",
        ],
        images: [
          { src: "/codete-02-product-logic.webp", alt: "Blurred diagram of the product logic and the field mapping between systems, illegible for NDA reasons.", aspect: "687 / 176" },
          { src: "/codete-02-user-interviews.webp", alt: "Blurred notes from the user interviews, illegible for NDA reasons.", aspect: "172 / 181" },
        ],
      },
      {
        eyebrow: "03 · DEV TOOLS",
        title: "A tool for technical teams",
        tags: ["0→1 Design", "B2B SaaS", "Information Architecture"],
        intro: (
          <>
            <strong>Deployments, pipelines, environments and their states</strong> in one view, with <strong>controlled releases</strong> from the same place. <strong>Seven connected areas</strong>, where a developer sees the state on the first screen and only goes deeper when they choose to. A thoroughly technical domain: the tool was only worth having if it gave them the picture faster than they could check it themselves.
          </>
        ),
        roleHeading: "My scope",
        roleLeft: [
          <>a deeply technical domain, <strong>seven connected areas</strong></>,
          <>the whole product, <strong>50+ views</strong></>,
          "a short delivery window, around six months",
          "an ecosystem designed alongside other designers",
          "conversations with the developers who would be using it",
        ],
        roleRight: [
          "information architecture and flows",
          <><strong>end-to-end product design</strong> for the whole product</>,
          "simplifying complicated processes",
          <strong>a design system from scratch</strong>,
          "shared patterns, libraries, variables and styles for the whole ecosystem",
          "a new logo and brand guide",
          "close, agile work with the Product Owner and the developers",
        ],
        images: [
          { src: "/codete-03-architecture.webp", alt: "Blurred architecture diagram of the tool for technical teams, illegible for NDA reasons.", aspect: "4096 / 1034" },
        ],
      },
      {
        eyebrow: "04 · DATA ANALYTICS",
        title: "Data analytics platform at MVP",
        tags: ["MVP", "Enterprise", "Team Leadership"],
        intro: (
          <>
            Every stage of working with the data was <strong>its own complicated process</strong>: collecting raw files, the successive rounds of processing, catalogues, <strong>modelling and integrations</strong> on both sides. Plus a module for users, roles and permissions. <strong>There were three months to a working MVP</strong>.
          </>
        ),
        roleHeading: "My scope",
        roleLeft: [
          "three months to deliver",
          <strong>sessions with the data analysts</strong>,
          <strong>information architecture</strong>,
          "flows for the successive stages of working with the data",
          "collecting raw data from the data lake",
          "building the pipelines",
          "plugins on the source and destination side",
          "the users, roles and permissions module, with definitions and classification",
          "screens and a clickable prototype of the whole MVP",
        ],
        roleRight: [
          <><strong>a design system from scratch</strong> (styles, variables, typography, colour, components, interactions, motion, design patterns)</>,
          <><strong>leading the design team</strong>: splitting the work, feedback, signing off the results</>,
          "mentoring junior designers",
          "team working practices carried over from the previous project",
          "close collaboration with the Product Owner and the development team",
        ],
        images: [
          { src: "/codete-04-data-flow.webp", alt: "Blurred data-flow diagram of the analytics platform, illegible for NDA reasons.", aspect: "907 / 225" },
        ],
      },
    ],
  },
}
