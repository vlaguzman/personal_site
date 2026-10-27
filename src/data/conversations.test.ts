import { describe, expect, it } from "vitest";
import { getConversations } from "./conversations";
import { getWhatsappLink } from "./site";

describe("getConversations", () => {
  it("says what he speaks and writes about, without telling people what to think", () => {
    expect(getConversations("en").paragraphs).toEqual([
      "I speak and write about the intersection of entrepreneurship, technology and people.",
      "My goal is not to tell people what to think. It is to challenge assumptions, share practical experiences and create conversations that lead to better decisions.",
    ]);
    expect(getConversations("es").paragraphs).toEqual([
      "Escribo y comparto experiencias sobre emprendimiento, tecnología y personas.",
      "No busco decirles a otros cómo pensar. Me interesa cuestionar supuestos, compartir aprendizajes reales y abrir conversaciones que nos ayuden a tomar mejores decisiones.",
    ]);
  });

  it("models the heading lines so each language places its break and emphasis", () => {
    const en = getConversations("en");
    expect([en.eyebrow, en.titleLead, en.titleEmphasis, en.titleEmphasisOnOwnLine]).toEqual([
      "SPEAKING & WRITING",
      "Conversations\nworth",
      "having",
      false,
    ]);
    const es = getConversations("es");
    expect([es.eyebrow, es.titleLead, es.titleEmphasis, es.titleEmphasisOnOwnLine]).toEqual([
      "CHARLAS Y ESCRITURA",
      "Conversaciones que",
      "valen la pena",
      true,
    ]);
  });

  it("sends readers to the speaking page and invites them to book", () => {
    expect(getConversations("en").primaryCta).toEqual({ label: "Explore my talks", href: "/speaking" });
    expect(getConversations("en").secondaryCta).toEqual({ label: "Invite me to speak", href: getWhatsappLink("en") });
    expect(getConversations("es").primaryCta).toEqual({ label: "Conoce mis charlas", href: "/speaking" });
    expect(getConversations("es").secondaryCta).toEqual({ label: "Invítame a un evento", href: getWhatsappLink("es") });
  });
});
