import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Conversations } from "./Conversations";
import { SITE } from "@/data/site";

describe("Conversations", () => {
  it("is a section headed 'Conversations worth having'", () => {
    const { container } = render(<Conversations lang="en" />);
    expect(container.querySelector("section#conversations")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Conversations worth having");
  });

  it("breaks after 'Conversations' and emphasises 'having'", () => {
    const { container } = render(<Conversations lang="en" />);
    const h2 = container.querySelector("h2")!;
    expect(h2.querySelectorAll("br")).toHaveLength(1);
    expect(h2.querySelector("br")!.previousSibling?.textContent).toBe("Conversations ");
    expect(h2.querySelector("br")!.nextSibling?.textContent).toBe("worth ");
    expect(h2.querySelector("em")).toHaveTextContent("having");
  });

  it("states his approach in two short paragraphs", () => {
    render(<Conversations lang="en" />);
    expect(screen.getByText(/I speak and write about the intersection/)).toBeInTheDocument();
    expect(screen.getByText(/My goal is not to tell people what to think/)).toBeInTheDocument();
  });

  it("links to the speaking page and to the contact section", () => {
    render(<Conversations lang="en" />);
    const talks = screen.getByRole("link", { name: /Explore my talks/ });
    expect(talks).toHaveAttribute("href", "/en/speaking");
    expect(talks).toHaveClass("cta-primary");
    expect(screen.getByRole("link", { name: /Invite me to speak/ })).toHaveAttribute("href", SITE.whatsapp);
  });

  it("only teases: the talk, slides and topics live on the speaking page", () => {
    const { container } = render(<Conversations lang="en" />);
    expect(container.querySelector(".talk-feature")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("link", { name: /View slides/ })).toBeNull();
    expect(container.querySelector("blockquote")).toBeNull();
    expect(screen.queryAllByRole("heading", { level: 3 })).toEqual([]);
  });
});

describe("Conversations with the Spanish locale", () => {
  it("is headed 'Conversaciones que valen la pena' with the emphasis on its own line", () => {
    const { container } = render(<Conversations lang="es" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Conversaciones que valen la pena");
    const h2 = container.querySelector("h2")!;
    expect(h2.querySelectorAll("br")).toHaveLength(1);
    expect(h2.querySelector("em")).toHaveTextContent("valen la pena");
    expect(h2.querySelector("br")!.nextSibling).toBe(h2.querySelector("em"));
    expect(screen.getByText("CHARLAS Y ESCRITURA")).toBeInTheDocument();
  });

  it("states his approach in Spanish", () => {
    render(<Conversations lang="es" />);
    expect(screen.getByText(/Escribo y comparto experiencias/)).toBeInTheDocument();
    expect(screen.getByText(/No busco decirles a otros cómo pensar/)).toBeInTheDocument();
  });

  it("prefixes the speaking link with /es and sends the invitation to WhatsApp", () => {
    render(<Conversations lang="es" />);
    expect(screen.getByRole("link", { name: /Conoce mis charlas/ })).toHaveAttribute("href", "/es/speaking");
    expect(screen.getByRole("link", { name: /Invítame a un evento/ })).toHaveAttribute("href", SITE.whatsapp);
  });

  it.each(["en", "es"] as const)("opens the invitation on WhatsApp in a new tab, safely (%s)", (lang) => {
    const { container } = render(<Conversations lang={lang} />);
    const invite = container.querySelector(".conversations-link")!;
    expect(invite).toHaveAttribute("href", "https://api.whatsapp.com/send/?phone=447551273933");
    expect(invite).toHaveAttribute("target", "_blank");
    expect(invite).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
