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
    intro: "Specjaliści tracili godziny na ręczne składanie raportów z rozproszonych danych. Nowa funkcja automatycznie generuje i wysyła raporty z działań na wizytówce (np. pozycje, posty, zdjęcia, konkurencja). Dziś to funkcja, której zaufało 60% użytkowników, oddając jej pełną automatyzację wysyłki raportów do klientów.",
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
      body: <>Specjaliści SEO potrzebowali prostego narzędzia, które <strong style={{ color: "#0F172A" }}>jasno i w spersonalizowany sposób prezentowałoby wyniki</strong> <strong style={{ color: "#0F172A" }}>nietechnicznym klientom</strong> — z łatwym wyborem danych, porównaniem w czasie i <strong style={{ color: "#0F172A" }}>automatyczną wysyłką</strong>, by ograniczyć liczbę pytań i <strong style={{ color: "#0F172A" }}>wzmocnić zaufanie do współpracy.</strong></>,
      metrics: [
        { num: "12%", caption: "użytkowników MAU tworzy raport co miesiąc", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "wyższe Blended LTV vs. reszta bazy", color: "#0ABA53", icon: "users" },
        { num: "~11×", caption: "częściej płacą niż reszta bazy. To najsilniejszy sygnał wartości zmierzony do tej pory.", color: "#0ABA53", icon: "chart" },
      ],
      quote: <>Są klienci, którzy <strong style={{ color: "#466AFA", fontWeight: 800 }}>płacą tylko za to.</strong> Ta funkcja rozwiązała problem użytkowników, co zmniejszyło <strong style={{ color: "#466AFA", fontWeight: 800 }}>tarcie i churn.</strong></>,
      lastPara: <><strong style={{ color: "#0F172A", fontWeight: 800 }}>60% użytkowników włączyło auto-wysyłkę</strong>, a 44% korzysta wyłącznie z niej — nigdy nie wysyła raportów ręcznie. To pokazuje duże zaufanie do procesu i realne odciążenie od powtarzalnej, czasochłonnej czynności.</>,
    },
    s02: {
      tag: "02 — Odkrycia",
      h2: "Co pokazały badania",
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
      intro: "Projekt wystartował z konkretną hipotezą PM-a — inną funkcjonalnością, uznaną wtedy za odpowiedź na problem. Zanim przeszliśmy do projektowania, chciałam sprawdzić, czy to faktycznie adresuje największy pain point użytkowników.",
      steps: [
        {
          n: 1,
          title: "Synteza badań",
          desc: "Zebrałam wnioski z wywiadów pogłębionych, ankiet i analizy konkurencji w jedno spójne podsumowanie. Na tej podstawie powstały pierwsze user stories.",
          visual: "pivot",
        },
        {
          n: 2,
          title: "Profil klienta końcowego",
          desc: "Oprócz person naszych użytkowników musieliśmy zdefiniować personę odbiorcy raportu. Z wywiadów zbudowaliśmy jej profil — i to ona, nie nasz standardowy użytkownik, ostatecznie zdecydowała o kształcie raportu.",
          visual: "profile",
        },
        {
          n: 3,
          title: "Zakres projektu",
          desc: "Ustaliliśmy, co robimy, a czego zdecydowanie nie — np. świadomie odpuściliśmy edytor styli w mailu, bo to nie tam była dźwignia.",
          visual: "scope",
        },
        {
          n: 4,
          title: "Pierwszy flow i prototyp",
          desc: "Powstał pierwszy user flow i prototyp, przetestowany z użytkownikami. Zaangażowałam też development i QA, żeby wcześnie wyłapać trudności techniczne.",
          visual: "flow",
        },
        {
          n: 5,
          title: "Poprawki, wdrożenie i obserwacja efektów",
          desc: "Naniosłam poprawki na podstawie feedbacku od użytkowników i Customer Success, po czym projekt trafił do wdrożenia z gotową dokumentacją w Figmie. Przeprowadziłam design QA, nadzorowałam wdrożenie i obserwowałam, jak funkcja jest przyjmowana przez użytkowników.",
        },
      ],
      devWarningLabel: "Ograniczenia techniczne",
      devWarningText: "Raport wbudowany w mail musiał mieć bardzo prosty layout ze względu na różnice w renderowaniu HTML przez klienty pocztowe. Razem z devami zminimalizowaliśmy też ryzyko trafiania cyklicznych wysyłek do spamu — m.in. przez autoryzację nadawcy i ograniczenie treści promocyjnej.",
      pivotLabel: "Zmiana kierunku",
      pivotText: <>Zasugerowałam <strong style={{ fontWeight: 800 }}>zmianę kierunku</strong> i <strong style={{ fontWeight: 800 }}>zredefiniowałam problem statement</strong>, upewniając się, że cały zespół patrzy na projekt przez te same kryteria. Celem stało się zamienienie ręcznego składania raportu w <strong style={{ fontWeight: 800 }}>jeden spójny, zautomatyzowany flow</strong>.</>,
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
          desc: "Status, sposób wysyłki i data kolejnego raportu widoczne od razu przy każdym wpisie, bez wchodzenia w szczegóły.",
          img: "/raporty-lista.webp",
          imgAlt: "Lista raportów",
          reverse: false,
          stack: true,
        },
        {
          title: "Raportowanie i Auto-raportowanie",
          desc: "Automatyzacja włączona domyślnie, z harmonogramem do edycji. Użytkownik może w każdej chwili wygenerować raport z dowolnego okresu, nie naruszając harmonogramu.",
          stack: true,
          imgPair: [
            { img: "/raporty-auto.webp", imgAlt: "Auto-raportowanie", imgFit: "contain" },
            { img: "/raporty-instant.webp", imgAlt: "Raport na żądanie", imgFit: "contain" },
          ],
        },
        {
          title: "Reports manager",
          desc: <>Jeden widok na wszystkie profile klientów. <NumBadge n={1} /> Filtrowanie po statusie i częstotliwości oraz <NumBadge n={2} /> akcje zbiorcze — kluczowe, gdy zarządzasz wieloma profilami naraz. Przy każdym z nich widać też <NumBadge n={3} /> dwa ostatnie raporty razem z datą kolejnego automatycznego, a obok — <NumBadge n={4} /> status i jaką metodą zostały wysłane.</>,
          img: "/raporty-manager.webp",
          imgAlt: "Reports manager",
          reverse: false,
          stack: true,
        },
        {
          title: "Edytor raportu",
          desc: "Specjalista dostaje kompletny raport automatycznie — włącza i wyłącza sekcje, dopasowuje ustawienia, nigdy nie zaczyna od zera.",
          visual: "sidebarSwap",
          stack: true,
        },
        {
          title: "Gotowy raport",
          desc: "Raport w mailu ma celowo prosty layout — ograniczony do elementów, które renderują się tak samo w każdym kliencie pocztowym. Ta prostota działa też na treść: pokazuje „było – jest”, a przy trudniejszych sekcjach specjalista może dołączyć krótką notkę edukacyjną dla klienta.",
          visual: "autoScrollReport",
          stack: true,
        },
        {
          title: "Ustawienia maila i dostarczanie",
          desc: "Własny adres wysyłki i reply-to ustawia się raz — każdy raport, ręczny czy automatyczny, wygląda jakby wysłał go sam specjalista. Dostarczasz go trzema sposobami z jednego ekranu: auto-wysyłka (60% adopcji, 44% wyłącznie tak), link bez logowania lub PDF.",
          stack: true,
          imgPair: [
            { img: "/raporty-email.webp", imgAlt: "Ustawienia maila", imgFit: "cover" },
            { img: "/raporty-share.webp", imgAlt: "Trzy sposoby dostarczenia", imgFit: "cover" },
          ],
        },
      ],
      rejectedTag: "Odrzucone kierunki",
      rejected: [
        { title: "Wymóg logowania do narzędzia", reason: "dodatkowe tarcie dla kogoś, kto chce tylko rzucić okiem." },
        { title: "Wykresy i surowe metryki jako domyślna forma", reason: "przytłaczające, wymagają czasu na analizę, którego klient nie ma." },
      ],
    },
    s05: {
      tag: "05 — Wnioski",
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
    h1: "Automation that does the report for the specialist",
    intro: "Specialists lost hours manually assembling reports from scattered data. The new feature automatically generates and sends reports on profile activity (e.g. rankings, posts, photos, competitors). Today it's a feature trusted by 60% of users, who hand it full automation of sending reports to clients.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Role",
    roleText: "Lead Product Designer: from discovery to handoff. User research, hypotheses, flow architecture, screens, usability testing. Team: PM, QA, copywriter, dev.",
    meta: [
      { label: "Product", value: "Localo" },
      { label: "Scale", value: "8,600+ users" },
      { label: "Industry", value: "Local SEO / B2B SaaS" },
      { label: "Users", value: "SEO specialists & agencies" },
    ],
    s01: {
      tag: "01 — Context & Impact",
      h2: "What happened after launch",
      body: <>SEO specialists needed a simple tool that would <strong style={{ color: "#0F172A" }}>clearly and personally present results</strong> to <strong style={{ color: "#0F172A" }}>non-technical clients</strong> — with easy data selection, comparison over time and <strong style={{ color: "#0F172A" }}>automatic sending</strong>, to reduce the number of questions and <strong style={{ color: "#0F172A" }}>strengthen trust in the collaboration.</strong></>,
      metrics: [
        { num: "12%", caption: "of MAU users create a report every month", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "higher Blended LTV vs. the rest of the base", color: "#0ABA53", icon: "users" },
        { num: "~11×", caption: "more often they pay compared to the rest of the base. The strongest value signal measured so far.", color: "#0ABA53", icon: "chart" },
      ],
      quote: <>Some clients <strong style={{ color: "#466AFA", fontWeight: 800 }}>pay just for this.</strong> This feature solved a real user problem, which reduced <strong style={{ color: "#466AFA", fontWeight: 800 }}>friction and churn.</strong></>,
      lastPara: <><strong style={{ color: "#0F172A", fontWeight: 800 }}>60% of users turned on auto-send</strong>, and 44% use it exclusively — never sending reports manually. This shows strong trust in the process and real relief from a repetitive, time-consuming task.</>,
    },
    s02: {
      tag: "02 — Discovery",
      h2: "What the research showed",
      insights: [
        { n: 1, title: "Reports are scanned, not analysed", desc: "End clients don't have time to analyse numbers. Reports are reviewed visually." },
        { n: 2, title: "Manual data selection is everyday friction", desc: "Data collected manually from multiple tools and assembled into one presentation — a tedious process, repeated every month." },
        { n: 3, title: "No automation", desc: "Putting a report together took hours. Users said outright it was tedious and they'd happily delegate it." },
        { n: 4, title: "Need for client education", desc: "Reports often came with separate explanations — what the data is and why it matters to the client." },
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
      tag: "03 — Process",
      h2: "From exploration to pivot",
      intro: "The project started from a concrete PM hypothesis — a different feature, seen at the time as the answer to the problem. Before moving to design, I wanted to check whether it actually addressed users' biggest pain point.",
      steps: [
        {
          n: 1,
          title: "Research synthesis",
          desc: "I brought together findings from in-depth interviews, surveys and competitor analysis into one coherent summary. First user stories were built on that basis.",
          visual: "pivot",
        },
        {
          n: 2,
          title: "End-client profile",
          desc: "Besides our users' personas, we had to define a persona for the report recipient. From interviews we built her profile — and it was her, not our standard user, who ultimately decided the shape of the report.",
          visual: "profile",
        },
        {
          n: 3,
          title: "Project scope",
          desc: "We defined what we're building and what definitely not — e.g. we consciously let go of an in-email style editor, since that wasn't where the leverage was.",
          visual: "scope",
        },
        {
          n: 4,
          title: "First flow and prototype",
          desc: "The first user flow and prototype were built and tested with users. I also involved development and QA to catch technical difficulties early.",
          visual: "flow",
        },
        {
          n: 5,
          title: "Fixes, rollout and impact monitoring",
          desc: "I made fixes based on feedback from users and Customer Success, then the project shipped with full documentation in Figma. I ran design QA, oversaw the rollout and monitored how the feature was adopted by users.",
        },
      ],
      devWarningLabel: "Technical constraints",
      devWarningText: "The report embedded in the email had to have a very simple layout because of differences in HTML rendering across email clients. Together with the devs we also minimised the risk of recurring sends landing in spam — among other things via sender authentication and limiting promotional content.",
      pivotLabel: "Change of direction",
      pivotText: <>I suggested <strong style={{ fontWeight: 800 }}>changing direction</strong> and <strong style={{ fontWeight: 800 }}>redefined the problem statement</strong>, making sure the whole team looked at the project through the same criteria. The goal became turning the manual report-building process into <strong style={{ fontWeight: 800 }}>one cohesive, automated flow</strong>.</>,
      scopeCols: [
        { label: "In scope",     inScope: true,  items: ["AI report builder", "Auto-reporting", "Login-free link", "Workspace view"] },
        { label: "Out of scope", inScope: false, items: ["Publish-only plans", "External integrations"] },
      ],
      profileBoxes: [
        {
          icon: "target",
          title: "Goals",
          color: "green",
          tags: ["Simple takeaway", "No technical analysis", "Fast answer", "Focused on outcome"],
        },
        {
          icon: "warning",
          title: "Pain points",
          color: "blue",
          tags: ["Overwhelmed by data", "Busy", "Non-technical", "Frustration with effort"],
        },
        {
          icon: "trending",
          title: "Behaviours",
          color: "orange",
          tags: ["Visual scanner", "Looks for summary", "Doesn't read it all", "Rarely digs into detail"],
        },
      ],
    },
    s04: {
      tag: "04 — Solution",
      h2: "Reports that build themselves",
      intro: "",
      steps: [
        {
          title: "Reports list",
          desc: "Status, delivery method and the date of the next report are visible right away on every entry, without opening each one.",
          img: "/raporty-lista.webp",
          imgAlt: "Reports list",
          reverse: false,
          stack: true,
        },
        {
          title: "Reporting & Auto-reporting",
          desc: "Automation is on by default, with an editable schedule. Users can generate a report for any period at any time, without disturbing the schedule.",
          stack: true,
          imgPair: [
            { img: "/raporty-auto.webp", imgAlt: "Auto-reporting", imgFit: "contain" },
            { img: "/raporty-instant.webp", imgAlt: "On-demand report", imgFit: "contain" },
          ],
        },
        {
          title: "Reports manager",
          desc: <>One view of all client profiles. <NumBadge n={1} /> Filtering by status and frequency plus <NumBadge n={2} /> bulk actions — key when you're managing many profiles at once. Each one also shows <NumBadge n={3} /> the last two reports along with the next automatic date, and next to it — <NumBadge n={4} /> the status and delivery method.</>,
          img: "/raporty-manager.webp",
          imgAlt: "Reports manager",
          reverse: false,
          stack: true,
        },
        {
          title: "Report editor",
          desc: "The specialist gets a complete report automatically — turns sections on and off, adjusts settings, never starts from scratch.",
          visual: "sidebarSwap",
          stack: true,
        },
        {
          title: "Final report",
          desc: "The email report has a deliberately simple layout — limited to elements that render the same across every email client. That same simplicity works for the content too: it shows 'before – after', and for harder sections the specialist can add a short educational note for the client.",
          visual: "autoScrollReport",
          stack: true,
        },
        {
          title: "Email settings & delivery",
          desc: "A custom send-from address and reply-to are set once — every report, manual or automatic, looks like the specialist sent it themselves. You deliver it three ways from one screen: auto-send (60% adoption, 44% exclusively), a login-free link, or a PDF.",
          stack: true,
          imgPair: [
            { img: "/raporty-email.webp", imgAlt: "Email settings", imgFit: "cover" },
            { img: "/raporty-share.webp", imgAlt: "Three delivery methods", imgFit: "cover" },
          ],
        },
      ],
      rejectedTag: "Rejected directions",
      rejected: [
        { title: "Requiring login to the tool", reason: "extra friction for someone who just wants a quick look." },
        { title: "Charts and raw metrics as the default format", reason: "overwhelming, requiring time to analyse that the client doesn't have." },
      ],
    },
    s05: {
      tag: "05 — Learnings",
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
