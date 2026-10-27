import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Essay } from "@/data/types";
import { EssayCard } from "./EssayCard";

const original: Essay = {
  slug: "ser-emprendedor",
  title: "Ser emprendedor",
  topic: "Startups",
  lang: "es",
  sections: [{ text: "Un párrafo." }],
};
const translation: Essay = { ...original, title: "Being an entrepreneur", lang: "en", translatedWithAI: true };

describe("EssayCard translation label", () => {
  // The Writing intro says once that the English versions are AI translations; the article page keeps its own badge.
  it("does not repeat the Translated with AI label on each card", () => {
    const { container } = render(<EssayCard lang="en" essay={translation} />);
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
    expect(container.querySelector(".essay-ai-badge")).toBeNull();
    expect(container.querySelector(".eyebrow")).toHaveTextContent(/^STARTUPS$/);
  });

  it("links the translation to the same slug under the page locale", () => {
    render(<EssayCard lang="en" essay={translation} />);
    expect(screen.getByRole("link", { name: "Being an entrepreneur" })).toHaveAttribute("href", "/en/essays/ser-emprendedor");
  });

  it("does not label an original", () => {
    render(<EssayCard lang="es" essay={original} />);
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
  });

});
