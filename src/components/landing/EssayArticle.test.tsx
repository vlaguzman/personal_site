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
    render(<EssayArticle lang="en" essay={fixture} related={related} />);
    expect(screen.getByRole("heading", { level: 1, name: "Fixture essay" })).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("2 min read")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "A heading" })).toBeInTheDocument();
    expect(screen.getByText("Body under heading.")).toBeInTheDocument();
  });

  it("marks the language of the content and notes when it is not English", () => {
    const { container, rerender } = render(<EssayArticle lang="en" essay={fixture} related={[]} />);
    expect(container.querySelector("article")).toHaveAttribute("lang", "en");
    expect(screen.queryByText(/Written in Spanish/)).not.toBeInTheDocument();
    rerender(<EssayArticle lang="en" essay={{ ...fixture, lang: "es" }} related={[]} />);
    expect(container.querySelector("article")).toHaveAttribute("lang", "es");
    expect(screen.getByText(/Written in Spanish/)).toBeInTheDocument();
  });

  it("offers share links to X and LinkedIn that open safely in a new tab", () => {
    render(<EssayArticle lang="en" essay={fixture} related={[]} />);
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
    render(<EssayArticle lang="en" essay={fixture} related={related} />);
    const region = screen.getByRole("region", { name: "Related reading" });
    expect(within(region).getByRole("link", { name: /Related one/ })).toHaveAttribute("href", "/en/essays/r1");
    expect(within(region).getAllByRole("link")).toHaveLength(2);
  });

  it("omits related reading when there is nothing related", () => {
    render(<EssayArticle lang="en" essay={fixture} related={[]} />);
    expect(screen.queryByRole("region", { name: "Related reading" })).not.toBeInTheDocument();
  });

  it("links back to the writing section of the speaking page", () => {
    render(<EssayArticle lang="en" essay={fixture} related={[]} />);
    expect(screen.getByRole("link", { name: /All essays/ })).toHaveAttribute("href", "/en/speaking#writing");
  });
});

describe("EssayArticle with the Spanish locale", () => {
  it("prefixes the back link and the related essays with /es", () => {
    render(<EssayArticle lang="es" essay={fixture} related={related} />);
    expect(screen.getByRole("link", { name: /Todos los ensayos/ })).toHaveAttribute("href", "/es/speaking#writing");
    expect(screen.getByRole("link", { name: /Related one/ })).toHaveAttribute("href", "/es/essays/r1");
  });

  it("translates the chrome around the essay while keeping its own language", () => {
    const { container } = render(<EssayArticle lang="es" essay={{ ...fixture, lang: "es", topic: "Strategy" }} related={related} />);
    expect(container.querySelector("article")).toHaveAttribute("lang", "es");
    expect(screen.getByText("Estrategia")).toBeInTheDocument();
    expect(screen.getByText("2 min de lectura")).toBeInTheDocument();
    expect(screen.getByText("COMPARTIR")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Compartir en X/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Compartir en LinkedIn/ })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Lecturas relacionadas" })).toBeInTheDocument();
    expect(screen.getAllByText(/· 1 min$/)).toHaveLength(2);
  });

  it("drops the written-in notice when the essay is already in the page language", () => {
    render(<EssayArticle lang="es" essay={{ ...fixture, lang: "es" }} related={[]} />);
    expect(screen.queryByText(/Escrito en/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Written in/)).not.toBeInTheDocument();
  });

  it("notes the language of an English essay read in Spanish", () => {
    render(<EssayArticle lang="es" essay={fixture} related={[]} />);
    expect(screen.getByText("Escrito en inglés")).toBeInTheDocument();
  });

  it("marks the interface text with the page language, not the essay language", () => {
    const { container } = render(<EssayArticle lang="es" essay={{ ...fixture, lang: "en" }} related={[]} />);
    expect(container.querySelector(".essay-back")).toHaveAttribute("lang", "es");
    expect(container.querySelector(".essay-meta")).toHaveAttribute("lang", "es");
    expect(container.querySelector(".essay-share")).toHaveAttribute("lang", "es");
  });
});

describe("EssayArticle translation", () => {
  const translation: Essay = { ...fixture, slug: "ser-emprendedor", translatedWithAI: true };
  const original: Essay = { ...fixture, slug: "ser-emprendedor", lang: "es", title: "Ser emprendedor" };

  it("labels an AI translation in the header and links to the Spanish original", () => {
    const { container } = render(<EssayArticle lang="en" essay={translation} related={[]} />);
    const header = container.querySelector(".essay-header")!;
    expect(within(header as HTMLElement).getByText("Translated with AI")).toHaveClass("essay-ai-badge");
    expect(within(header as HTMLElement).getByText("Translated with AI from the Spanish original.")).toBeVisible();
    expect(within(header as HTMLElement).getByRole("link", { name: "Read the original in Spanish" })).toHaveAttribute(
      "href",
      "/es/essays/ser-emprendedor",
    );
  });

  it("shows no language notice for a translation read in its own language", () => {
    render(<EssayArticle lang="en" essay={translation} related={[]} />);
    expect(screen.queryByText(/Written in Spanish/)).not.toBeInTheDocument();
  });

  it("keeps the translation block out of an original that has no translation", () => {
    render(<EssayArticle lang="es" essay={original} related={[]} />);
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Leer en inglés/ })).not.toBeInTheDocument();
  });

  it("offers the English translation from a Spanish original that has one", () => {
    render(<EssayArticle lang="es" essay={original} related={[]} translationAvailable />);
    expect(screen.getByRole("link", { name: "Leer en inglés (traducido con IA)" })).toHaveAttribute(
      "href",
      "/en/essays/ser-emprendedor",
    );
    expect(screen.queryByText("Traducido con IA")).not.toBeInTheDocument();
  });

  it("labels and links in the page language", () => {
    render(<EssayArticle lang="es" essay={translation} related={[]} />);
    expect(screen.getByText("Traducido con IA")).toBeVisible();
    expect(screen.getByRole("link", { name: "Leer el original en español" })).toHaveAttribute("href", "/es/essays/ser-emprendedor");
  });
});

