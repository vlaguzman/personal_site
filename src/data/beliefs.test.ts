import { describe, expect, it } from "vitest";
import { getBeliefs } from "./beliefs";
import { getIdeas } from "./ideas";

describe("getBeliefs", () => {
  it("has five convictions in each language", () => {
    expect(getBeliefs("en").items).toEqual([
      {
        title: "Success should mean more than money.",
        text: "Profit matters. Financial sustainability matters. But neither is a complete definition of a successful life or a meaningful business.",
      },
      {
        title: "Nobody builds anything meaningful alone.",
        text: "Entrepreneurship may begin with individual initiative, but lasting progress depends on relationships, collaboration and generosity.",
      },
      {
        title: "Technology should expand human potential, not replace human purpose.",
        text: "AI and automation are powerful tools, but adopting technology without asking what it improves is not innovation.",
      },
      {
        title: "Integrity is tested when it becomes inconvenient.",
        text: "Courage sometimes means challenging the consensus, admitting uncertainty, turning down an opportunity or starting again.",
      },
      {
        title: "Build a life worth living, not just a business worth selling.",
        text: "Professional achievement should not automatically outrank relationships, personal growth and the things that give life meaning.",
      },
    ]);
    expect(getBeliefs("es").items).toEqual([
      {
        title: "El éxito debería significar más que dinero.",
        text: "La rentabilidad importa. La sostenibilidad financiera importa. Pero ninguna de las dos define por completo una vida exitosa ni un negocio con sentido.",
      },
      {
        title: "Nadie construye nada importante solo.",
        text: "Emprender puede empezar con la iniciativa de una persona, pero el progreso duradero depende de las relaciones, la colaboración y la generosidad.",
      },
      {
        title: "La tecnología debería ampliar el potencial humano, no reemplazar el propósito humano.",
        text: "La IA y la automatización son herramientas poderosas, pero adoptar tecnología sin preguntarse qué mejora no es innovar.",
      },
      {
        title: "La integridad se prueba cuando se vuelve incómoda.",
        text: "A veces el coraje es cuestionar el consenso, admitir la incertidumbre, rechazar una oportunidad o empezar de nuevo.",
      },
      {
        title: "Construye una vida que valga la pena vivir, no solo un negocio que valga la pena vender.",
        text: "El éxito profesional no debería pasar automáticamente por encima de las relaciones, el crecimiento personal y lo que le da sentido a la vida.",
      },
    ]);
    for (const lang of ["en", "es"] as const) {
      const { items } = getBeliefs(lang);
      expect(items).toHaveLength(5);
      for (const b of items) {
        expect(b.title.length).toBeGreaterThan(0);
        expect(b.text.length).toBeGreaterThan(0);
        expect(b.text.length, b.title).toBeLessThanOrEqual(220);
      }
    }
  });

  it("does not repeat a claim already made in the ideas section", () => {
    for (const lang of ["en", "es"] as const) {
      const claims = getIdeas(lang).items.map((i) => i.claim.toLowerCase());
      for (const b of getBeliefs(lang).items) expect(claims, b.title).not.toContain(b.title.toLowerCase());
    }
    expect(getBeliefs("en").items.map((b) => b.title)).not.toContain("Talent is everywhere. Opportunity is not.");
  });

  it("has unique titles", () => {
    for (const lang of ["en", "es"] as const) {
      const { items } = getBeliefs(lang);
      expect(new Set(items.map((b) => b.title)).size).toBe(items.length);
    }
  });

  it("models the heading as a lead plus an emphasised word", () => {
    const en = getBeliefs("en");
    expect([en.eyebrow, en.titleLead, en.titleEmphasis]).toEqual(["PRINCIPLES", "What I", "believe"]);
    const es = getBeliefs("es");
    expect([es.eyebrow, es.titleLead, es.titleEmphasis]).toEqual(["PRINCIPIOS", "En qué", "creo"]);
  });

  it("sums the philosophy up in one line before the convictions", () => {
    expect(getBeliefs("en").intro).toEqual({
      statement: "Build with ambition. Act with integrity. Stay human.",
      text: "I believe entrepreneurship can create freedom and opportunity, but it should never become an excuse to lose sight of what matters.",
    });
    expect(getBeliefs("es").intro).toEqual({
      statement: "Ambición para construir. Principios para decidir. Personas primero.",
      text: "Creo que emprender puede abrir oportunidades y transformar vidas, pero nunca debería significar perder aquello que da sentido a lo que hacemos.",
    });
  });

  it("closes with a soft invitation to talk", () => {
    expect(getBeliefs("en").closing).toEqual({ lead: "If this resonates,", cta: { label: "Let’s talk", href: "#contact" } });
    expect(getBeliefs("es").closing).toEqual({ lead: "Si esto resuena,", cta: { label: "Conversemos", href: "#contact" } });
  });
});
