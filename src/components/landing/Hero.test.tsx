import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline and the home anchor", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section#home")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Building businesses.Connecting people.Creating possibility.",
    );
  });

  it("links to the journey section", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /Explore my journey/ })).toHaveAttribute("href", "#journey");
  });

  it("lists the four focus areas", () => {
    render(<Hero />);
    for (const label of ["PRODUCT", "TECHNOLOGY", "ENTREPRENEURSHIP", "COMMUNITY"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
