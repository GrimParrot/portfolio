import { useEffect, useState } from "react"
import { Lightbulb, TrendingDown, BarChart2, Video, Users, Headphones, Star } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"

function CrossfadeImage({ images, interval }: { images: string[]; interval: number }) {
  const [index, setIndex] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const positions = ["center", "top"]

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length
      setNext(nextIndex)
      setAnimating(false)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimating(true)
        setTimeout(() => {
          setIndex(nextIndex)
          setNext(null)
          setAnimating(false)
        }, 650)
      }))
    }, interval)
    return () => clearInterval(timer)
  }, [index, images.length, interval])

  const fromRight = next !== null && next % 2 === 1

  return (
    <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={images[index]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: positions[index % positions.length], zIndex: 1 }}
      />
      {next !== null && (
        <img
          src={images[next]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: positions[next % positions.length],
            transform: animating ? "translateX(0)" : `translateX(${fromRight ? "100%" : "-100%"})`,
            transition: animating ? "transform 0.6s ease-in-out" : "none",
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-medium tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-slate-100 my-0" />
}

function Metric({ value, sub, color }: { value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-6">
      <p className="text-5xl font-black" style={{ color }}>{value}</p>
      <p className="text-slate-400 leading-snug">{sub}</p>
    </div>
  )
}


const copy = {
  pl: {
    h1: "Pozyskiwanie klientów — od dwóch osobnych narzędzi do jednego flow end-to-end",
    intro: "Obie funkcje — generowanie leadów i research widoczności — istniały w Localo osobno, były trudne w obsłudze i wymagały osobistego onboardingu przez zespół. Sales mode dodatkowo zmuszał użytkowników do pracy w zewnętrznych narzędziach: CRM, arkuszach kalkulacyjnych. Zaprojektowałam ",
    introProduct: "Client Acquisition",
    introSuffix: " — jedno narzędzie z dwoma modułami, które działają jako spójne, samowyjaśniające się flow, bez konieczności wychodzenia do zewnętrznych aplikacji.",
    roleLabel: "Moja rola",
    roleText: "Lead Product Designer: od discovery do handoffu. Badania użytkowników, hipotezy, architektura flow, ekrany, testy użyteczności. Zespół: PM, QA, copywriter, dev.",
    meta: [
      { label: "Produkt", value: "Localo" },
      { label: "Skala", value: "5 000+ użytkowników" },
      { label: "Branża", value: "Local SEO / B2B SaaS" },
      { label: "Użytkownicy", value: "Agencje SEO i freelancerzy" },
    ],
    s01: {
      tag: "01 — Efekty",
      h2: "Co się zmieniło po wdrożeniu",
      body: <><strong className="text-slate-700">Dwa osobne narzędzia</strong> — Research mode i Sales mode — zostały zastąpione <strong className="text-slate-700">jednym spójnym flow</strong> z dwoma modułami: Leads Finder i Visibility Scans. Użytkownik <strong className="text-slate-700">nie przeskakuje między trybami</strong>: wynik z jednego modułu naturalnie prowadzi do drugiego. Narzędzie jest <strong className="text-slate-700">samowyjaśniające się</strong> i nie wymaga zewnętrznych aplikacji do dokończenia zadania.</>,
      metrics: [
        { value: "↑ TBD", sub: "[Nazwa metryki, np. task completion rate]", color: "#1D9E75" },
        { value: "−28%", sub: "[Np. czas do pierwszego sukcesu]", color: "#1D9E75" },
        { value: "4.6 / 5", sub: "[Np. ocena w badaniu satysfakcji]", color: "#466AFA" },
      ],
      quote: `„Cytat od użytkownika lub stakeholdera po wdrożeniu — najlepiej konkrety, nie ogólniki.”`,
      quoteAttr: "— Rola / kontekst",
      lastPara: <>Funkcja weszła w skład wszystkich planów <strong className="text-slate-700">Pro i Enterprise</strong>, zwiększając postrzeganą wartość wyższych tierów i przekładając się na <strong className="text-slate-700">niższy churn</strong> wśród agencji obsługujących wielu klientów. Mierzyliśmy adopcję nowej funkcji oraz pośredni wpływ na <strong className="text-slate-700">wzrost liczby zarządzanych profili</strong> — kluczową metrykę dla przychodu platformy.</>,
    },
    s02: {
      tag: "02 — Discovery",
      h2: "Co pokazały badania",
      pullQuote: <>Choć funkcje są dostępne, ich złożoność wymusza{" "}<span className="font-black" style={{ color: "#466AFA" }}>ręczny onboarding</span>{" "}i wypycha użytkowników do{" "}<span className="font-black" style={{ color: "#466AFA" }}>narzędzi zewnętrznych</span>.{" "}Efekt: stracony czas, brak rezultatów i{" "}<span className="font-black" style={{ color: "#466AFA" }}>wysoki próg wejścia</span>{" "}ograniczający adopcję.</>,
      insightsH3: "Kluczowe insighty",
      insights: [
        { n: "1", title: "Brak ciągłości między modułami", desc: "Leady były w Sales mode, dane o widoczności — w Research. Między trybami nie przechodził żaden kontekst." },
        { n: "2", title: "Zewnętrzne narzędzia jako obejście", desc: "Statusy leadów — w arkuszu. Mapy Pozycji — w innej części produktu. Żeby dokończyć jedno zadanie, trzeba było wyjść z narzędzia kilka razy." },
        { n: "3", title: "Wysoka bariera wejścia bez wsparcia zespołu", desc: "Każdy nowy użytkownik potrzebował osobistego onboardingu od CS. Interfejs nie tłumaczył wartości ani kolejnych kroków samodzielnie." },
      ],
      methodsLabel: "Metody badawcze",
      methods: [
        { label: "Analiza ścieżek · funnel drop-off", icon: <TrendingDown className="w-3.5 h-3.5" /> },
        { label: "Dane ilościowe", icon: <BarChart2 className="w-3.5 h-3.5" /> },
        { label: "Nagrania sesji (Clarity)", icon: <Video className="w-3.5 h-3.5" /> },
        { label: "Wywiady z użytkownikami", icon: <Users className="w-3.5 h-3.5" /> },
        { label: "Dane z supportu", icon: <Headphones className="w-3.5 h-3.5" /> },
        { label: "Feedback Customer Success", icon: <Star className="w-3.5 h-3.5" /> },
      ],
    },
    s03: {
      tag: "03 — Proces",
      h2: "Od eksploracji do finalnego rozwiązania",
      body: "Razem z PM i zespołem określiliśmy precyzyjny zakres projektu — ujednolicone flow, mini-CRM, Visibility Scans przy leadzie, onboarding kontekstowy — i wyłączyliśmy ze scope'u wszystko, co mogłoby go rozlać, np. zmiany w sposobie dodawania keywordów. To pozwoliło utrzymać fokus i uniknąć scope creepu.",
      scopeCols: [
        { label: "W scope", inScope: true, items: ["System kredytowy", "Komunikacja wartości", "Widoczne połączenie między funkcjami", "Mikro-CRM w narzędziu"] },
        { label: "Poza scope", inScope: false, items: ["Zmiany w sposobie dodawania keywordów", "Historia", "Redesign pozostałych sekcji produktu"] },
      ],
      goalLabel: "Cel projektu",
      goalText: "Obniżenie bariery wejścia, eliminacja zewnętrznych narzędzi i zwiększenie skuteczności prospectingu — tak, żeby użytkownik mógł samodzielnie zrozumieć wartość funkcji, wdrożyć je i realnie przełożyć na deale.",
      flowH3: "Architektura flow",
      flowDesc: "Zmapowałam oba istniejące flow — Research i Sales — żeby zobaczyć gdzie się przecinają, gdzie użytkownik traci kontekst i gdzie leży luka. Okazało się, że oba pokrywały częściowo ten sam obszar, ale żadne nie domykało go w całości. To stało się podstawą do zaprojektowania nowej, połączonej architektury.",
      synthesisH3: "Synteza badań",
      synthesisDesc: "Połączyłam wnioski z nagrań sesji w Clarity, rozmów z supportem i wywiadów z użytkownikami. Wyodrębniłam największe pain pointy i powtarzające się wzorce zachowań, a następnie zmapowałam je na potencjalne kierunki projektowe — tak żeby decyzje o zakresie były zakorzenione w danych, nie w intuicji.",
      lofiH3: "Lo-fi wireframes",
      lofiDesc: "Wczesne eksploracje układu informacji — jak pokazać Growth Potential, status i akcje bez przeciążenia kognitywnego.",
    },
    s04: {
      tag: "04 — Rozwiązanie",
      h2: "Jeden flow — od odkrycia do onboardingu",
      intro: "Użytkownik zaczyna od Leads Finder — szuka firm w danej niszy i lokalizacji, buduje listę potencjalnych klientów. Gdy znajdzie interesującego leada, uruchamia Visibility Scan i sprawdza jego widoczność online. Wynik staje się konkretnym argumentem sprzedażowym i gotowym kontekstem do oferty lub cold maila. Cały proces — od pierwszego wyszukiwania do aktywacji klienta — w jednym miejscu.",
      steps: [
        { step: "01", title: "Generowanie listy leadów", desc: "Użytkownik wpisuje kategorię i lokalizację. System zwraca ~90 profili Google Business z kluczowymi danymi: brak WWW, liczba opinii, link do map. Kluczowa decyzja projektowa: żadnego pustego stanu — wynik natychmiast, bez konfiguracji i onboardingu.", img: "/modal.png", imgAlt: "Modal — generowanie listy leadów", reverse: false, fullWidth: true },
        { step: "02", title: "Growth Potential — jeden wskaźnik zamiast surowych danych", desc: "Zamiast 6 metryk do samodzielnej analizy — jeden zagregowany scoring. \"Hot lead\" (brak WWW + mało opinii) albo \"big opportunity\" widoczne od razu. Wyższy wynik = łatwiejszy klient do domknięcia i szybsze rezultaty. Zdjęłam z użytkownika obowiązek kalkulacji.", img: "/growth potential.png", imgAlt: "Growth Potential score", reverse: true },
        { step: "03", title: "Skan widoczności — kontekst przestrzenny leada", desc: "Jednym kliknięciem z poziomu leada użytkownik odpala Visibility Scan — sprawdza jak ta firma wypada pod kątem widoczności online. Wynik wraca jako gotowy argument sprzedażowy: konkretne słowa kluczowe, na których firma jest niewidoczna — materiał do rozmowy i cold maila.", img: "/pin map.png", imgAlt: "Visibility Scan — mapa z pinami", reverse: false },
        { step: "04", title: "Zarządzanie statusem leadów", desc: "Mini-CRM wbudowany bezpośrednio w produkt: statusy kontaktów, kanban, komentarze, historia i snapshot list. Użytkownik nie musi wychodzić do arkusza — wszystko w jednym miejscu. Bezpośrednia odpowiedź na spreadsheet jako równoległy system.", img: "/status.png", imgAlt: "Status leadów i komentarze", reverse: true },
        { step: "05", title: "Pogłębiona analiza — kolejne Visibility Scans", desc: "Użytkownik może generować kolejne skany dla dodatkowych słów kluczowych — każdy wynik wzbogaca kontekst oferty. Dane z Visibility Scans wracają bezpośrednio do profilu leada: wynik skanu, słabe keywordy, pozycja na tle konkurencji. Gotowy materiał do rozmowy, bez ręcznego przepisywania.", img: "/visibility scans.png", imgAlt: "Visibility Scans", reverse: false, fullWidthTextTop: true },
        { step: "06", title: "Aktywacja klienta — onboarding w jednym kliknięciu", desc: "Kiedy klient mówi tak — aktywacja profilu jednym kliknięciem, bez wychodzenia z widoku i bez ręcznego przepisywania danych. Zamknięcie pełnej pętli akwizycji w tym samym narzędziu: od leada do pierwszego dnia współpracy.", img: "/confirmation.png", imgAlt: "Aktywacja profilu", reverse: false, contain: true },
      ],
      rejectedTag: "Odrzucone kierunki",
      rejected: [
        { title: "Research + Sales jako osobne tryby", reason: "logicznie czyste, ale wymuszało mentalne przełączanie; użytkownik szuka i sprzedaje jednocześnie, nie sekwencyjnie" },
        { title: "Surowe metryki zamiast Growth Potential score", reason: "przerzucało na użytkownika obliczenie \"czy warto\", wymagało wiedzy eksperckiej" },
        { title: "Position Map w osobnej sekcji produktu", reason: "przerywało flow i powodowało drop-off; użytkownicy nie wracali do listy leadów" },
        { title: "Widok listy projektów w Leads Finder", reason: "użytkownicy łatwiej nawigowali między kampaniami w widoku kafli niż na liście" },
      ],
    },
    s05: {
      tag: "05 — Czego się nauczyłam",
      h2: "Co bym zrobiła inaczej",
      intro: "Projekt był złożony — dwa moduły, system kredytowy, onboarding kontekstowy i migracja danych w jednym zakresie. Kilka rzeczy zrobiłabym dziś inaczej.",
      items: [
        { title: "Przetestować Growth Potential score wcześniej", desc: "Algorytm jest kluczowy dla decyzji użytkownika — scoring decyduje o tym, czy ktoś w ogóle zaczyna rozmowę sprzedażową. Chciałabym więcej iteracji na samej formule zanim weszła do produktu." },
        { title: "Wcześniej zaangażować dział developmentu", desc: "Devów zaangażowałam za późno — a to właśnie w rozmowie z nimi dowiedziałam się o danych legacy, które trzeba było obsłużyć w nowym flow. Na przyszłość: wciągam tech do projektu wcześniej." },
        { title: "Więcej czasu na Design QA", desc: "Chciałabym poświęcić więcej czasu na wyłapanie odchyłek wdrożenia od designu. Drobne rozbieżności kumulują się i wpływają na spójność końcowego produktu." },
      ],
    },
  },
  en: {
    h1: "Client Acquisition — from two separate tools into one end-to-end flow",
    intro: "Both features — lead generation and visibility research — existed in Localo as separate, hard-to-use tools requiring personal onboarding by the team. Sales mode also forced users to work in external tools: CRMs and spreadsheets. I designed ",
    introProduct: "Client Acquisition",
    introSuffix: " — one tool with two modules working as a coherent, self-explanatory flow, without needing to leave to external apps.",
    roleLabel: "My role",
    roleText: "Lead Product Designer: from discovery to handoff. User research, hypotheses, flow architecture, screens, usability tests. Team: PM, QA, copywriter, dev.",
    meta: [
      { label: "Product", value: "Localo" },
      { label: "Scale", value: "5,000+ users" },
      { label: "Industry", value: "Local SEO / B2B SaaS" },
      { label: "Users", value: "SEO agencies & freelancers" },
    ],
    s01: {
      tag: "01 — Results",
      h2: "What changed after launch",
      body: <><strong className="text-slate-700">Two separate tools</strong> — Research mode and Sales mode — were replaced by <strong className="text-slate-700">one coherent flow</strong> with two modules: Leads Finder and Visibility Scans. The user <strong className="text-slate-700">doesn't jump between modes</strong>: the output of one module naturally leads to the next. The tool is <strong className="text-slate-700">self-explanatory</strong> and doesn't require external apps to complete a task.</>,
      metrics: [
        { value: "↑ TBD", sub: "[Metric name, e.g. task completion rate]", color: "#1D9E75" },
        { value: "−28%", sub: "[E.g. time to first success]", color: "#1D9E75" },
        { value: "4.6 / 5", sub: "[E.g. satisfaction survey score]", color: "#466AFA" },
      ],
      quote: "\"A quote from a user or stakeholder after launch — specifics, not generalities.\"",
      quoteAttr: "— Role / context",
      lastPara: <>The feature was included in all <strong className="text-slate-700">Pro and Enterprise</strong> plans, increasing the perceived value of higher tiers and contributing to <strong className="text-slate-700">lower churn</strong> among agencies managing multiple clients. We measured adoption of the new feature and the indirect impact on <strong className="text-slate-700">growth in managed profiles</strong> — a key revenue metric for the platform.</>,
    },
    s02: {
      tag: "02 — Discovery",
      h2: "What the research revealed",
      pullQuote: <>Although the features exist, their complexity forces{" "}<span className="font-black" style={{ color: "#466AFA" }}>manual onboarding</span>{" "}and pushes users to{" "}<span className="font-black" style={{ color: "#466AFA" }}>external tools</span>.{" "}The result: wasted time, no results, and a{" "}<span className="font-black" style={{ color: "#466AFA" }}>high entry barrier</span>{" "}limiting adoption.</>,
      insightsH3: "Key insights",
      insights: [
        { n: "1", title: "No continuity between modules", desc: "Leads were in Sales mode, visibility data — in Research. No context passed between modes." },
        { n: "2", title: "External tools as a workaround", desc: "Lead statuses — in a spreadsheet. Position Maps — in another part of the product. To finish one task, you had to leave the tool several times." },
        { n: "3", title: "High entry barrier without team support", desc: "Every new user needed personal onboarding from CS. The interface didn't explain value or next steps on its own." },
      ],
      methodsLabel: "Research methods",
      methods: [
        { label: "Path analysis · funnel drop-off", icon: <TrendingDown className="w-3.5 h-3.5" /> },
        { label: "Quantitative data", icon: <BarChart2 className="w-3.5 h-3.5" /> },
        { label: "Session recordings (Clarity)", icon: <Video className="w-3.5 h-3.5" /> },
        { label: "User interviews", icon: <Users className="w-3.5 h-3.5" /> },
        { label: "Support data", icon: <Headphones className="w-3.5 h-3.5" /> },
        { label: "Customer Success feedback", icon: <Star className="w-3.5 h-3.5" /> },
      ],
    },
    s03: {
      tag: "03 — Process",
      h2: "From exploration to the final solution",
      body: "Together with the PM and team we defined the precise project scope — unified flow, mini-CRM, Visibility Scans within a lead, contextual onboarding — and excluded everything that could cause scope creep, e.g. changes to keyword management. This kept us focused and prevented scope creep.",
      scopeCols: [
        { label: "In scope", inScope: true, items: ["Credit system", "Value communication", "Visible connection between features", "Micro-CRM in the tool"] },
        { label: "Out of scope", inScope: false, items: ["Changes to keyword management", "History", "Redesign of other product sections"] },
      ],
      goalLabel: "Project goal",
      goalText: "Lowering the entry barrier, eliminating external tools and increasing prospecting effectiveness — so the user can independently understand the feature's value, implement it, and actually translate it into deals.",
      flowH3: "Flow architecture",
      flowDesc: "I mapped both existing flows — Research and Sales — to see where they intersect, where the user loses context, and where the gap lies. It turned out both partially covered the same area, but neither closed it completely. This became the basis for designing the new, unified architecture.",
      synthesisH3: "Research synthesis",
      synthesisDesc: "I combined insights from Clarity session recordings, support conversations and user interviews. I extracted the biggest pain points and recurring behavioral patterns, then mapped them to potential design directions — so scope decisions were grounded in data, not intuition.",
      lofiH3: "Lo-fi wireframes",
      lofiDesc: "Early explorations of the information layout — how to show Growth Potential, status and actions without cognitive overload.",
    },
    s04: {
      tag: "04 — Solution",
      h2: "One flow — from discovery to onboarding",
      intro: "The user starts with Leads Finder — searching for businesses in a given niche and location, building a list of potential clients. When they find an interesting lead, they trigger a Visibility Scan and check the business's online visibility. The result becomes a concrete sales argument and ready context for a proposal or cold email. The entire process — from the first search to client activation — in one place.",
      steps: [
        { step: "01", title: "Generating the leads list", desc: "The user enters a category and location. The system returns ~90 Google Business profiles with key data: no website, review count, maps link. Key design decision: no empty state — results immediately, no configuration or onboarding required.", img: "/modal.png", imgAlt: "Modal — lead list generation", reverse: false, fullWidth: true },
        { step: "02", title: "Growth Potential — one indicator instead of raw data", desc: "Instead of 6 metrics to analyze independently — one aggregated score. \"Hot lead\" (no website + few reviews) or \"big opportunity\" visible immediately. Higher score = easier client to close and faster results. I removed the obligation to calculate from the user.", img: "/growth potential.png", imgAlt: "Growth Potential score", reverse: true },
        { step: "03", title: "Visibility scan — the lead's spatial context", desc: "One click from the lead, the user triggers a Visibility Scan — checking how this business performs in terms of online visibility. The result comes back as a ready sales argument: specific keywords where the business is invisible — material for a conversation and cold email.", img: "/pin map.png", imgAlt: "Visibility Scan — pin map", reverse: false },
        { step: "04", title: "Lead status management", desc: "Mini-CRM built directly into the product: contact statuses, kanban, comments, history and list snapshots. The user doesn't need to go to a spreadsheet — everything in one place. Direct response to the spreadsheet as a parallel system.", img: "/status.png", imgAlt: "Lead status and comments", reverse: true },
        { step: "05", title: "In-depth analysis — additional Visibility Scans", desc: "The user can generate additional scans for more keywords — each result enriches the context of the offer. Data from Visibility Scans returns directly to the lead's profile: scan result, weak keywords, position vs. competition. Ready material for a conversation, without manual copy-pasting.", img: "/visibility scans.png", imgAlt: "Visibility Scans", reverse: false, fullWidthTextTop: true },
        { step: "06", title: "Client activation — onboarding in one click", desc: "When the client says yes — profile activation in one click, without leaving the view and without manually re-entering data. Closing the full acquisition loop in the same tool: from lead to day one of cooperation.", img: "/confirmation.png", imgAlt: "Profile activation", reverse: false, contain: true },
      ],
      rejectedTag: "Rejected directions",
      rejected: [
        { title: "Research + Sales as separate modes", reason: "logically clean, but forced mental switching; the user searches and sells simultaneously, not sequentially" },
        { title: "Raw metrics instead of Growth Potential score", reason: "shifted the calculation of 'is it worth it' onto the user, required expert knowledge" },
        { title: "Position Map in a separate product section", reason: "interrupted the flow and caused drop-off; users didn't return to the leads list" },
        { title: "Project list view in Leads Finder", reason: "users navigated between campaigns more easily in tile view than in list view" },
      ],
    },
    s05: {
      tag: "05 — What I learned",
      h2: "What I would do differently",
      intro: "The project was complex — two modules, a credit system, contextual onboarding and data migration in one scope. A few things I would do differently today.",
      items: [
        { title: "Test the Growth Potential score earlier", desc: "The algorithm is crucial to the user's decision — the score determines whether someone even starts a sales conversation. I'd want more iterations on the formula itself before it went into the product." },
        { title: "Involve the development team earlier", desc: "I engaged the devs too late — it was in conversation with them that I learned about legacy data that needed to be handled in the new flow. Going forward: I bring tech into the project earlier." },
        { title: "More time for Design QA", desc: "I'd like to dedicate more time to catching deviations of the implementation from the design. Small discrepancies accumulate and affect the consistency of the final product." },
      ],
    },
  },
}

const PRIMARY = "#466AFA"

export function LocaloCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/localo" />
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            {t.h1}
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-amber-500 text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-8">
            {t.intro}<strong className="text-slate-700">{t.introProduct}</strong>{t.introSuffix}
          </p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#EEF2FF" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
            <p style={{ color: PRIMARY }}>
              <strong className="font-semibold">{t.roleLabel}</strong> — {t.roleText}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {t.meta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/Sales mode.png" alt="Client Acquisition — main view" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── 01 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-4">{t.s01.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s01.body}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.s01.metrics.map((m) => (
              <Metric key={m.sub} value={m.value} sub={m.sub} color={m.color} />
            ))}
          </div>

          <div className="mt-12 mb-12 pl-6 border-l-2 border-slate-200">
            <p className="text-slate-700 leading-relaxed italic">{t.s01.quote}</p>
            <p className="text-[13px] text-slate-400 mt-3">{t.s01.quoteAttr}</p>
          </div>
          <p className="text-slate-500 leading-relaxed">{t.s01.lastPara}</p>
        </div>

        <Divider />

        {/* ── 02 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <p className="font-light text-[#0F172A] mt-4 mb-12 pl-6 border-l-4" style={{ fontSize: "32px", lineHeight: 1.4, borderColor: PRIMARY }}>
            {t.s02.pullQuote}
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">{t.s02.insightsH3}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.s02.insights.map((item) => (
              <div key={item.n} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: "#F97316" }} />
                <p className="font-semibold text-slate-900 mt-3 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Tag>{t.s02.methodsLabel}</Tag>
            <div className="flex flex-wrap gap-3 mt-3">
              {t.s02.methods.map((m) => (
                <span key={m.label} className="flex items-center gap-1.5 text-slate-600 border border-slate-200 rounded-full px-3 py-1.5 [&>svg]:text-[#466AFA]">
                  {m.icon}{m.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 03 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">{t.s03.h2}</h2>

          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-6">
              <p className="text-slate-500 leading-relaxed">{t.s03.body}</p>
              <div className="border border-slate-200 rounded-xl p-5 grid grid-cols-2 gap-6">
                {t.s03.scopeCols.map((col) => (
                  <div key={col.label}>
                    <p className="text-[13px] font-medium tracking-widest uppercase text-slate-400 mb-3">{col.label}</p>
                    <ul className="flex flex-col gap-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2 text-slate-500 text-[13px]">
                          <span className="flex-shrink-0 font-bold text-[13px]" style={{ color: col.inScope ? "#22c55e" : "#ef4444" }}>
                            {col.inScope ? "✓" : "✕"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 items-start rounded-lg px-6 py-5 mt-6" style={{ background: "#EEF2FF" }}>
              <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
              <p style={{ color: PRIMARY }}>
                <strong className="font-semibold">{t.s03.goalLabel}</strong> — {t.s03.goalText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 md:[&>*:first-child]:order-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.flowH3}</h3>
              <p className="text-slate-500 leading-relaxed">{t.s03.flowDesc}</p>
            </div>
            <img src="/flow.png" alt="User flow — Client Acquisition" className="w-full rounded-2xl border border-slate-200" />
          </div>

          <div className="mt-16 mb-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.synthesisH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.synthesisDesc}</p>
            <img src="/summary.png" alt="Research synthesis" className="w-full rounded-2xl border border-slate-200" />
          </div>

          <div className="mt-16 mb-8">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.lofiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.lofiDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <img src="/content.png" alt="Lo-fi — Content" className="w-full rounded-2xl border border-slate-200" />
              <img src="/content-1.png" alt="Lo-fi — Content 1" className="w-full rounded-2xl border border-slate-200" />
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 04 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s04.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-6">{t.s04.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>

          {t.s04.steps.map((feature, i) => (
            "fullWidthTextTop" in feature && feature.fullWidthTextTop ? (
              <div key={i} className="mb-16">
                <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{feature.desc}</p>
                <img src={feature.img} alt={feature.title} className="w-full rounded-2xl border border-slate-200 object-cover" />
              </div>
            ) : "fullWidth" in feature && feature.fullWidth ? (
              <div key={i} className="mb-16">
                <CrossfadeImage images={["/modal.png", "/lead list.png"]} interval={2000} />
                <span className="text-[13px] font-medium tracking-widest uppercase mt-8 mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ) : (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${feature.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
                <img src={feature.img} alt={feature.imgAlt} className={`w-full rounded-2xl border border-slate-200 ${"contain" in feature && feature.contain ? "object-contain bg-secondary" : "object-cover"}`} style={"contain" in feature && feature.contain ? {} : { aspectRatio: "16/9" }} />
              </div>
            )
          ))}

          <div className="border-t border-slate-100 pt-8">
            <Tag color="#64748b">{t.s04.rejectedTag}</Tag>
            <div className="flex flex-col gap-3 mt-4">
              {t.s04.rejected.map((r) => (
                <div key={r.title} className="flex gap-3 items-start bg-red-50 rounded-lg px-6 py-5">
                  <span className="text-red-400 font-medium flex-shrink-0">✕</span>
                  <p className="text-red-900 text-[15px]">
                    <strong className="font-semibold">{r.title}</strong> — {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 05 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s05.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-4">{t.s05.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s05.intro}</p>
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100">
            {t.s05.items.map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold mb-1 text-slate-900">{item.title}</p>
                  <p className="leading-relaxed text-[15px] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NextProject currentHref="/case-study/localo" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
