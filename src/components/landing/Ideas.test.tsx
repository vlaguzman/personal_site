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
});

describe("Ideas with the Spanish locale", () => {
  it("prefixes the essays link with /es", () => {
    render(<Ideas lang="es" />);
    expect(screen.getByRole("link", { name: /Explore more ideas/ })).toHaveAttribute("href", "/es/essays");
  });
});
