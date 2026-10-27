import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TALK } from "@/data/site";
import { getTalk } from "@/data/talk";
import { TalkFeature } from "./TalkFeature";

describe("TalkFeature", () => {
  it("links the cover and view button to the slides PDF", () => {
    render(<TalkFeature lang="en" />);
    expect(screen.getByRole("link", { name: "Open the Cambridge talk slides as a PDF" })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByRole("link", { name: /View slides/ })).toHaveAttribute("href", TALK.pdf);
  });

  it("offers the PDF as a download", () => {
    render(<TalkFeature lang="en" />);
    const link = screen.getByRole("link", { name: /Download PDF/ });
    expect(link).toHaveAttribute("download", TALK.pdfName);
  });

  it("renders the cover image and themes", () => {
    render(<TalkFeature lang="en" />);
    expect(screen.getByAltText(TALK.coverAlt)).toHaveAttribute("src", TALK.cover);
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(getTalk("en").themes);
    expect(screen.getByRole("list", { name: "Talk themes" })).toBeInTheDocument();
  });

  it("can carry an anchor id so pages can link to it", () => {
    const { container } = render(<TalkFeature lang="en" id="cambridge" />);
    expect(container.querySelector("article#cambridge")).not.toBeNull();
  });
});

describe("TalkFeature in Spanish", () => {
  it("translates the copy and keeps the files, the English title and the English slide text", () => {
    const { container } = render(<TalkFeature lang="es" />);
    expect(screen.getByRole("link", { name: "Abrir las diapositivas de la charla de Cambridge en PDF" })).toHaveAttribute(
      "href",
      TALK.pdf,
    );
    expect(screen.getByRole("link", { name: /Ver diapositivas \(en inglés\)/ })).toHaveAttribute("href", TALK.pdf);
    expect(screen.getByRole("link", { name: /Descargar PDF/ })).toHaveAttribute("download", TALK.pdfName);
    expect(screen.getByRole("list", { name: "Temas de la charla" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual(getTalk("es").themes);
    expect(screen.getByAltText(TALK.coverAlt)).toHaveAttribute("src", TALK.cover);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Unlocking Human Potentialin the Age of AI");
    expect(container.textContent).toContain("CHARLA EN CONFERENCIA");
  });

  it.each(["en", "es"] as const)("marks the English slide cover as English for screen readers (%s)", (lang) => {
    render(<TalkFeature lang={lang} />);
    expect(screen.getByAltText(TALK.coverAlt)).toHaveAttribute("lang", "en");
  });
});
