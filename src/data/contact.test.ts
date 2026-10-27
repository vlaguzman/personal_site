import { describe, expect, it } from "vitest";
import { getContact } from "./contact";

describe("getContact", () => {
  it("asks what the visitor is building, in English", () => {
    expect(getContact("en")).toEqual({
      eyebrow: "THE NEXT CONVERSATION",
      titleLead: "What are",
      titleEmphasis: "you building?",
      text: "I’m open to thoughtful conversations about entrepreneurship, strategic technology and partnerships that help businesses move forward.",
      booking: { label: "Book a conversation" },
      linkedin: { label: "LinkedIn" },
      profile: { label: "Download founder profile" },
    });
  });

  it("asks what the visitor is building, in Spanish", () => {
    expect(getContact("es")).toEqual({
      eyebrow: "LA PRÓXIMA CONVERSACIÓN",
      titleLead: "¿Qué estás",
      titleEmphasis: "construyendo?",
      text: "Estoy abierto a conversaciones reflexivas sobre emprendimiento, tecnología estratégica y alianzas que ayuden a los negocios a avanzar.",
      booking: { label: "Agenda una conversación" },
      linkedin: { label: "LinkedIn" },
      profile: { label: "Descargar perfil de fundador" },
    });
  });
});
