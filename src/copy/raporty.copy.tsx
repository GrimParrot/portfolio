import { BarChart2, FileText, Users, TrendingUp } from "lucide-react"

function NumBadge({ n }: { n: number }) {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 rounded-full font-bold text-white"
      style={{ width: 20, height: 20, fontSize: 12, backgroundColor: "#466AFA", verticalAlign: -4 }}
    >
      {n}
    </span>
  )
}

export const copy = {
  pl: {
    h1: "Automatyzacja, która robi raport za specjalistę",
    intro: "Specjaliści tracili godziny na ręczne składanie raportów z danych rozproszonych po kilku narzędziach, a finalny efekt i tak wymagał telefonicznego tłumaczenia, co oznaczają liczby. Nowa funkcja automatycznie generuje i wysyła raporty z działań na wizytówce — zmiany pozycji, opublikowane posty, dodane zdjęcia, wyprzedzona konkurencja. Dziś to automatyzacja, której zaufało 60% użytkowników funkcji, oddając jej pełną wysyłkę raportów do klientów.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Rola",
    roleText: "Lead Product Designer: od discovery do handoffu. Badania użytkowników, hipotezy, architektura flow, ekrany, testy użyteczności. Zespół: PM, QA, copywriter, dev.",
    meta: [
      { label: "Produkt", value: "Localo" },
      { label: "Skala", value: "8 600+ użytkowników" },
      { label: "Branża", value: "Local SEO / B2B SaaS" },
      { label: "Użytkownicy", value: "Specjaliści SEO i agencje" },
    ],
    s01: {
      tag: "01 — Kontekst i wpływ",
      h2: "Co się stało po wdrożeniu",
      body: <>Specjaliści SEO potrzebowali prostego, elastycznego narzędzia do tworzenia raportów, które umożliwiałoby <strong style={{ color: "#0F172A" }}>jasne, spersonalizowane i kontekstowe prezentowanie wyników działań</strong> <strong style={{ color: "#0F172A" }}>nietechnicznym klientom.</strong> Raporty musiały pozwalać na łatwy wybór danych, porównywanie ich w czasie, unikanie nieporozumień wynikających z błędnej interpretacji oraz oferować możliwość <strong style={{ color: "#0F172A" }}>automatycznej wysyłki</strong> — tak, by ograniczyć liczbę pytań i <strong style={{ color: "#0F172A" }}>wzmocnić zaufanie do współpracy.</strong></>,
      metrics: [
        { num: "12%", caption: "użytkowników MAU tworzy raport co miesiąc", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "wyższe Blended LTV vs. reszta bazy", color: "#0ABA53", icon: "users" },
        { num: "~11×", caption: "częściej płacą niż reszta bazy. To najsilniejszy sygnał wartości zmierzony do tej pory.", color: "#0ABA53", icon: "chart" },
      ],
      quote: <>Tutaj widać spore zainteresowanie i zaangażowanie. Są klienci, którzy <strong style={{ color: "#466AFA", fontWeight: 800 }}>płacą tylko za to.</strong> Ta funkcja rozwiązała problem użytkowników, co zmniejszyło <strong style={{ color: "#466AFA", fontWeight: 800 }}>tarcie i churn.</strong></>,
      lastPara: <><strong style={{ color: "#0F172A", fontWeight: 800 }}>60% użytkowników włączyło auto-wysyłkę</strong>, a 44% korzysta wyłącznie z niej — nigdy nie wysyła raportów ręcznie. To pokazuje duże zaufanie do procesu i realne odciążenie od powtarzalnej, czasochłonnej czynności.</>,
    },
    s02: {
      tag: "02 — Odkrycia",
      h2: "Co pokazały badania",
      pullQuote: <>Specjaliści spędzali godziny na <strong style={{ color: "#466AFA", fontWeight: 800 }}>ręcznym składaniu raportów</strong> — a potem na <strong style={{ color: "#466AFA", fontWeight: 800 }}>tłumaczeniu tego</strong>, czego nietechniczny klient i tak nie potrafił wyczytać sam.</>,
      insightsH3: "Kluczowe spostrzeżenia",
      insights: [
        { n: 1, title: "Raporty są skanowane, nie analizowane", desc: "Klienci końcowi nie mają czasu analizować liczb. Raport przeglądany jest wzrokowo." },
        { n: 2, title: "Ręczna selekcja danych to codzienne tarcie", desc: "Dane zbierane ręcznie z wielu narzędzi i składane w jedną prezentację — żmudny proces, powtarzający się co miesiąc." },
        { n: 3, title: "Brak automatyzacji", desc: "Składanie raportu zajmowało godziny. Użytkownicy mówili wprost, że to uciążliwe i chętnie by to oddelegowali." },
        { n: 4, title: "Potrzeba edukacji klienta", desc: "Do raportów często dołączano osobne wyjaśnienia — czym są dane i dlaczego mają znaczenie dla klienta." },
      ],
      methodsLabel: "Metody badawcze",
      methods: [
        { icon: <Users size={14} />, label: "Wywiady z użytkownikami" },
        { icon: <FileText size={14} />, label: "Ankieta" },
        { icon: <TrendingUp size={14} />, label: "Feedback Customer Success" },
        { icon: <BarChart2 size={14} />, label: "Analiza konkurencji" },
      ],
    },
    s03: {
      tag: "03 — Proces",
      h2: "Od eksploracji po zmianę kierunku",
      intro: "Projekt wystartował z konkretną hipotezą PM-a — inną funkcjonalnością, uznaną wtedy za odpowiedź na problem. Zanim przeszliśmy do projektowania, chciałam sprawdzić, czy to faktycznie adresuje największy pain point użytkowników — i dostałam zielone światło na przeprowadzenie wywiadów pogłębionych.",
      steps: [
        {
          n: 1,
          title: "Synteza badań",
          desc: "Zebrałam wnioski z wywiadów pogłębionych, ankiet i analizy konkurencji w jedno spójne podsumowanie. Na tej podstawie powstały pierwsze user stories. Problem okazał się głębszy, niż zakładano — pierwotny pomysł zaadresowałby go jedynie powierzchownie.",
          visual: "pivot",
        },
        {
          n: 2,
          title: "Profil klienta końcowego (odbiorcy raportów)",
          desc: "Zwykle projektujemy pod persony naszych użytkowników. Tutaj musieliśmy wziąć pod uwagę jeszcze kogoś: klienta końcowego agencji, odbiorcę raportu. Z wywiadów ze specjalistami zbudowaliśmy profil tej drugiej osoby — i to właśnie ona, a nie nasz standardowy użytkownik, ostatecznie zdecydowała o kształcie raportu.",
          visual: "profile",
        },
        {
          n: 3,
          title: "Zakres projektu",
          desc: "Ustaliliśmy, co chcemy zrobić, a co zdecydowanie nie — dzięki temu mieliśmy pełny focus na tym, co miało największe znaczenie. Świadomie odpuściliśmy rzeczy typu edytor styli w mailu — bo to nie tam była dźwignia.",
          visual: "scope",
        },
        {
          n: 4,
          title: "Pierwszy flow i prototyp",
          desc: "Powstało pierwsze user flow, drafty i prototyp, przetestowany w kilku sesjach z użytkownikami. Zaangażowałam też development i QA — ich techniczne spojrzenie pozwoliło już na tym etapie przewidzieć trudności i szybko je zaadresować.",
          visual: "flow",
        },
        {
          n: 5,
          title: "Poprawki, wdrożenie i obserwacja efektów",
          desc: "Przeanalizowałam feedback od użytkowników i Customer Success i naniosłam potrzebne poprawki po testach. Projekt trafił do wdrożenia z gotową dokumentacją, opisami, ekranami i komponentami w Figmie — przeprowadziłam design QA, nadzorowałam wdrożenie i na bieżąco obserwowałam, jak nowa funkcjonalność zostaje przyjęta przez użytkowników.",
        },
      ],
      devWarningLabel: "Ograniczenia techniczne",
      devWarningText: "Raport wbudowany w mail musiał mieć bardzo prosty layout ze względu na różnice w renderowaniu HTML przez klienty pocztowe. Razem z devami zminimalizowaliśmy też ryzyko trafiania cyklicznych wysyłek do spamu — m.in. przez autoryzację nadawcy i ograniczenie treści promocyjnej.",
      pivotLabel: "Zmiana kierunku",
      pivotText: <>Zdecydowaliśmy się <strong style={{ fontWeight: 800 }}>zmienić kierunek projektu</strong> i <strong style={{ fontWeight: 800 }}>zdefiniowaliśmy problem statement na nowo</strong>, tak by cały zespół patrzył na projekt przez te same kryteria. Naszym celem stało się zmienienie ręcznego, czasochłonnego procesu składania raportu w <strong style={{ fontWeight: 800 }}>jeden spójny, zautomatyzowany flow</strong> — od danych do gotowego raportu dostarczonego do klienta.</>,
      scopeCols: [
        { label: "W zakresie",    inScope: true,  items: ["Kreator raportu z AI", "Auto-raportowanie", "Link bez logowania", "Widok workspace"] },
        { label: "Poza zakresem", inScope: false, items: ["Plany wyłącznie publikacyjne", "Integracje zewnętrzne"] },
      ],
      profileBoxes: [
        {
          icon: "target",
          title: "Cele",
          color: "green",
          tags: ["Prosty wniosek", "Bez technicznej analizy", "Szybka odpowiedź", "Nastawienie na efekt"],
        },
        {
          icon: "warning",
          title: "Pain pointy",
          color: "blue",
          tags: ["Przytłoczenie danymi", "Zabiegany", "Nietechniczny", "Frustracja przy wysiłku"],
        },
        {
          icon: "trending",
          title: "Zachowania",
          color: "orange",
          tags: ["Wzrokowiec", "Szuka podsumowania", "Nie czyta całości", "Rzadko wgłębia się w szczegóły"],
        },
      ],
    },
    s04: {
      tag: "04 — Rozwiązanie",
      h2: "Raporty, które robią się same",
      intro: "",
      steps: [
        {
          title: "Lista raportów",
          desc: "Cała historia raportów w jednym miejscu. Status, sposób wysyłki i data następnego automatycznego raportu widoczne od razu przy każdym wpisie — bez wchodzenia w środek, żeby porównać wyniki w czasie.",
          img: "/raporty-lista.png",
          imgAlt: "Lista raportów",
          reverse: false,
          stack: true,
        },
        {
          title: "Auto-raportowanie",
          desc: "Automatyzacja włączona domyślnie - każda wizytówka ma z góry ustawiony harmonogram (zakres dat i częstotliwość), który można zmienić w dowolnym momencie. Wyłączenie automatyzacji to wyjątek, nie punkt startowy.",
          img: "/raporty-auto.png",
          imgAlt: "Auto-raportowanie",
          reverse: false,
        },
        {
          title: "Raport na żądanie, bez ruszania harmonogramu",
          desc: "Gdy klient pyta o konkretny okres, specjalista generuje dodatkowy raport z dowolnym zakresem dat — harmonogram automatyczny zostaje nietknięty.",
          img: "/raporty-instant.png",
          imgAlt: "Raport na żądanie",
          reverse: true,
        },
        {
          title: "Reports manager",
          desc: <>Jeden widok na wszystkie profile klientów. <NumBadge n={1} /> Filtrowanie po statusie i częstotliwości oraz <NumBadge n={2} /> akcje zbiorcze — dla specjalisty zarządzającego dziesiątkami wizytówek to różnica między klikaniem w każdą z osobna a jedną akcją na wszystkich. Przy każdym profilu widać też <NumBadge n={3} /> dwa ostatnie raporty razem z datą kolejnego automatycznego, a obok — <NumBadge n={4} /> status i jaką metodą zostały wysłane.</>,
          img: "/raporty-manager.png",
          imgAlt: "Reports manager",
          reverse: false,
          stack: true,
        },
        {
          title: "Edytor raportu",
          desc: "Gotowy szkic zamiast pustego formularza. Specjalista dostaje kompletny raport automatycznie — włącza i wyłącza sekcje, dopasowuje ustawienia, nigdy nie zaczyna od zera.",
          visual: "sidebarSwap",
          stack: true,
        },
        {
          title: "Gotowy raport (desktop + mobile)",
          desc: "Raport wbudowany w mail musiał mieć bardzo prosty layout — HTML renderuje się inaczej w każdym kliencie pocztowym, więc razem z devami ograniczyliśmy go do elementów, które wyglądają tak samo wszędzie, i zminimalizowaliśmy ryzyko, że cykliczna wysyłka wyląduje w spamie. Ta sama prostota działa na korzyść treści: raport pokazuje „było – jest”. Przy trudniejszych sekcjach dokładamy krótką notkę edukacyjną dla klienta końcowego, którą specjalista włącza i wyłącza w dowolnym momencie — np. na start współpracy, żeby klient złapał kontekst, a potem ją wyłącza, gdy nie jest już potrzebna.",
          visual: "autoScrollReport",
          stack: true,
        },
        {
          title: "Ustawienia maila",
          desc: "Własny adres wysyłki i reply-to ustawia się raz — każdy kolejny raport, ręczny czy automatyczny, wygląda jakby wysłał go sam specjalista.",
          img: "/raporty-email.png",
          imgAlt: "Ustawienia maila",
          reverse: false,
          imgFit: "cover",
        },
        {
          title: "Trzy sposoby dostarczenia, jeden ekran",
          desc: "Auto-raportowanie (60% adopcji, 44% wyłącznie auto) wysyła raport cyklicznie prosto do skrzynki klienta i specjalisty. Alternatywnie: link bez konieczności logowania lub PDF, do wysłania w dowolnym momencie.",
          img: "/raporty-share.png",
          imgAlt: "Trzy sposoby dostarczenia",
          reverse: true,
          imgFit: "cover",
        },
      ],
      rejectedTag: "Odrzucone kierunki",
      rejected: [
        { title: "Wymóg logowania klienta do obejrzenia raportu", reason: "dodatkowe tarcie dla odbiorcy, który i tak chce tylko rzucić okiem, nie zalogować się do narzędzia specjalisty." },
        { title: "Wykresy i surowe metryki jako domyślna forma prezentacji", reason: "klienci nietechniczni ich nie czytali; potrzebna była narracja 'było – jest', nie dane do analizy." },
      ],
    },
    s05: {
      tag: "05 — Wnioski",
      h2: "Czego się nauczyłam",
      intro: "",
      items: [
        { title: "Warto drążyć, nawet jeśli pierwsze rozwiązanie wygląda świetnie", desc: "Dodatkowy tydzień badań przyniósł zwrot w stronę dużo pewniejszej funkcji." },
        { title: "Ograniczenia maila trzeba projektować od początku", desc: "Layout musi renderować się przewidywalnie w różnych klientach pocztowych i nie generować problemów z wysyłką." },
        { title: "Funkcjonalność nie musi być przełomowa", desc: "Automatyzacja uciążliwej czynności to ogromny pain-killer. Warto szukać kolejnych miejsc do automatyzacji." },
      ],
    },
  },
  en: {
    h1: "Turning SEO data into reports that non-technical clients actually read",
    intro: "This project introduced the ",
    introProduct: "Report Builder",
    introSuffix: " powered by AI — the specialist selects a period, AI prepares a draft report and suggests data with visible trends, and the specialist just edits and finalises. Reports are simplified to colours, trend arrows and a 'before – after – what changed' narrative, delivered as a login-free link or embedded directly in an email — sent manually or fully automatically.",
    roleLabel: "Role",
    roleText: "Lead product designer — research, information architecture, UI design, usability testing.",
    meta: [
      { label: "Product", value: "Localo" },
      { label: "Scale", value: "8,600+ affected users" },
      { label: "Industry", value: "Local SEO / B2B SaaS" },
      { label: "Users", value: "SEO specialists & agencies" },
    ],
    s01: {
      tag: "01 — Context & Impact",
      h2: "",
      body: "Available on all paid plans and packages (single and multi-listing) — both in single listing view and at workspace level for managing reporting across an entire profile portfolio.",
      metrics: [
        { num: "~11–13%", caption: "of MAU users create a report monthly,", color: "#0ABA53", icon: "trending" },
        { num: "60%", caption: "Auto-reporting adoption — of report users enabled auto-send; 44% use only auto, never manual", color: "#0ABA53", icon: "chart" },
        { num: "20×", caption: "Total LTV vs. rest of base — $171.24 vs. $8.60 average LTV of all users", color: "#0ABA53", icon: "users" },
      ],
      quote: "Strong engagement here. Some clients pay just for this. It solved a real user problem — reduced friction and churn.",
      lastPara: "Report users also pay ~11× more often than the rest of the base (35.9% vs. 3.3%). This is correlation, not causation — reports (especially auto) are the domain of already-engaged agencies — but the strongest value signal measured so far, stronger than Client Acquisition (28% / $150).",
    },
    s02: {
      tag: "02 — Discovery",
      h2: "What the research showed",
      pullQuote: <>Specialists spent hours <strong style={{ color: "#466AFA" }}>manually compiling reports</strong> — then <strong style={{ color: "#466AFA" }}>explained by phone</strong> what the non-technical client couldn't read anyway.</>,
      insightsH3: "Key insights",
      insights: [
        { n: 1, title: "Reports are scanned, not analysed", desc: "Nearly all respondents: end clients are non-technical, they don't have the time or inclination to analyse numbers and charts. Reports are reviewed visually — colour and an arrow are enough." },
        { n: 2, title: "Manual data selection is daily friction", desc: "Before every send, specialists manually unchecked redundant phrases and metrics — risking missing an important trend or overwhelming the client with data irrelevant to them." },
        { n: 3, title: "Lack of automation eroded trust in the collaboration", desc: "Without a cyclical, automated send, reports reached the client irregularly — which increased questions about results and reduced their sense of control over what was happening." },
      ],
      methodsLabel: "Research methods",
      methods: [
        { icon: <Users size={14} />, label: "User interviews" },
        { icon: <BarChart2 size={14} />, label: "Quantitative data — usage & revenue" },
        { icon: <TrendingUp size={14} />, label: "Conversion & LTV analysis" },
        { icon: <FileText size={14} />, label: "Post-launch survey" },
      ],
    },
    s03: {
      tag: "03 — Process",
      h2: "From exploration to final solution",
      body: "Mapping the full report builder flow — from period selection to finalisation and sending — as a basis for designing an AI assistant that generates a report draft instead of an empty form.",
      scopeCols: [
        { label: "In scope",     inScope: true,  items: ["AI report builder", "Auto-reporting", "Login-free link", "Workspace view"] },
        { label: "Out of scope", inScope: false, items: ["Publish-only plans", "External integrations"] },
      ],
      goalLabel: "Goal",
      goalText: "Turn the manual, time-consuming report-building process into one cohesive flow — from data to a finished client report.",
      flowH3: "User flow — report builder",
      flowDesc: "Select period → AI suggests trending data → specialist edits → finalise → send manually or automatically.",
      synthesisH3: "Research synthesis",
      synthesisDesc: "Combining specialist interviews with quantitative data (usage, conversion, LTV) into one view — the profile of the non-technical end client as the main reference point for every design decision.",
      lofiH3: "Early explorations",
      lofiDesc: "How to show data selection, trends and time comparisons without overwhelming the specialist with options. Key change after usability tests: simplifying the phrase selection view and introducing default AI suggestions.",
    },
    s04: {
      tag: "04 — Solution",
      h2: "From raw metrics to a story the client grasps in seconds",
      intro: "Client Reports combines period selection, AI suggestions, data selection and sending (manual or automatic) in one place — no export to an external spreadsheet.",
      steps: [
        {
          step: "Step 01",
          title: "Builder as an intelligent assistant, not an empty form",
          desc: "AI selects data with visible trends — e.g. where a phrase position is growing — and prepares a report draft. The specialist just unchecks redundant phrases and metrics, adjusts scope and finalises.",
          img: "",
          imgAlt: "AI suggestions panel",
          reverse: false,
        },
        {
          step: "Step 02",
          title: "Colour and arrow instead of a table of numbers",
          desc: "Green-red colour coding, trend arrows and a 'before – after – what changed' narrative instead of charts to analyse — matched to how clients actually read a report: briefly, looking for one answer.",
          img: "",
          imgAlt: "Client report view",
          reverse: true,
        },
        {
          step: "Step 03",
          title: "Delivery without login — email or link, manually or automatically",
          desc: "Auto-reporting (60% adoption, 44% exclusively auto) sends the report cyclically straight to the client's and specialist's inbox. Alternatively: a login-free link to send at any moment.",
          img: "",
          imgAlt: "Email and login-free link",
          reverse: false,
        },
      ],
      rejectedTag: "Rejected directions",
      rejected: [
        { title: "Requiring the client to log in to view the report", reason: "extra friction for a recipient who just wants a quick look, not to log into the specialist's tool." },
        { title: "Charts and raw metrics as the default presentation format", reason: "non-technical clients didn't read them; a 'before – after' narrative was needed, not data to analyse." },
        { title: "Manual selection of all data without AI suggestions", reason: "too time-consuming per send, in practice led to less frequent reporting or returning to a spreadsheet." },
      ],
    },
    s05: {
      tag: "05 — Learnings",
      h2: "What I learned",
      intro: "",
      items: [
        { title: "Auto-reporting as the default mode, not an add-on", desc: "Auto turned out to be the dominant mode — 44% of users never create a report manually. I would prioritise automation from the start, not as iteration number two." },
        { title: "Correlation does not equal causation", desc: "The strong correlation with LTV and conversion (~11× / ~20×) is not proof of causation — it's mainly already-engaged agencies. An experiment or control cohort would be needed to separate the report effect from selection effect." },
        { title: "[Your third observation]", desc: "[Fill in]." },
      ],
    },
  },
}
