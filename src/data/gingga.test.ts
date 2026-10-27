import { describe, expect, it } from "vitest";
import { getArc } from "./arc";
import { getMilestones } from "./milestones";
import { getWork } from "./work";

/**
 * Gingga's offer changes often, so the site only says it builds AI solutions for entrepreneurs.
 * Details (channels, sectors, process) belong on gingga.com.
 */
const DETAIL = /meta ads|whatsapp|real estate|inmobiliari|student|estudiantes|\bleads?\b|sales systems|sistemas de ventas|enquir|consultas/i;

const GENERAL = {
  en: "AI solutions for entrepreneurs",
  es: "soluciones con IA para emprendedores",
} as const;

describe.each(["en", "es"] as const)("Gingga copy in %s", (lang) => {
  const now = getMilestones(lang).find((m) => m.id === "now")!;
  const nowText = now.blocks.flatMap((b) => (b.kind === "paragraph" ? [b.text] : []));
  const arc = getArc(lang).find((s) => s.text.includes("Gingga"))!;

  it("says only that he builds AI solutions for entrepreneurs in the Now milestone", () => {
    expect(nowText[0]).toBe(
      lang === "en" ? "I’m building Gingga: AI solutions for entrepreneurs." : "Estoy construyendo Gingga: soluciones con IA para emprendedores.",
    );
  });

  it("keeps the Now milestone to the general line and the button, with no roadmap line", () => {
    expect(now.blocks.map((b) => b.kind)).toEqual(["paragraph", "button"]);
  });

  it("describes Gingga the same general way in the arc and the work page", () => {
    expect(arc.text).toContain(GENERAL[lang]);
    expect(getWork(lang).gingga.text).toContain(
      lang === "en" ? GENERAL.en : "soluciones con inteligencia artificial para emprendedores",
    );
  });

  it("does not go into channels, sectors or process anywhere", () => {
    const copy = [...nowText, arc.text, getWork(lang).gingga.text].join(" ");
    expect(copy).not.toMatch(DETAIL);
  });
});
