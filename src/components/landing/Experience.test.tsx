import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Experience } from "./Experience";

describe("Experience", () => {
  it("is a section headed 'Built through experience'", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("section#experience")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Built through experience");
  });

  it("tells the story in two paragraphs", () => {
    render(<Experience />);
    expect(screen.getByText(/I’ve spent \d+ years working across entrepreneurship/)).toBeInTheDocument();
    expect(screen.getByText(/From early ventures that failed to companies that raised millions/)).toBeInTheDocument();
  });

  it("lists the roles with their context", () => {
    render(<Experience />);
    const list = screen.getByRole("list", { name: "Experience" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent("Co-founder and former CTO");
    expect(items[0]).toHaveTextContent("HoyTrabajas · Y Combinator W22");
    expect(items[4]).toHaveTextContent("AI, entrepreneurship and human potential");
  });

  it("links to the journey", () => {
    render(<Experience />);
    const cta = screen.getByRole("link", { name: /Explore my journey/ });
    expect(cta).toHaveAttribute("href", "#journey");
    expect(cta).toHaveClass("cta-secondary");
  });

  it("shows the track-record figures with their labels", () => {
    render(<Experience />);
    const list = screen.getByRole("list", { name: "Track record" });
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[2]).toHaveTextContent("20+");
    expect(items[3]).toHaveTextContent("270+");
    expect(list).not.toHaveTextContent("50,000");
  });

  it("links the money raised to the press that reported it, opening in a new tab", () => {
    render(<Experience />);
    const forbes = screen.getByRole("link", { name: /Forbes Colombia/ });
    expect(forbes).toHaveAttribute(
      "href",
      "https://forbes.co/emprendedores/plataforma-de-empleos-hoytrabajas-capta-us5-millones-en-ronda-semilla",
    );
    expect(forbes).toHaveAttribute("target", "_blank");
    expect(forbes).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(screen.getByRole("link", { name: /LatamList/ })).toHaveAttribute("target", "_blank");
  });
});
