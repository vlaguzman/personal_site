import { describe, expect, it } from "vitest";
import { getPurpose } from "./purpose";

describe("getPurpose", () => {
  it("states the purpose in English", () => {
    expect(getPurpose("en")).toEqual({
      eyebrow: "WHAT CONNECTS IT ALL",
      quoteLead: "My purpose is to help entrepreneurs ",
      quoteEmphasis: "make a living from their passion.",
      name: "Vladimir Guzmán",
      tagline: "TECHNOLOGY + EDUCATION + PRACTICAL SUPPORT",
    });
  });

  it("states the purpose in Spanish", () => {
    expect(getPurpose("es")).toEqual({
      eyebrow: "LO QUE LO CONECTA TODO",
      quoteLead: "Mi propósito es ayudar a los emprendedores a ",
      quoteEmphasis: "vivir de su pasión.",
      name: "Vladimir Guzmán",
      tagline: "TECNOLOGÍA + EDUCACIÓN + APOYO PRÁCTICO",
    });
  });
});
