import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { getGinggaUrl, getWork } from "./work";

describe("getWork in English", () => {
  const work = getWork("en");

  it("leads with independent thinking and practical experience", () => {
    expect(work.headlineLines).toEqual(["Independent thinking."]);
    expect(work.headlineEmphasis).toBe("Practical experience.");
    expect(work.intro).toBe(
      "I work with founders and business leaders who need to make better decisions about strategy, technology and growth.",
    );
  });

  it("offers three kinds of work", () => {
    expect(work.offers.map((o) => o.title)).toEqual([
      "Strategic advisory",
      "AI and technology strategy",
      "Workshops and speaking",
    ]);
    for (const offer of work.offers) expect(offer.text.length).toBeGreaterThan(0);
    expect(work.offersTitle).toBe("How I can help");
    expect(work.offersLabel).toBe("Ways to work together");
  });

  it("links workshops to the speaking page", () => {
    expect(work.offers[2].link).toEqual({ label: "See speaking", href: "/speaking" });
  });

  it("considers each engagement individually", () => {
    expect(work.approach).toBe(
      "Engagements are considered individually, based on the problem, potential impact and fit.",
    );
  });

  it("opens a conversation through the booking link", () => {
    expect(work.cta).toEqual({ label: "Book a conversation", href: SITE.calendly });
    expect(work.secondaryCta).toEqual({ label: "See the experience behind it", href: "/journey" });
  });

  it("closes with the decision", () => {
    expect(work.closing).toMatchObject({ titleLead: "Start with the", titleEmphasis: "decision." });
  });

  it("does not sound like an agency", () => {
    expect(JSON.stringify(work)).not.toMatch(/consultan|consulting|expert|agency|packages?\b/i);
  });
});

describe("getWork in Spanish", () => {
  const work = getWork("es");

  it("leads with independent thinking and practical experience", () => {
    expect(work.eyebrow).toBe("TRABAJEMOS JUNTOS");
    expect(work.headlineLines).toEqual(["Pensamiento independiente."]);
    expect(work.headlineEmphasis).toBe("Experiencia práctica.");
  });

  it("offers three kinds of work, with the speaking link", () => {
    expect(work.offers.map((o) => o.title)).toEqual([
      "Asesoría estratégica",
      "Estrategia de IA y tecnología",
      "Talleres y charlas",
    ]);
    expect(work.offers[2].link).toEqual({ label: "Conoce las charlas", href: "/speaking" });
    expect(work.offersTitle).toBe("Cómo puedo ayudar");
    expect(work.offersLabel).toBe("Formas de trabajar juntos");
  });

  it("opens a conversation through the same booking link", () => {
    expect(work.cta).toEqual({ label: "Agenda una conversación", href: SITE.calendly });
    expect(work.secondaryCta).toEqual({ label: "Conoce la experiencia detrás de esto", href: "/journey" });
  });

  it("keeps Gingga separate and closes with the decision", () => {
    expect(work.gingga).toEqual({
      title: "¿Buscas Gingga?",
      text: "Gingga, la empresa que construye sistemas de ventas con inteligencia artificial, es independiente de este trabajo y tiene su propio sitio web. Si es lo que buscas, empieza por allí.",
      linkLabel: "Visitar Gingga",
    });
    expect(work.closing).toMatchObject({ titleLead: "Empieza por la", titleEmphasis: "decisión." });
  });

  it("does not sound like an agency", () => {
    expect(JSON.stringify(work)).not.toMatch(/consultor|consultoría|experto|agencia|paquete/i);
  });

  it("has its own page metadata", () => {
    expect(work.meta.title).toBe("Trabajemos juntos | Vladimir Guzmán");
  });
});

describe("getGinggaUrl", () => {
  it("reads the Gingga link from the journey instead of repeating it", () => {
    expect(getGinggaUrl()).toBe("https://gingga.com/");
  });
});
