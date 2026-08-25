import { projectTags } from "@/data/projectTags"

export type Product = {
  eyebrow: string
  title: string
  tags: string[]
  intro: React.ReactNode
  roleHeading: string
  /** The scope runs in two columns, and they are not one list cut in half:
   *  the left one is what I built, the right one the conditions I built it
   *  under. Balancing them automatically would shuffle the two together. */
  roleLeft: React.ReactNode[]
  roleRight: React.ReactNode[]
  /** One or two pictures closing the card. Two sit side by side, weighted by
   *  their own aspect ratios rather than split down the middle. */
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
  /** Sits under every product card, the same sentence each time. */
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
    heroEyebrow: "PROJECTS - CODETE",
    heroTags: projectTags.codete,
    heroTitle: "Dwa lata,",
    heroTitleAccent: "cztery produkty",
    heroLead: (
      <>
        Podczas mojej <strong>2-letniej pracy w Codete</strong> zaprojektowałam cztery <strong>złożone produkty B2B</strong>, każdy w innej domenie: wewnętrzna platforma enterprise, narzędzie do umów i uzgadniania danych, narzędzie dla zespołów technicznych i platforma analityczna w MVP. Trzy z nich wymagały stworzenia <strong>design systemu od zera</strong>, razem z logo i brandem. Przy każdym pracowałam <strong>end-to-end</strong>: architektura informacji, flow, UI, dokumentacja i handoff dla zespołów developerskich.
      </>
    ),
    ndaNote: (
      <strong>
        Ze względu na NDA nie mogę pokazać nazw, materiałów ani szczegółów technicznych. Chętnie opowiem więcej o procesie i decyzjach na spotkaniu.
      </strong>
    ),
    metaBar: [
      { label: "MOJA ROLA", value: "Senior UX/UI Designer" },
      { label: "Design Team", value: "1-4" },
      { label: "SKALA", value: "0→1 i redesign" },
      { label: "DESIGN SYSTEMY", value: "3" },
    ],
    productsHeading: "Products",
    coverAlt:
      "Cztery ciemne makiety interfejsów, ułożone pod kątem na falistym fioletowym tle: platforma do zarządzania, narzędzie deweloperskie, uzgadnianie danych i analityka. Ilustracja poglądowa, nie zrzuty rzeczywistych produktów.",
    coverCaption: "Materiał poglądowy, ze względu na NDA nie moge pokazać rzeczywistych projektów",
    imageNote:
      "Ze względów NDA nie mogę upubliczniać materiałów. Jeśli chcesz dowiedzieć się więcej o tym projekcie daj znać :)",
    ndaLabel: "Under NDA",
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
          <><strong>system klasy enterprise</strong>, ponad <strong>100 ekranów</strong></>,
          <><strong>duże wolumeny przetwarzanych danych</strong> i rozbudowana struktura zależności między obiektami</>,
          <><strong>cztery departamenty</strong>, każdy z własnymi procesami i ścieżkami</>,
          <><strong>analiza zachowań użytkowników</strong> i celów biznesowych</>,
          <><strong>persony</strong> dla każdego z czterech departamentów wraz z ich <strong>głównymi flow</strong></>,
          <><strong>architektura informacji</strong> dla całego systemu</>,
        ],
        roleRight: [
          <><strong>uproszczenie złożonych procesów B2B</strong> do przewidywalnych ścieżek</>,
          <>osobne ścieżki i <strong>dashboardy produktowe</strong> dla czterech departamentów</>,
          <strong>dwuskładnikowy system logowania</strong>,
          <strong>makiety, prototypy i finalny design</strong>,
          <><strong>design system od zera</strong>: zmienne, style, komponenty, wraz z <strong>dokumentacją</strong></>,
          <strong>nowe logo i brand guide</strong>,
          <>ścisła, zwinna praca z <strong>Product Ownerem i zespołem developerskim</strong></>,
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
        roleHeading: "Moja rola",
        roleLeft: [
          "nowe logo i brand guide",
          "flow całego produktu",
          "architektura informacji",
          "proces mapowania pól między systemami",
          "moduł uzgadniania rozbieżności",
          "dashboard umów i proces zawierania nowej",
          "design system od 0 (variables, style, komponenty) wraz z dokumentacją",
          "hi-fi i klikalne prototypy od pierwszego dnia",
        ],
        roleRight: [
          "wywiady z użytkownikami",
          "ścisła, zwinna praca z Produkt ownerem i developerami",
          "upraszczanie skomplikowanych procesów",
          "duży focus na niwelacji potencjalnych błędów",
          "badanie ścieżek błędów",
          "użytkownik produktu to managerowie i C-level",
          "niska tolerancja na niedociągnięcia",
          "krótki czas realizacji",
          "Solo designer",
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
            Podgląd <strong>deploymentów, przepływów i stanów</strong>, a z tego samego miejsca <strong>kontrolowane release'y</strong>. <strong>Siedem połączonych ze sobą obszarów</strong>, w których deweloper widzi stan na pierwszym ekranie i schodzi w szczegóły dopiero wtedy, kiedy sam tego chce. Środowisko na wskroś techniczne, więc narzędzie musiało dawać obraz szybciej, niż użytkownik sprawdziłby go sam.
          </>
        ),
        roleHeading: "Moja rola",
        roleLeft: [
          "rozmowy z osobami, które miały z tego korzystać",
          "nowe logo i brand",
          <strong>architektura informacji i flow</strong>,
          "end-to-end product design całego produktu",
          <strong>design system od zera</strong>,
          "wspólne patterny, biblioteki, zmienne i style dla całego ekosystemu",
        ],
        roleRight: [
          "wywiady z użytkownikami",
          "ścisła, zwinna praca z Produkt ownerem i developerami",
          "upraszczanie skomplikowanych procesów",
          "duży focus na niwelacji potencjalnych błędów",
          "badanie ścieżek błędów",
          "niska tolerancja na niedociągnięcia",
          "krótki czas realizacji",
          "2 projektantów w zespole",
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
        roleHeading: "Moja rola",
        roleLeft: [
          <strong>prowadzenie trzysosobowego zespołu projektantów</strong>,
          "organizacja pracy, definiowanie zadań, usprawnianie procesów projektowych",
          "design system od 0 (m.in style, viariables, typografia, kolory, komponenty, interakcje, motion, wzorce projektowe)",
          "pogłębianie wiedzy na spotkaniach z analitykami",
          <strong>architektura informacji, user journeys oraz jobs to be done</strong>,
          "moduł użytkowników, ról i uprawnień",
          "3 miesiące na realizacje",
        ],
        roleRight: [
          "ścisła współpraca z produkt ownerem i zespołem developerskim",
          "Złożone procesy mapowania i modelowania danych",
          "Zarządzanie data leke'ami i pipelinami",
          "mentoring młodszych projektantów",
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
    heroEyebrow: "PROJECTS - CODETE",
    heroTags: projectTags.codete,
    heroTitle: "Two years,",
    heroTitleAccent: "four products",
    heroLead: (
      <>
        Over my <strong>two years at Codete</strong> I designed four <strong>complex B2B products</strong>, each in a different domain: an internal enterprise platform, a tool for contracts and data reconciliation, a tool for technical teams and an analytics platform at MVP. Three of them needed a <strong>design system built from scratch</strong>, logo and brand included. On every one of them I worked <strong>end to end</strong>: information architecture, flows, UI, documentation and handoff to the development teams.
      </>
    ),
    ndaNote: (
      <strong>
        NDA means I cannot show names, materials or technical details. I am happy to talk through the process and the decisions in person.
      </strong>
    ),
    metaBar: [
      { label: "MY ROLE", value: "Senior UX/UI Designer" },
      { label: "Design Team", value: "1-4" },
      { label: "SCALE", value: "0→1 and redesign" },
      { label: "DESIGN SYSTEMS", value: "3" },
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
          <>an <strong>enterprise-class system</strong>, over <strong>100 screens</strong></>,
          <><strong>large volumes of processed data</strong> and a deep structure of dependencies between objects</>,
          <><strong>four departments</strong>, each with its own processes and paths</>,
          <><strong>analysis of user behaviour</strong> and business goals</>,
          <><strong>personas</strong> for each of the four departments, along with their <strong>main flows</strong></>,
          <><strong>information architecture</strong> for the whole system</>,
        ],
        roleRight: [
          <><strong>complex B2B processes simplified</strong> into predictable paths</>,
          <>separate paths and <strong>product dashboards</strong> for the four departments</>,
          <strong>two-factor sign-in</strong>,
          <strong>wireframes, prototypes and the final design</strong>,
          <>a <strong>design system from scratch</strong>: variables, styles, components, with <strong>documentation</strong></>,
          <strong>a new logo and brand guide</strong>,
          <>close, agile work with the <strong>Product Owner and the development team</strong></>,
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
        roleHeading: "My role",
        roleLeft: [
          "a new logo and brand guide",
          "flows for the whole product",
          "information architecture",
          "the field-mapping process between systems",
          "the mismatch reconciliation module",
          "a contract dashboard and the process for signing a new one",
          "a design system from scratch (variables, styles, components) with documentation",
          "hi-fi and clickable prototypes from day one",
        ],
        roleRight: [
          "user interviews",
          "close, agile work with the Product Owner and the developers",
          "simplifying complicated processes",
          "a heavy focus on heading off possible errors",
          "studying the error paths",
          "the product's users are managers and C-level",
          "low tolerance for rough edges",
          "a short delivery window",
          "solo designer",
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
            A view of <strong>deployments, pipelines and states</strong>, with <strong>controlled releases</strong> from the same place. <strong>Seven connected areas</strong>, where a developer sees the state on the first screen and only goes deeper when they choose to. A thoroughly technical environment, so the tool had to give them the picture faster than they could check it themselves.
          </>
        ),
        roleHeading: "My role",
        roleLeft: [
          "conversations with the people who would be using it",
          "a new logo and brand",
          <strong>information architecture and flows</strong>,
          "end-to-end product design for the whole product",
          <strong>a design system from scratch</strong>,
          "shared patterns, libraries, variables and styles for the whole ecosystem",
        ],
        roleRight: [
          "user interviews",
          "close, agile work with the Product Owner and the developers",
          "simplifying complicated processes",
          "a heavy focus on heading off possible errors",
          "studying the error paths",
          "low tolerance for rough edges",
          "a short delivery window",
          "two designers on the team",
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
        roleHeading: "My role",
        roleLeft: [
          <strong>leading a team of three designers</strong>,
          "organising the work, defining tasks, improving the design processes",
          "a design system from scratch (styles, variables, typography, colour, components, interactions, motion, design patterns)",
          "deepening my grasp of the domain in sessions with the analysts",
          <strong>information architecture, user journeys and jobs to be done</strong>,
          "the users, roles and permissions module",
          "three months to deliver",
        ],
        roleRight: [
          "close collaboration with the Product Owner and the development team",
          "complex data mapping and modelling processes",
          "managing data lakes and pipelines",
          "mentoring junior designers",
        ],
        images: [
          { src: "/codete-04-data-flow.webp", alt: "Blurred data-flow diagram of the analytics platform, illegible for NDA reasons.", aspect: "907 / 225" },
        ],
      },
    ],
  },
}
