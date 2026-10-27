import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

describe("globals.css", () => {
  it("never hides a main navigation link on small screens", () => {
    expect(css).not.toMatch(/nav a(:first-child|:nth-child\(\d+\))?\s*\{[^}]*display:\s*none/);
  });
});
