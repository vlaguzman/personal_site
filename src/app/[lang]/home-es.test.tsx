import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Locale } from "@/i18n/config";
import Home from "./page";

const ENGLISH_PHRASES = [
  "Question the obvious",
  "Build what matters",
  "Ideas worth",
  "Built through",
  "What I believe",
  "Conversations worth",
  "What are you building",
  "Book a conversation",
  "Explore my",
  "Invite me to speak",
  "Work together",
  "Let’s connect",
  "Back to top",
];

async function homeText(lang: Locale) {
  const { container } = render(await Home({ params: Promise.resolve({ lang }) }));
  return (container.textContent ?? "").replace(/\s+/g, " ");
}

describe("home page copy", () => {
  it("shows no English phrase on the Spanish home", async () => {
    const text = await homeText("es");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).not.toContain(phrase);
  });

  it("shows the Spanish headline, nav and footer on the Spanish home", async () => {
    const text = await homeText("es");
    for (const phrase of ["Cuestiona lo establecido.", "Mi trayectoria", "Trabajemos juntos", "Volver arriba", "¿Qué estás construyendo?"]) {
      expect(text, phrase).toContain(phrase);
    }
  });

  it("keeps every English phrase on the English home", async () => {
    const text = await homeText("en");
    for (const phrase of ENGLISH_PHRASES) expect(text, phrase).toContain(phrase);
  });
});
