import { describe, expect, it } from "vitest";
import { CONVERSATIONS } from "./conversations";

describe("CONVERSATIONS", () => {
  it("says what he speaks and writes about, without telling people what to think", () => {
    expect(CONVERSATIONS.paragraphs).toEqual([
      "I speak and write about the intersection of entrepreneurship, technology and people.",
      "My goal is not to tell people what to think. It is to challenge assumptions, share practical experiences and create conversations that lead to better decisions.",
    ]);
  });

  it("sends readers to the speaking page and invites them to book", () => {
    expect(CONVERSATIONS.primaryCta).toEqual({ label: "Explore my talks", href: "/speaking" });
    expect(CONVERSATIONS.secondaryCta).toEqual({ label: "Invite me to speak", href: "#contact" });
  });
});
