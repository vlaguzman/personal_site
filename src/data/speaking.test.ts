import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getWhatsappLink } from "./site";
import { getCommunityProgram, getSpeaking, getTeaching, getWorkshop } from "./speaking";

describe("getSpeaking in English", () => {
  const speaking = getSpeaking("en");

  it("invites people to book a conversation", () => {
    expect(speaking.headlineLines).toEqual(["Challenge assumptions."]);
    expect(speaking.headlineEmphasis).toBe("Start better conversations.");
    expect(speaking.primaryCta).toEqual({ label: "Invite me to speak", href: getWhatsappLink("en") });
    expect(speaking.secondaryCta).toEqual({ label: "See the Cambridge talk", href: "#cambridge" });
  });

  it("uses a real photo of him speaking that exists in public/", () => {
    expect(existsSync(`public${speaking.photo.src}`)).toBe(true);
    expect(speaking.photo.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
  });

  it("speaks about the three editorial territories", () => {
    expect(speaking.topics.map((t) => t.title)).toEqual([
      "Entrepreneurship without mythology",
      "Technology beyond the hype",
      "Human potential and opportunity",
    ]);
    for (const topic of speaking.topics) expect(topic.text.length).toBeGreaterThan(0);
  });

  it("names its sections", () => {
    expect(speaking.sections).toEqual({
      topics: "What I speak about",
      featured: "Featured talk",
      teaching: "Teaching",
      writing: "Writing",
    });
    expect(speaking.closing).toMatchObject({ titleLead: "Start the", titleEmphasis: "conversation." });
  });

  it("introduces the writing section and says the originals are Spanish with AI translations", () => {
    expect(speaking.writingIntro).toBe(
      "Notes on startups, strategy and building companies, written after the fact from my own ventures. The originals are in Spanish, the language I wrote them in; each one also has an English translation, made with AI.",
    );
  });

  it("has its own page metadata covering talks and essays", () => {
    expect(speaking.meta).toEqual({
      title: "Speaking & writing | Vladimir Guzmán",
      description:
        "Talks, workshops and essays on entrepreneurship, technology and human potential. Challenge assumptions, start better conversations.",
    });
  });
});

describe("getSpeaking in Spanish", () => {
  const speaking = getSpeaking("es");

  it("invites people to book a conversation, with the same booking link", () => {
    expect(speaking.eyebrow).toBe("CHARLAS");
    expect(speaking.headlineLines).toEqual(["Cuestiona los supuestos."]);
    expect(speaking.headlineEmphasis).toBe("Empieza mejores conversaciones.");
    expect(speaking.primaryCta).toEqual({ label: "Invítame a hablar", href: getWhatsappLink("es") });
    expect(speaking.secondaryCta).toEqual({ label: "Conoce la charla de Cambridge", href: "#cambridge" });
  });

  it("describes the photo in Spanish", () => {
    expect(speaking.photo.alt).toBe("Vladimir Guzmán presentando en Clare Hall, Cambridge");
    expect(speaking.photo.src).toBe(getSpeaking("en").photo.src);
  });

  it("translates topics, sections, closing and page metadata", () => {
    expect(speaking.topics.map((t) => t.title)).toEqual([
      "Emprendimiento sin mitología",
      "Tecnología más allá del hype",
      "Potencial humano y oportunidad",
    ]);
    expect(speaking.sections.topics).toBe("Sobre qué hablo");
    expect(speaking.topicsLabel).toBe("Temas de las charlas");
    expect(speaking.closing).toMatchObject({ titleLead: "Empieza la", titleEmphasis: "conversación." });
    expect(speaking.sections.writing).toBe("Escritos");
    expect(speaking.writingIntro).toBe(
      "Notas sobre startups, estrategia y cómo construir empresas, escritas en retrospectiva a partir de mis propios proyectos. Están en su idioma original, el español; cada una tiene también una traducción al inglés hecha con IA.",
    );
    expect(speaking.meta).toEqual({
      title: "Charlas y escritos | Vladimir Guzmán",
      description:
        "Charlas, talleres y ensayos sobre emprendimiento, tecnología y potencial humano. Cuestiona los supuestos, empieza mejores conversaciones.",
    });
  });
});

describe.each(["en", "es"] as const)("getSpeaking without the About section in %s", (lang) => {
  it("keeps no bio, no bio heading and no founder profile label", () => {
    const speaking = getSpeaking(lang) as Record<string, unknown>;
    expect(speaking.bio).toBeUndefined();
    expect(speaking.founderProfileLabel).toBeUndefined();
    expect(speaking.sections).not.toHaveProperty("bio");
  });
});

describe("getTeaching", () => {
  it("leaves out the intro sentence and the three-line summary", () => {
    for (const lang of ["en", "es"] as const) {
      const teaching = getTeaching(lang) as Record<string, unknown>;
      expect(teaching.text).toBeUndefined();
      expect(teaching.areas).toBeUndefined();
      expect(teaching.areasLabel).toBeUndefined();
    }
  });

  it("lists the classes taught to the Colombian community, ending with marketing with AI", () => {
    expect(getTeaching("en").talksLabel).toBe("I had the opportunity to work with the Colombian community and technology through classes such as:");
    expect(getTeaching("en").talks).toEqual([
      "Purpose-Driven Entrepreneurship: Finding Your IKIGAI",
      "Business Model Design: Business Model Canvas",
      "Problem Discovery and Validation: From Problems to Business Opportunities",
      "MVP Testing and Customer Feedback: Validating Ideas Through Real-World Experiments",
      "Marketing with AI",
    ]);
    expect(getTeaching("es").talksLabel).toBe("Tuve la oportunidad de trabajar con la comunidad colombiana y la tecnología en clases como:");
    expect(getTeaching("es").talks).toEqual([
      "Emprendimiento con propósito: encontrando tu IKIGAI",
      "Diseño de modelos de negocio: Business Model Canvas",
      "Descubrimiento y validación de problemas: de los problemas a las oportunidades de negocio",
      "Pruebas de MVP y feedback de clientes: validar ideas con experimentos reales",
      "Marketing con IA",
    ]);
  });

  it.each(["en", "es"] as const)("shows the portrait of him speaking with a microphone (%s)", (lang) => {
    const { images } = getTeaching(lang);
    expect(images.map((i) => i.src)).toEqual(["/images/speaking/speaker-microphone.jpg"]);
    expect(existsSync(`public${images[0].src}`)).toBe(true);
  });

  it("describes the photo in each language", () => {
    expect(getTeaching("en").images[0].alt).toBe("Vladimir Guzmán speaking into a microphone at an event");
    expect(getTeaching("es").images[0].alt).toBe("Vladimir Guzmán hablando con un micrófono en un evento");
  });

  it("leaves the video and the Consulate figures to the journey", () => {
    const teaching = getTeaching("en") as Record<string, unknown>;
    expect(teaching.video).toBeUndefined();
    expect(teaching.facts).toBeUndefined();
  });
});

describe("getCommunityProgram", () => {
  it("tells the 2024 English programme for the Latino community in English", () => {
    const program = getCommunityProgram("en");
    expect(program.title).toBe("In 2024 I co-led an English programme for the Latino community");
    expect(program.intro).toBe(
      "Run by The Giving Lab and focused on the challenges that Latino migrants face in London. The classes included:",
    );
    expect(program.classes).toEqual([
      "English for work",
      "English from zero",
      "English for older adults",
      "Soft skills development",
    ]);
    expect(program.link.label).toBe("Visit The Giving Lab");
  });

  it("tells it in Spanish", () => {
    const program = getCommunityProgram("es");
    expect(program.title).toBe("En 2024 colideré un programa de inglés para la comunidad latina");
    expect(program.intro).toBe(
      "Impulsado por The Giving Lab y enfocado en los retos que enfrenta el público migrante latino en Londres. Las clases incluyeron:",
    );
    expect(program.classes).toEqual([
      "Inglés para el trabajo",
      "Inglés desde cero",
      "Inglés para personas mayores",
      "Desarrollo de habilidades blandas",
    ]);
    expect(program.link.label).toBe("Conocer The Giving Lab");
  });

  it("links to The Giving Lab on Open Collective in both languages", () => {
    for (const lang of ["en", "es"] as const) {
      expect(getCommunityProgram(lang).link.href).toBe("https://opencollective.com/thegivinglab");
    }
  });

  it.each(["en", "es"] as const)("shows the two photos of the programme (%s)", (lang) => {
    const { images } = getCommunityProgram(lang);
    expect(images.map((i) => i.src)).toEqual([
      "/images/speaking/giving-lab-spanglish.jpg",
      "/images/speaking/giving-lab-class.jpg",
    ]);
    for (const image of images) {
      expect(existsSync(`public${image.src}`)).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
    }
  });
});

describe("getWorkshop", () => {
  it("names the 23 May 2026 session in each language", () => {
    expect(getWorkshop("en")).toMatchObject({ date: "23 MAY 2026", title: "From idea to prototype in two hours" });
    expect(getWorkshop("es")).toMatchObject({ date: "23 MAY 2026", title: "De idea a prototipo en dos horas" });
  });

  it.each(["en", "es"] as const)("shows the group photo of the session (%s)", (lang) => {
    const { images } = getWorkshop(lang);
    expect(images.map((i) => i.src)).toEqual(["/images/speaking/workshop-idea-to-prototype.jpg"]);
    expect(existsSync(`public${images[0].src}`)).toBe(true);
    expect(images[0].alt).toMatch(/De idea a prototipo en dos horas/);
  });

  it("describes the photo in each language", () => {
    expect(getWorkshop("en").images[0].alt).toBe(
      "Vladimir Guzmán taking a selfie with the workshop group in front of a slide titled “De idea a prototipo en dos horas”",
    );
    expect(getWorkshop("es").images[0].alt).toBe(
      "Vladimir Guzmán tomándose una selfie con el grupo del taller frente a una diapositiva titulada «De idea a prototipo en dos horas»",
    );
  });
});
