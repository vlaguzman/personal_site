import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

describe("globals.css", () => {
  it("never hides a main navigation link on small screens", () => {
    expect(css).not.toMatch(/nav a(:first-child|:nth-child\(\d+\))?\s*\{[^}]*display:\s*none/);
  });

  it("keeps the language switcher from inheriting the underline meant for the last main nav link", () => {
    expect(css).toMatch(/\.lang-switch a:last-child\s*\{[^}]*border-bottom:\s*0/);
  });

  it("never hides a language switcher link on small screens", () => {
    expect(css).not.toMatch(/\.lang-switch[^{]*\{[^}]*display:\s*none/);
  });

  it("styles the AI translation badge as a bordered chip with high-contrast text, not colour alone", () => {
    const rule = css.match(/\.essay-ai-badge\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(rule).toMatch(/border:\s*1px solid/);
    expect(rule).toMatch(/color:\s*var\(--primary\)/);
  });

  it("defines the shared closing band once, so its rules cannot drift apart", () => {
    expect(css.match(/^\.page-closing \{/gm)).toHaveLength(1);
  });

});

describe("visual identity", () => {
  const token = (name: string) => css.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1].toUpperCase();

  it("uses the Midnight, Ivory and Cobalt palette", () => {
    expect(token("--primary")).toBe("#172033");
    expect(token("--bg")).toBe("#F7F5EF");
    expect(token("--accent-fill")).toBe("#3158D9");
    // Small text on ivory and on tinted callouts uses a slightly deeper cobalt to keep AA headroom.
    expect(token("--accent")).toBe("#2A4DC6");
  });

  it("leaves no trace of the previous forest-green and amber palette", () => {
    expect(css).not.toMatch(/#0F1F18|#1C3829|#C8932A|#D9A63F|#F5F0E8/i);
    expect(css).not.toMatch(/rgb\(\s*(15 31 24|28 56 41|200 147 42|245 240 232)/);
  });

  it("shows no green anywhere: emphasis, hovers and tints all use cobalt", () => {
    expect(css).not.toMatch(/--secondary|#16776E|rgb\(\s*22 119 110/i);
  });

  it("keeps secondary text above AA on tinted callouts, not only on plain ivory", () => {
    const op = Number(css.match(/--text-secondary:\s*rgb\(23 32 51 \/ ([0-9.]+)\)/)?.[1]);
    expect(op).toBeGreaterThanOrEqual(0.76);
  });

  it("loads the editorial headline and interface typefaces", () => {
    expect(css).toMatch(/--font-display:\s*var\(--font-newsreader\)/);
    expect(css).toMatch(/--font-body:\s*var\(--font-geist\)/);
    expect(css).not.toMatch(/playfair|--font-inter|jetbrains/i);
  });

  it("keeps filled buttons and markers on the fill token, so text accents can change on dark surfaces", () => {
    expect(css).not.toMatch(/background:\s*var\(--accent\);/);
    expect(css).not.toMatch(/background:\s*var\(--accent-hover\)/);
  });

  it("keeps the Y Combinator mark in YC's own orange, outside the site palette", () => {
    expect(token("--yc-orange")).toBe("#FF6600");
    const rule = css.match(/\.yc > span \{[^}]*\}/)?.[0] ?? "";
    expect(rule).toMatch(/background:\s*var\(--yc-orange\)/);
    expect(rule).not.toMatch(/--accent/);
  });

  it("lightens the accent on dark surfaces", () => {
    expect(css).toMatch(/--accent:\s*var\(--accent-on-dark\)/);
  });

  describe("contrast (WCAG AA, 4.5:1 for text)", () => {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => {
        const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a: string, b: string) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    const pairs: [string, string, string][] = [
      ["ivory text on a cobalt button", "--on-dark", "--accent-fill"],
      ["ivory text on a hovered cobalt button", "--on-dark", "--accent-fill-hover"],
      ["cobalt text and rules on ivory", "--accent", "--bg"],
      ["light accent on midnight", "--accent-on-dark", "--primary"],
      ["light accent on the dark panel", "--accent-on-dark", "--surface-dark"],
      ["ivory on the dark panel", "--on-dark", "--surface-dark"],
      ["midnight text on ivory", "--text", "--bg"],
    ];
    it.each(pairs)("%s", (_label, fg, bg) => {
      const [a, b] = [token(fg), token(bg)];
      expect(a, fg).toBeDefined();
      expect(b, bg).toBeDefined();
      expect(ratio(a!, b!)).toBeGreaterThanOrEqual(4.5);
    });
  });

});

describe("tablet reading width", () => {
  /** Rules inside every `@media (max-width: 1000px)` block, concatenated. */
  const tablet = [...css.matchAll(/@media \(max-width: 1000px\) \{([\s\S]*?)\n\}/g)].map((m) => m[1]).join("\n");

  const stacked = [
    ".intro-inner",
    ".experience-inner",
    ".idea-list li",
    ".conversations-heading",
    ".beliefs-heading",
    ".speaking-intro-body",
    ".speaking-topics ul",
    ".speaking-teaching-grid",
    ".speaking-bio",
    ".work-offers li",
    ".work-gingga",
    ".talk-feature",
    ".contact",
    ".section-heading",
  ];

  it.each(stacked)("stacks %s into one column so lines stay readable", (selector) => {
    const rule = tablet.match(new RegExp(`(^|[\\s,])${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(,|\\s*\\{)[^{}]*\\{[^}]*grid-template-columns:\\s*1fr;`, "m"));
    // The selector may sit in a comma list; fall back to checking it appears in a rule that sets one column.
    const inList = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^{]*\\{[^}]*grid-template-columns:\\s*1fr;`).test(tablet);
    expect(Boolean(rule) || inList, selector).toBe(true);
  });

  it("drives the timeline column from one variable that tablets shrink, instead of four hard-coded 30%", () => {
    expect(css).not.toMatch(/left:\s*(calc\()?30%/);
    expect(css).not.toMatch(/grid-template-columns:\s*30%\s*70%/);
    expect(css).toMatch(/--timeline-col:\s*30%/);
    expect(tablet).toMatch(/--timeline-col:\s*2\d%/);
  });

  it("keeps year ranges such as 2020–2021 on one line in the narrower tablet column", () => {
    expect(tablet).toMatch(/\.year\.words\s*\{[^}]*white-space:\s*nowrap/);
  });

  it("lowers the display size on tablets so two-line hero titles do not leave a one-word last line", () => {
    expect(tablet).toMatch(/--fs-display:\s*clamp\([^)]*3\.25rem\)/);
  });

  it("balances headings and avoids one-word last lines in paragraphs", () => {
    expect(css).toMatch(/h1,\s*h2,\s*h3\s*\{[^}]*text-wrap:\s*balance/);
    expect(css).toMatch(/\bp\s*\{[^}]*text-wrap:\s*pretty/);
  });

});

describe("display typography", () => {
  it("sets display-serif text in weight 600, not 700, so the optical-size cut can stay fine", () => {
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    const heavy = rules
      .filter(([, , body]) => /font-family:\s*var\(--font-display\)/.test(body) && /font-weight:\s*700/.test(body))
      .map(([, sel]) => sel.trim().split("\n").pop());
    expect(heavy).toEqual([]);
  });

  it("keeps the emphasised italic at the same weight as the headline", () => {
    expect(css).toMatch(/\bem\s*\{[^}]*font-weight:\s*600/);
  });
});
