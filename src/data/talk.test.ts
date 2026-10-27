import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { TALK } from "./site";
import { getTalk } from "./talk";

describe("getTalk", () => {
  it("keeps the files and the real English title in both languages", () => {
    for (const lang of ["en", "es"] as const) {
      const talk = getTalk(lang);
      expect(talk.pdf).toBe(TALK.pdf);
      expect(talk.cover).toBe(TALK.cover);
      expect(talk.pdfName).toBe(TALK.pdfName);
      expect(talk.coverAlt).toBe(TALK.coverAlt);
      expect(talk.titleLines).toEqual(["Unlocking Human Potential", "in the Age of AI"]);
      expect(talk.venue).toBe("Clare Hall, Cambridge");
      expect(existsSync(`public${talk.pdf}`)).toBe(true);
      expect(existsSync(`public${talk.cover}`)).toBe(true);
    }
  });

  it("has English copy", () => {
    expect(getTalk("en")).toMatchObject({
      eyebrow: "CAMBRIDGE · 2026 · CONFERENCE TALK",
      coverLinkLabel: "Open the Cambridge talk slides as a PDF",
      viewSlides: "View slides",
      download: "Download PDF",
    });
  });

  it("carries no theme tags", () => {
    for (const lang of ["en", "es"] as const) {
      const talk = getTalk(lang) as Record<string, unknown>;
      expect(talk.themes).toBeUndefined();
      expect(talk.themesLabel).toBeUndefined();
    }
  });

  it("has Spanish copy and says the slides are in English", () => {
    expect(getTalk("es")).toMatchObject({
      eyebrow: "CAMBRIDGE · 2026 · CHARLA EN CONFERENCIA",
      coverLinkLabel: "Abrir las diapositivas de la charla de Cambridge en PDF",
      viewSlides: "Ver diapositivas (en inglés)",
      download: "Descargar PDF",
    });
    expect(getTalk("es").description).toBe(
      "Desde abrir un restaurante hasta construir negocios de tecnología, exploro cómo el aprendizaje y la adaptación pueden cambiar el camino de una persona, y por qué la IA hace más urgente reconocer el talento que pasa desapercibido.",
    );
  });
});
