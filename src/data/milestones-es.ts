import { beingAnEntrepreneur, fluvipThanks, funkyLessons, sellingBeer, subscriptionBoxPoints } from "./posts";
import { gallery, p, posts as postsBlock } from "./milestone-blocks";
import type { Milestone, Post } from "./types";

/** On the Spanish timeline the blog posts are the Spanish originals. */
const posts = (...items: Post[]) => postsBlock("DE MI BLOG", ...items);

/**
 * The Spanish timeline. It mirrors `milestones` (English) block by block: same ids, order,
 * block kinds, hrefs, images and figures. `milestones-parity.test.ts` enforces it.
 */
export const milestonesEs: Milestone[] = [
  {
    id: "year2010",
    year: "2010",
    period: "AGO 2010 – DIC 2012",
    eyebrow: "FUNKY’S / COFUNDADOR / CHÍA, COLOMBIA",
    titleLines: ["Donde empezó mi", "camino emprendedor."],
    learned: "Montar un negocio es más difícil de lo que parece, y cambia a la persona que lo construye.",
    blocks: [
      p("Después de graduarme como ingeniero de software, mientras mis compañeros se encaminaban hacia empresas como Microsoft, decidí cofundar un pequeño restaurante: Funky’s, en Chía, Colombia."),
      p("Trabajé en la marca, el plan de negocio y las estrategias de ventas, además del manejo de la comunidad, el desarrollo del sitio web y la operación del día a día."),
      gallery(["funkys-press-feature.jpg", "Recorte de revista con el equipo de Funky’s posando frente al banner del restaurante en Chía; el pie de foto dice «Seis jóvenes emprendedores cocinan y atienden su propio restaurante en Chía»"]),
      posts(funkyLessons),
    ],
  },
  {
    id: "year2011",
    year: "2011",
    period: "JUN 2011 – MAY 2013",
    eyebrow: "CONECTANDO MENTES / FUNDADOR Y CEO",
    titleLines: ["Mi primer emprendimiento digital."],
    learned: "Lleva primero una idea a las personas, en persona: valídala y aprende de los primeros usuarios.",
    blocks: [
      p("Conectando Mentes comenzó como la propuesta de una red social para emprendedores. Desarrollé la marca, trabajé en ventas y construí el MVP técnico de contactU, una aplicación pensada para hacer más útiles los espacios de networking."),
      p("Creamos los talleres Mindup y Visionario, llevando la idea a un formato presencial."),
      posts(beingAnEntrepreneur),
    ],
  },
  {
    id: "year2012",
    year: "2012–2013",
    yearIsRange: true,
    period: "SEP 2012 – DIC 2013",
    eyebrow: "3DEMENTES · IMAGINAMOS · YOUNG MARKETING",
    titleLines: ["Bases técnicas."],
    blocks: [
      p("A lo largo de mis primeros roles en desarrollo iOS y Ruby on Rails, fortalecí las habilidades prácticas para convertir ideas en productos funcionales, una base para los emprendimientos que vinieron después."),
    ],
  },
  {
    id: "year2014-tappsi",
    year: "2014",
    period: "ENE 2014 – JUN 2014",
    eyebrow: "TAPPSI / DESARROLLADOR RUBY ON RAILS",
    titleLines: ["Mi primer vistazo por dentro", "del mundo startup."],
    learned: "Cómo se juntan el producto, la financiación y el modelo de negocio.",
    blocks: [
      p("Tappsi fue mi primera experiencia de la vida startup desde adentro. Mientras desarrollaba funcionalidades para sus plataformas internas, vi de primera mano lo que se sentía levantar inversión y cómo el negocio pasó de ser una app gratuita a un servicio por el que los taxistas pagaban."),
      p("Tappsi llegaría a ser un caso de éxito de las startups colombianas: se unió a Easy Taxi en 2015 y con el tiempo pasó a ser parte de Cabify."),
    ],
  },
  {
    id: "year2014-fluvip",
    year: "2014",
    period: "MAY 2014 – ABR 2017",
    eyebrow: "FLUVIP / DE DESARROLLADOR A LÍDER DE TECNOLOGÍA",
    titleLines: ["Mi escuela de", "emprendimiento."],
    learned: "Cómo conectar las decisiones de tecnología con la realidad de construir una empresa.",
    blocks: [
      p("En FLUVIP viví lo que implica pasar de un equipo de cuatro personas a una multinacional con presencia en Latinoamérica y Estados Unidos. Trabajando junto a los fundadores, vi desde adentro la recaudación de fondos, la aceleración con Wayra y la expansión internacional."),
      p("Crecí con el negocio: empecé como desarrollador, aprendí a liderar a otros y asumí responsabilidades como product owner, project manager y CTO."),
      p("La economía de los creadores me mostró cómo algo que antes se veía como un pasatiempo podía convertirse en un medio de vida. Aprender una nueva habilidad en el momento justo podía abrir oportunidades mucho más allá del origen de cada persona.", "reflection"),
      {
        kind: "facts",
        items: [
          { value: "4", label: "personas en el equipo al comienzo" },
          { value: "20", label: "desarrolladores liderados" },
        ],
      },
      {
        kind: "details",
        summary: "Construyendo para el crecimiento internacional",
        text: "La empresa recaudó US$4.5m. En tres meses entregué los requerimientos de tecnología para la adquisición de Spark en Brasil. Hoy sigo siendo accionista minoritario y ya no estoy involucrado operativamente.",
      },
      gallery(["fluvip-wayra.webp", "Presentando al equipo fundador de FLUVIP en el escenario de Wayra"]),
      posts(fluvipThanks),
    ],
  },
  {
    id: "year2016",
    year: "2016",
    period: "DIC 2016 – ABR 2018 · MI ROL",
    eyebrow: "DFOUNDERS / COFUNDADOR Y CTO",
    titleLines: ["Una empresa creada", "para crear empresas."],
    companyBuilder: true,
    blocks: [
      p("Cofundé Dfounders como un company builder: un lugar para desarrollar modelos de negocio, construir productos y convertir ideas en emprendimientos. De este trabajo surgieron Beer Happy Club y HoyTrabajas, junto con otras iniciativas que no despegaron."),
      p("Ayudé a estructurar los modelos de negocio y lideré las decisiones de tecnología, uniendo el desarrollo de producto con el pensamiento comercial."),
      {
        kind: "ventureTree",
        ariaLabel: "Emprendimientos que surgieron de Dfounders",
        root: { eyebrow: "EL COMPANY BUILDER", name: "Dfounders", tagline: "De ideas a emprendimientos" },
        ventures: [
          { href: "#year2017", name: "Beer Happy Club", note: "Suscripción de cerveza artesanal → El Puerto Cervecero" },
          { href: "#year2019", name: "HoyTrabajas", note: "Oportunidades de empleo · Luego YC W22" },
        ],
        experiments: { name: "Otras iniciativas", note: "Ideas exploradas que no despegaron" },
      },
    ],
  },
  {
    id: "year2017",
    year: "2017",
    period: "ABR 2017 – ENE 2020 · ROLES",
    eyebrow: "BEER HAPPY CLUB / EL PUERTO CERVECERO",
    titleLines: ["Un emprendimiento más allá del software."],
    learned: "La validación comercial y la disciplina financiera van antes que el crecimiento.",
    blocks: [
      { kind: "origin", href: "#year2016", label: "DESDE EL COMPANY BUILDER DFOUNDERS" },
      p("Un club de suscripción de cerveza artesanal creció hasta los 100 suscriptores y ganó en 2017 el concurso eCommerce Startup Competition de Colombia. Más adelante giramos hacia un concepto de bar de bajo costo."),
      {
        kind: "roles",
        items: [
          { period: "ABR 2017 – MAR 2019", title: "Cofundador y CEO", description: "Lideré las decisiones estratégicas, asesoré en tecnología y construí y administré el portal web." },
          { period: "ABR 2019 – ENE 2020", title: "Cofundador y presidente de la junta", description: "Hice seguimiento al desempeño del negocio." },
        ],
      },
      {
        kind: "details",
        summary: "Las lecciones detrás del negocio",
        text: "La pandemia golpeó con fuerza el concepto de bar y el negocio terminó cerrando.",
      },
      gallery(
        ["beer-happy-team.jpg", "El equipo de Beer Happy Club brindando con cerveza artesanal frente al logo del club"],
        ["beer-happy-box.jpg", "Una caja de Beer Happy Club con cuatro cervezas artesanales, una guía de cata y una tarjeta de membresía"],
        ["beer-happy-night.jpg", "Una caja de Beer Happy Club con cervezas artesanales Manigua de noche"],
        ["beer-happy-shipment.jpg", "Una mesa llena de cajas de Beer Happy Club atadas con cintas rojas, listas para enviar"],
        ["ecommerce-award-2017.jpg", "El premio del eCommerce Startup Competition, Bogotá, 14 de septiembre de 2017, frente a una caja de Beer Happy"],
        ["puerto-cervecero-storefront.jpg", "La fachada del mercado cervecero y pub Puerto Cervecero"],
        ["puerto-cervecero-interior.jpg", "Una noche concurrida dentro de Puerto Cervecero, con la carta de cervezas en la pared"],
        ["puerto-cervecero-window.jpg", "Personas tomando cerveza artesanal, vistas a través de la ventana de Puerto Cervecero"],
        ["puerto-cervecero-wall.jpg", "Una cerveza artesanal Antaño bajo una frase en la pared de Puerto Cervecero"],
      ),
      posts(subscriptionBoxPoints, sellingBeer),
    ],
  },
  {
    id: "year2019",
    year: "2019",
    period: "ENE 2019 – DIC 2023",
    eyebrow: "HOYTRABAJAS / COFUNDADOR Y CTO",
    titleLines: ["Tecnología que abre puertas."],
    learned: "El aprendizaje empieza con la conciencia: las personas necesitan ver cómo una nueva habilidad podría cambiar sus vidas.",
    blocks: [
      { kind: "origin", href: "#year2016", label: "DESDE EL COMPANY BUILDER DFOUNDERS" },
      p("Construí la plataforma de HoyTrabajas desde sus inicios, con la misión de transformar vidas a través de oportunidades de empleo para personas en roles operativos. Mi rol como CTO comenzó en enero de 2019."),
      {
        kind: "facts",
        items: [
          { value: "50,000", label: "usuarios mensuales atendidos" },
          { value: "15", label: "desarrolladores liderados" },
        ],
      },
      p("Lideré al equipo técnico, coordiné el desarrollo en todo el negocio, gestioné los riesgos tecnológicos y exploré oportunidades de crecimiento y monetización."),
      gallery(["hoytrabajas-team.jpg", "El equipo de HoyTrabajas posando junto sobre un muro de piedra, con sudaderas con capucha de HoyTrabajas"]),
    ],
  },
  {
    id: "year2020",
    year: "2020–2021",
    yearIsRange: true,
    period: "AGO 2020 – DIC 2021",
    eyebrow: "FACTCIL · PARROLABS · KIN INSURANCE",
    titleLines: ["Producto e ingeniería."],
    blocks: [
      p("A través de roles de product ownership y de desarrollo de software, fortalecí mi capacidad de conectar las necesidades del negocio con la entrega técnica: liderar equipos, coordinar el desarrollo de producto y construir funcionalidades en Ruby on Rails y GraphQL."),
    ],
  },
  {
    id: "year2022",
    year: "2022",
    period: "INVIERNO 2022",
    eyebrow: "HOYTRABAJAS / Y COMBINATOR W22",
    titleLines: ["De una idea a una", "comunidad global de fundadores."],
    blocks: [
      p("HoyTrabajas entró al batch de invierno de 2022 de Y Combinator. La empresa recaudó US$5.5m en total, lo que abrió nuevas posibilidades de crecimiento."),
      { kind: "yc", label: "Y Combinator", season: "INVIERNO 2022" },
      gallery(["yc-sign.jpg", "Los cofundadores de HoyTrabajas junto al letrero de Y Combinator"]),
    ],
  },
  {
    id: "year2023-investment",
    year: "2023",
    period: "MARZO 2023",
    eyebrow: "MACONDO / INVERSIONISTA ÁNGEL",
    titleLines: ["Apoyando a otros constructores."],
    blocks: [
      p("Invertí en Macondo. Tras su adquisición por parte de Bricksave en octubre de 2023, mi participación se convirtió en acciones de Bricksave. No tengo ningún rol operativo."),
    ],
  },
  {
    id: "year2023-uk",
    year: "2023",
    period: "AGO 2023 – ABR 2024",
    eyebrow: "HOYTRABAJAS / COFUNDADOR Y HEAD OF UK",
    titleLines: ["Explorando un nuevo mercado."],
    blocks: [
      p("Investigué el mercado del Reino Unido, exploré y probé oportunidades y desarrollé alianzas para HoyTrabajas."),
      p("Hoy sigo siendo accionista minoritario y ya no estoy involucrado operativamente."),
    ],
  },
  {
    id: "year2023-community",
    year: "2023",
    period: "SEP 2023 – DIC 2025",
    eyebrow: "CONSULADO DE COLOMBIA / LONDRES",
    titleLines: ["Ayudando a otros a", "construir su propio camino."],
    learned: "El talento muchas veces ya está ahí; las personas necesitan la oportunidad de reconocerlo, desarrollarlo y ponerlo a trabajar.",
    blocks: [
      p("Apoyé a emprendedores mediante programas de incubación y de crecimiento empresarial, construcción de comunidad, coordinación de mentores y formación práctica en emprendimiento y economía digital."),
      {
        kind: "roles",
        items: [
          { period: "SEP 2023 – DIC 2025", title: "Consultor de Emprendimiento y Economía Digital", description: "Diseñé e implementé programas, dicté talleres y asesoré a emprendedores en desarrollo de negocio y transformación digital." },
          { period: "OCT 2024 – JUL 2025", title: "Líder de la Mesa de Emprendimiento", description: "Lideré la Mesa de Emprendimiento del Consulado de Colombia en Londres." },
        ],
      },
      {
        kind: "facts",
        items: [
          { value: "270+", label: "emprendedores alcanzados en tres ciclos del programa" },
          { value: "87.1", label: "NPS en la última edición" },
        ],
      },
      p("Trabajar con emprendedores migrantes profundizó mi compromiso de combinar tecnología, educación y apoyo práctico."),
      { kind: "video" as const, youtubeId: "mp1-CpcOQUE", title: "Documental del primer programa de emprendimiento del Consulado de Colombia en Londres, 2023" },
      gallery(
        ["consulate-london.jpg", "Una selfie con el público en un evento de emprendimiento del Consulado de Colombia en Londres"],
        ["consulate-community-fair.jpg", "Un grupo numeroso de miembros de la comunidad, uno de ellos disfrazado de unicornio inflable, en una feria de emprendimiento del Consulado de Colombia en Londres"],
        ["consulate-documentary-screening.jpg", "El documental del Consulado proyectado en una pantalla ante el público, en una sala decorada con banderas de Colombia y un árbol de Navidad"],
        ["consulate-entrepreneurship-route-2025.jpg", "Emprendedores y el equipo del Consulado posando frente a la presentación de la Ruta de Emprendimiento 2025"],
      ),
    ],
  },
  {
    id: "year2025-mentor-awards",
    year: "2025",
    period: "14 JUN 2025",
    eyebrow: "GUÍA LONDRES / MENTOR AWARDS 2025",
    titleLines: ["Reconocido como", "Business Mentor."],
    blocks: [
      p("El 14 de junio de 2025, Guía Londres me reconoció como Business Mentor en sus Mentor Awards 2025."),
      gallery(["guia-londres-mentor-awards-2025.jpg", "Vladimir Guzmán caminando por el escenario con su certificado de Business Mentor en los Guía Londres Mentor Awards 2025"]),
    ],
  },
  {
    id: "now",
    year: "Hoy",
    period: "CONSTRUYENDO EL SIGUIENTE CAPÍTULO",
    eyebrow: "GINGGA / FUNDADOR",
    titleLines: ["Más ambición humana."],
    titleEmphasis: "Menos trabajo manual.",
    current: true,
    blocks: [
      p("Estoy construyendo Gingga: soluciones con IA para emprendedores."),
      { kind: "button", label: "Conoce Gingga", href: "https://gingga.com/" },
    ],
  },
];
