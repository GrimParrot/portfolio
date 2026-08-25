import { projectTags } from "@/data/projectTags"

export type Product = {
  eyebrow: string
  title: string
  tags: string[]
  intro: string
  roleHeading: string
  role: React.ReactNode[]
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
    heroEyebrow: "PROJECTS · CODETE",
    heroTags: projectTags.codete,
    heroTitle: "Dwa lata,",
    heroTitleAccent: "cztery produkty",
    heroLead: (
      <>
        Podczas mojej <strong>2-letniej pracy w Codete</strong> zaprojektowałam cztery <strong>złożone produkty B2B</strong>, każdy w innej domenie: wewnętrzna platforma enterprise dla operatora telekomunikacyjnego, narzędzie do umów i uzgadniania danych, narzędzie dla deweloperów i platforma danych w MVP. Trzy z nich wymagały stworzenia <strong>design systemu od zera</strong>, razem z logo i brandem. Przy każdym pracowałam <strong>end-to-end</strong>: architektura informacji, flow, UI, dokumentacja i handoff dla zespołów deweloperskich.
      </>
    ),
    ndaNote: (
      <>
        Ze względu na <strong>NDA nie mogę upublicznić wszystkich informacji i materiałów. Chętnie opowiem więcej na spotkaniu.</strong>
      </>
    ),
    metaBar: [
      { label: "MOJA ROLA", value: "Senior UX/UI Designer" },
      { label: "PRODUKTY", value: "4" },
      { label: "SKALA", value: "0→1 i redesign" },
      { label: "DESIGN SYSTEMY", value: "3" },
    ],
    productsHeading: "Products",
    coverAlt:
      "Cztery ciemne makiety interfejsów, ułożone pod kątem na falistym fioletowym tle: platforma do zarządzania, narzędzie deweloperskie, uzgadnianie danych i analityka. Ilustracja poglądowa, nie zrzuty rzeczywistych produktów.",
    coverCaption:
      "Materiał poglądowy, ze względu na NDA nie mogę pokazać rzeczywistych projektów.",
    imageNote:
      "Ze względów NDA nie mogę upubliczniać materiałów. Jeśli chcesz dowiedzieć się więcej o tym projekcie, daj znać :)",
    ndaLabel: "Under NDA",
    products: [
      {
        eyebrow: "01 · Management platform",
        title: "Redesign platformy do zarządzania",
        tags: ["Enterprise", "Internal Tools", "Information Architecture", "Heavy Data", "Dashboard"],
        intro:
          "To narzędzie wewnętrzne dużego międzynarodowego operatora telekomunikacyjnego: firmy współpracujące, klienci i partnerzy razem z informacjami o nich i przypisanymi tokenami, użytkownicy z dostępami i stanowiskami. Do tego całe portfolio produktów, zamówienia, zarządzanie API i faktury. Korzystało z niego kilkaset osób.",
        roleHeading: "Moja rola",
        role: [
          "nowe logo i brand guide",
          <>nowa <strong>architektura informacji</strong></>,
          "wyodrębnione persony",
          "flow dla każdej persony",
          "system logowania z uwierzytelnianiem dwuskładnikowym",
          <><strong>design system od zera</strong>, atomy, patterny, komponenty</>,
          <>dokumentacja, prototypy i <strong>handoff</strong> dla dwóch zespołów deweloperskich</>,
          "po redesignie rozwijałam platformę dalej, razem z innymi projektantami",
          "dark/light mode",
        ],
        images: [
          { src: "/codete-01-information-architecture.webp", alt: "Rozmyta mapa architektury informacji platformy do zarządzania: kilkadziesiąt połączonych węzłów, nieczytelnych ze względu na NDA.", aspect: "916 / 169" },
        ],
      },
      {
        eyebrow: "02 · DATA RECONCILIATION",
        title: "Platforma do negocjacji",
        tags: ["B2B", "0→1", "Contract Management", "Data Reconciliation", "Design System", "Dashboard"],
        intro:
          "Narzędzie, w którym firmy zawierają ze sobą umowy i sprawdzają dane, które tym umowom podlegają. Zaprojektowałam cały produkt: mapowanie pól między systemami, które to porównanie robi za użytkownika, moduł negocjacji rozbieżności, logo, brand i design system od zera. 25+ widoków",
        roleHeading: "Moja rola",
        role: [
          "nowe logo i identyfikacja wizualna",
          "flow całego produktu",
          <strong>architektura informacji</strong>,
          <>UI, <strong>prototyp</strong></>,
          "mapowanie pól między systemami, które zastąpiło ręczną weryfikację przesyłu",
          "moduł negocjacji rozbieżności",
          <><strong>dashboard umów</strong> i proces zawierania nowej umowy</>,
          <strong>design system od zera</strong>,
        ],
        images: [
          { src: "/codete-02-product-logic.webp", alt: "Rozmyty diagram logiki produktu i mapowania pól między systemami, nieczytelny ze względu na NDA.", aspect: "687 / 176" },
          { src: "/codete-02-user-interviews.webp", alt: "Rozmyte notatki z wywiadów z użytkownikami, nieczytelne ze względu na NDA.", aspect: "172 / 181" },
        ],
      },
      {
        eyebrow: "03 · DEV TOOLS",
        title: "Narzędzie dla deweloperów",
        tags: ["DevTools", "B2B", "0→1", "Deployments & Releases", "Design System"],
        intro:
          "Prowadziłam trzyosobowy zespół projektantów, ze mną włącznie. Zbudowaliśmy narzędzie dla deweloperów do nadzoru nad aplikacjami, pipeline'ami, środowiskami, deploymentami i release'ami.",
        roleHeading: "Moja rola",
        role: [
          "rozmowy z deweloperami",
          <strong>end-to-end product design</strong>,
          <><strong>prowadzenie zespołu projektantów</strong>: podział pracy, feedback, nadzór nad efektami</>,
          "standardy projektowania dla ekosystemu",
          "wzorce projektowe (m.in. style i variables)",
          "nowe logo i brand",
          <><strong>architektura informacji</strong> i flow</>,
          "cały produkt, 50+ widoków",
          <strong>design system od zera</strong>,
        ],
        images: [
          { src: "/codete-03-architecture.webp", alt: "Rozmyty diagram architektury narzędzia dla zespołów technicznych, nieczytelny ze względu na NDA.", aspect: "4096 / 1034" },
        ],
      },
      {
        eyebrow: "04 · DATA ANALYTICS",
        title: "Platforma do analizy danych",
        tags: ["Data Analytics", "Heavy Data", "Data Lake", "0→1", "MVP"],
        intro:
          "Platforma do analizy danych, narzędzie dla analityków. Zbieranie surowych danych z data lake, budowanie pipeline'ów dla kolejnych etapów, katalogi danych, modelowanie i pluginy. Działające MVP miało powstać w 3 miesiące. Prowadziłam dwuosobowy zespół projektantów, ze mną włącznie.",
        roleHeading: "Moja rola",
        role: [
          <><strong>prowadzenie zespołu projektantów</strong>: podział pracy, feedback, nadzór nad efektami</>,
          <>trzy <strong>spotkania z analitykami danych</strong>: jak wygląda ich praca, czego potrzebują, jakim językiem mówią</>,
          <><strong>architektura informacji</strong> całej platformy</>,
          "flow dla kolejnych etapów pracy z danymi",
          <>zbieranie surowych danych z <strong>data lake</strong></>,
          <>tworzenie <strong>pipeline'ów</strong>: lake, normalization, modeling</>,
          "katalogi danych i modelowanie",
          "pluginy po stronie source i destination, na przykład BigQuery",
          <>moduł <strong>użytkowników, ról i uprawnień</strong> razem z definicjami i klasyfikacją</>,
          <>ekrany i <strong>klikalny prototyp</strong> całego MVP</>,
          "procesy pracy zespołu przeniesione z poprzedniego projektu",
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
        During my <strong>two years at Codete</strong> I designed four <strong>complex B2B products</strong>, each in a different domain: an internal enterprise platform for a telecom operator, a contract and data-reconciliation tool, a developer tool, and a data platform in MVP. Three of them needed a <strong>design system built from scratch</strong>, logo and brand included. On each one I worked <strong>end-to-end</strong>: information architecture, flow, UI, documentation and handoff for the engineering teams.
      </>
    ),
    ndaNote: (
      <>
        Due to <strong>NDA I can't share all the information and materials publicly. I'm happy to tell you more in person.</strong>
      </>
    ),
    metaBar: [
      { label: "MY ROLE", value: "Senior UX/UI Designer" },
      { label: "PRODUCTS", value: "4" },
      { label: "SCALE", value: "0→1 and redesign" },
      { label: "DESIGN SYSTEMS", value: "3" },
    ],
    productsHeading: "Products",
    coverAlt:
      "Four dark interface mockups laid out at an angle on a wavy purple background: a management platform, a developer tool, data reconciliation and analytics. Indicative artwork, not screenshots of the real products.",
    coverCaption:
      "Indicative artwork — NDA means I cannot show the real projects.",
    imageNote:
      "NDA means I cannot publish the materials. If you would like to hear more about this project, let me know :)",
    ndaLabel: "Under NDA",
    products: [
      {
        eyebrow: "01 · Management platform",
        title: "Management platform redesign",
        tags: ["Enterprise", "Internal Tools", "Information Architecture", "Heavy Data", "Dashboard"],
        intro:
          "This is an internal tool for a large international telecom operator: collaborating companies, clients and partners along with their information and assigned tokens, users with access levels and roles. On top of that, the entire product portfolio, orders, API management and invoices. Several hundred people used it.",
        roleHeading: "My role",
        role: [
          "new logo and brand guide",
          <>new <strong>information architecture</strong></>,
          "defined personas",
          "flow for each persona",
          "login system with two-factor authentication",
          <><strong>design system built from scratch</strong>, atoms, patterns, components</>,
          <>documentation, prototypes and <strong>handoff</strong> for two engineering teams</>,
          "kept developing the platform after the redesign, alongside other designers",
          "dark/light mode",
        ],
        images: [
          { src: "/codete-01-information-architecture.webp", alt: "Blurred information-architecture map of the management platform: dozens of connected nodes, illegible for NDA reasons.", aspect: "916 / 169" },
        ],
      },
      {
        eyebrow: "02 · DATA RECONCILIATION",
        title: "Negotiation platform",
        tags: ["B2B", "0→1", "Contract Management", "Data Reconciliation", "Design System", "Dashboard"],
        intro:
          "A tool where companies enter into contracts with each other and verify the data those contracts cover. I designed the entire product: field mapping between systems that runs the comparison for the user, a discrepancy-negotiation module, logo, brand and a design system from scratch. 25+ views",
        roleHeading: "My role",
        role: [
          "new logo and visual identity",
          "flow for the entire product",
          <strong>information architecture</strong>,
          <>UI, <strong>prototype</strong></>,
          "field mapping between systems, replacing manual transfer verification",
          "discrepancy-negotiation module",
          <><strong>contracts dashboard</strong> and the flow for entering a new contract</>,
          <strong>design system built from scratch</strong>,
        ],
        images: [
          { src: "/codete-02-product-logic.webp", alt: "Blurred diagram of the product logic and the field mapping between systems, illegible for NDA reasons.", aspect: "687 / 176" },
          { src: "/codete-02-user-interviews.webp", alt: "Blurred notes from the user interviews, illegible for NDA reasons.", aspect: "172 / 181" },
        ],
      },
      {
        eyebrow: "03 · DEV TOOLS",
        title: "Developer tool",
        tags: ["DevTools", "B2B", "0→1", "Deployments & Releases", "Design System"],
        intro:
          "I led a three-person team of designers, myself included. We built a tool for developers to oversee applications, pipelines, environments, deployments and releases.",
        roleHeading: "My role",
        role: [
          "conversations with developers",
          <strong>end-to-end product design</strong>,
          <><strong>leading a team of designers</strong>: splitting the work, giving feedback, overseeing the output</>,
          "design standards for the ecosystem",
          "design patterns (styles and variables, among others)",
          "new logo and brand",
          <><strong>information architecture</strong> and flow</>,
          "the entire product, 50+ views",
          <strong>design system built from scratch</strong>,
        ],
        images: [
          { src: "/codete-03-architecture.webp", alt: "Blurred architecture diagram of the tool for technical teams, illegible for NDA reasons.", aspect: "4096 / 1034" },
        ],
      },
      {
        eyebrow: "04 · DATA ANALYTICS",
        title: "Data analytics platform",
        tags: ["Data Analytics", "Heavy Data", "Data Lake", "0→1", "MVP"],
        intro:
          "A data analytics platform, a tool for analysts. Collecting raw data from a data lake, building pipelines for successive stages, data catalogs, modeling and plugins. A working MVP had to ship in 3 months. I led a two-person team of designers, myself included.",
        roleHeading: "My role",
        role: [
          <><strong>leading a team of designers</strong>: splitting the work, giving feedback, overseeing the output</>,
          <>three <strong>meetings with data analysts</strong>: what their work looks like, what they need, what language they speak</>,
          <><strong>information architecture</strong> for the entire platform</>,
          "flow for successive stages of working with data",
          <>collecting raw data from the <strong>data lake</strong></>,
          <>building <strong>pipelines</strong>: lake, normalization, modeling</>,
          "data catalogs and modeling",
          "source- and destination-side plugins, for example BigQuery",
          <>a module for <strong>users, roles and permissions</strong> along with definitions and classification</>,
          <>screens and a <strong>clickable prototype</strong> of the entire MVP</>,
          "team workflows carried over from a previous project",
        ],
        images: [
          { src: "/codete-04-data-flow.webp", alt: "Blurred data-flow diagram of the analytics platform, illegible for NDA reasons.", aspect: "907 / 225" },
        ],
      },
    ],
  },
}
