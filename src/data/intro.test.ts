import { describe, expect, it } from "vitest";
import { getIntro } from "./intro";

describe("intro data", () => {
  it("opens with failure and restarting", () => {
    expect(getIntro("en").eyebrow).toBe("WHERE THIS COMES FROM");
    expect(getIntro("en").statement).toBe("I’ve built businesses, led technology teams, experienced failure and started again.");
    expect(getIntro("es").eyebrow).toBe("DE DÓNDE VIENE ESTO");
    expect(getIntro("es").statement).toBe("He creado empresas, liderado equipos de tecnología, fracasado y vuelto a empezar.");
  });

  it("backs it up with the restaurant-to-YC story", () => {
    expect(getIntro("en").support).toBe(
      "From opening a restaurant in Colombia to building a Y Combinator-backed company, I’ve learned that the most valuable ideas often begin by questioning what everyone else takes for granted.",
    );
    expect(getIntro("es").support).toBe(
      "Desde abrir un restaurante en Colombia hasta construir una startup que llegó a Y Combinator, he aprendido que muchas de las mejores oportunidades aparecen cuando nos atrevemos a cuestionar lo que otros dan por hecho.",
    );
  });
});
