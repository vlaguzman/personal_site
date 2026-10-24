import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import { EssayArticle } from "./EssayArticle";

// Test-only fixture: never published on the site.
const fixture: Essay = {
  slug: "fixture",
  title: "Fixture essay",
  topic: "Product",
  lang: "en",
  sections: [
    { text: "Opening paragraph. ".repeat(120).trim() },
    { heading: "A heading", text: "Body under heading." },
  ],
};
const related: Essay[] = [
  { slug: "r1", title: "Related one", topic: "Product", lang: "es", sections: [{ text: "x" }] },
  { slug: "r2", title: "Related two", lang: "es", sections: [{ text: "x" }] },
];

describe("EssayArticle", () => {
  it("renders title, topic, reading time and the body with its headings", () => {
    render(<EssayArticle essay={fixture} related={related} />);
    expect(screen.getByRole("heading", { level: 1, name: "Fixture essay" })).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("2 min read")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "A heading" })).toBeInTheDocument();
    expect(screen.getByText("Body under heading.")).toBeInTheDocument();
  });

  it("marks the language of the content and notes when it is not English", () => {
    const { container, rerender } = render(<EssayArticle essay={fixture} related={[]} />);
    expect(container.querySelector("article")).toHaveAttribute("lang", "en");
    expect(screen.queryByText(/Written in Spanish/)).not.toBeInTheDocument();
    rerender(<EssayArticle essay={{ ...fixture, lang: "es" }} related={[]} />);
    expect(container.querySelector("article")).toHaveAttribute("lang", "es");
    expect(screen.getByText(/Written in Spanish/)).toBeInTheDocument();
  });

  it("offers share links to X and LinkedIn that open safely in a new tab", () => {
    render(<EssayArticle essay={fixture} related={[]} />);
    const x = screen.getByRole("link", { name: /Share on X/ });
    const li = screen.getByRole("link", { name: /Share on LinkedIn/ });
    expect(x.getAttribute("href")).toMatch(/^https:\/\/twitter\.com\/intent\/tweet\?text=Fixture%20essay/);
    expect(li.getAttribute("href")).toMatch(/^https:\/\/www\.linkedin\.com\/sharing\/share-offsite\//);
    for (const a of [x, li]) {
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("ends with related reading linking to internal essays", () => {
    render(<EssayArticle essay={fixture} related={related} />);
    const region = screen.getByRole("region", { name: "Related reading" });
    expect(within(region).getByRole("link", { name: /Related one/ })).toHaveAttribute("href", "/essays/r1");
    expect(within(region).getAllByRole("link")).toHaveLength(2);
  });

  it("omits related reading when there is nothing related", () => {
    render(<EssayArticle essay={fixture} related={[]} />);
    expect(screen.queryByRole("region", { name: "Related reading" })).not.toBeInTheDocument();
  });

  it("links back to the essays hub", () => {
    render(<EssayArticle essay={fixture} related={[]} />);
    expect(screen.getByRole("link", { name: /All essays/ })).toHaveAttribute("href", "/essays");
  });
});
