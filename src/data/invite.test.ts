import { describe, expect, it } from "vitest";
import { getConversations } from "./conversations";
import { getHero } from "./hero";
import { getWhatsappLink, SITE } from "./site";
import { getSpeaking } from "./speaking";
import { getWork } from "./work";

const MESSAGE = {
  en: "Hi Vladimir, I’d like to invite you to speak. Here’s a bit about the event and the audience:",
  es: "Hola Vladimir, me gustaría invitarte a hablar. Te cuento un poco del evento y de la audiencia:",
} as const;

describe("WhatsApp invitation link", () => {
  it("keeps the phone number once, in SITE", () => {
    expect(SITE.whatsapp).toBe("https://api.whatsapp.com/send/?phone=447551273933");
  });

  it.each(["en", "es"] as const)("opens the chat with a prefilled message in %s", (lang) => {
    const url = new URL(getWhatsappLink(lang));
    expect(url.origin + url.pathname).toBe("https://api.whatsapp.com/send/");
    expect(url.searchParams.get("phone")).toBe("447551273933");
    expect(url.searchParams.get("text")).toBe(MESSAGE[lang]);
  });

  it("encodes the message so accents, apostrophes and colons survive", () => {
    expect(getWhatsappLink("es")).toContain(encodeURIComponent("invitarte a hablar"));
    expect(getWhatsappLink("es")).not.toMatch(/\s/);
  });
});

describe("invitations go straight to WhatsApp", () => {
  it.each(["en", "es"] as const)("sends every 'invite me' call to action to the localized WhatsApp link (%s)", (lang) => {
    const link = getWhatsappLink(lang);
    expect(getHero(lang).secondaryCta.href).toBe(link);
    expect(getConversations(lang).secondaryCta.href).toBe(link);
    expect(getSpeaking(lang).primaryCta.href).toBe(link);
  });

  it.each(["en", "es"] as const)("keeps 'book a conversation' on the Calendly link (%s)", (lang) => {
    expect(getWork(lang).cta.href).toBe(SITE.calendly);
  });
});
