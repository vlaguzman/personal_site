import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Conversations } from "./Conversations";

describe("Conversations", () => {
  it("is a section headed 'Conversations worth having'", () => {
    const { container } = render(<Conversations />);
    expect(container.querySelector("section#conversations")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Conversations worth having");
  });

  it("states his approach in two short paragraphs", () => {
    render(<Conversations />);
    expect(screen.getByText(/I speak and write about the intersection/)).toBeInTheDocument();
    expect(screen.getByText(/My goal is not to tell people what to think/)).toBeInTheDocument();
  });

  it("links to the speaking page and to the contact section", () => {
    render(<Conversations />);
    const talks = screen.getByRole("link", { name: /Explore my talks/ });
    expect(talks).toHaveAttribute("href", "/speaking");
    expect(talks).toHaveClass("cta-primary");
    expect(screen.getByRole("link", { name: /Invite me to speak/ })).toHaveAttribute("href", "#contact");
  });

  it("only teases: the talk, slides and topics live on the speaking page", () => {
    const { container } = render(<Conversations />);
    expect(container.querySelector(".talk-feature")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link", { name: /View slides/ })).toBeNull();
    expect(container.querySelector("blockquote")).toBeNull();
    expect(screen.queryAllByRole("heading", { level: 3 })).toEqual([]);
  });
});
