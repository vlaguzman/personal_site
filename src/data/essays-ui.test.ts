import { describe, expect, it } from "vitest";
import { TOPICS } from "./essays";
import { getEssaysUi } from "./essays-ui";

describe("getEssaysUi", () => {
  it("labels every topic in both languages", () => {
    for (const lang of ["en", "es"] as const) {
      const { topics } = getEssaysUi(lang);
      for (const topic of TOPICS) expect(topics[topic].length, `${lang} ${topic}`).toBeGreaterThan(0);
    }
    expect(getEssaysUi("en").topics).toEqual({
      Startups: "Startups",
      Product: "Product",
      Technology: "Technology",
      Strategy: "Strategy",
      Fundraising: "Fundraising",
    });
  });

  it("has English chrome that matches the current site", () => {
    const ui = getEssaysUi("en");
    expect(ui.meta.title).toBe("Essays | Vladimir Guzmán");
    expect(ui.hub).toMatchObject({ eyebrow: "ESSAYS", titleLead: "Lessons from", titleEmphasis: "building" });
    expect(ui.hub.intro).toMatch(
      /The originals are in Spanish, the language I wrote them in\. Each one also has an English translation, made with AI\.$/,
    );
    expect(ui.hub.intro).not.toContain("The essays are in Spanish");
    expect(ui.filterLabel).toBe("Filter by topic");
    expect(ui.allLabel).toBe("All");
    expect(ui.startHere).toBe("Start here");
    expect(ui.fallbackLabel).toBe("ESSAY");
    expect(ui.share).toEqual({ label: "SHARE", x: "Share on X", linkedin: "Share on LinkedIn" });
    expect(ui.newsletter.title).toBe("New essays, when they’re ready");
    expect(ui.newsletter.subscribe).toBe("Subscribe");
    expect(ui.article).toEqual({ back: "All essays", related: "Related reading" });
  });

  it("formats counts, reading time and the language note in English", () => {
    const ui = getEssaysUi("en");
    expect(ui.count(1, 4)).toBe("Showing 1 of 4 essays");
    expect(ui.count(1, 1)).toBe("Showing 1 of 1 essay");
    expect(ui.readingTime(2)).toBe("2 min read");
    expect(ui.readingTimeShort(3)).toBe("3 min");
    expect(ui.languageNote.short("es")).toBe("In Spanish");
    expect(ui.languageNote.long("es")).toBe("Written in Spanish");
  });

  it("formats counts, reading time and the language note in Spanish", () => {
    const ui = getEssaysUi("es");
    expect(ui.count(1, 4)).toBe("Mostrando 1 de 4 ensayos");
    expect(ui.count(1, 1)).toBe("Mostrando 1 de 1 ensayo");
    expect(ui.readingTime(2)).toBe("2 min de lectura");
    expect(ui.readingTimeShort(3)).toBe("3 min");
    expect(ui.languageNote.short("en")).toBe("En inglés");
    expect(ui.languageNote.long("en")).toBe("Escrito en inglés");
  });

  it("has Spanish chrome that does not repeat the English words", () => {
    const ui = getEssaysUi("es");
    expect(ui.meta.title).toBe("Ensayos | Vladimir Guzmán");
    expect(ui.hub.eyebrow).toBe("ENSAYOS");
    expect(ui.startHere).toBe("Empieza aquí");
    expect(ui.hub.intro).toMatch(/Están en su idioma original, el español\. Cada uno tiene también una traducción al inglés hecha con IA\.$/);
    expect(ui.topics.Product).toBe("Producto");
  });

  it("labels the AI translation in English", () => {
    expect(getEssaysUi("en").translation).toEqual({
      badge: "Translated with AI",
      note: "Translated with AI from the Spanish original.",
      readOriginal: "Read the original in Spanish",
      readTranslation: "Read in English (translated with AI)",
    });
  });

  it("labels the AI translation in Spanish", () => {
    expect(getEssaysUi("es").translation).toEqual({
      badge: "Traducido con IA",
      note: "Traducido con IA a partir del original en español.",
      readOriginal: "Leer el original en español",
      readTranslation: "Leer en inglés (traducido con IA)",
    });
  });
});
