import { describe, expect, it } from "vitest";
import { ARC, getArc } from "./arc";
import { getJourneyUi } from "./journey-ui";

describe("getJourneyUi", () => {
  it("has the English page chrome", () => {
    const ui = getJourneyUi("en");
    expect(ui.eyebrow).toBe("THE JOURNEY");
    expect(ui.headlineLines).toEqual(["Different ventures."]);
    expect(ui.headlineEmphasis).toBe("One purpose.");
    expect(ui.arcLabel).toBe("The arc of the journey");
    expect(ui.learnedLabel).toBe("What I learned");
    expect(ui.meta.title).toBe("The journey | Vladimir Guzmán");
  });

  it("has the Spanish page chrome", () => {
    const ui = getJourneyUi("es");
    expect(ui.eyebrow).toBe("MI TRAYECTORIA");
    expect(ui.headlineLines).toEqual(["Distintos proyectos."]);
    expect(ui.headlineEmphasis).toBe("Un solo propósito.");
    expect(ui.learnedLabel).toBe("Lo que aprendí");
    expect(ui.meta.title).toBe("Mi trayectoria | Vladimir Guzmán");
  });

  it("differs between languages", () => {
    const en = getJourneyUi("en");
    const es = getJourneyUi("es");
    expect(es.intro).not.toBe(en.intro);
    expect(es.arcLabel).not.toBe(en.arcLabel);
    expect(es.meta.description).not.toBe(en.meta.description);
  });
});

describe("getArc", () => {
  it("keeps ARC as the English arc", () => {
    expect(getArc("en")).toBe(ARC);
  });

  it("has the four stages in order in both languages", () => {
    expect(getArc("en").map((s) => s.label)).toEqual(["Developer", "Product", "Founder", "AI builder"]);
    expect(getArc("es").map((s) => s.label)).toEqual(["Desarrollador", "Producto", "Fundador", "Constructor de IA"]);
    getArc("es").forEach((s, i) => expect(s.text).not.toBe(ARC[i]!.text));
  });
});
