import { describe, expect, it } from "vitest";
import { getHero } from "./hero";

describe("hero data", () => {
  it("leads with the brand statement in each language", () => {
    expect(getHero("en").headlineLines).toEqual(["Question the obvious."]);
    expect(getHero("en").headlineEmphasis).toBe("Build what matters.");
    expect(getHero("es").headlineLines).toEqual(["Cuestiona lo establecido."]);
    expect(getHero("es").headlineEmphasis).toBe("Construye lo que importa.");
  });

  it("frames the eyebrow in each language", () => {
    expect(getHero("en").eyebrow).toBe("COLOMBIAN ROOTS. LONDON CHAPTER.");
    expect(getHero("es").eyebrow).toBe("RAÍCES COLOMBIANAS. CAPÍTULO LONDRES.");
  });

  it("states his name and roles", () => {
    expect(getHero("en").byline).toEqual({
      name: "Vladimir Guzmán",
      roles: "Entrepreneur · Technology Builder · Speaker",
    });
    expect(getHero("es").byline).toEqual({
      name: "Vladimir Guzmán",
      roles: "Emprendedor · Líder tecnológico · Conferencista",
    });
  });

  it("keeps the hero to the message, with no intro paragraphs", () => {
    expect("lead" in getHero("en")).toBe(false);
    expect("lead" in getHero("es")).toBe(false);
  });

  it("points the primary CTA at the essays hub and the secondary at contact", () => {
    expect(getHero("en").primaryCta).toEqual({ label: "Explore my thinking", href: "/essays" });
    expect(getHero("en").secondaryCta).toEqual({ label: "Invite me to speak", href: "#contact" });
    expect(getHero("es").primaryCta).toEqual({ label: "Explora mis ideas", href: "/essays" });
    expect(getHero("es").secondaryCta).toEqual({ label: "Invítame a conversar", href: "#contact" });
  });

  it("uses a photo that exists in public/ with a meaningful alt in each language", async () => {
    const { existsSync } = await import("node:fs");
    const en = getHero("en").photo;
    const es = getHero("es").photo;
    expect(existsSync(`public${en.src}`)).toBe(true);
    expect(en.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
    expect(es.alt).toBe("Vladimir Guzmán presentando en Clare Hall, Cambridge");
    expect({ src: es.src, width: es.width, height: es.height }).toEqual({ src: en.src, width: en.width, height: en.height });
  });
});
