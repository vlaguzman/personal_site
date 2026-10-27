import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE } from "@/data/site";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("links to the Calendly booking page in a new tab instead of email", () => {
    render(<Contact lang="en" />);
    const link = screen.getByRole("link", { name: /Book a conversation/ });
    expect(link).toHaveAttribute("href", SITE.calendly);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("link", { name: new RegExp(SITE.email) })).not.toBeInTheDocument();
  });

  it("opens LinkedIn safely in a new tab", () => {
    render(<Contact lang="en" />);
    const link = screen.getByRole("link", { name: /LinkedIn/ });
    expect(link).toHaveAttribute("href", SITE.linkedin);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("downloads the founder profile", () => {
    render(<Contact lang="en" />);
    expect(screen.getByRole("link", { name: /Download founder profile/ })).toHaveAttribute("href", "/docs/founder-profile.pdf");
  });

  it("asks 'What are you building?' with the emphasis on the second line", () => {
    const { container } = render(<Contact lang="en" />);
    const h2 = container.querySelector("h2")!;
    expect(h2).toHaveTextContent("What are you building?");
    expect(h2.querySelector("br")!.nextSibling).toBe(h2.querySelector("em"));
    expect(h2.querySelector("em")).toHaveTextContent("you building?");
  });
});

describe("Contact with the Spanish locale", () => {
  it("asks the question in Spanish with the emphasis on the second line", () => {
    const { container } = render(<Contact lang="es" />);
    const h2 = container.querySelector("h2")!;
    expect(h2).toHaveTextContent("¿Qué estás construyendo?");
    expect(h2.querySelector("br")!.nextSibling).toBe(h2.querySelector("em"));
    expect(h2.querySelector("em")).toHaveTextContent("construyendo?");
    expect(screen.getByText("LA PRÓXIMA CONVERSACIÓN")).toBeInTheDocument();
    expect(screen.getByText(/Estoy abierto a conversaciones reflexivas/)).toBeInTheDocument();
  });

  it("links to the same booking, LinkedIn and profile with Spanish labels", () => {
    render(<Contact lang="es" />);
    const booking = screen.getByRole("link", { name: /Agenda una conversación/ });
    expect(booking).toHaveAttribute("href", SITE.calendly);
    expect(booking).toHaveAttribute("target", "_blank");
    expect(booking).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", SITE.linkedin);
    expect(screen.getByRole("link", { name: /Descargar perfil de fundador/ })).toHaveAttribute(
      "href",
      "/docs/founder-profile.pdf",
    );
  });
});
