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
});
