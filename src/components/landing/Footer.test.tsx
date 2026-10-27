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

  it("has no separate essays link, since essays live on the speaking and writing page", () => {
    render(<Footer lang="en" />);
    expect(screen.queryByRole("link", { name: "Essays" })).toBeNull();
    expect(document.querySelector('footer a[href$="/essays"]')).toBeNull();
    render(<Footer lang="es" />);
    expect(screen.queryByRole("link", { name: "Ensayos" })).toBeNull();
  });

  it("links to the journey page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Journey" })).toHaveAttribute("href", "/en/journey");
  });

  it("links to the speaking page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Speaking & writing" })).toHaveAttribute("href", "/en/speaking");
  });

  it("links to the work together page", () => {
    render(<Footer lang="en" />);
    expect(screen.getByRole("link", { name: "Work together" })).toHaveAttribute("href", "/en/work-together");
  });

  it("prefixes every route with the Spanish locale on the Spanish site", () => {
    render(<Footer lang="es" />);
    expect(screen.getByRole("link", { name: "Trayectoria" })).toHaveAttribute("href", "/es/journey");
    expect(screen.getByRole("link", { name: "Charlas y escritos" })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: "Trabajemos juntos" })).toHaveAttribute("href", "/es/work-together");
  });

  it("translates the tagline, the copyright year and the back-to-top link", () => {
    render(<Footer lang="es" year={2031} />);
    expect(screen.getByText("© 2031 Vladimir Guzmán")).toBeInTheDocument();
    expect(screen.getByText("Emprendedor colombiano. Radicado en Londres.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Volver arriba ↑" })).toHaveAttribute("href", "#home");
    expect(screen.queryByText(/Colombian entrepreneur/)).toBeNull();
  });
});
