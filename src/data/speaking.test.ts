import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { getConsulateEngagement, getSpeaking } from "./speaking";

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
      community: "In the community",
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
  it("introduces him with facts that appear elsewhere on the site", () => {
    const { bio } = getSpeaking(lang);
    expect(bio).toContain("Y Combinator W22");
    expect(bio).toContain("270+");
  });
});

describe.each(["en", "es"] as const)("getConsulateEngagement in %s", (lang) => {
  const engagement = getConsulateEngagement(lang);

  it("is derived from the Consulate milestone instead of repeating it", () => {
    expect(engagement.video.youtubeId).toBe("mp1-CpcOQUE");
    expect(engagement.facts.map((f) => f.value)).toEqual(["270+", "87.1"]);
  });

  it("has four photos that exist in public/", () => {
    expect(engagement.images).toHaveLength(4);
    for (const image of engagement.images) {
      expect(existsSync(`public${image.src}`), image.src).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
    }
  });
});

describe("getConsulateEngagement copy", () => {
  it("has English and Spanish text", () => {
    expect(getConsulateEngagement("en")).toMatchObject({
      eyebrow: "LONDON · 2023–2025 · PROGRAMMES & WORKSHOPS",
      title: "Colombian Consulate in London",
    });
    expect(getConsulateEngagement("es")).toMatchObject({
      eyebrow: "LONDRES · 2023–2025 · PROGRAMAS Y TALLERES",
      title: "Consulado de Colombia en Londres",
    });
  });

  // KNOWN LIMITATION until the journey is translated: the video title, photo alts and fact labels come from milestones.ts.
  it("still reads the video title from the English milestone", () => {
    expect(getConsulateEngagement("es").video.title).toBe(getConsulateEngagement("en").video.title);
  });
});
