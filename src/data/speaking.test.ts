import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { getSpeaking, getTeaching } from "./speaking";

describe("getSpeaking in English", () => {
  const speaking = getSpeaking("en");

  it("invites people to book a conversation", () => {
    expect(speaking.headlineLines).toEqual(["Challenge assumptions."]);
    expect(speaking.headlineEmphasis).toBe("Start better conversations.");
    expect(speaking.primaryCta).toEqual({ label: "Invite me to speak", href: SITE.calendly });
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
      bio: "About Vladimir",
    });
    expect(speaking.closing).toMatchObject({ titleLead: "Start the", titleEmphasis: "conversation." });
  });

  it("has its own page metadata", () => {
    expect(speaking.meta.title).toBe("Speaking | Vladimir Guzmán");
  });
});

describe("getSpeaking in Spanish", () => {
  const speaking = getSpeaking("es");

  it("invites people to book a conversation, with the same booking link", () => {
    expect(speaking.eyebrow).toBe("CHARLAS");
    expect(speaking.headlineLines).toEqual(["Cuestiona los supuestos."]);
    expect(speaking.headlineEmphasis).toBe("Empieza mejores conversaciones.");
    expect(speaking.primaryCta).toEqual({ label: "Invítame a hablar", href: SITE.calendly });
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
    expect(speaking.meta).toEqual({
      title: "Charlas | Vladimir Guzmán",
      description:
        "Charlas y talleres sobre emprendimiento, tecnología y potencial humano. Cuestiona los supuestos, empieza mejores conversaciones.",
    });
  });
});

describe.each(["en", "es"] as const)("getSpeaking bio in %s", (lang) => {
  it("introduces him without repeating the Consulate figures that live on the journey", () => {
    const { bio } = getSpeaking(lang);
    expect(bio).toContain("Y Combinator W22");
    expect(bio).not.toContain("270+");
  });
});

describe("getTeaching", () => {
  it("says he has taught entrepreneurship and AI applied to business", () => {
    expect(getTeaching("en").text).toBe("I have been a professor of entrepreneurship and AI applied to business.");
    expect(getTeaching("es").text).toBe("He sido profesor de emprendimiento e IA aplicada a los negocios.");
  });

  it.each(["en", "es"] as const)("shows the portrait of him speaking at the Consulate (%s)", (lang) => {
    const { images } = getTeaching(lang);
    expect(images.map((i) => i.src)).toEqual(["/images/speaking/consulate-speaker.jpg"]);
    expect(existsSync(`public${images[0].src}`)).toBe(true);
  });

  it("describes the photo in each language", () => {
    expect(getTeaching("en").images[0].alt).toBe(
      "Vladimir Guzmán speaking into a microphone at a Colombian Consulate event in London",
    );
    expect(getTeaching("es").images[0].alt).toBe(
      "Vladimir Guzmán hablando con un micrófono en un evento del Consulado de Colombia en Londres",
    );
  });

  it("leaves the video and the Consulate figures to the journey", () => {
    const teaching = getTeaching("en") as Record<string, unknown>;
    expect(teaching.video).toBeUndefined();
    expect(teaching.facts).toBeUndefined();
  });
});
