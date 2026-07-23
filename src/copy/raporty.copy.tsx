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
    h1: "Automatyczne raporty, wbudowane w",
    h1Accent: "produkt.",
    heroEyebrow: "Localo · Kreator Raportów",
    intro: "Projekt wystartował z innej hipotezy. Przeprowadziłam badania, by sprawdzić, czy rozwiązuje właściwy problem. Razem z CEO zmieniliśmy kierunek. Prowadziłam to sama, od początku do końca — badania, architektura flow, ekrany, testy użyteczności.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Rola",
    roleLead: "Discovery → delivery",
    roleDesc: "— badania użytkowników, architektura flow, projektowanie UI i testy użyteczności, od początku do końca. Jeden z wielu projektów zrealizowanych w ciągu 2 lat jako jedyna product designerka w Localo.",
    roleTitle: "Design lead,",
    roleTitleAccent: "od A do Z.",
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
      h2: "Zobacz, co to dało.",
      heroTag: "Najsilniejszy zmierzony sygnał",
      metrics: [
        { num: "~11×", caption: "częściej płacą niż reszta bazy", color: "#0ABA53", icon: "chart" },
        { num: "12%", caption: "użytkowników MAU tworzy raport co miesiąc", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "wyższe Blended LTV vs. reszta bazy", color: "#0ABA53", icon: "users" },
        { num: "60%", caption: "użytkowników włączyło auto-wysyłkę", color: "#0ABA53", icon: "auto" },
        { num: "44%", caption: "korzysta z niej wyłącznie, nigdy nie wysyła raportów ręcznie", color: "#0ABA53", icon: "manual" },
      ],
      quote: <>Są klienci, którzy <strong style={{ color: "#466AFA", fontWeight: 800 }}>płacą tylko za to.</strong> Ta funkcja rozwiązała problem użytkowników, co zmniejszyło <strong style={{ color: "#466AFA", fontWeight: 800 }}>tarcie i churn.</strong></>,
      lastPara: "To pokazuje duże zaufanie do procesu i realne odciążenie od powtarzalnej, czasochłonnej czynności.",
    },
    s02: {
      h2: "Kluczowe odkrycia",
      findingTitle: "Raporty są",
      findingTitleAccent: "skanowane",
      findingTitleSuffix: ", nie analizowane.",
      findingLead: "Klienci końcowi nie mają czasu analizować liczb. Raport przeglądany jest wzrokowo.",
      insights: [
        { n: 2, title: "Ręczna selekcja danych to codzienne tarcie", desc: "Dane zbierane ręcznie z wielu narzędzi i składane w jedną prezentację: żmudny proces, powtarzający się co miesiąc." },
        { n: 3, title: "Brak automatyzacji", desc: "Składanie raportu zajmowało godziny. Użytkownicy mówili wprost, że to uciążliwe i chętnie by to oddelegowali." },
        { n: 4, title: "Potrzeba edukacji klienta", desc: "Do raportów często dołączano osobne wyjaśnienia: czym są dane i dlaczego mają znaczenie dla klienta." },
      ],
      methodsLabel: "Metody badawcze",
      methods: [
        { icon: <Users size={15} />, label: "Wywiady z użytkownikami" },
        { icon: <FileText size={15} />, label: "Ankieta" },
        { icon: <TrendingUp size={15} />, label: "Feedback Customer Success" },
        { icon: <BarChart2 size={15} />, label: "Analiza konkurencji" },
      ],
    },
    s03: {
      h2: "Jak przebiegała praca.",
      steps: [
        {
          n: 1,
          title: "Discovery i research",
          navDesc: "Wywiady, nagrania Clarity, ankiety i analiza konkurencji.",
          desc: "Wywiady z użytkownikami, nagrania sesji z Clarity, ankiety i analiza konkurencji — sprawdzałam, gdzie specjaliści realnie tracą czas i czego ich klienci nie rozumieją w raportach. Z tych samych rozmów zbudowałam profil persony odbiorcy raportu — to ona, nie nasz standardowy użytkownik, ostatecznie zdecydowała o jego kształcie.",
        },
        {
          n: 2,
          title: "Synteza i zakres",
          navDesc: "Dane jakościowe i ilościowe razem; ustalony zakres projektu.",
          desc: "Połączyłam dane jakościowe i ilościowe w jeden spójny obraz — na tej podstawie, za moją sugestią, wspólnie z CEO zmieniliśmy kierunek projektu. Ustaliłam też, co wchodzi w zakres, a co świadomie zostawiamy na później: np. edytor styli w mailu, bo to nie tam była dźwignia.",
          images: ["/raporty-user-stories.webp", "/raporty-scope.webp"],
          imagesLayout: "columns" as const,
        },
        {
          n: 3,
          title: "Flow, prototyp i testy",
          navDesc: "Zmapowany flow, prototyp i testy z użytkownikami.",
          desc: "Zmapowałam pełny flow tworzenia raportu, zbudowałam klikalny prototyp w Claude Code i przetestowałam go z użytkownikami, zanim zaangażowałam development i QA do wyłapania trudności technicznych.",
          images: ["/raporty-flow-1.webp", "/raporty-flow-2.webp", "/raporty-flow-3.webp"],
        },
        {
          n: 4,
          title: "Design wizualny i copy",
          navDesc: "Dopracowanie UI, mikrointerakcje i treść raportu.",
          desc: "Dopracowanie UI i mikrointerakcji — kolor i strzałka zamiast tabeli liczb. Razem z zespołem pracowałam też nad treścią finalnego raportu, tak żeby nietechniczny klient rozumiał go bez tłumaczenia.",
        },
        {
          n: 5,
          title: "Development i design QA",
          navDesc: "Development z zespołem i design QA na każdej funkcji.",
          desc: "Projekt trafił do wdrożenia z gotową dokumentacją w Figmie. Przez cały proces budowy współpracowałam z developmentem i przeprowadzałam design QA na każdej funkcji.",
        },
        {
          n: 6,
          title: "Wdrożenie, efekty i iteracje",
          navDesc: "Wdrożenie, obserwacja adopcji i dalsze iteracje.",
          desc: "Po wdrożeniu obserwowałam, jak funkcja jest przyjmowana przez użytkowników, i na bieżąco nanosiłam poprawki na podstawie feedbacku od użytkowników i Customer Success.",
        },
      ],
      pivotGoalTitle: "Cel",
      pivotGoalDesc: <>Zbudować narzędzie do <strong style={{ fontWeight: 800 }}>automatycznego raportowania</strong>, które jasno pokazuje wyniki nietechnicznym klientom i <strong style={{ fontWeight: 800 }}>buduje zaufanie do współpracy</strong>.</>,
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
    h1: "Automatic reporting, built into the",
    h1Accent: "product.",
    heroEyebrow: "Localo · Report Builder",
    intro: "The project started from a different hypothesis. I ran research to check whether it solved the right problem. The CEO and I pivoted the direction. I ran solo, end to end — research, flow architecture, screens, usability testing.",
    introProduct: "",
    introSuffix: "",
    roleLabel: "Role",
    roleLead: "Discovery → delivery",
    roleDesc: "— user research, flow architecture, UI design, and usability testing, end to end. One of many projects across 2 years as Localo's sole product designer.",
    roleTitle: "Design lead,",
    roleTitleAccent: "end to end.",
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
      h2: "Here's what it delivered.",
      heroTag: "Strongest signal measured",
      metrics: [
        { num: "~11×", caption: "more often they pay compared to the rest of the base", color: "#0ABA53", icon: "chart" },
        { num: "12%", caption: "of MAU users create a report every month", color: "#0ABA53", icon: "trending" },
        { num: "20×", caption: "higher Blended LTV vs. the rest of the base", color: "#0ABA53", icon: "users" },
        { num: "60%", caption: "of users turned on auto-send", color: "#0ABA53", icon: "auto" },
        { num: "44%", caption: "use it exclusively, never sending reports manually", color: "#0ABA53", icon: "manual" },
      ],
      quote: <>Some clients <strong style={{ color: "#466AFA", fontWeight: 800 }}>pay just for this.</strong> This feature solved a real user problem, which reduced <strong style={{ color: "#466AFA", fontWeight: 800 }}>friction and churn.</strong></>,
      lastPara: "This shows strong trust in the process and real relief from a repetitive, time-consuming task.",
    },
    s02: {
      h2: "Key findings",
      findingTitle: "Reports are",
      findingTitleAccent: "scanned",
      findingTitleSuffix: ", not analysed.",
      findingLead: "End clients don't have time to analyse numbers. Reports are reviewed visually.",
      insights: [
        { n: 2, title: "Manual data selection is everyday friction", desc: "Data collected manually from multiple tools and assembled into one presentation: a tedious process, repeated every month." },
        { n: 3, title: "No automation", desc: "Putting a report together took hours. Users said outright it was tedious and they'd happily delegate it." },
        { n: 4, title: "Need for client education", desc: "Reports often came with separate explanations: what the data is and why it matters to the client." },
      ],
      methodsLabel: "Research methods",
      methods: [
        { icon: <Users size={15} />, label: "User interviews" },
        { icon: <FileText size={15} />, label: "Survey" },
        { icon: <TrendingUp size={15} />, label: "Customer Success feedback" },
        { icon: <BarChart2 size={15} />, label: "Competitor analysis" },
      ],
    },
    s03: {
      h2: "How the work moved.",
      steps: [
        {
          n: 1,
          title: "Discovery & research",
          navDesc: "Interviews, Clarity recordings, surveys & competitor analysis.",
          desc: "User interviews, Clarity session recordings, surveys and competitor analysis — before moving to design, I wanted to verify the PM's hypothesis against what specialists actually experienced. That research also shaped the persona for the end recipient: the non-technical client who ultimately decided the report's shape.",
        },
        {
          n: 2,
          title: "Cross-synthesis & scope",
          navDesc: "Qual + quant combined; decided what's in and out of scope.",
          desc: "Combined qualitative and quantitative data into one picture — on that basis, with my recommendation, the CEO and I pivoted the project's direction. I also decided what was in scope and what to consciously leave for later: e.g. an in-email style editor, since that wasn't where the real leverage was.",
          images: ["/raporty-user-stories.webp", "/raporty-scope.webp"],
          imagesLayout: "columns" as const,
        },
        {
          n: 3,
          title: "Flow, prototype & testing",
          navDesc: "Mapped the flow, prototyped and validated with users.",
          desc: "Mapped the full report-creation flow, built a clickable prototype in Claude Code and validated it with users before involving development and QA to catch technical friction.",
          images: ["/raporty-flow-1.webp", "/raporty-flow-2.webp", "/raporty-flow-3.webp"],
        },
        {
          n: 4,
          title: "Visual design & copy",
          navDesc: "UI polish, micro-interactions and the report copy.",
          desc: "UI polish and micro-interactions — colour and an arrow instead of a table of numbers. I also partnered on the narrative copy for the final report, so non-technical clients could understand it without explanation.",
        },
        {
          n: 5,
          title: "Development & design QA",
          navDesc: "Built with engineering; design QA on every feature.",
          desc: "The project moved to development with full Figma documentation. Throughout the build I partnered with engineering and ran design QA on every feature.",
        },
        {
          n: 6,
          title: "Ship, impact & iterations",
          navDesc: "Rolled out, measured adoption and kept iterating.",
          desc: "After launch I watched how the feature was adopted and kept refining it based on feedback from users and Customer Success.",
        },
      ],
      pivotGoalTitle: "Goal",
      pivotGoalDesc: <>Build a tool for <strong style={{ fontWeight: 800 }}>automatic reporting</strong> that clearly shows results to non-technical clients and <strong style={{ fontWeight: 800 }}>builds trust in the collaboration</strong>.</>,
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
