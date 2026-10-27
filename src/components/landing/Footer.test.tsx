import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the given year", () => {
    render(<Footer lang="en" year={2031} />);
    expect(screen.getByText("© 2031 Vladimir Guzmán")).toBeInTheDocument();
  });

  it("defaults to the current year", () => {
    render(<Footer lang="en" />);
    expect(screen.getByText(`© ${new Date().getFullYear()} Vladimir Guzmán`)).toBeInTheDocument();
  });

  it("links back to the top", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: /Back to top/ })).toHaveAttribute("href", "#home");
  });

  it("links to the essays hub", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/en/essays");
  });

  it("links to the journey page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute("href", "/en/journey");
  });

  it("links to the speaking page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute("href", "/en/speaking");
  });

  it("links to the work together page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Work together" })).toHaveAttribute("href", "/en/work-together");
  });

  it("prefixes every route with the Spanish locale on the Spanish site", () => {
    render(<Footer lang="es" />);
    expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/es/essays");
    expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute("href", "/es/journey");
    expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: "Work together" })).toHaveAttribute("href", "/es/work-together");
  });
});
