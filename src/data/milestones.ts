import { beingAnEntrepreneur, fluvipThanks, funkyLessons, sellingBeer, subscriptionBoxPoints } from "./posts";
import type { Milestone, Post } from "./types";

const gallery = (...images: [file: string, alt: string][]) => ({
  kind: "gallery" as const,
  images: images.map(([file, alt]) => ({ src: `/images/journey/${file}`, alt })),
});

const posts = (...items: Post[]) => ({ kind: "posts" as const, label: "FROM MY BLOG · IN SPANISH", items });

const p = (text: string, variant?: "reflection" | "small") => ({ kind: "paragraph" as const, text, variant });

export const milestones: Milestone[] = [
  {
    id: "year2010",
    year: "2010",
    period: "AUG 2010 – DEC 2012",
    eyebrow: "FUNKY’S / CO-FOUNDER / CHÍA, COLOMBIA",
    titleLines: ["Where my entrepreneurial", "journey began."],
    learned: "Building a business is harder than it looks, and it changes the person who builds it.",
    blocks: [
      p("After graduating as a software engineer, while classmates were heading towards companies like Microsoft, I chose to co-found a small restaurant: Funky’s, in Chía, Colombia. It was an early lesson in how hard building a business can be, and how much it changes you."),
      p("I worked on the brand, business plan and sales strategies, alongside community management, website development and day-to-day operations."),
      posts(funkyLessons),
    ],
  },
  {
    id: "year2011",
    year: "2011",
    period: "JUN 2011 – MAY 2013",
    eyebrow: "CONECTANDO MENTES / FOUNDER & CEO",
    titleLines: ["My first digital venture."],
    learned: "Take an idea to people in person first: validate it and learn from early adopters.",
    blocks: [
      p("Conectando Mentes began as a proposal for a social network for entrepreneurs. I developed the brand, worked on sales and built the technical MVP of contactU, an application designed to make networking spaces more useful."),
      p("We created Mindup and Visionario workshops, taking the idea into an in-person format to validate it and learn from early adopters."),
      posts(beingAnEntrepreneur),
    ],
  },
  {
    id: "year2012",
    year: "2012–2013",
    yearIsRange: true,
    period: "SEP 2012 – DEC 2013",
    eyebrow: "3DEMENTES · IMAGINAMOS · YOUNG MARKETING",
    titleLines: ["Technical foundations."],
    blocks: [
      p("Across early roles in iOS and Ruby on Rails development, I strengthened the hands-on skills to turn ideas into working products, a foundation for the ventures that followed."),
    ],
  },
  {
    id: "year2014-tappsi",
    year: "2014",
    period: "JAN 2014 – JUN 2014",
    eyebrow: "TAPPSI / RUBY ON RAILS DEVELOPER",
    titleLines: ["My first look inside", "the startup world."],
    learned: "How product, funding and a business model come together.",
    blocks: [
      p("Tappsi was my first experience of startup life from the inside. While developing features for its internal platforms, I saw first-hand what raising investment felt like and how the business moved from a free app to a service taxi drivers paid to use."),
      p("It gave me an early view of how product, funding and a business model come together. Tappsi would later become a Colombian startup success story, joining Easy Taxi in 2015 and eventually becoming part of Cabify."),
    ],
  },
  {
    id: "year2014-fluvip",
    year: "2014",
    period: "MAY 2014 – APR 2017",
    eyebrow: "FLUVIP / FROM DEVELOPER TO TECHNOLOGY LEADER",
    titleLines: ["My school of", "entrepreneurship."],
    learned: "How to connect technology decisions with the realities of building a company.",
    blocks: [
      p("At FLUVIP, I experienced what it takes to grow from a team of four into a multinational with a presence across Latin America and the United States. Working alongside the founders, I saw fundraising, acceleration through Wayra and international expansion from the inside."),
      p("I grew with the business: starting as a developer, learning to lead others and taking on responsibilities as a product owner, project manager and CTO. It was where I learned to connect technology decisions with the realities of building a company."),
      p("The creator economy showed me how something once seen as a hobby could become a livelihood. Learning a new skill at the right moment could open opportunities far beyond someone’s background.", "reflection"),
      {
        kind: "facts",
        items: [
          { value: "4", label: "people in the team at the beginning" },
          { value: "20", label: "developers led" },
        ],
      },
      {
        kind: "details",
        summary: "Building for international growth",
        text: "The company raised US$4.5m. In three months, I delivered the technology requirements for the Spark acquisition in Brazil. Today, I remain a minority shareholder and am no longer operationally involved.",
      },
      gallery(["fluvip-wayra.webp", "Presenting the FLUVIP founding team on stage at Wayra"]),
      posts(fluvipThanks),
    ],
  },
  {
    id: "year2016",
    year: "2016",
    period: "DEC 2016 – APR 2018 · MY ROLE",
    eyebrow: "DFOUNDERS / CO-FOUNDER & CTO",
    titleLines: ["A company built", "to build companies."],
    companyBuilder: true,
    blocks: [
      p("I co-founded Dfounders as a company builder: a place to develop business models, build products and turn ideas into ventures. Beer Happy Club and HoyTrabajas emerged from this work, alongside other initiatives that did not take off."),
      p("I helped structure the business models and led technology decisions, bringing product development and commercial thinking together."),
      {
        kind: "ventureTree",
        ariaLabel: "Ventures that emerged from Dfounders",
        root: { eyebrow: "THE COMPANY BUILDER", name: "Dfounders", tagline: "From ideas to ventures" },
        ventures: [
          { href: "#year2017", name: "Beer Happy Club", note: "Craft beer subscription → El Puerto Cervecero" },
          { href: "#year2019", name: "HoyTrabajas", note: "Employment opportunities · Later YC W22" },
        ],
        experiments: { name: "Other initiatives", note: "Ideas explored that did not take off" },
      },
    ],
  },
  {
    id: "year2017",
    year: "2017",
    period: "APR 2017 – JAN 2020 · ROLES",
    eyebrow: "BEER HAPPY CLUB / EL PUERTO CERVECERO",
    titleLines: ["A venture beyond software."],
    learned: "Commercial validation and financial discipline come before growth.",
    blocks: [
      { kind: "origin", href: "#year2016", label: "FROM THE DFOUNDERS COMPANY BUILDER" },
      p("A craft beer subscription club grew to 100 subscribers and won Colombia’s eCommerce Startup Competition in 2017. We later pivoted to a low-cost bar concept."),
      {
        kind: "roles",
        items: [
          { period: "APR 2017 – MAR 2019", title: "Co-founder & CEO", description: "Led strategic decisions, advised on technology, and built and managed the web portal." },
          { period: "APR 2019 – JAN 2020", title: "Co-founder & Chairman", description: "Monitored business performance." },
        ],
      },
      {
        kind: "details",
        summary: "The lessons behind the business",
        text: "The pandemic hit the bar concept hard and the business eventually closed. The experience strengthened my approach to commercial validation and financial discipline.",
      },
      gallery(
        ["beer-happy-team.jpg", "The Beer Happy Club team toasting with craft beer in front of the club logo"],
        ["beer-happy-box.jpg", "A Beer Happy Club box with four craft beers, a tasting guide and a membership card"],
        ["beer-happy-night.jpg", "A Beer Happy Club box with Manigua craft beers at night"],
        ["beer-happy-shipment.jpg", "A table full of Beer Happy Club boxes tied with red ribbons, ready to ship"],
        ["ecommerce-award-2017.jpg", "The eCommerce Startup Competition award, Bogotá, 14 September 2017, in front of a Beer Happy box"],
        ["puerto-cervecero-storefront.jpg", "The Puerto Cervecero beer market and pub storefront"],
        ["puerto-cervecero-interior.jpg", "A crowded evening inside Puerto Cervecero, with the beer menu on the wall"],
        ["puerto-cervecero-window.jpg", "People drinking craft beer, seen through the Puerto Cervecero window"],
        ["puerto-cervecero-wall.jpg", "An Antaño craft beer under a wall quote at Puerto Cervecero"],
      ),
      posts(subscriptionBoxPoints, sellingBeer),
    ],
  },
  {
    id: "year2019",
    year: "2019",
    period: "JAN 2019 – DEC 2023",
    eyebrow: "HOYTRABAJAS / CO-FOUNDER & CTO",
    titleLines: ["Technology that opens doors."],
    learned: "Learning begins with awareness: people need to see how a new skill could change their lives.",
    blocks: [
      { kind: "origin", href: "#year2016", label: "FROM THE DFOUNDERS COMPANY BUILDER" },
      p("I built HoyTrabajas’ platform from inception, with a mission to transform lives through employment opportunities for people in operational roles. My CTO role began in January 2019."),
      {
        kind: "facts",
        items: [
          { value: "50,000", label: "monthly users supported" },
          { value: "14", label: "developers led" },
        ],
      },
      p("I led the technical team, coordinated development across the business, managed technology risks and explored opportunities for growth and monetisation. The mission also sharpened my belief that learning begins with awareness: people need to see how a new skill could change their lives."),
      gallery(["hoytrabajas-team.jpg", "The HoyTrabajas team posing together on a stone wall, wearing HoyTrabajas hoodies"]),
    ],
  },
  {
    id: "year2020",
    year: "2020–2021",
    yearIsRange: true,
    period: "AUG 2020 – DEC 2021",
    eyebrow: "FACTCIL · PARROLABS · KIN INSURANCE",
    titleLines: ["Product & engineering."],
    blocks: [
      p("Across product ownership and software development roles, I strengthened my ability to connect business needs with technical delivery: leading teams, coordinating product development and building features in Ruby on Rails and GraphQL."),
    ],
  },
  {
    id: "year2022",
    year: "2022",
    period: "WINTER 2022",
    eyebrow: "HOYTRABAJAS / Y COMBINATOR W22",
    titleLines: ["From an idea to a", "global founder community."],
    blocks: [
      p("HoyTrabajas joined Y Combinator’s Winter 2022 batch. The company raised US$5.5m in total, opening new possibilities for growth."),
      { kind: "yc", label: "Y Combinator", season: "WINTER 2022" },
      gallery(["yc-sign.jpg", "The HoyTrabajas co-founders at the Y Combinator sign"]),
    ],
  },
  {
    id: "year2023-investment",
    year: "2023",
    period: "MARCH 2023",
    eyebrow: "MACONDO / ANGEL INVESTOR",
    titleLines: ["Backing other builders."],
    blocks: [
      p("I invested in Macondo. Following its acquisition by Bricksave in October 2023, my holding converted into Bricksave shares. I have no operational role."),
    ],
  },
  {
    id: "year2023-uk",
    year: "2023",
    period: "AUG 2023 – APR 2024",
    eyebrow: "HOYTRABAJAS / CO-FOUNDER & HEAD OF UK",
    titleLines: ["Exploring a new market."],
    blocks: [
      p("I researched the UK market, explored and tested opportunities, and developed partnerships for HoyTrabajas."),
      p("Today, I remain a minority shareholder and am no longer operationally involved."),
    ],
  },
  {
    id: "year2023-community",
    year: "2023",
    period: "SEP 2023 – DEC 2025",
    eyebrow: "COLOMBIAN CONSULATE / LONDON",
    titleLines: ["Helping others", "build their own path."],
    learned: "Talent is often already there; people need a chance to recognise it, develop it and put it to work.",
    blocks: [
      p("I supported entrepreneurs through incubation and business growth programmes, community building, mentor coordination and practical education in entrepreneurship and the digital economy."),
      {
        kind: "roles",
        items: [
          { period: "SEP 2023 – DEC 2025", title: "Entrepreneurship & Digital Economy Consultant", description: "Designed and implemented programmes, delivered workshops and advised entrepreneurs on business development and digital transformation." },
          { period: "OCT 2024 – JUL 2025", title: "Leader of the Entrepreneurship Table", description: "Led the Entrepreneurship Table at the Colombian Consulate in London." },
        ],
      },
      {
        kind: "facts",
        items: [
          { value: "270+", label: "entrepreneurs reached across three programme cycles" },
          { value: "87.1", label: "NPS in the latest edition" },
        ],
      },
      p("Working with migrant entrepreneurs deepened my commitment to combining technology, education and practical support. Talent is often already there; what people need is a chance to recognise it, develop it and put it to work."),
      { kind: "video" as const, youtubeId: "mp1-CpcOQUE", title: "Documentary of the first Entrepreneurship programme at the Colombian Consulate in London, 2023" },
      gallery(["consulate-london.jpg", "A selfie with the audience at an entrepreneurship event of the Colombian Consulate in London"]),
    ],
  },
  {
    id: "now",
    year: "Now",
    period: "BUILDING THE NEXT CHAPTER",
    eyebrow: "GINGGA / FOUNDER",
    titleLines: ["More human ambition."],
    titleEmphasis: "Less manual work.",
    current: true,
    blocks: [
      p("I’m building Gingga: AI-powered sales systems for businesses that invest in Meta Ads and engage prospective customers through WhatsApp."),
      p("Our current focus is real estate and student recruitment. We help businesses respond to enquiries, qualify leads and follow up, with people involved where judgement and relationships matter."),
      { kind: "button", label: "Explore Gingga", href: "https://gingga.com/" },
      p("The next step: consolidate our early pilots and demonstrate repeatable customer value.", "small"),
    ],
  },
];
