import { describe, expect, it } from "vitest";
import { getIdeas } from "./ideas";

describe("getIdeas", () => {
  it("challenges exactly three assumptions in each language", () => {
    expect(getIdeas("en").items).toHaveLength(3);
    expect(getIdeas("es").items).toHaveLength(3);
  });

  it("models the heading as a lead plus an emphasised word, with a matching list label", () => {
    const en = getIdeas("en");
    expect(en.eyebrow).toBe("HOW I THINK");
    expect([en.titleLead, en.titleEmphasis, en.listLabel]).toEqual(["Ideas worth", "challenging", "Ideas worth challenging"]);
    const es = getIdeas("es");
    expect(es.eyebrow).toBe("CÓMO PIENSO");
    expect([es.titleLead, es.titleEmphasis, es.listLabel]).toEqual([
      "Ideas que vale la pena",
      "cuestionar",
      "Ideas que vale la pena cuestionar",
    ]);
  });

  it("states each idea as a claim, with a supporting argument", () => {
    expect(getIdeas("en").items.map((i) => i.claim)).toEqual([
      "Not every business needs AI.",
      "Raising money isn’t the same as building a successful business.",
      "Talent isn’t always the problem. Opportunity often is.",
    ]);
    expect(getIdeas("es").items.map((i) => i.claim)).toEqual([
      "No todos los negocios necesitan inteligencia artificial.",
      "Levantar inversión no es lo mismo que construir una empresa exitosa.",
      "El talento no siempre es el problema. Las oportunidades muchas veces sí.",
    ]);
    expect(getIdeas("es").items.map((i) => i.argument)).toEqual([
      "La tecnología debe resolver problemas reales, no simplemente seguir tendencias. La pregunta no es cuánto podemos automatizar, sino qué nuevas posibilidades podemos crear.",
      "El capital abre puertas, pero son los clientes, la disciplina financiera y el valor que generamos los que sostienen un negocio.",
      "¿Y si una de nuestras mayores riquezas no estuviera en la tecnología, sino en el potencial de millones de personas que todavía no hemos aprendido a reconocer?",
    ]);
    expect(getIdeas("en").items.map((i) => i.argument)).toEqual([
      "Technology should solve meaningful problems, not simply follow trends. The question isn’t what we can automate, but what becomes possible when we do.",
      "Funding creates opportunities, but customers, financial discipline and real value are what sustain a company.",
      "What if our greatest untapped resource isn’t technology, but the human potential we haven’t learned to recognise?",
    ]);
  });

  it("admits it does not have every answer and invites readers to the essays", () => {
    expect(getIdeas("en").closing).toBe(
      "I don’t claim to have every answer. I believe good questions, honest debate and the willingness to experiment can take us further.",
    );
    expect(getIdeas("en").cta).toEqual({ label: "Explore more ideas", href: "/essays" });
    expect(getIdeas("es").closing).toBe(
      "No pretendo tener todas las respuestas. Creo en las buenas preguntas, en debatir con honestidad y en aprender haciendo.",
    );
    expect(getIdeas("es").cta).toEqual({ label: "Explora más ideas", href: "/essays" });
  });
});
