import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("shows the given year", () => {
    render(<Footer year={2031} />);
    expect(screen.getByText("© 2031 Vladimir Guzmán")).toBeInTheDocument();
  });

  it("defaults to the current year", () => {
    render(<Footer />);
    expect(screen.getByText(`© ${new Date().getFullYear()} Vladimir Guzmán`)).toBeInTheDocument();
  });

  it("links back to the top", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Back to top/ })).toHaveAttribute("href", "#home");
  });

  it("links to the essays hub", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Essays" })).toHaveAttribute("href", "/essays");
  });

  it("links to the journey page", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute("href", "/journey");
  });

  it("links to the speaking page", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Speaking" })).toHaveAttribute("href", "/speaking");
  });

  it("links to the work together page", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Work together" })).toHaveAttribute("href", "/work-together");
  });
});
