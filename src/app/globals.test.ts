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
});
