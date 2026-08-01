import { NumBadge } from "./raporty-num-badge"

export const copy = {
  pl: {
    heroEyebrow: "CASE STUDY · LOCALO — KREATOR RAPORTÓW",
    heroTitle: "Automatyczne raporty, wbudowane w produkt.",
    heroLead:
      "Nie zaprosiliśmy klientów do narzędzia. Wysłaliśmy raport do nich. Teraz 60% użytkowników funkcji korzysta z auto-generowania w Localo.",
    metaBar: [
      { label: "PRODUKT", value: "Localo" },
      { label: "ROLA", value: "Design Lead" },
      { label: "SKALA", value: "8 600+ użytkowników" },
      { label: "DANE", value: "X 2025 – VI 2026" },
    ],
    chapters: {
      skrot: "01 W skrócie",
      problem: "02 Problem",
      discovery: "03 Discovery",
      reframing: "04 Re-framing",
      decyzje: "05 Decyzje",
      handoff: "06 Handoff",
      rozwiazanie: "07 Rozwiązanie",
      wynik: "08 Wynik",
      podsumowanie: "09 Podsumowanie",
    },
    skrot: {
      eyebrow: "01 · KONTEKST, EFEKT I ROLA",
      title: "W skrócie",
      intro:
        "Localo to narzędzie dla osób, które zarządzają wizytówkami Google — jedną albo kilkudziesięcioma naraz. Automatyzuje pracę i mówi, co zrobić dalej: lista zadań na tydzień z priorytetami dla każdej wizytówki, audyty w kilka sekund, raporty gotowe do wysłania klientowi w kilka minut.",
      contextPanel: {
        title: "Kontekst projektu",
        text:
          "CEO przyszedł z gotowym rozwiązaniem: dajmy użytkownikom możliwość zapraszania klientów do Localo. Klient agencji loguje się i sprawdza dane, specjaliści przestają tracić czas na raportowanie. Logiczne. Problem pod spodem był prawdziwy.\nJednak zbudowaliśmy coś dokładnie odwrotnego. Zamiast wpuszczać klienta agencji do Localo, zbudowaliśmy raport, który sam się generuje i wysyła jednym kliknięciem.",
      },
      statsIntroTitle: "Efekty — trzy liczby",
      statsIntroDesc:
        "Pokazują duże zaufanie do procesu i realne odciążenie od powtarzalnej, czasochłonnej czynności.",
      stats: [
        { value: "44%", label: "Użytkowników raportów nigdy nie tworzy raportu ręcznie. Automat jest u nich trybem domyślnym, nie dodatkiem." },
        { value: "11–13%", label: "Tyle aktywnych użytkowników robi raport w danym miesiącu — stabilnie przez dziewięć miesięcy." },
        { value: "~20x", label: "Wyższe blended LTV niż reszta bazy. Korelacja, nie eksperyment." },
      ],
      roleOverline: "MOJA ROLA — DESIGN LEAD OD A DO Z",
      roleQuote: "W Localo odpowiadałam za cały produkt – od discovery po delivery.",
      roleList: [
        "definiowałam problemy",
        "prowadziłam badania i projektowałam UI/UX",
        "testowałam z użytkownikami i iterowałam",
        "doradzałam, co wchodzi na roadmapę, a co nie",
        "rozwijałam design system i utrzymywałam go wspólnie z devami",
        "chodziłam na rozmowy z klientami",
        "mentorowałam młodszą projektantkę",
      ],
      scopePanel: {
        title: "Raporty to jeden z modułów.",
        blocks: [
          { label: "MÓJ ZAKRES", text: "research (desk research, benchmarking, wywiady pogłębione, badania ilościowe), scope, architektura informacji, wireframy i flow, UI/UX i prototyp" },
          { label: "WSPÓŁPRACA", text: "Z CEO na poziomie strategicznym, z developerami przy wdrożeniu, z analitykiem danych przy metrykach. Wspierałam writera w treściach i QA w testach." },
        ],
      },
    },
    problem: {
      eyebrow: "02 · PROBLEM FRAMING",
      title: "Problem był prawdziwy. Rozwiązanie nie było oczywiste.",
      intro:
        "Zanim powstały raporty, użytkownicy sklejali je ręcznie. Zrzuty ekranu z kilku narzędzi – m.in. Localo i Ahrefs – poskładane w prezentację, własny komentarz, podstawione dane, wysyłka do klienta. Osobno dla każdego zarządzanego profilu. W wywiadach mówili, że schodzi im na to kilka godzin miesięcznie.\n\nPropozycja CEO odpowiadała na to wprost: skoro problemem jest ręczne przygotowywanie raportu, usuńmy raport z równania i wpuśćmy klienta do narzędzia.",
      researchTitle: "Pytania badawcze",
      researchDesc: "Aby unikać ślepych hipotez, musieliśmy zmierzyć się z pytaniami o podstawy.",
      questions: [
        "Czy klient docelowy w ogóle chce wchodzić do kolejnego narzędzia?",
        "Czy nasz użytkownik chce mu pokazać całą platformę, ze wszystkim, co na niej widać?",
        "Czy klient zrozumie, na co patrzy?",
        "A jeśli nie zrozumie – czy dodatkowa edukacja nie obciąży naszego użytkownika bardziej, niż odciąży go automatyzacja?",
        "Kim właściwie są klienci naszych klientów?",
        "Czego potrzebują i jak czytają te raporty?",
      ],
      alert: "Żadnej z tych odpowiedzi nie mieliśmy, a każda z nich mogła wywrócić projekt już po zbudowaniu.",
      closing:
        "Przekonałam CEO, że to moment, w którym warto zainwestować czas w pogłębienie problemu: dwa czy trzy miesiące pracy nad źle postawioną diagnozą kosztują firmę znacznie więcej niż sprint na dodatkowe badania.",
      problemStatement:
        "Specjaliści SEO muszą regularnie dowodzić klientom, że ich praca działa. Składają te podsumowania ręcznie, osobno per profil, kilka godzin miesięcznie. Klient jest nietechniczny i nigdy wcześniej nie logował się do naszego narzędzia. Skrócić raport można więc tylko kosztem zrozumiałości. A wtedy wracają pytania i spada zaufanie.",
    },
    discovery: {
      eyebrow: "03 · DISCOVERY",
      title: "Czego nie wiedzieliśmy o klientach naszych klientów.",
      intro1:
        "Miałam na discovery dwa tygodnie i robiłam je sama. Przy takich warunkach zdecydowałam się na osiem wywiadów pogłębionych — mix agencji i freelancerów — żeby zrozumieć kształt problemu: jak raportują dzisiaj i o co pytają ich klienci, jakich narzędzi, słów, kolorów i form używają, co klient robi z raportem po otrzymaniu.\n\nRównolegle przygotowałam ankietę ilościową (około 100 odpowiedzi), żeby wiedzieć, co i jak często użytkownicy raportują. Wywiad mówi, dlaczego ktoś coś robi. Ankieta mówi, ile osób robi to samo.",
      stats: [
        { value: "8", label: "Wywiadów pogłębionych" },
        { value: "100+", label: "Odpowiedzi\nz ankiet" },
      ],
      intro2:
        "Trzecim źródłem był zespół customer success. Są blisko użytkowników i ich problemów na co dzień, więc poza spotkaniem przejrzeliśmy razem zgłoszenia.\n\nPołączyłam dane jakościowe i ilościowe w jeden spójny obraz, używając do tego AI. Przeanalizował dla mnie materiały z badań ilościowych, jakościowych oraz transkrypty ze spotkań.",
      findingsTitle: "Kluczowe odkrycia",
      findings: [
        { number: "01", title: "Raport jest skanowany, nie analizowany", text: "Klient końcowy prowadzi własną firmę i nie siada do analizy liczb. Przelatuje raport wzrokiem." },
        { number: "02", title: "Składanie raportu to godziny, co miesiąc, od nowa", text: "Zbierali dane z kilku narzędzi i składali je ręcznie w jedną prezentację. Mówili wprost, że chętnie by to zautomatyzowali." },
        { number: "03", title: "Potrzeba edukacji klienta", text: "Do raportów często dołączano osobne wyjaśnienia: czym są dane i dlaczego mają znaczenie dla klienta." },
      ],
      personaTitle: "Klienci naszych klientów — persona",
      personaIntro:
        "Raporty mają dwóch odbiorców. Specjalista tworzy raport i pokazuje nim klientowi, że praca przynosi efekty. Klient końcowy tylko go skanuje. Projektowałam więc także dla kogoś, kto nie jest użytkownikiem naszego produktu.",
      personaCards: [
        { title: "Kim jest", text: "Nietechniczny właściciel firmy. Nie zna się na SEO i nie ma konta w Localo." },
        { title: "Czego chce", text: "Dwóch odpowiedzi: „czy jest lepiej” i „co mi to daje”." },
        { title: "Jak czyta", text: "Przelatuje raport wzrokiem. Nie ma czasu, umiejętności ani chęci, żeby analizować liczby i wykresy." },
      ],
    },
    reframing: {
      eyebrow: "04 · RE-FRAMING",
      title: "Problemem nie był dostęp, tylko wysiłek",
      text:
        "Hipoteza, z którą zaczynaliśmy, nie obroniła się w badaniach. Problemem nie był dostęp do danych — tylko wysiłek i zaangażowanie, których wejście do narzędzia wymagałoby od klienta. To odwróciło kierunek: zamiast wpuszczać klienta do Localo, trzeba było wypchnąć raport do niego.\nPrzedstawiłam CEO wyniki badań, sformułowany problem i nową hipotezę. Przyjął je bez oporu — dane były jednoznaczne.",
      shiftTitle: "Zmiana kierunku",
      hypothesisRejected: {
        title: "Hipoteza na starcie",
        status: "Obalona",
        text: "Wpuśćmy klienta do narzędzia w trybie tylko do odczytu, a sam sprawdzi swoje dane. Problemem nie był dostęp, tylko wysiłek i zaangażowanie.",
      },
      hypothesisLive: {
        title: "Hipoteza właściwa",
        status: "New!",
        note: "Sprawdzian: jaki udział użytkowników raportów włącza automat i jaka część z nich nie generuje ręcznie w ogóle.",
        text: "Jeśli raport będzie powstawał sam i trafiał do klienta, specjaliści przejdą na autoraportowanie i przestaną tworzyć raporty ręcznie.",
      },
      goal: "Zbudować narzędzie do automatycznego raportowania, które jasno pokazuje wyniki nietechnicznym klientom i buduje zaufanie do współpracy.",
    },
    decyzje: {
      eyebrow: "05 · KLUCZOWE DECYZJE I KOMPROMISY",
      title: "Decyzje, które wpłynęły na kierunek",
      mainDecision: {
        title: "Generowanie z pełnych danych, selekcja dopiero przed wysyłką raportu",
        steps: [
          { label: "Odrzucony wariant:", text: "Wybór elementów raportu przed generowaniem wydawał się logicznym flow. Utwórz raport → z okresu → wybierz dane → generuj." },
          { label: "Powód:", text: "Każdy nowy raport generuje mapę pozycji, a to kosztuje. Przy wyborze przed generowaniem użytkownik produkowałby nowy raport przy każdej zmianie zdania." },
          { label: "Efekt:", text: "Niższy koszt po naszej stronie i mniejsze tarcie po stronie użytkownika. Jedna decyzja, dwa wygrane fronty." },
        ],
      },
      pair: [
        {
          title: "Kreator jako asystent, nie pusty formularz",
          text: "Raport generuje się sam, a użytkownik dostaje gotowy draft. Zmienia, akceptuje i wysyła. Ostatnie słowo zostaje po jego stronie: automat przygotowuje, ale nie decyduje za niego.\n\nPowód: projektowanie w zgodzie z misją firmy — automatyzacja wykonania, nie zastąpienie rozumienia.",
        },
        {
          title: "Bez API, z linkiem i PDF-em",
          text: "Część zgłoszeń supportu dotyczyła API do Localo. Zamiast budować integrację dla nielicznych, daliśmy raport w trzech formach: wysyłka mailem, link i PDF.\n\nEfekt: ta sama potrzeba obsłużona ułamkiem kosztu.",
        },
      ],
    },
    handoff: {
      eyebrow: "06 · HANDOFF I DEVELOPMENT",
      title: "Handoff to coś więcej niż przekazanie makiet",
      intro:
        "Devowie dostali makiety w Figmie ułożone we flow, a nie luźne ekrany: wszystkie stany, przykłady notyfikacji, wersje mobilne i adnotacje wdrożeniowe w miejscach, które wymagały decyzji. Do tego opis sytuacji brzegowych, tokeny z design systemu i klikalny prototyp.\n\nByłam z devami w kontakcie na bieżąco, więc pytania rozstrzygały się od ręki. Sprawdzałam wdrożenie na środowisku testowym i zgłaszałam różnice względem projektu.",
      infraTitle: "Jedna z funkcji przegrała z infrastrukturą",
      infraText:
        "W raportach wysyłanych mailem miały być interaktywne mapy pozycji. Funkcja była gotowa i nie weszła. Zobaczyliśmy to przed releasem: klienty pocztowe radzą sobie z linkami słabo — filtry je wykrywały i testowe wiadomości trafiały do spamu.\n\nTo najbardziej frustrujący moment tego projektu. Funkcja działała i była dobra — przegrała z infrastrukturą. Dobra wiadomość jest taka, że dowiedzieliśmy się o tym my, a nie użytkownicy.",
    },
    rozwiazanie: {
      eyebrow: "07 · ROZWIĄZANIE",
      title: "Raporty, które robią się same",
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
    wynik: {
      eyebrow: "08 · WYNIK I DOWODY",
      title: "Co pokazały liczby",
      heroStat: { value: "11–13%", label: "aktywnych użytkowników tworzy raport w danym miesiącu — mniej więcej jeden na dziewięciu zmienił nawyk" },
      smallStats: [
        { value: "60%", label: "użytkowników włączyło auto generowanie" },
        { value: "~11×", label: "częściej płacą niż reszta bazy" },
        { value: "44%", label: "nie tworzy już raportu ręcznie" },
        { value: "~20x", label: "wyższe blended LTV niż reszta bazy" },
      ],
      dataCaption: "Dane z okresu październik 2025 – czerwiec 2026, od analityka danych w Localo.",
      whatItMeansTitle: "Co za tymi liczbami stoi",
      paras: [
        "Przez dziewięć miesięcy udział twórców raportów trzyma się w przedziale 11–13%. Po premierze urósł, w grudniu sięgnął szczytu, potem osiadł nieco niżej — ale się utrzymał. To nie jest krzywa świeżej funkcji, tylko nowy nawyk.",
        "44% to nie jest adopcja, to zmiana nawyku. Ci ludzie przestali robić ręcznie coś, co robili ręcznie od zawsze. Auto jest tu trybem dominującym, nie dodatkiem — i to jest dla mnie najmocniejsza liczba na tej liście.",
        "Użytkownicy raportów płacą ~11× częściej niż reszta bazy i mają ~20× wyższe blended LTV. Nie wiemy, czy raporty stworzyły takie konta. Wiemy, że je w narzędziu trzymają.",
      ],
      quote: "Są klienci, którzy płacą tylko za to. Ta funkcja rozwiązała problem użytkowników, co zmniejszyło tarcie i churn.",
      quoteAttribution: "Localo CEO",
    },
    podsumowanie: {
      eyebrow: "09 · PODSUMOWANIE",
      title: "Projekt nie skończył się na wdrożeniu",
      intro:
        "Przez kolejne tygodnie obserwowaliśmy adaptację do nowej funkcji. Analizowałam nagrania w Clarity, żeby zobaczyć, jak użytkownicy radzą sobie z raportami. Sprawdzałam, czy w ticketach supportu nie pojawiają się zgłoszenia dotyczące tej funkcji.",
      lessons: [
        { title: "Wiem, że nic nie wiem", text: "Najcenniejsze w tym projekcie nie było samo badanie, tylko to, że zanim cokolwiek zaczęliśmy budować, wypisaliśmy listę rzeczy, których nie wiemy. Hipoteza CEO nie upadła dlatego, że była głupia — była rozsądna." },
        { title: "Techniczne nie znaczy później", text: "Wciągnięcie developerów na etapie koncepcji, a nie handoffu, zmieniło kształt produktu. Ograniczenia klientów pocztowych nie były detalem implementacyjnym — były czynnikiem, który zdefiniował, jak wygląda raport." },
      ],
      nextProjectLabel: "Zobacz kolejny projekt",
    },
  },
  en: {
    heroEyebrow: "CASE STUDY · LOCALO — REPORT BUILDER",
    heroTitle: "Automatic reports, built into the product.",
    heroLead:
      "We didn't invite clients into the tool. We sent the report to them instead. Now 60% of feature users rely on auto-generation in Localo.",
    metaBar: [
      { label: "PRODUCT", value: "Localo" },
      { label: "ROLE", value: "Design Lead" },
      { label: "SCALE", value: "8,600+ users" },
      { label: "DATA", value: "Oct 2025 – Jun 2026" },
    ],
    chapters: {
      skrot: "01 At a glance",
      problem: "02 Problem",
      discovery: "03 Discovery",
      reframing: "04 Re-framing",
      decyzje: "05 Decisions",
      handoff: "06 Handoff",
      rozwiazanie: "07 Solution",
      wynik: "08 Results",
      podsumowanie: "09 Summary",
    },
    skrot: {
      eyebrow: "01 · CONTEXT, IMPACT & ROLE",
      title: "At a glance",
      intro:
        "Localo is a tool for people managing Google Business Profiles — one or dozens at a time. It automates the work and tells you what to do next: a weekly task list with priorities for every profile, audits in seconds, reports ready to send to a client in minutes.",
      contextPanel: {
        title: "Project context",
        text:
          "The CEO came in with a ready-made solution: let users invite their clients into Localo. The agency's client logs in and checks the data, specialists stop wasting time on reporting. Logical. The problem underneath was real.\nWe ended up building the exact opposite. Instead of letting the agency's client into Localo, we built a report that generates and sends itself with one click.",
      },
      statsIntroTitle: "The impact — three numbers",
      statsIntroDesc:
        "They show strong trust in the process and real relief from a repetitive, time-consuming task.",
      stats: [
        { value: "44%", label: "Of report users never create a report manually. Automation is their default mode, not an add-on." },
        { value: "11–13%", label: "Share of active users who create a report in a given month — stable for nine months straight." },
        { value: "~20x", label: "Higher blended LTV than the rest of the base. Correlation, not an experiment." },
      ],
      roleOverline: "MY ROLE — DESIGN LEAD, END TO END",
      roleQuote: "At Localo I owned the entire product — from discovery to delivery.",
      roleList: [
        "defined the problems",
        "led research and designed the UI/UX",
        "tested with users and iterated",
        "advised on what made the roadmap and what didn't",
        "grew the design system and maintained it together with engineering",
        "joined client calls",
        "mentored a junior product designer",
      ],
      scopePanel: {
        title: "Reports is one of the modules.",
        blocks: [
          { label: "MY SCOPE", text: "research (desk research, benchmarking, in-depth interviews, quantitative surveys), scope, information architecture, wireframes and flow, UI/UX and prototype" },
          { label: "COLLABORATION", text: "With the CEO at the strategic level, with engineers on implementation, with a data analyst on metrics. I supported the writer on content and QA on testing." },
        ],
      },
    },
    problem: {
      eyebrow: "02 · PROBLEM FRAMING",
      title: "The problem was real. The solution wasn't obvious.",
      intro:
        "Before reports existed, users stitched them together by hand. Screenshots from several tools — Localo and Ahrefs among them — pasted into a presentation, their own commentary, data filled in, sent to the client. Separately for every managed profile. In interviews they said it took a few hours a month.\n\nThe CEO's proposal answered that directly: if the problem is assembling the report by hand, remove the report from the equation and let the client into the tool.",
      researchTitle: "Research questions",
      researchDesc: "To avoid blind hypotheses, we had to confront the basics.",
      questions: [
        "Does the end client even want to log into another tool?",
        "Does our user want to show them the whole platform, with everything on it?",
        "Will the client understand what they're looking at?",
        "And if they don't — won't the extra education burden our user more than the automation relieves them?",
        "Who are our clients' clients, really?",
        "What do they need, and how do they read these reports?",
      ],
      alert: "We had none of these answers, and any one of them could have derailed the project after it was already built.",
      closing:
        "I convinced the CEO that this was the moment to invest time in deepening the problem: two or three months of work on a wrongly framed diagnosis costs the company far more than a sprint of extra research.",
      problemStatement:
        "SEO specialists have to regularly prove to clients that their work is paying off. They put these summaries together by hand, separately per profile, a few hours every month. The client is non-technical and has never logged into our tool before. So the report can only be shortened at the cost of clarity. And then the questions come back, and trust drops.",
    },
    discovery: {
      eyebrow: "03 · DISCOVERY",
      title: "What we didn't know about our clients' clients.",
      intro1:
        "I had two weeks for discovery and ran it solo. Under those conditions I settled on eight in-depth interviews — a mix of agencies and freelancers — to understand the shape of the problem: how they report today and what their clients ask, which tools, words, colours and formats they use, what the client does with the report after receiving it.\n\nIn parallel I ran a quantitative survey (around 100 responses) to know what and how often users report. An interview tells you why someone does something. A survey tells you how many people do the same thing.",
      stats: [
        { value: "8", label: "In-depth interviews" },
        { value: "100+", label: "Survey\nresponses" },
      ],
      intro2:
        "The third source was the customer success team. They're close to users and their problems day to day, so besides a meeting we went through tickets together.\n\nI combined the qualitative and quantitative data into one coherent picture using AI. It analysed the quantitative and qualitative research materials and the meeting transcripts for me.",
      findingsTitle: "Key findings",
      findings: [
        { number: "01", title: "Reports are scanned, not analysed", text: "The end client runs their own business and doesn't sit down to analyse numbers. They skim the report." },
        { number: "02", title: "Assembling a report is hours, every month, from scratch", text: "They collected data from several tools and put it together by hand into one presentation. They said outright they'd happily automate it." },
        { number: "03", title: "Need for client education", text: "Reports often came with separate explanations: what the data is and why it matters to the client." },
      ],
      personaTitle: "Our clients' clients — the persona",
      personaIntro:
        "Reports have two audiences. The specialist creates the report and uses it to show the client the work is paying off. The end client only scans it. So I was also designing for someone who isn't a user of our product.",
      personaCards: [
        { title: "Who they are", text: "A non-technical business owner. Doesn't know SEO and doesn't have a Localo account." },
        { title: "What they want", text: "Two answers: \"is it getting better\" and \"what's in it for me\"." },
        { title: "How they read", text: "Skims the report visually. Has neither the time, the skill, nor the will to analyse numbers and charts." },
      ],
    },
    reframing: {
      eyebrow: "04 · RE-FRAMING",
      title: "The problem wasn't access — it was effort",
      text:
        "The hypothesis we started with didn't hold up in research. The problem wasn't access to the data — it was the effort and commitment that entering the tool would demand from the client. That flipped the direction: instead of letting the client into Localo, we had to push the report out to them.\nI presented the CEO with the research findings, the framed problem and the new hypothesis. He accepted them without resistance — the data was unambiguous.",
      shiftTitle: "Change of direction",
      hypothesisRejected: {
        title: "Starting hypothesis",
        status: "Rejected",
        text: "Give the client read-only access to the tool, and they'll check their own data. The problem wasn't access, it was the effort and commitment.",
      },
      hypothesisLive: {
        title: "The real hypothesis",
        status: "New!",
        note: "Test: what share of report users turns on automation, and how many never generate manually at all.",
        text: "If the report builds itself and reaches the client, specialists will switch to auto-reporting and stop creating reports manually.",
      },
      goal: "Build a tool for automatic reporting that clearly shows results to non-technical clients and builds trust in the collaboration.",
    },
    decyzje: {
      eyebrow: "05 · KEY DECISIONS & TRADE-OFFS",
      title: "Decisions that shaped the direction",
      mainDecision: {
        title: "Generate from the full dataset, select only before sending the report",
        steps: [
          { label: "Rejected option:", text: "Choosing report elements before generation seemed like the logical flow. Create report → pick a period → choose data → generate." },
          { label: "Reason:", text: "Every new report generates a rank map, and that costs money. Selecting before generation meant the user would produce a new report every time they changed their mind." },
          { label: "Effect:", text: "Lower cost on our side and less friction on the user's side. One decision, two wins." },
        ],
      },
      pair: [
        {
          title: "The builder as an assistant, not an empty form",
          text: "The report generates itself, and the user gets a ready draft. They edit, approve and send. The final word stays with them: the automation prepares, it doesn't decide for them.\n\nReason: designing in line with the company's mission — automating execution, not replacing understanding.",
        },
        {
          title: "No API — a link and a PDF instead",
          text: "Some support tickets asked for a Localo API. Instead of building an integration for the few, we shipped the report in three forms: email, link, or PDF.\n\nEffect: the same need covered at a fraction of the cost.",
        },
      ],
    },
    handoff: {
      eyebrow: "06 · HANDOFF & DEVELOPMENT",
      title: "Handoff is more than passing over mockups",
      intro:
        "Engineers got Figma mockups arranged into flows, not loose screens: every state, notification examples, mobile versions, and implementation notes wherever a decision was needed. Plus a write-up of edge cases, design-system tokens, and a clickable prototype.\n\nI stayed in constant contact with the developers, so questions got resolved on the spot. I checked the build on the test environment and flagged differences from the design.",
      infraTitle: "One feature lost to infrastructure",
      infraText:
        "Reports sent by email were meant to include interactive rank maps. The feature was built and didn't ship. We caught it before release: email clients handle links poorly — filters flagged them and test messages landed in spam.\n\nThis was the most frustrating moment of the project. The feature worked and was good — it lost to infrastructure. The good news is that we found out, not the users.",
    },
    rozwiazanie: {
      eyebrow: "07 · SOLUTION",
      title: "Reports that build themselves",
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
    wynik: {
      eyebrow: "08 · RESULTS & PROOF",
      title: "What the numbers showed",
      heroStat: { value: "11–13%", label: "of active users create a report in a given month — roughly one in nine changed a habit" },
      smallStats: [
        { value: "60%", label: "of users turned on auto-generation" },
        { value: "~11×", label: "more often they pay compared to the rest of the base" },
        { value: "44%", label: "no longer creates a report manually" },
        { value: "~20x", label: "higher blended LTV than the rest of the base" },
      ],
      dataCaption: "Data from October 2025 – June 2026, from Localo's data analyst.",
      whatItMeansTitle: "What's behind these numbers",
      paras: [
        "Over nine months, the share of report creators has held in the 11–13% range. It grew after launch, peaked in December, then settled a little lower — but it held. This isn't the curve of a fresh feature, it's a new habit.",
        "44% isn't adoption, it's a habit change. These people stopped manually doing something they'd always done manually. Auto is the dominant mode here, not an add-on — and to me that's the strongest number on this list.",
        "Report users pay ~11× more often than the rest of the base and have ~20× higher blended LTV. We don't know if reports created those accounts. We know they keep them in the tool.",
      ],
      quote: "Some clients pay just for this. This feature solved a real user problem, which reduced friction and churn.",
      quoteAttribution: "Localo CEO",
    },
    podsumowanie: {
      eyebrow: "09 · SUMMARY",
      title: "The project didn't end at launch",
      intro:
        "Over the following weeks we watched how the new feature was adopted. I reviewed Clarity recordings to see how users handled reports. I checked support tickets for anything related to the feature.",
      lessons: [
        { title: "I know that I know nothing", text: "The most valuable part of this project wasn't the research itself — it was that before we built anything, we wrote down everything we didn't know. The CEO's hypothesis didn't fail because it was foolish — it was reasonable." },
        { title: "Technical doesn't mean later", text: "Bringing engineers in at the concept stage, not at handoff, changed the shape of the product. Email client constraints weren't an implementation detail — they were a factor that defined what the report looks like." },
      ],
      nextProjectLabel: "See the next project",
    },
  },
}
