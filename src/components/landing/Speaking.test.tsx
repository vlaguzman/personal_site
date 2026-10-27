import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ESSAYS, getEssays } from "@/data/essays";
import { FOUNDER_PROFILE_PDF, TALK, getWhatsappLink } from "@/data/site";
import { Speaking } from "./Speaking";

describe("Speaking", () => {
  it("leads with the page title and an invitation to speak", () => {
    render(<Speaking lang="en" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Challenge assumptions.Start better conversations.");
    const cta = screen.getAllByRole("link", { name: /Invite me to speak/ })[0];
    expect(cta).toHaveAttribute("href", getWhatsappLink("en"));
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(cta).toHaveClass("cta-primary");
  });

  it("opens with a real photo of him speaking", () => {
    render(<Speaking lang="en" />);
    const photo = screen.getByRole("img", { name: "Vladimir Guzmán presenting at Clare Hall, Cambridge" });
    expect(photo.getAttribute("src")).toContain("hero-cambridge-talk.jpg");
  });

  it("lists the three speaking topics", () => {
    render(<Speaking lang="en" />);
    const list = screen.getByRole("list", { name: "Speaking topics" });
    expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    expect(within(list).getByRole("heading", { level: 3, name: "Technology beyond the hype" })).toBeInTheDocument();
  });

  it("features the Cambridge talk with its slides", () => {
    const { container } = render(<Speaking lang="en" />);
    expect(container.querySelector("#cambridge")).not.toBeNull();
    expect(screen.getByRole("link", { name: /View slides/ })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByAltText(TALK.coverAlt)).toBeInTheDocument();
  });

  it("says he has taught, with the photo where he appears and none of the Consulate figures", () => {
    const { container } = render(<Speaking lang="en" />);
    expect(screen.getByRole("heading", { level: 2, name: "Teaching" })).toBeInTheDocument();
    expect(screen.queryByText(/taught across three lines|He dado formación/)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".speaking-classes .gallery-item")).toHaveLength(1);
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.textContent).not.toMatch(/270\+|NPS|87\.1/);
  });

  it("lists only the classes inside Teaching, ending with marketing with AI", () => {
    const { container } = render(<Speaking lang="en" />);
    const section = container.querySelector(".speaking-classes") as HTMLElement;
    expect(within(section).getAllByRole("list")).toHaveLength(1);
    const talks = within(section).getByRole("list", { name: "I had the opportunity to work with the Colombian community and technology through classes such as:" });
    const items = within(talks).getAllByRole("listitem");
    expect(items).toHaveLength(5);
    expect(items[4]).toHaveTextContent("Marketing with AI");
    expect(within(talks).getByText(/Finding Your IKIGAI/)).toBeInTheDocument();
  });

  it("shows the talks in Spanish", () => {
    const { container } = render(<Speaking lang="es" />);
    const section = container.querySelector(".speaking-classes") as HTMLElement;
    expect(within(section).getAllByRole("list")).toHaveLength(1);
    expect(
      within(section).getByRole("list", { name: "Tuve la oportunidad de trabajar con la comunidad colombiana y la tecnología en clases como:" }),
    ).toBeInTheDocument();
  });

  it("tells the 2024 English programme with The Giving Lab, its classes and photos", () => {
    const { container } = render(<Speaking lang="en" />);
    const block = container.querySelector(".speaking-community") as HTMLElement;
    expect(within(block).getByRole("heading", { level: 3, name: /co-led an English programme/ })).toBeInTheDocument();
    const classes = within(block).getByRole("list");
    expect(within(classes).getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "English for work",
      "English from zero",
      "English for older adults",
      "Soft skills development",
    ]);
    const link = within(block).getByRole("link", { name: /Visit The Giving Lab/ });
    expect(link).toHaveAttribute("href", "https://opencollective.com/thegivinglab");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(block.querySelectorAll(".gallery-item")).toHaveLength(2);
  });

  it("tells the English programme in Spanish", () => {
    const { container } = render(<Speaking lang="es" />);
    const block = container.querySelector(".speaking-community") as HTMLElement;
    expect(within(block).getByRole("heading", { level: 3, name: /colideré un programa de inglés/ })).toBeInTheDocument();
    expect(within(block).getByRole("link", { name: /Conocer The Giving Lab/ })).toBeInTheDocument();
    expect(within(block).getAllByRole("listitem")).toHaveLength(4);
  });

  it("shows the 23 May 2026 idea-to-prototype session with its photo", () => {
    const { container } = render(<Speaking lang="en" />);
    const block = container.querySelector(".speaking-workshop") as HTMLElement;
    expect(block.querySelector(".eyebrow")).toHaveTextContent("23 MAY 2026");
    expect(within(block).getByRole("heading", { level: 3, name: "From idea to prototype in two hours" })).toBeInTheDocument();
    expect(block.querySelectorAll(".gallery-item")).toHaveLength(1);
  });

  it("shows the session title in Spanish", () => {
    const { container } = render(<Speaking lang="es" />);
    const block = container.querySelector(".speaking-workshop") as HTMLElement;
    expect(within(block).getByRole("heading", { level: 3, name: "De idea a prototipo en dos horas" })).toBeInTheDocument();
  });

  it("shows a Writing section with the intro and every essay as a translated card", () => {
    const { container } = render(<Speaking lang="en" />);
    const section = container.querySelector("#writing") as HTMLElement;
    expect(section.tagName).toBe("SECTION");
    const heading = within(section).getByRole("heading", { level: 2, name: "Writing" });
    expect(section).toHaveAttribute("aria-labelledby", heading.id);
    expect(section.textContent).toContain(
      "The originals are in Spanish, the language I wrote them in; each one also has an English translation, made with AI.",
    );
    const cards = section.querySelectorAll(".essay-card");
    expect(cards).toHaveLength(ESSAYS.length);
    for (const [i, translation] of getEssays("en").entries()) {
      expect(within(section).getByRole("link", { name: translation.title })).toHaveAttribute(
        "href",
        `/en/essays/${ESSAYS[i]!.slug}`,
      );
    }
    expect(within(section).queryByText("Translated with AI")).not.toBeInTheDocument();
    expect(within(section).getByRole("group", { name: "Filter by topic" })).toBeInTheDocument();
  });

  it("places Writing after Teaching and before the bio", () => {
    const { container } = render(<Speaking lang="en" />);
    const ids = [...container.querySelectorAll("section[id], section[aria-labelledby]")].map(
      (s) => s.id || s.getAttribute("aria-labelledby"),
    );
    const order = ["speaking-teaching-title", "writing", "speaking-bio-title"].map((id) => ids.indexOf(id));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("offers a short bio and the founder profile to download", () => {
    render(<Speaking lang="en" />);
    expect(screen.getByRole("heading", { level: 2, name: /About/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download founder profile/ })).toHaveAttribute("href", FOUNDER_PROFILE_PDF);
  });

  it("closes with a second invitation", () => {
    render(<Speaking lang="en" />);
    expect(screen.getAllByRole("link", { name: /Invite me to speak/ })).toHaveLength(2);
  });

  it("never skips a heading level and keeps ids unique", () => {
    const { container } = render(<Speaking lang="en" />);
    const levels = [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("Speaking in Spanish", () => {
  it("leads with the Spanish title and an invitation that keeps the booking link", () => {
    render(<Speaking lang="es" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Cuestiona los supuestos.Empieza mejores conversaciones.",
    );
    const cta = screen.getAllByRole("link", { name: /Invítame a hablar/ })[0];
    expect(cta).toHaveAttribute("href", getWhatsappLink("es"));
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("translates the sections, the topics list, the talk and the bio", () => {
    render(<Speaking lang="es" />);
    expect(screen.getByRole("img", { name: "Vladimir Guzmán presentando en Clare Hall, Cambridge" })).toBeInTheDocument();
    for (const name of ["Sobre qué hablo", "Charla destacada", "Docencia", "Escritos", "Sobre Vladimir"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    expect(screen.getByRole("list", { name: "Temas de las charlas" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver diapositivas \(en inglés\)/ })).toHaveAttribute("href", TALK.pdf);
    expect(screen.queryByRole("link", { name: /YouTube/ })).toBeNull();
    expect(screen.getByRole("link", { name: /Descargar perfil de fundador/ })).toHaveAttribute(
      "href",
      FOUNDER_PROFILE_PDF,
    );
  });

  it("shows the Spanish originals in the Writing section, with no translation badge", () => {
    const { container } = render(<Speaking lang="es" />);
    const section = container.querySelector("#writing") as HTMLElement;
    expect(within(section).getByRole("heading", { level: 2, name: "Escritos" })).toBeInTheDocument();
    expect(section.textContent).toContain("Están en su idioma original, el español; cada una tiene también una traducción al inglés hecha con IA.");
    expect(section.querySelectorAll(".essay-card")).toHaveLength(ESSAYS.length);
    for (const essay of ESSAYS) {
      expect(within(section).getByRole("link", { name: essay.title })).toHaveAttribute("href", `/es/essays/${essay.slug}`);
    }
    expect(container.querySelector(".essay-ai-badge")).toBeNull();
  });

  it("closes with a second invitation, never skips a heading level and keeps ids unique", () => {
    const { container } = render(<Speaking lang="es" />);
    expect(screen.getAllByRole("link", { name: /Invítame a hablar/ })).toHaveLength(2);
    expect(screen.getByRole("heading", { level: 2, name: "Empieza la conversación." })).toBeInTheDocument();
    const levels = [...container.querySelectorAll("h1, h2, h3, h4")].map((h) => Number(h.tagName[1]));
    expect(levels[0]).toBe(1);
    levels.forEach((level, i) => {
      if (i > 0) expect(level, `heading #${i}`).toBeLessThanOrEqual(levels[i - 1] + 1);
    });
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
