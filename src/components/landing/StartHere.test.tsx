import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import { StartHere } from "./StartHere";

const essay: Essay = {
  slug: "primero",
  title: "Primero lee esto",
  topic: "Startups",
  lang: "es",
  sections: [{ text: "Un párrafo inicial. ".repeat(40).trim() }],
};

describe("StartHere", () => {
  it("highlights the essay with a Start here label, reading time, excerpt and link", () => {
    render(<StartHere lang="en" essay={essay} />);
    expect(screen.getByText("Start here")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Primero lee esto/ });
    expect(link).toHaveAttribute("href", "/en/essays/primero");
    expect(screen.getByText("1 min read")).toBeInTheDocument();
    expect(screen.getByText(/Un párrafo inicial\./)).toHaveAttribute("lang", "es");
  });
});

describe("StartHere in English", () => {
  it("shows the topic and notes that the essay is in Spanish", () => {
    render(<StartHere lang="en" essay={essay} />);
    expect(screen.getByText("Startups")).toBeInTheDocument();
    expect(screen.getByText("In Spanish")).toBeInTheDocument();
  });
});

describe("StartHere with the Spanish locale", () => {
  it("prefixes the essay link with /es", () => {
    render(<StartHere lang="es" essay={essay} />);
    expect(screen.getByRole("link", { name: /Primero lee esto/ })).toHaveAttribute("href", "/es/essays/primero");
  });

  it("translates the label and the meta, and drops the redundant language notice", () => {
    render(<StartHere lang="es" essay={{ ...essay, topic: "Product" }} />);
    expect(screen.getByText("Empieza aquí")).toBeInTheDocument();
    expect(screen.getByText("Producto")).toBeInTheDocument();
    expect(screen.getByText("1 min de lectura")).toBeInTheDocument();
    expect(screen.queryByText(/En español/)).not.toBeInTheDocument();
  });
});

describe("StartHere translation label", () => {
  const translation: Essay = { ...essay, title: "Read this first", lang: "en", translatedWithAI: true };

  it("shows a visible Translated with AI label on an AI translation", () => {
    render(<StartHere lang="en" essay={translation} />);
    expect(screen.getByText("Translated with AI")).toBeVisible();
    expect(screen.getByText("Translated with AI")).toHaveClass("essay-ai-badge");
    expect(screen.getByRole("link", { name: "Read this first" })).toHaveAttribute("href", "/en/essays/primero");
    expect(screen.queryByText("In Spanish")).not.toBeInTheDocument();
  });

  it("does not label an original", () => {
    render(<StartHere lang="es" essay={essay} />);
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
  });

  it("labels in the page language", () => {
    render(<StartHere lang="es" essay={translation} />);
    expect(screen.getByText("Traducido con IA")).toHaveClass("essay-ai-badge");
  });
});

