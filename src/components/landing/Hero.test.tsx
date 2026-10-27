import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";
import { SITE } from "@/data/site";

describe("Hero", () => {
  it("renders the brand statement and the home anchor", () => {
    const { container } = render(<Hero lang="en" />);
    expect(container.querySelector("section#home")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Question the obvious.Build what matters.");
  });

  it("states his name and roles", () => {
    render(<Hero lang="en" />);
    expect(screen.getByText("Vladimir Guzmán")).toBeInTheDocument();
    expect(screen.getByText("Entrepreneur · Technology Builder · Speaker")).toBeInTheDocument();
  });

  it("keeps the hero to the message, leaving the intro story to its own section", () => {
    render(<Hero lang="en" />);
    expect(screen.queryByText(/experienced failure and started again/)).not.toBeInTheDocument();
  });

  it("shows the Cambridge talk photo with a meaningful alt text", () => {
    render(<Hero lang="en" />);
    const img = screen.getByRole("img", { name: "Vladimir Guzmán presenting at Clare Hall, Cambridge" });
    expect(img.getAttribute("src")).toContain("hero-cambridge-talk.jpg");
  });

  it("has a primary CTA to the writing section and a secondary CTA to contact", () => {
    render(<Hero lang="en" />);
    const primary = screen.getByRole("link", { name: /Explore my thinking/ });
    expect(primary).toHaveAttribute("href", "/en/speaking#writing");
    expect(primary).toHaveClass("cta-primary");
    const secondary = screen.getByRole("link", { name: /Invite me to speak/ });
    expect(secondary).toHaveAttribute("href", SITE.whatsapp);
    expect(secondary).toHaveClass("cta-secondary");
  });

  it("does not use consultant language", () => {
    const { container } = render(<Hero lang="en" />);
    expect(container.textContent).not.toMatch(/consultant|expert/i);
  });
});

describe("Hero with the Spanish locale", () => {
  it("renders the brand statement in Spanish", () => {
    const { container } = render(<Hero lang="es" />);
    expect(container.querySelector("section#home")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Cuestiona lo establecido.Construye lo que importa.");
    expect(screen.getByText("RAÍCES COLOMBIANAS. CAPÍTULO LONDRES.")).toBeInTheDocument();
  });

  it("states his name and roles in Spanish", () => {
    render(<Hero lang="es" />);
    expect(screen.getByText("Vladimir Guzmán")).toBeInTheDocument();
    expect(screen.getByText("Emprendedor · Líder tecnológico · Conferencista")).toBeInTheDocument();
  });

  it("describes the photo in Spanish", () => {
    render(<Hero lang="es" />);
    const img = screen.getByRole("img", { name: "Vladimir Guzmán presentando en Clare Hall, Cambridge" });
    expect(img.getAttribute("src")).toContain("hero-cambridge-talk.jpg");
  });

  it("prefixes the writing link with /es and sends the invitation to WhatsApp", () => {
    render(<Hero lang="es" />);
    const primary = screen.getByRole("link", { name: /Explora mis ideas/ });
    expect(primary).toHaveAttribute("href", "/es/speaking#writing");
    expect(primary).toHaveClass("cta-primary");
    const secondary = screen.getByRole("link", { name: /Invítame a conversar/ });
    expect(secondary).toHaveAttribute("href", SITE.whatsapp);
    expect(secondary).toHaveClass("cta-secondary");
  });

  it("does not use consultant language", () => {
    const { container } = render(<Hero lang="es" />);
    expect(container.textContent).not.toMatch(/consultor|experto|consultant|expert/i);
  });

  it.each(["en", "es"] as const)("opens the invitation on WhatsApp in a new tab, safely (%s)", (lang) => {
    render(<Hero lang={lang} />);
    const invite = document.querySelector(".cta-secondary")!;
    expect(invite).toHaveAttribute("href", "https://api.whatsapp.com/send/?phone=447551273933");
    expect(invite).toHaveAttribute("target", "_blank");
    expect(invite).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
