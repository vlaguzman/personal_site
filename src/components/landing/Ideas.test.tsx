import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Ideas } from "./Ideas";

describe("Ideas", () => {
  it("is a section headed 'Ideas worth challenging'", () => {
    const { container } = render(<Ideas lang="en" />);
    expect(container.querySelector("section#ideas")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ideas worth challenging");
  });

  it("lists the three ideas, each claim as a heading with its argument", () => {
    render(<Ideas lang="en" />);
    const list = screen.getByRole("list", { name: "Ideas worth challenging" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByRole("heading", { level: 3 })).toHaveTextContent("Not every business needs AI.");
    expect(within(items[0]).getByText(/what becomes possible when we do/)).toBeInTheDocument();
    expect(within(items[1]).getByRole("heading", { level: 3 })).toHaveTextContent(/Raising money isn’t the same/);
    expect(within(items[2]).getByText(/human potential we haven’t learned to recognise/)).toBeInTheDocument();
  });

  it("closes with humility and a link to the essays", () => {
    render(<Ideas lang="en" />);
    expect(screen.getByText(/I don’t claim to have every answer/)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /Explore more ideas/ });
    expect(cta).toHaveAttribute("href", "/en/essays");
    expect(cta).toHaveClass("cta-primary");
  });

  it("emphasises the last word of the heading", () => {
    const { container } = render(<Ideas lang="en" />);
    expect(container.querySelector("h2 em")).toHaveTextContent("challenging");
  });
});

describe("Ideas with the Spanish locale", () => {
  it("is headed 'Ideas que vale la pena cuestionar' with the emphasis on the verb", () => {
    const { container } = render(<Ideas lang="es" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ideas que vale la pena cuestionar");
    expect(container.querySelector("h2 em")).toHaveTextContent("cuestionar");
    expect(screen.getByText("CÓMO PIENSO")).toBeInTheDocument();
  });

  it("lists the three ideas in Spanish under a Spanish label", () => {
    render(<Ideas lang="es" />);
    const items = within(screen.getByRole("list", { name: "Ideas que vale la pena cuestionar" })).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByRole("heading", { level: 3 })).toHaveTextContent(
      "No todos los negocios necesitan inteligencia artificial.",
    );
    expect(within(items[1]).getByText(/El capital abre puertas/)).toBeInTheDocument();
  });

  it("closes in Spanish and prefixes the essays link with /es", () => {
    render(<Ideas lang="es" />);
    expect(screen.getByText(/No pretendo tener todas las respuestas/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explora más ideas/ })).toHaveAttribute("href", "/es/essays");
  });
});
