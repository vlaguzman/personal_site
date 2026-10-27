import { describe, expect, it } from "vitest";
import { getChrome } from "./chrome";

describe("getChrome", () => {
  it("labels the header and the navigation in English, in order and with the same hrefs", () => {
    const chrome = getChrome("en");
    expect(chrome.wordmarkSubtitle).toBe("ENTREPRENEUR & BUILDER");
    expect(chrome.navLabel).toBe("Main navigation");
    expect(chrome.languageLabel).toBe("Language");
    expect(chrome.nav).toEqual([
      { href: "/journey", label: "The journey" },
      { href: "/speaking", label: "Speaking & writing" },
      { href: "/work-together", label: "Work together" },
      { href: "#contact", label: "Let’s connect" },
    ]);
  });

  it("labels the header and the navigation in Spanish, in order and with the same hrefs", () => {
    const chrome = getChrome("es");
    expect(chrome.wordmarkSubtitle).toBe("EMPRENDEDOR Y CONSTRUCTOR");
    expect(chrome.navLabel).toBe("Navegación principal");
    expect(chrome.languageLabel).toBe("Idioma");
    expect(chrome.nav).toEqual([
      { href: "/journey", label: "Mi trayectoria" },
      { href: "/speaking", label: "Charlas y escritos" },
      { href: "/work-together", label: "Trabajemos juntos" },
      { href: "#contact", label: "Conectemos" },
    ]);
  });

  it("labels the footer in each language", () => {
    expect(getChrome("en").footer).toEqual({
      tagline: "Colombian entrepreneur. Based in London.",
      links: { journey: "Journey", speaking: "Speaking & writing", workTogether: "Work together" },
      backToTop: "Back to top ↑",
    });
    expect(getChrome("es").footer).toEqual({
      tagline: "Emprendedor colombiano. Radicado en Londres.",
      links: { journey: "Trayectoria", speaking: "Charlas y escritos", workTogether: "Trabajemos juntos" },
      backToTop: "Volver arriba ↑",
    });
  });
});
