// Translation dictionary. Add new keys to both `en` and `ro` together.
// JSX-bearing strings (like the hero title with a styled <span>) live in components,
// not here — those components compose smaller text fragments from this dictionary.

export type Lang = 'en' | 'ro'

const en = {
    nav: {
      problem: 'Problem',
      solution: 'Solution',
      features: 'Features',
      howItWorks: 'How it works',
      useCases: 'Use cases',
      getStarted: 'Get started',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      home: 'Processly home',
    },
    common: {
      backToTop: 'Back to top',
      languageEN: 'EN',
      languageRO: 'RO',
      switchLanguage: 'Switch language',
    },
    hero: {
      badge: 'Process & project orchestration',
      titleA: 'Design your work once.',
      titleB: 'Run it forever.',
      body: 'Processly turns messy, repeatable work into visual processes you can launch on demand. Define a workflow once — then generate projects from it with one click, on a schedule, or both.',
      ctaPrimary: 'See it in motion',
      ctaSecondary: 'Read the features',
    },
    trust: {
      eyebrow: 'Built for the work that repeats',
      tokens: [
        'Customer onboarding',
        'Hiring & approvals',
        'Compliance reviews',
        'Vendor renewals',
        'QA workflows',
        'Monthly closes',
        'Incident playbooks',
        'Procurement intake',
      ] as string[],
    },
    problem: {
      eyebrow: 'The problem',
      titleA: 'Work that repeats',
      titleB: 'deserves a system.',
      description:
        'Most teams run the same playbook every week, but track it in a patchwork of docs, spreadsheets, and DMs. The system of record is whoever happens to remember.',
      items: [
        {
          title: 'Tribal knowledge',
          body: 'Workflows live in someone’s head, not in a system. New hires re-discover them every quarter, and the steps quietly drift over time.',
        },
        {
          title: 'Diffuse accountability',
          body: 'When everyone is CC’d, no one is responsible. Steps stall waiting on owners that were never explicitly named.',
        },
        {
          title: 'Invisible progress',
          body: 'You can’t see which projects are on track without asking three people across three tools. Status is always one Slack thread away.',
        },
      ],
    },
    solution: {
      eyebrow: 'The model',
      titleA: 'Processes are templates.',
      titleB: 'Projects are runs.',
      description:
        'Processly separates the design of work from the doing of it. Sketch a workflow once on a visual canvas — then spin up live, state-tracked instances whenever the work needs to happen.',
      processLabel: 'Process',
      processTitle: 'The reusable template.',
      processBody:
        'A graph of steps, the fields each step collects, the people responsible, and the time it should take. Designed once.',
      processSteps: ['Intake', 'Review', 'Approve'] as string[],
      projectLabel: 'Project',
      projectTitle: 'The live instance.',
      projectBody:
        'Generated from a process. Each run is independent — it logs its own status changes and field values, on its own timeline.',
      callouts: [
        'Edit a process — your in-flight projects are unaffected',
        'Generate one project, or many on a recurrence',
        'Each project carries its own state, deadlines, and history',
      ] as string[],
      flowProcess: 'Process',
      flowGenerate: 'Generate',
      flowProject: 'Project',
    },
    features: {
      eyebrow: 'Features',
      titleA: 'Eight ideas that change',
      titleB: 'how repeatable work runs.',
      description:
        'Each feature exists because the alternative is a meeting, a spreadsheet, or a Slack message that nobody reads.',
      items: [
        {
          title: 'Visual DAG editor',
          body: 'Drag, drop, connect. Steps are nodes; dependencies are edges. No flat checklists pretending to be workflows.',
        },
        {
          title: 'One-click projects',
          body: 'Generate turns any process into a live, state-tracked instance — fields, owners, deadlines, and all.',
        },
        {
          title: 'RACI involvements',
          body: 'Responsible, Support, Informed. Assign people, teams, or functional roles at every step.',
        },
        {
          title: 'Sub-processes',
          body: 'A step can invoke another process. Nest workflows like functions; complex playbooks compose cleanly.',
        },
        {
          title: 'Recurring schedules',
          body: 'Daily, weekly, monthly. Processly spins up the next project automatically — the work shows up on its own.',
        },
        {
          title: 'Working-hours deadlines',
          body: 'Deadlines respect your team’s schedule — Mon–Fri, 9–5, your time zone — not 24/7 wall-clock time.',
        },
        {
          title: 'Field hand-offs',
          body: 'Mark a field as output and it appears upstream on the next step’s page — no re-typing across teams.',
        },
        {
          title: 'Public read-only links',
          body: 'Share a project’s status with a client or partner without giving them access to your tools.',
        },
      ],
    },
    how: {
      eyebrow: 'How it works',
      titleA: 'Four steps to make',
      titleB: 'work repeatable.',
      description:
        'It is the same loop every time: design, define, generate, run. Once you have done it once, every future instance is a click.',
      steps: [
        {
          title: 'Design',
          body: 'Sketch your workflow on a visual canvas. Each step is a node; connect them however your team actually works — branches, joins, parallel paths welcome.',
        },
        {
          title: 'Define',
          body: 'For each step, declare the fields it collects, who is responsible, and roughly how long it takes. The schema becomes your source of truth.',
        },
        {
          title: 'Generate',
          body: 'When the work needs to happen, generate a project. Once. On demand. Or on a recurring schedule that respects working hours.',
        },
        {
          title: 'Run',
          body: 'Each project tracks its own state. Steps cascade automatically. Owners get pinged. Field values flow downstream. Everyone sees what is next.',
        },
      ],
    },
    showcase: {
      eyebrow: 'Inside Processly',
      titleA: 'The same model,',
      titleB: 'wherever you look.',
      description:
        'From the canvas to the dashboard to the read-only public link, Processly keeps a single shape: steps with status, owners, and history.',
      caption1Lead: 'Project view.',
      caption1:
        'The live timeline of a single instance — completed, in progress, and pending steps with their owners and deadlines.',
      caption2Lead: 'Projects index.',
      caption2:
        'Everything currently running across your organisation, scoped to what each member is involved in.',
    },
    useCases: {
      eyebrow: 'Use cases',
      titleA: 'The work this is',
      titleB: 'built to absorb.',
      description:
        'Anywhere the same playbook runs more than twice, Processly earns its keep.',
      items: [
        {
          title: 'Customer onboarding',
          body: 'Same twelve steps, every new account. Generate one project per customer; let the team pick up exactly where the last one left off.',
          tag: 'Sales → Onboarding → Success',
        },
        {
          title: 'Hiring & approvals',
          body: 'Every requisition needs the same five sign-offs. Make them happen automatically, in the right order, with the right people.',
          tag: 'Manager · Recruiter · Director',
        },
        {
          title: 'Recurring operations',
          body: 'End-of-month closes, weekly QA passes, quarterly reviews. Set the recurrence; Processly generates the next project on schedule.',
          tag: 'Daily · Weekly · Monthly',
        },
        {
          title: 'Cross-team handoffs',
          body: 'When work leaves your team, it shouldn’t leave the system. Each team sees only the steps they own — context is never lost in translation.',
          tag: 'Public read-only sharing',
        },
      ],
    },
    architecture: {
      eyebrow: 'Under the hood',
      titleA: 'Status that flows',
      titleB: 'by itself.',
      description:
        'Processly behaves less like a checklist and more like a small runtime. Steps obey rules; the engine moves work along so people don’t have to.',
      items: [
        {
          title: 'Cascading transitions',
          body: 'Start a project — root steps start. Finish a step — the next ones begin. Hold or cancel propagates downstream automatically.',
          // code intentionally not translated — kept identical across locales
          code: 'on(stepCompleted) → startEligibleSuccessors()',
        },
        {
          title: 'Conditional starts',
          body: 'Mark a step "wait until everything upstream is done" — or "start manually" when human judgment is required before the gate opens.',
          code: 'step.requireUpstreamComplete = true',
        },
        {
          title: 'Live audit trail',
          body: 'Every status change and every field edit is logged with timestamp and actor. Compliance gets the receipts; the team gets the history.',
          code: 'log: actor · field · before → after',
        },
      ],
    },
    benefits: {
      eyebrow: 'Outcomes',
      titleA: 'What changes when',
      titleB: 'the work runs itself.',
      items: [
        {
          value: 'Onboarding',
          label: 'as a working system',
          body: 'New hires inherit institutional knowledge by running the workflow, not by reading a wiki page that was last updated two reorgs ago.',
        },
        {
          value: 'Ownership',
          label: 'baked into every step',
          body: 'Every step has a name on it; every project has a responsible party. Accountability is structural, not aspirational.',
        },
        {
          value: 'Visibility',
          label: 'always on, by default',
          body: 'A live dashboard of everything running, everything late, and everything up next. No more cross-team status meetings.',
        },
      ],
    },
    cta: {
      eyebrow: 'Make work repeatable',
      titleA: 'Spin up your first process.',
      titleB: 'Watch the rest run itself.',
      body: 'Sketch a workflow, generate your first project, and let Processly handle deadlines, owners, and status from there.',
      ctaPrimary: 'Get started',
      ctaSecondary: 'Read the docs',
    },
    footer: {
      blurb:
        'The visual operating system for repeatable work. Design a process once, generate projects from it as many times as you need — with full ownership, deadlines, and history baked in.',
      groups: {
        product: 'Product',
        company: 'Company',
        resources: 'Resources',
      },
      links: {
        features: 'Features',
        howItWorks: 'How it works',
        useCases: 'Use cases',
        architecture: 'Architecture',
        getStarted: 'Get started',
        about: 'About',
        contact: 'Contact',
        documentation: 'Documentation',
        changelog: 'Changelog',
        privacy: 'Privacy',
      },
      copyright: (year: number) => `© ${year} Processly. All rights reserved.`,
      tagline: 'Designed for teams who orchestrate work like code.',
    },
    mockup: {
      editor: {
        projectLabel: 'processly · customer-onboarding',
        live: 'Live',
        done: 'done',
        inProgress: 'in progress',
        pending: 'pending',
        steps: 'steps',
        est: 'est. 2d 4h',
      },
      dashboard: {
        eyebrow: 'Project · Acme Corp onboarding',
        title: '5 steps · 2 of 5 complete',
        steps: [
          { title: 'Intake form received', owner: 'Sales', due: 'Mon' },
          { title: 'Vetting & risk check', owner: 'Compliance', due: 'Tue' },
          { title: 'Review proposal', owner: 'Maria · Ops', due: 'Today' },
          { title: 'Approval — sign-off', owner: 'Director', due: 'Thu' },
          { title: 'Hand-off to delivery', owner: 'Delivery team', due: 'Fri' },
        ],
      },
      projects: {
        title: 'All projects',
        active: '4 active',
        statusInProgress: 'In progress',
        statusPending: 'Not started',
        statusDone: 'Completed',
        cards: [
          { title: 'Acme Corp onboarding', team: 'Onboarding' },
          { title: 'Q2 hiring — Senior Eng', team: 'People Ops' },
          { title: 'Vendor renewal', team: 'Procurement' },
          { title: 'Monthly close · Apr', team: 'Finance' },
        ],
      },
    },
}

export type Dict = typeof en

const ro: Dict = {
    nav: {
      problem: 'Problema',
      solution: 'Soluția',
      features: 'Funcționalități',
      howItWorks: 'Cum funcționează',
      useCases: 'Cazuri de utilizare',
      getStarted: 'Începe acum',
      openMenu: 'Deschide meniul',
      closeMenu: 'Închide meniul',
      home: 'Pagina principală Processly',
    },
    common: {
      backToTop: 'Sus',
      languageEN: 'EN',
      languageRO: 'RO',
      switchLanguage: 'Schimbă limba',
    },
    hero: {
      badge: 'Orchestrare de procese și proiecte',
      titleA: 'Proiectează munca o singură dată.',
      titleB: 'Lasă-o să ruleze la nesfârșit.',
      body: 'Processly transformă munca repetitivă și haotică în procese vizuale pe care le poți lansa la cerere. Definește un flux o dată — apoi generează proiecte din el cu un singur click, după program, sau ambele.',
      ctaPrimary: 'Vezi-l în acțiune',
      ctaSecondary: 'Citește funcționalitățile',
    },
    trust: {
      eyebrow: 'Construit pentru munca ce se repetă',
      tokens: [
        'Onboarding clienți',
        'Recrutare și aprobări',
        'Revizii de conformitate',
        'Reînnoiri de furnizori',
        'Fluxuri de QA',
        'Închideri lunare',
        'Manuale de incidente',
        'Cereri de achiziție',
      ] as string[],
    },
    problem: {
      eyebrow: 'Problema',
      titleA: 'Munca care se repetă',
      titleB: 'merită un sistem.',
      description:
        'Majoritatea echipelor rulează același plan în fiecare săptămână, dar îl țin într-un amestec de documente, foi de calcul și mesaje directe. Sistemul de evidență este oricine se întâmplă să-și amintească.',
      items: [
        {
          title: 'Cunoștințe tribale',
          body: 'Fluxurile de lucru există în mintea cuiva, nu într-un sistem. Noii angajați le redescoperă în fiecare trimestru, iar pașii se schimbă pe nesimțite în timp.',
        },
        {
          title: 'Responsabilitate diluată',
          body: 'Când toată lumea e pusă în CC, nimeni nu e responsabil. Pașii stagnează așteptând proprietari care nu au fost niciodată numiți explicit.',
        },
        {
          title: 'Progres invizibil',
          body: 'Nu poți vedea care proiecte sunt pe drumul cel bun fără să întrebi trei oameni din trei aplicații. Statusul e mereu la un fir de Slack distanță.',
        },
      ],
    },
    solution: {
      eyebrow: 'Modelul',
      titleA: 'Procesele sunt șabloane.',
      titleB: 'Proiectele sunt instanțe.',
      description:
        'Processly separă proiectarea muncii de execuția ei. Schițează un flux o singură dată pe o pânză vizuală — apoi pornește instanțe live, urmărite în timp real, ori de câte ori e nevoie.',
      processLabel: 'Proces',
      processTitle: 'Șablonul reutilizabil.',
      processBody:
        'Un graf de pași, câmpurile colectate la fiecare pas, persoanele responsabile și timpul estimat. Proiectat o singură dată.',
      processSteps: ['Primire', 'Verificare', 'Aprobare'] as string[],
      projectLabel: 'Proiect',
      projectTitle: 'Instanța vie.',
      projectBody:
        'Generată dintr-un proces. Fiecare execuție e independentă — își înregistrează propriile schimbări de status și valori de câmp, pe propria linie de timp.',
      callouts: [
        'Modifici un proces — proiectele în derulare nu sunt afectate',
        'Generezi un proiect, sau mai multe pe bază de recurență',
        'Fiecare proiect își poartă propriul status, termene și istoric',
      ] as string[],
      flowProcess: 'Proces',
      flowGenerate: 'Generează',
      flowProject: 'Proiect',
    },
    features: {
      eyebrow: 'Funcționalități',
      titleA: 'Opt idei care schimbă',
      titleB: 'modul în care rulează munca repetitivă.',
      description:
        'Fiecare funcționalitate există fiindcă alternativa e o ședință, o foaie de calcul sau un mesaj Slack pe care nu-l citește nimeni.',
      items: [
        {
          title: 'Editor vizual DAG',
          body: 'Trage, plasează, conectează. Pașii sunt noduri; dependențele sunt muchii. Fără liste plate care se prefac a fi fluxuri.',
        },
        {
          title: 'Proiecte cu un singur click',
          body: 'Generate transformă orice proces într-o instanță vie, urmărită în timp real — câmpuri, proprietari, termene, tot.',
        },
        {
          title: 'Implicări RACI',
          body: 'Responsabil, Suport, Informat. Atribuie persoane, echipe sau roluri funcționale la fiecare pas.',
        },
        {
          title: 'Sub-procese',
          body: 'Un pas poate invoca un alt proces. Imbrici fluxuri ca pe niște funcții; manualele complexe se compun curat.',
        },
        {
          title: 'Programări recurente',
          body: 'Zilnic, săptămânal, lunar. Processly pornește automat următorul proiect — munca apare singură.',
        },
        {
          title: 'Termene în program de lucru',
          body: 'Termenele respectă programul echipei tale — Lun–Vin, 9–17, fusul tău orar — nu timpul real 24/7.',
        },
        {
          title: 'Predarea câmpurilor',
          body: 'Marchează un câmp ca rezultat și apare în amonte pe pagina pasului următor — fără să-l mai retastezi între echipe.',
        },
        {
          title: 'Linkuri publice doar pentru citire',
          body: 'Distribuie statusul unui proiect cu un client sau partener fără să le dai acces la uneltele tale.',
        },
      ],
    },
    how: {
      eyebrow: 'Cum funcționează',
      titleA: 'Patru pași pentru a face',
      titleB: 'munca repetabilă.',
      description:
        'E aceeași buclă de fiecare dată: proiectează, definește, generează, rulează. Odată ce ai făcut-o o dată, fiecare instanță viitoare e la un click distanță.',
      steps: [
        {
          title: 'Proiectează',
          body: 'Schițează fluxul tău pe o pânză vizuală. Fiecare pas e un nod; conectează-le exact cum lucrează echipa ta — ramuri, îmbinări, căi paralele, toate sunt binevenite.',
        },
        {
          title: 'Definește',
          body: 'Pentru fiecare pas, declară câmpurile colectate, persoana responsabilă și cât durează aproximativ. Schema devine sursa ta de adevăr.',
        },
        {
          title: 'Generează',
          body: 'Când munca trebuie să se întâmple, generează un proiect. O dată. La cerere. Sau pe un program recurent care respectă orele de lucru.',
        },
        {
          title: 'Rulează',
          body: 'Fiecare proiect își urmărește propriul status. Pașii cascadează automat. Proprietarii sunt notificați. Valorile de câmp curg în aval. Fiecare vede ce urmează.',
        },
      ],
    },
    showcase: {
      eyebrow: 'În interiorul Processly',
      titleA: 'Același model,',
      titleB: 'oriunde te uiți.',
      description:
        'De la pânza de design la dashboard și până la link-ul public doar pentru citire, Processly păstrează aceeași formă: pași cu status, proprietari și istoric.',
      caption1Lead: 'Vizualizarea proiectului.',
      caption1:
        'Linia temporală live a unei singure instanțe — pași finalizați, în desfășurare și în așteptare, cu proprietarii și termenele lor.',
      caption2Lead: 'Index de proiecte.',
      caption2:
        'Tot ce rulează în prezent în organizația ta, filtrat după ce este implicat fiecare membru.',
    },
    useCases: {
      eyebrow: 'Cazuri de utilizare',
      titleA: 'Munca pe care e',
      titleB: 'construit să o absoarbă.',
      description:
        'Oriunde același plan rulează de mai mult de două ori, Processly își justifică existența.',
      items: [
        {
          title: 'Onboarding clienți',
          body: 'Aceiași doisprezece pași, pentru fiecare cont nou. Generezi un proiect pe client; echipa preia exact de unde s-a oprit cu cel anterior.',
          tag: 'Vânzări → Onboarding → Succes',
        },
        {
          title: 'Recrutare și aprobări',
          body: 'Fiecare cerere are nevoie de aceleași cinci aprobări. Fă-le să se întâmple automat, în ordinea corectă, cu oamenii potriviți.',
          tag: 'Manager · Recrutor · Director',
        },
        {
          title: 'Operațiuni recurente',
          body: 'Închideri de lună, treceri săptămânale de QA, recenzii trimestriale. Setezi recurența; Processly generează următorul proiect la timp.',
          tag: 'Zilnic · Săptămânal · Lunar',
        },
        {
          title: 'Predări între echipe',
          body: 'Când munca pleacă din echipa ta, nu trebuie să iasă din sistem. Fiecare echipă vede doar pașii ei — contextul nu se pierde în traducere.',
          tag: 'Distribuire publică doar pentru citire',
        },
      ],
    },
    architecture: {
      eyebrow: 'Sub capotă',
      titleA: 'Statusul care curge',
      titleB: 'de la sine.',
      description:
        'Processly se comportă mai puțin ca o listă de bifat și mai mult ca un mic runtime. Pașii respectă reguli; motorul mișcă munca înainte ca oamenii să nu fie nevoiți.',
      items: [
        {
          title: 'Tranziții în cascadă',
          body: 'Pornești un proiect — pașii rădăcină pornesc. Termini un pas — următorii încep. Pauza sau anularea se propagă în aval automat.',
          code: 'on(stepCompleted) → startEligibleSuccessors()',
        },
        {
          title: 'Porniri condiționate',
          body: 'Marchează un pas „așteaptă până se termină tot ce e în amonte" — sau „pornește manual" când e nevoie de judecată umană înainte ca poarta să se deschidă.',
          code: 'step.requireUpstreamComplete = true',
        },
        {
          title: 'Pistă de audit live',
          body: 'Fiecare schimbare de status și fiecare modificare de câmp e înregistrată cu timpul și actorul. Conformitatea primește chitanțele; echipa primește istoricul.',
          code: 'log: actor · field · before → after',
        },
      ],
    },
    benefits: {
      eyebrow: 'Rezultate',
      titleA: 'Ce se schimbă când',
      titleB: 'munca rulează singură.',
      items: [
        {
          value: 'Onboarding',
          label: 'ca sistem de lucru',
          body: 'Noii angajați moștenesc cunoștințele instituționale rulând fluxul, nu citind o pagină de wiki actualizată ultima dată cu două reorganizări în urmă.',
        },
        {
          value: 'Asumare',
          label: 'integrată în fiecare pas',
          body: 'Fiecare pas are un nume pe el; fiecare proiect are un responsabil. Asumarea e structurală, nu aspirațională.',
        },
        {
          value: 'Vizibilitate',
          label: 'mereu activă, implicit',
          body: 'Un dashboard live cu tot ce rulează, tot ce e întârziat și tot ce urmează. Fără ședințe de status între echipe.',
        },
      ],
    },
    cta: {
      eyebrow: 'Fă munca repetabilă',
      titleA: 'Pornește primul tău proces.',
      titleB: 'Privește restul cum rulează singur.',
      body: 'Schițează un flux, generează primul tău proiect, și lasă Processly să se ocupe de termene, proprietari și status de acolo încolo.',
      ctaPrimary: 'Începe acum',
      ctaSecondary: 'Citește documentația',
    },
    footer: {
      blurb:
        'Sistemul de operare vizual pentru munca repetitivă. Proiectează un proces o singură dată, generează proiecte din el de câte ori ai nevoie — cu asumare completă, termene și istoric incluse.',
      groups: {
        product: 'Produs',
        company: 'Companie',
        resources: 'Resurse',
      },
      links: {
        features: 'Funcționalități',
        howItWorks: 'Cum funcționează',
        useCases: 'Cazuri de utilizare',
        architecture: 'Arhitectură',
        getStarted: 'Începe acum',
        about: 'Despre',
        contact: 'Contact',
        documentation: 'Documentație',
        changelog: 'Jurnal de modificări',
        privacy: 'Confidențialitate',
      },
      copyright: (year: number) => `© ${year} Processly. Toate drepturile rezervate.`,
      tagline: 'Conceput pentru echipe care orchestrează munca precum codul.',
    },
    mockup: {
      editor: {
        projectLabel: 'processly · onboarding-clienți',
        live: 'Live',
        done: 'gata',
        inProgress: 'în lucru',
        pending: 'în așteptare',
        steps: 'pași',
        est: 'est. 2z 4h',
      },
      dashboard: {
        eyebrow: 'Proiect · Onboarding Acme Corp',
        title: '5 pași · 2 din 5 finalizați',
        steps: [
          { title: 'Formular de primire recepționat', owner: 'Vânzări', due: 'Lun' },
          { title: 'Verificare risc & conformitate', owner: 'Conformitate', due: 'Mar' },
          { title: 'Revizuire propunere', owner: 'Maria · Ops', due: 'Azi' },
          { title: 'Aprobare — semnătură', owner: 'Director', due: 'Joi' },
          { title: 'Predare către livrare', owner: 'Echipa de livrare', due: 'Vin' },
        ],
      },
      projects: {
        title: 'Toate proiectele',
        active: '4 active',
        statusInProgress: 'În lucru',
        statusPending: 'Neînceput',
        statusDone: 'Finalizat',
        cards: [
          { title: 'Onboarding Acme Corp', team: 'Onboarding' },
          { title: 'Recrutare T2 — Senior Eng', team: 'People Ops' },
          { title: 'Reînnoire furnizor', team: 'Achiziții' },
          { title: 'Închidere lunară · Apr', team: 'Finanțe' },
        ],
      },
    },
}

const dict: Record<Lang, Dict> = { en, ro }

export default dict
