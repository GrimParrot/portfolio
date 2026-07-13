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
    h1: "Funkcja automatycznego raportowania.",
    h1Accent: "Wbudowana w produkt.",
    intro: "Specjaliści tracili godziny na ręczne składanie raportów z rozproszonych danych. Nowa funkcja automatycznie generuje i wysyła raporty z działań na wizytówce (np. pozycje, posty, zdjęcia, konkurencja). Dziś to funkcja, której zaufało 60% użytkowników, oddając jej pełną automatyzację wysyłki raportów do klientów.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Rola",
    roleText: "Lead Product Designer: od discovery po delivery. Badania użytkowników, hipotezy, architektura flow, ekrany, testy użyteczności. Częściowo pełniłam też obowiązki Product Managera w duecie z CEO firmy.",
    chapters: {
      hero: "Start",
      s01: "Efekty",
      s02: "Problem",
      s03: "Proces",
      s04: "Rozwiązanie",
      s05: "Wnioski",
    },
    meta: [
      { label: "Produkt", value: "Localo" },
      { label: "Skala", value: "8 600+ użytkowników" },
      { label: "Branża", value: "Local SEO / B2B SaaS" },
      { label: "Użytkownicy", value: "Specjaliści SEO i agencje" },
    ],
    s01: {
      h2: "Kluczowe metryki",
      body: <>Specjaliści SEO potrzebowali prostego narzędzia, które <strong style={{ color: "#0F172A" }}>jasno i w spersonalizowany sposób prezentowałoby wyniki</strong> <strong style={{ color: "#0F172A" }}>nietechnicznym klientom</strong>, z łatwym wyborem danych, porównaniem w czasie i <strong style={{ color: "#0F172A" }}>automatyczną wysyłką</strong>, by ograniczyć liczbę pytań i <strong style={{ color: "#0F172A" }}>wzmocnić zaufanie do współpracy.</strong></>,
      metrics: [
        { num: "12%", caption: "użytkowników MAU tworzy raport co miesiąc", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "wyższe Blended LTV vs. reszta bazy", color: "#0ABA53", icon: "users" },
        { num: "~11×", caption: "częściej płacą niż reszta bazy. To najsilniejszy sygnał wartości zmierzony do tej pory.", color: "#0ABA53", icon: "chart" },
      ],
      quote: <>Są klienci, którzy <strong style={{ color: "#466AFA", fontWeight: 800 }}>płacą tylko za to.</strong> Ta funkcja rozwiązała problem użytkowników, co zmniejszyło <strong style={{ color: "#466AFA", fontWeight: 800 }}>tarcie i churn.</strong></>,
      lastPara: <><strong style={{ color: "#0F172A", fontWeight: 800 }}>60% użytkowników włączyło auto-wysyłkę</strong>, a 44% korzysta wyłącznie z niej i nigdy nie wysyła raportów ręcznie. To pokazuje duże zaufanie do procesu i realne odciążenie od powtarzalnej, czasochłonnej czynności.</>,
    },
    s02: {
      h2: "Kluczowe odkrycia, które ukształtowały finalny projekt",
      insights: [
        { n: 1, title: "Raporty są skanowane, nie analizowane", desc: "Klienci końcowi nie mają czasu analizować liczb. Raport przeglądany jest wzrokowo." },
        { n: 2, title: "Ręczna selekcja danych to codzienne tarcie", desc: "Dane zbierane ręcznie z wielu narzędzi i składane w jedną prezentację: żmudny proces, powtarzający się co miesiąc." },
        { n: 3, title: "Brak automatyzacji", desc: "Składanie raportu zajmowało godziny. Użytkownicy mówili wprost, że to uciążliwe i chętnie by to oddelegowali." },
        { n: 4, title: "Potrzeba edukacji klienta", desc: "Do raportów często dołączano osobne wyjaśnienia: czym są dane i dlaczego mają znaczenie dla klienta." },
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
      h2: "Od eksploracji po zmianę kierunku",
      intro: "Projekt wystartował z konkretną hipotezą PM-a, inną funkcjonalnością, uznaną wtedy za odpowiedź na problem. Zanim przeszłam do projektowania, chciałam sprawdzić, czy to faktycznie adresuje największy pain point użytkowników.",
      steps: [
        {
          n: 1,
          title: "Synteza badań",
          desc: "Za pomocą Claude zsyntetyzowałam wnioski z wywiadów pogłębionych, ankiet i analizy konkurencji w jedno spójne podsumowanie. Na tej podstawie powstały pierwsze user stories. Za moją sugestią, popartą wynikami badań, wspólnie z CEO zmieniliśmy kierunek projektu.",
          visual: "pivot",
        },
        {
          n: 2,
          title: "Profil klienta końcowego",
          desc: "Oprócz person naszych użytkowników musiałam zdefiniować personę odbiorcy raportu. Z wywiadów zbudowałam jej profil. To ona, nie nasz standardowy użytkownik, ostatecznie zdecydowała o kształcie raportu.",
          visual: "profile",
        },
        {
          n: 3,
          title: "Zakres projektu",
          desc: "Ustaliłam, co robię, a czego zdecydowanie nie: np. świadomie odpuściłam edytor styli w mailu, bo to nie tam była dźwignia.",
          visual: "scope",
        },
        {
          n: 4,
          title: "Pierwszy flow i prototyp",
          desc: "Pierwszy prototyp zbudowałam w Claude Code: działający, klikalny flow gotowy do testów z użytkownikami, zanim zaangażowałam development i QA do wyłapania trudności technicznych.",
          visual: "flow",
        },
        {
          n: 5,
          title: "Poprawki, wdrożenie i obserwacja efektów",
          desc: "Naniosłam poprawki na podstawie feedbacku od użytkowników i Customer Success, po czym projekt trafił do wdrożenia z gotową dokumentacją w Figmie. Przeprowadziłam design QA, nadzorowałam wdrożenie i obserwowałam, jak funkcja jest przyjmowana przez użytkowników.",
        },
      ],
      pivotLabel: "Zmiana kierunku",
      pivotGoalTitle: "Cel",
      pivotGoalDesc: <>Zbudować narzędzie do <strong style={{ fontWeight: 800 }}>automatycznego raportowania</strong>, które jasno pokazuje wyniki nietechnicznym klientom i <strong style={{ fontWeight: 800 }}>buduje zaufanie do współpracy</strong>.</>,
      scopeCols: [
        { label: "W zakresie",    inScope: true,  items: ["Kreator raportu z AI", "Auto-raportowanie", "Link bez logowania", "Widok workspace"] },
        { label: "Poza zakresem", inScope: false, items: ["Plany wyłącznie publikacyjne", "Integracje zewnętrzne"] },
      ],
      profileBoxes: [
        {
          icon: "target",
          title: "Cel",
          color: "green",
          tags: ["Szybki progres", "Zaufanie do agencji", "Poczucie poprawy"],
        },
        {
          icon: "warning",
          title: "Pain pointy",
          color: "blue",
          tags: ["Brak czasu na analizę", "Przytłoczenie danymi", "Niezrozumiałe frazy", "Frustracja bez efektu"],
        },
        {
          icon: "trending",
          title: "Zachowania",
          color: "orange",
          tags: ["Skanuje wzrokowo", "Szuka skrótów", "Nie czyta całości", "Kieruje się kolorem i hasłami"],
        },
      ],
    },
    s04: {
      h2: "Raporty, które robią się same",
      intro: "",
      steps: [
        {
          stack: true,
          cards: [
            { title: "Lista raportów", desc: "Wszystko na pierwszy rzut oka: status, sposób wysyłki i data kolejnego raportu widoczne od razu przy każdym wpisie, bez wchodzenia w szczegóły.", img: "/raporty-lista.webp", imgAlt: "Lista raportów", height: 700 },
          ],
        },
        {
          stack: true,
          cards: [
            { title: "Auto-raportowanie", desc: "Domyślnie włączone: harmonogram do edycji w każdej chwili, bez konieczności konfiguracji od zera.", img: "/raporty-auto.webp", imgAlt: "Auto-raportowanie" },
            { title: "Raport na żądanie", desc: "Bez ruszania harmonogramu: dowolny okres, jednym kliknięciem, a automatyczna wysyłka pozostaje nietknięta.", img: "/raporty-instant.webp", imgAlt: "Raport na żądanie" },
          ],
        },
        {
          stack: true,
          cards: [
            { title: "Reports manager", desc: <>Jeden widok na wszystkie profile klientów. <NumBadge n={1} /> Filtrowanie po statusie i częstotliwości oraz <NumBadge n={2} /> akcje zbiorcze, kluczowe, gdy zarządzasz wieloma profilami naraz. Przy każdym z nich widać też <NumBadge n={3} /> dwa ostatnie raporty razem z datą kolejnego automatycznego, a obok <NumBadge n={4} /> status i jaką metodą zostały wysłane.</>, img: "/raporty-manager.webp", imgAlt: "Reports manager", height: 700 },
          ],
        },
        {
          title: "Edytor raportu",
          desc: "Specjalista dostaje kompletny raport automatycznie: włącza i wyłącza sekcje, dopasowuje ustawienia, nigdy nie zaczyna od zera.",
          visual: "sidebarSwap",
          stack: true,
          height: 700,
        },
        {
          title: "Gotowy raport",
          desc: "Raport w mailu ma celowo prosty layout: ograniczony do elementów, które renderują się tak samo w każdym kliencie pocztowym. Ta prostota działa też na treść: pokazuje „było / jest”, a przy trudniejszych sekcjach specjalista może dołączyć krótką notkę edukacyjną dla klienta.",
          visual: "autoScrollReport",
          stack: true,
          height: 750,
        },
        {
          stack: true,
          cards: [
            { title: "Ustawienia maila", desc: "Własny adres wysyłki i reply-to ustawia się raz: każdy raport, ręczny czy automatyczny, wygląda jakby wysłał go sam specjalista.", img: "/raporty-email.webp", imgAlt: "Ustawienia maila" },
            { title: "Sposoby dostarczenia", desc: "Trzema sposobami z jednego ekranu: auto-wysyłka (60% adopcji, 44% wyłącznie tak), link bez logowania lub PDF.", img: "/raporty-share.webp", imgAlt: "Trzy sposoby dostarczenia" },
          ],
        },
      ],
      rejectedTag: "Odrzucone kierunki",
      rejected: [
        { title: "Wymóg logowania do narzędzia", reason: "Dodatkowe tarcie dla kogoś, kto chce tylko rzucić okiem." },
        { title: "Wykresy i surowe metryki jako domyślna forma", reason: "Przytłaczające, wymagają czasu na analizę, którego klient nie ma." },
      ],
    },
    s05: {
      h2: "Czego się nauczyłam",
      intro: "",
      items: [
        { title: "Warto drążyć, nawet gdy pierwsze rozwiązanie wygląda świetnie." },
        { title: "Ograniczenia maila trzeba projektować od początku." },
        { title: "Automatyzacja uciążliwej czynności to ogromny pain-killer." },
      ],
    },
  },
  en: {
    h1: "Automatic reporting feature.",
    h1Accent: "Built into the product.",
    intro: "Specialists lost hours manually assembling reports from scattered data. The new feature automatically generates and sends reports on profile activity (e.g. rankings, posts, photos, competitors). Today it's a feature trusted by 60% of users, who hand it full automation of sending reports to clients.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Role",
    roleText: "Lead Product Designer: from discovery to delivery. User research, hypotheses, flow architecture, screens, usability testing. I also partly acted as Product Manager in a duo with the company's CEO.",
    chapters: {
      hero: "Start",
      s01: "Results",
      s02: "Problem",
      s03: "Process",
      s04: "Solution",
      s05: "Takeaways",
    },
    meta: [
      { label: "Product", value: "Localo" },
      { label: "Scale", value: "8,600+ users" },
      { label: "Industry", value: "Local SEO / B2B SaaS" },
      { label: "Users", value: "SEO specialists & agencies" },
    ],
    s01: {
      h2: "Key metrics",
      body: <>SEO specialists needed a simple tool that would <strong style={{ color: "#0F172A" }}>clearly and personally present results</strong> to <strong style={{ color: "#0F172A" }}>non-technical clients</strong>, with easy data selection, comparison over time and <strong style={{ color: "#0F172A" }}>automatic sending</strong>, to reduce the number of questions and <strong style={{ color: "#0F172A" }}>strengthen trust in the collaboration.</strong></>,
      metrics: [
        { num: "12%", caption: "of MAU users create a report every month", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "higher Blended LTV vs. the rest of the base", color: "#0ABA53", icon: "users" },
        { num: "~11×", caption: "more often they pay compared to the rest of the base. The strongest value signal measured so far.", color: "#0ABA53", icon: "chart" },
      ],
      quote: <>Some clients <strong style={{ color: "#466AFA", fontWeight: 800 }}>pay just for this.</strong> This feature solved a real user problem, which reduced <strong style={{ color: "#466AFA", fontWeight: 800 }}>friction and churn.</strong></>,
      lastPara: <><strong style={{ color: "#0F172A", fontWeight: 800 }}>60% of users turned on auto-send</strong>, and 44% use it exclusively and never send reports manually. This shows strong trust in the process and real relief from a repetitive, time-consuming task.</>,
    },
    s02: {
      h2: "Key finding that shaped the final design",
      insights: [
        { n: 1, title: "Reports are scanned, not analysed", desc: "End clients don't have time to analyse numbers. Reports are reviewed visually." },
        { n: 2, title: "Manual data selection is everyday friction", desc: "Data collected manually from multiple tools and assembled into one presentation: a tedious process, repeated every month." },
        { n: 3, title: "No automation", desc: "Putting a report together took hours. Users said outright it was tedious and they'd happily delegate it." },
        { n: 4, title: "Need for client education", desc: "Reports often came with separate explanations: what the data is and why it matters to the client." },
      ],
      methodsLabel: "Research methods",
      methods: [
        { icon: <Users size={14} />, label: "User interviews" },
        { icon: <FileText size={14} />, label: "Survey" },
        { icon: <TrendingUp size={14} />, label: "Customer Success feedback" },
        { icon: <BarChart2 size={14} />, label: "Competitor analysis" },
      ],
    },
    s03: {
      h2: "From exploration to pivot",
      intro: "The project started from a concrete PM hypothesis, a different feature, seen at the time as the answer to the problem. Before moving to design, I wanted to check whether it actually addressed users' biggest pain point.",
      steps: [
        {
          n: 1,
          title: "Research synthesis",
          desc: "Using Claude, I synthesized findings from in-depth interviews, surveys and competitor analysis into one coherent summary. First user stories were built on that basis. At my suggestion, backed by research findings, the CEO and I changed the project's direction.",
          visual: "pivot",
        },
        {
          n: 2,
          title: "End-client profile",
          desc: "Besides our users' personas, I had to define a persona for the report recipient. From interviews I built her profile. It was her, not our standard user, who ultimately decided the shape of the report.",
          visual: "profile",
        },
        {
          n: 3,
          title: "Project scope",
          desc: "I defined what I'm building and what definitely not: e.g. I consciously let go of an in-email style editor, since that wasn't where the leverage was.",
          visual: "scope",
        },
        {
          n: 4,
          title: "First flow and prototype",
          desc: "I built the first prototype in Claude Code: a working, clickable flow ready for user testing, before involving development and QA to catch technical difficulties.",
          visual: "flow",
        },
        {
          n: 5,
          title: "Fixes, rollout and impact monitoring",
          desc: "I made fixes based on feedback from users and Customer Success, then the project shipped with full documentation in Figma. I ran design QA, oversaw the rollout and monitored how the feature was adopted by users.",
        },
      ],
      pivotLabel: "Change of direction",
      pivotGoalTitle: "Goal",
      pivotGoalDesc: <>Build a tool for <strong style={{ fontWeight: 800 }}>automatic reporting</strong> that clearly shows results to non-technical clients and <strong style={{ fontWeight: 800 }}>builds trust in the collaboration</strong>.</>,
      scopeCols: [
        { label: "In scope",     inScope: true,  items: ["AI report builder", "Auto-reporting", "Login-free link", "Workspace view"] },
        { label: "Out of scope", inScope: false, items: ["Publish-only plans", "External integrations"] },
      ],
      profileBoxes: [
        {
          icon: "target",
          title: "Goal",
          color: "green",
          tags: ["Quick progress", "Trust in the agency", "Sense of improvement"],
        },
        {
          icon: "warning",
          title: "Pain points",
          color: "blue",
          tags: ["No time to analyse", "Overwhelmed by data", "Unclear phrases", "Frustration without results"],
        },
        {
          icon: "trending",
          title: "Behaviours",
          color: "orange",
          tags: ["Scans visually", "Looks for shortcuts", "Doesn't read it all", "Guided by colour and headlines"],
        },
      ],
    },
    s04: {
      h2: "Reports that build themselves",
      intro: "",
      steps: [
        {
          stack: true,
          cards: [
            { title: "Reports list", desc: "Everything at a glance: status, delivery method and the date of the next report are visible right away on every entry, without opening each one.", img: "/raporty-lista.webp", imgAlt: "Reports list", height: 700 },
          ],
        },
        {
          stack: true,
          cards: [
            { title: "Auto-reporting", desc: "On by default: an editable schedule, ready to adjust anytime, no setup required.", img: "/raporty-auto.webp", imgAlt: "Auto-reporting" },
            { title: "On-demand report", desc: "Without touching the schedule: any period, one click, and the automatic send stays untouched.", img: "/raporty-instant.webp", imgAlt: "On-demand report" },
          ],
        },
        {
          stack: true,
          cards: [
            { title: "Reports manager", desc: <>One view of all client profiles. <NumBadge n={1} /> Filtering by status and frequency plus <NumBadge n={2} /> bulk actions, key when you're managing many profiles at once. Each one also shows <NumBadge n={3} /> the last two reports along with the next automatic date, and next to it <NumBadge n={4} /> the status and delivery method.</>, img: "/raporty-manager.webp", imgAlt: "Reports manager", height: 700 },
          ],
        },
        {
          title: "Report editor",
          desc: "The specialist gets a complete report automatically: turns sections on and off, adjusts settings, never starts from scratch.",
          visual: "sidebarSwap",
          stack: true,
          height: 700,
        },
        {
          title: "Final report",
          desc: "The email report has a deliberately simple layout: limited to elements that render the same across every email client. That same simplicity works for the content too: it shows 'before / after', and for harder sections the specialist can add a short educational note for the client.",
          visual: "autoScrollReport",
          stack: true,
          height: 750,
        },
        {
          stack: true,
          cards: [
            { title: "Email settings", desc: "A custom send-from address and reply-to are set once: every report, manual or automatic, looks like the specialist sent it themselves.", img: "/raporty-email.webp", imgAlt: "Email settings" },
            { title: "Delivery methods", desc: "Three ways from one screen: auto-send (60% adoption, 44% exclusively), a login-free link, or a PDF.", img: "/raporty-share.webp", imgAlt: "Three delivery methods" },
          ],
        },
      ],
      rejectedTag: "Rejected directions",
      rejected: [
        { title: "Requiring login to the tool", reason: "Extra friction for someone who just wants a quick look." },
        { title: "Charts and raw metrics as the default format", reason: "Overwhelming, requiring time to analyse that the client doesn't have." },
      ],
    },
    s05: {
      h2: "What I learned",
      intro: "",
      items: [
        { title: "Worth digging deeper, even when the first solution looks great." },
        { title: "Email constraints need designing for from day one." },
        { title: "Automating an annoying task is a huge pain-killer." },
      ],
    },
  },
}
