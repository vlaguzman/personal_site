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

  it("keeps no text of the removed essays hub", () => {
    for (const lang of ["en", "es"] as const) {
      const ui = getEssaysUi(lang) as Record<string, unknown>;
      for (const key of ["meta", "hub", "startHere", "newsletter"]) expect(ui[key], `${lang} ${key}`).toBeUndefined();
    }
  });

  it("has English chrome that matches the current site", () => {
    const ui = getEssaysUi("en");
    expect(ui.filterLabel).toBe("Filter by topic");
    expect(ui.allLabel).toBe("All");
    expect(ui.fallbackLabel).toBe("ESSAY");
    expect(ui.share).toEqual({ label: "SHARE", x: "Share on X", linkedin: "Share on LinkedIn" });
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
