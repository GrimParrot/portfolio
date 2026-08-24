export type Product = {
  eyebrow: string
  title: string
  tags: string[]
  intro: string
  roleHeading: string
  role: React.ReactNode[]
  stats?: { value: string; label: string }[]
  challengeHeading: string
  challenge: string
  quote?: string
  solutionHeading: string
  solution: string
  heroImage: { src: string; alt: string; aspect?: string }
  imagesAfterChallenge: { src: string; alt: string; aspect?: string }[]
  imagesAfterSolution: { src: string; alt: string; aspect?: string }[]
}

type CodeteCopy = {
  chapters: Record<"intro" | "management" | "reconciliation" | "devtools" | "analytics", string>
  heroEyebrow: string
  heroTitle: string
  heroLead: React.ReactNode
  ndaNote: React.ReactNode
  metaBar: { label: string; value: string }[]
  coverAlt: string
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
    heroTitle: "Dwa lata, cztery produkty",
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
    coverAlt: "Zamazany zrzut ekranu jednego z produktów Codete, zasłonięty ze względu na NDA.",
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
        stats: [
          { value: "8", label: "ról w rdzeniu systemu" },
          { value: "100+", label: "zaprojektowanych ekranów" },
          { value: "4", label: "główne typy zamówień z własną ścieżką" },
        ],
        challengeHeading: "Wyzwanie",
        challenge:
          "Aplikacja urosła bez planu. Nieużywane moduły, ścieżki, które nie łączyły się w spójne flow, wolne działanie. Osiem obszarów funkcjonalnych, trzy grupy użytkowników o rozłącznych potrzebach i jeden interfejs, który nie umiał żadnej z nich zaprowadzić tam, gdzie faktycznie pracuje. Do tego domena, której musiałam się nauczyć od zera: porty, maszyny wirtualne, API gateway.",
        solutionHeading: "Rozwiązanie",
        solution:
          "Funkcje pogrupowane wokół ścieżek person. Menu w dwóch wariantach, Business i Development, przełączanych switchem. Dashboard z domyślnym układem pod rolę. Nawigacja oparta na ośmiu rolach rdzeniowych. Martwy moduł wycięty po sprawdzeniu w danych.",
        heroImage: {
          src: "/codete-01-role-screenshot.webp",
          alt: "Zamazany zrzut ekranu widoku wyboru roli w platformie do zarządzania, zasłonięty ze względu na NDA.",
          aspect: "776 / 554",
        },
        imagesAfterChallenge: [
          { src: "/codete-01-login.webp", alt: "Zamazany zrzut ekranu systemu logowania, zasłonięty ze względu na NDA.", aspect: "338 / 211" },
          { src: "/codete-01-dashboard-1.webp", alt: "Zamazany zrzut ekranu dashboardu platformy, zasłonięty ze względu na NDA.", aspect: "263 / 208" },
          { src: "/codete-01-dashboard-2.webp", alt: "Zamazany zrzut ekranu innego wariantu dashboardu, zasłonięty ze względu na NDA.", aspect: "263 / 211" },
          { src: "/codete-01-dashboard-3.webp", alt: "Zamazany zrzut ekranu kolejnego wariantu dashboardu, zasłonięty ze względu na NDA.", aspect: "263 / 211" },
        ],
        imagesAfterSolution: [
          { src: "/codete-01-logo.webp", alt: "Zamazany zrzut ekranu nowego logo zaprojektowanego dla platformy, zasłonięty ze względu na NDA.", aspect: "588 / 331" },
          { src: "/codete-01-typography.webp", alt: "Zamazany zrzut ekranu zestawienia typografii z design systemu platformy, zasłonięty ze względu na NDA.", aspect: "588 / 331" },
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
        challengeHeading: "Wyzwanie",
        challenge:
          "Trzy rzeczy, które musiały zmieścić się w jednym produkcie: zawarcie umowy, automatyczne porównanie danych mimo dwóch różnych nazewnictw i sposób na negocjacje, kiedy porównanie pokaże rozbieżność. Skomplikowany interfejs, bo produkt obsługuje dwie firmy naraz, ich dwa systemy i umowę, która to spina. Mnóstwo danych porównawczych, całe pliki pól przy polach. Do tego wymagający użytkownicy: managerowie i stakeholderzy, którzy oceniają produkt od pierwszego spojrzenia. Wywiady po pierwszej wersji pokazały, gdzie to boli:",
        quote: "Reconciliation process is not clear enough. Users don't know where they should start, what they supposed to do and how they can resolve mismatches",
        solutionHeading: "Rozwiązanie",
        solution:
          "Użytkownik raz mapuje pola systemu (nazewnictwo, rodzaj, jednostki), od tego momentu narzędzie porównuje pliki samo. Rozbieżność otwiera negocjację: kontrpropozycja, spotkanie w połowie. Do tego dashboard wszystkich umów i proces zawierania nowej. 25+ widoków w pół roku, w hi-fi i klikalnych prototypach od pierwszego dnia. Efekt prezentowałam inwestorowi, projekt przeszedł do kolejnej rundy finansowania.",
        heroImage: {
          src: "/codete-02-overview.webp",
          alt: "Zamazany zrzut ekranu widoku ogólnego platformy do negocjacji, zasłonięty ze względu na NDA.",
          aspect: "560 / 495",
        },
        imagesAfterChallenge: [
          { src: "/codete-02-product-logic.webp", alt: "Zamazany diagram logiki produktu i mapowania pól między systemami, zasłonięty ze względu na NDA.", aspect: "945 / 242" },
          { src: "/codete-02-user-interviews.webp", alt: "Zamazane notatki z wywiadów z użytkownikami, zasłonięte ze względu na NDA.", aspect: "231 / 243" },
        ],
        imagesAfterSolution: [
          { src: "/codete-02-detail-1.webp", alt: "Zamazany zrzut ekranu szczegółowego widoku platformy do negocjacji, zasłonięty ze względu na NDA.", aspect: "425 / 399" },
          { src: "/codete-02-detail-2.webp", alt: "Zamazany zrzut ekranu kolejnego szczegółowego widoku platformy do negocjacji, zasłonięty ze względu na NDA.", aspect: "302 / 399" },
          { src: "/codete-02-detail-3.webp", alt: "Zamazany zrzut ekranu jeszcze innego szczegółowego widoku platformy do negocjacji, zasłonięty ze względu na NDA.", aspect: "425 / 399" },
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
        challengeHeading: "Wyzwanie",
        challenge:
          "Jedno miejsce na zarządzanie pipeline'ami, środowiskami, deploymentami i release'ami. Najpierw trzeba było zrozumieć je jako obiekty i zależności między nimi, zanim dało się je pogrupować w ekrany. Użytkownikami byli deweloperzy, więc narzędzie musiało mówić ich językiem. Do tego koordynacja pracy trzech projektantów i wspólny wzorzec, żeby nasze prace działały w jednym ekosystemie, plus zbudowanie kultury feedbacku i współpracy.",
        solutionHeading: "Rozwiązanie",
        solution:
          "Siedem obszarów połączonych ze sobą, m.in. project, deployment, environment i release management. Najważniejsze informacje widać od razu na dashboardzie, a przejście między projektami i między obszarami jednego projektu idzie bez wracania do menu. Dev wchodzi po stan i dostaje go na pierwszym ekranie, w szczegóły schodzi dopiero wtedy, kiedy sam tego chce. To był cały ekosystem projektowany równocześnie przez trzech projektantów, więc spójność nie brała się sama: wypracowane patterny projektowe, biblioteki oraz ustalone variables i style w Figmie. Design system zbudowany od zera trzymał te 50+ widoków w spójnych ramach.",
        heroImage: {
          src: "/codete-03-overview.webp",
          alt: "Zamazany zrzut ekranu widoku ogólnego narzędzia dla deweloperów, zasłonięty ze względu na NDA.",
          aspect: "560 / 591",
        },
        imagesAfterChallenge: [
          { src: "/codete-03-architecture.webp", alt: "Zamazany diagram architektury systemu, zasłonięty ze względu na NDA.", aspect: "1198 / 302" },
        ],
        imagesAfterSolution: [
          { src: "/codete-03-detail-1.webp", alt: "Zamazany zrzut ekranu szczegółowego widoku narzędzia dla deweloperów, zasłonięty ze względu na NDA.", aspect: "588 / 399" },
          { src: "/codete-03-detail-2.webp", alt: "Zamazany zrzut ekranu kolejnego szczegółowego widoku narzędzia dla deweloperów, zasłonięty ze względu na NDA.", aspect: "588 / 399" },
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
        challengeHeading: "Wyzwanie",
        challenge:
          "Analitycy potrzebowali jednego narzędzia na całą drogę danych, od surowych plików w data lake po gotowy model. Trzy miesiące na działające MVP, przy ograniczonych zasobach. Dużo zagadnień, analiz, danych i metryk naraz. Wcześniej pracowałam z danymi już przetworzonymi, a tu po raz pierwszy weszłam w fazę zbierania surowych danych i ich obrabiania. Do tego czas: to był jeden wielki sprint dowożenia.",
        solutionHeading: "Rozwiązanie",
        solution:
          "MVP narzędzia do zbierania danych z data lake, z tworzeniem pipeline'ów dla kolejnych etapów, osobno lake, normalization i modeling. Do tego katalogi danych, modelowanie oraz dodawanie i zarządzanie pluginami po stronie source i destination, na przykład BigQuery. Osobny moduł na użytkowników, role, definicje i klasyfikację. Współpraca z drugim projektantem ułożyła się od razu, bo procesy miałam już wypracowane na poprzednim projekcie i dało się je przenieść na ten projekt. To mocno przyspieszyło prace.",
        heroImage: {
          src: "/codete-04-relation.webp",
          alt: "Zamazany diagram relacji danych w platformie analitycznej, zasłonięty ze względu na NDA.",
          aspect: "561 / 350",
        },
        imagesAfterChallenge: [
          { src: "/codete-04-group.webp", alt: "Zamazany zrzut ekranu grupowania danych, zasłonięty ze względu na NDA.", aspect: "816 / 519" },
          { src: "/codete-04-plugin.webp", alt: "Zamazany zrzut ekranu konfiguracji pluginu, zasłonięty ze względu na NDA.", aspect: "358 / 517" },
        ],
        imagesAfterSolution: [
          { src: "/codete-04-dashboard.webp", alt: "Zamazany zrzut ekranu dashboardu platformy analitycznej, zasłonięty ze względu na NDA.", aspect: "633 / 475" },
          { src: "/codete-04-pipelines.webp", alt: "Zamazany zrzut ekranu widoku pipeline'ów danych, zasłonięty ze względu na NDA.", aspect: "543 / 476" },
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
    heroTitle: "Two years, four products",
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
    coverAlt: "Blurred screenshot of one of the Codete products, redacted for NDA.",
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
        stats: [
          { value: "8", label: "roles at the core of the system" },
          { value: "100+", label: "screens designed" },
          { value: "4", label: "main order types, each with its own path" },
        ],
        challengeHeading: "The challenge",
        challenge:
          "The app had grown without a plan. Unused modules, paths that never connected into a coherent flow, slow performance. Eight functional areas, three user groups with disjoint needs, and one interface that couldn't guide any of them to where they actually worked. On top of that, a domain I had to learn from scratch: ports, virtual machines, API gateways.",
        solutionHeading: "The solution",
        solution:
          "Features grouped around persona journeys. A menu with two variants, Business and Development, switched with a toggle. A dashboard with a default layout per role. Navigation built around eight core roles. A dead module cut after checking it against the data.",
        heroImage: {
          src: "/codete-01-role-screenshot.webp",
          alt: "Blurred screenshot of the role-selection view in the management platform, redacted for NDA.",
          aspect: "776 / 554",
        },
        imagesAfterChallenge: [
          { src: "/codete-01-login.webp", alt: "Blurred screenshot of the login screen, redacted for NDA.", aspect: "338 / 211" },
          { src: "/codete-01-dashboard-1.webp", alt: "Blurred screenshot of the platform dashboard, redacted for NDA.", aspect: "263 / 208" },
          { src: "/codete-01-dashboard-2.webp", alt: "Blurred screenshot of another dashboard variant, redacted for NDA.", aspect: "263 / 211" },
          { src: "/codete-01-dashboard-3.webp", alt: "Blurred screenshot of a further dashboard variant, redacted for NDA.", aspect: "263 / 211" },
        ],
        imagesAfterSolution: [
          { src: "/codete-01-logo.webp", alt: "Blurred screenshot of the new logo designed for the platform, redacted for NDA.", aspect: "588 / 331" },
          { src: "/codete-01-typography.webp", alt: "Blurred screenshot of the typography specimen from the platform's design system, redacted for NDA.", aspect: "588 / 331" },
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
        challengeHeading: "The challenge",
        challenge:
          "Three things that had to fit into a single product: entering a contract, automatically comparing data despite two different naming conventions, and a way to negotiate when the comparison surfaces a discrepancy. A complicated interface, because the product handles two companies at once, their two systems, and the contract that ties them together. Masses of comparison data — entire files of fields lined up against fields. On top of that, demanding users: managers and stakeholders who judge the product at first glance. Interviews after the first version showed where it hurt:",
        quote: "Reconciliation process is not clear enough. Users don't know where they should start, what they supposed to do and how they can resolve mismatches",
        solutionHeading: "The solution",
        solution:
          "The user maps the system's fields once (naming, type, units), and from that point the tool compares files on its own. A discrepancy opens a negotiation: a counter-proposal, a meeting in the middle. On top of that, a dashboard of all contracts and a flow for entering a new one. 25+ views in half a year, in hi-fi and clickable prototypes from day one. I presented the result to an investor, and the project moved to the next funding round.",
        heroImage: {
          src: "/codete-02-overview.webp",
          alt: "Blurred screenshot of the negotiation platform's overview, redacted for NDA.",
          aspect: "560 / 495",
        },
        imagesAfterChallenge: [
          { src: "/codete-02-product-logic.webp", alt: "Blurred diagram of the product logic and field mapping between systems, redacted for NDA.", aspect: "945 / 242" },
          { src: "/codete-02-user-interviews.webp", alt: "Blurred notes from user interviews, redacted for NDA.", aspect: "231 / 243" },
        ],
        imagesAfterSolution: [
          { src: "/codete-02-detail-1.webp", alt: "Blurred screenshot of a detailed view of the negotiation platform, redacted for NDA.", aspect: "425 / 399" },
          { src: "/codete-02-detail-2.webp", alt: "Blurred screenshot of another detailed view of the negotiation platform, redacted for NDA.", aspect: "302 / 399" },
          { src: "/codete-02-detail-3.webp", alt: "Blurred screenshot of a further detailed view of the negotiation platform, redacted for NDA.", aspect: "425 / 399" },
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
        challengeHeading: "The challenge",
        challenge:
          "One place to manage pipelines, environments, deployments and releases. First we had to understand them as objects and the dependencies between them, before they could be grouped into screens. The users were developers, so the tool had to speak their language. On top of that, coordinating the work of three designers and a shared pattern so our work functioned as one ecosystem, plus building a culture of feedback and collaboration.",
        solutionHeading: "The solution",
        solution:
          "Seven interconnected areas, including project, deployment, environment and release management. The most important information is visible right on the dashboard, and moving between projects, and between areas within one project, doesn't require going back through the menu. A developer comes in for status and gets it on the first screen, and only drills into detail when they choose to. This was an entire ecosystem designed simultaneously by three designers, so consistency didn't come for free: shared design patterns, libraries, and agreed variables and styles in Figma. A design system built from scratch kept those 50+ views within a consistent frame.",
        heroImage: {
          src: "/codete-03-overview.webp",
          alt: "Blurred screenshot of the developer tool's overview, redacted for NDA.",
          aspect: "560 / 591",
        },
        imagesAfterChallenge: [
          { src: "/codete-03-architecture.webp", alt: "Blurred system architecture diagram, redacted for NDA.", aspect: "1198 / 302" },
        ],
        imagesAfterSolution: [
          { src: "/codete-03-detail-1.webp", alt: "Blurred screenshot of a detailed view of the developer tool, redacted for NDA.", aspect: "588 / 399" },
          { src: "/codete-03-detail-2.webp", alt: "Blurred screenshot of another detailed view of the developer tool, redacted for NDA.", aspect: "588 / 399" },
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
        challengeHeading: "The challenge",
        challenge:
          "Analysts needed one tool for the entire data journey, from raw files in the data lake to a finished model. Three months for a working MVP, with limited resources. A lot of topics, analyses, data and metrics at once. I'd worked with already-processed data before, but this was the first time I stepped into the raw data collection and processing stage. On top of that, time: it was one big delivery sprint.",
        solutionHeading: "The solution",
        solution:
          "An MVP for collecting data from the data lake, with pipeline creation for successive stages, split into lake, normalization and modeling. On top of that, data catalogs, modeling, and adding and managing source- and destination-side plugins, for example BigQuery. A separate module for users, roles, definitions and classification. Working with the second designer clicked right away, because I'd already worked out the processes on the previous project and could carry them over to this one. That sped things up a lot.",
        heroImage: {
          src: "/codete-04-relation.webp",
          alt: "Blurred data-relations diagram in the analytics platform, redacted for NDA.",
          aspect: "561 / 350",
        },
        imagesAfterChallenge: [
          { src: "/codete-04-group.webp", alt: "Blurred screenshot of data grouping, redacted for NDA.", aspect: "816 / 519" },
          { src: "/codete-04-plugin.webp", alt: "Blurred screenshot of plugin configuration, redacted for NDA.", aspect: "358 / 517" },
        ],
        imagesAfterSolution: [
          { src: "/codete-04-dashboard.webp", alt: "Blurred screenshot of the analytics platform dashboard, redacted for NDA.", aspect: "633 / 475" },
          { src: "/codete-04-pipelines.webp", alt: "Blurred screenshot of the data pipelines view, redacted for NDA.", aspect: "543 / 476" },
        ],
      },
    ],
  },
}
