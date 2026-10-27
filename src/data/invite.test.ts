import { describe, expect, it } from "vitest";
import { getConversations } from "./conversations";
import { getHero } from "./hero";
import { SITE } from "./site";
import { getSpeaking } from "./speaking";
import { getWork } from "./work";

const WHATSAPP = "https://api.whatsapp.com/send/?phone=447551273933";

describe("invitations go straight to WhatsApp", () => {
  it("exposes the WhatsApp link once, in SITE", () => {
    expect(SITE.whatsapp).toBe(WHATSAPP);
  });

  it.each(["en", "es"] as const)("sends every 'invite me' call to action to WhatsApp (%s)", (lang) => {
    expect(getHero(lang).secondaryCta.href).toBe(SITE.whatsapp);
    expect(getConversations(lang).secondaryCta.href).toBe(SITE.whatsapp);
    expect(getSpeaking(lang).primaryCta.href).toBe(SITE.whatsapp);
  });

  it.each(["en", "es"] as const)("keeps 'book a conversation' on the Calendly link (%s)", (lang) => {
    expect(getWork(lang).cta.href).toBe(SITE.calendly);
  });
});
