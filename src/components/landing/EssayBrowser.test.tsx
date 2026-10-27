import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import { EssayBrowser } from "./EssayBrowser";

const e = (slug: string, topic?: Essay["topic"], extra: Partial<Essay> = {}): Essay => ({
  slug,
  title: `Título ${slug}`,
  topic,
  lang: "es",
  sections: [{ text: "palabra ".repeat(250).trim() }],
  ...extra,
});

const essays = [e("uno", "Startups"), e("dos", "Strategy"), e("tres"), e("cuatro", "Startups")];

describe("EssayBrowser", () => {
  it("renders every essay as a link to its page, with reading time and Spanish title", () => {
    render(<EssayBrowser lang="en" essays={essays} />);
    const link = screen.getByRole("link", { name: "Título uno" });
    expect(link).toHaveAttribute("href", "/en/essays/uno");
    expect(link).toHaveAttribute("lang", "es");
    expect(screen.getAllByText("2 min read")).toHaveLength(4);
  });

  it("only offers topics that have essays, plus All", () => {
    render(<EssayBrowser lang="en" essays={essays} />);
    const group = screen.getByRole("group", { name: "Filter by topic" });
    const names = within(group).getAllByRole("button").map((b) => b.textContent);
    expect(names).toEqual(["All", "Startups", "Strategy"]);
  });

  it("hides the filters when no essay has a topic", () => {
    render(<EssayBrowser lang="en" essays={[e("a")]} />);
    expect(screen.queryByRole("group", { name: "Filter by topic" })).not.toBeInTheDocument();
  });

  it("filters by topic, updates aria-pressed and announces the count", () => {
    render(<EssayBrowser lang="en" essays={essays} />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Showing 4 of 4 essays");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Startups" }));
    expect(screen.getByRole("button", { name: "Startups" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
    expect(status).toHaveTextContent("Showing 2 of 4 essays");
    expect(screen.queryByRole("link", { name: "Título dos" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Título cuatro" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(status).toHaveTextContent("Showing 4 of 4 essays");
  });

  it("uses the singular for a single essay", () => {
    render(<EssayBrowser lang="en" essays={essays} />);
    fireEvent.click(screen.getByRole("button", { name: "Strategy" }));
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 4 essays");
  });

  it("shows the image only for essays that have one", () => {
    const img = { src: "/images/x.jpg", alt: "A real photo", width: 800, height: 600 };
    render(<EssayBrowser lang="en" essays={[e("a", undefined, { image: img }), e("b")]} />);
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByRole("img", { name: "A real photo" })).toBeInTheDocument();
  });
});

describe("EssayBrowser with the Spanish locale", () => {
  it("prefixes essay links with /es", () => {
    render(<EssayBrowser lang="es" essays={essays} />);
    expect(screen.getByRole("link", { name: "Título uno" })).toHaveAttribute("href", "/es/essays/uno");
  });

  it("translates the filters, the count, the reading time and the card labels", () => {
    const { container } = render(<EssayBrowser lang="es" essays={essays} />);
    const group = screen.getByRole("group", { name: "Filtrar por tema" });
    expect(within(group).getAllByRole("button").map((b) => b.textContent)).toEqual(["Todos", "Startups", "Estrategia"]);
    expect(screen.getByRole("status")).toHaveTextContent("Mostrando 4 de 4 ensayos");
    expect(screen.getAllByText("2 min de lectura")).toHaveLength(4);
    const eyebrows = [...container.querySelectorAll(".essay-card .eyebrow")].map((el) => el.textContent);
    expect(eyebrows).toEqual(["STARTUPS", "ESTRATEGIA", "ENSAYO", "STARTUPS"]);
  });

  it("filters by the English topic key while showing the Spanish label", () => {
    render(<EssayBrowser lang="es" essays={essays} />);
    fireEvent.click(screen.getByRole("button", { name: "Estrategia" }));
    expect(screen.getByRole("button", { name: "Estrategia" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Mostrando 1 de 4 ensayos");
    expect(screen.getByRole("link", { name: "Título dos" })).toBeInTheDocument();
  });
});

describe("EssayBrowser language notice", () => {
  it("marks essays in another language than the page", () => {
    const { container } = render(<EssayBrowser lang="en" essays={[e("uno", "Startups")]} />);
    expect(container.querySelector(".essay-card .eyebrow")).toHaveTextContent("STARTUPS · IN SPANISH");
  });

  it("does not repeat the language on a page already in that language", () => {
    const { container } = render(<EssayBrowser lang="es" essays={[e("uno", "Startups")]} />);
    expect(container.querySelector(".essay-card .eyebrow")).toHaveTextContent(/^STARTUPS$/);
  });
});
