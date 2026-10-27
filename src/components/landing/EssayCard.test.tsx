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
  it("shows a visible Translated with AI label on an AI translation", () => {
    const { container } = render(<EssayCard lang="en" essay={translation} />);
    const badge = screen.getByText("Translated with AI");
    expect(badge).toBeVisible();
    expect(badge).toHaveClass("essay-ai-badge");
    // The topic eyebrow keeps its own text; the badge is a separate chip.
    expect(container.querySelector(".eyebrow")).toHaveTextContent(/^STARTUPS$/);
    expect(badge.closest(".essay-meta")).toBeNull();
  });

  it("links the translation to the same slug under the page locale", () => {
    render(<EssayCard lang="en" essay={translation} />);
    expect(screen.getByRole("link", { name: "Being an entrepreneur" })).toHaveAttribute("href", "/en/essays/ser-emprendedor");
  });

  it("does not label an original", () => {
    render(<EssayCard lang="es" essay={original} />);
    expect(screen.queryByText(/Translated with AI|Traducido con IA/)).not.toBeInTheDocument();
  });

  it("labels in the page language", () => {
    render(<EssayCard lang="es" essay={translation} />);
    expect(screen.getByText("Traducido con IA")).toHaveClass("essay-ai-badge");
  });
});
