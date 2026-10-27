import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { getConsulateEngagement, SPEAKING } from "./speaking";

describe("SPEAKING", () => {
  it("invites people to book a conversation", () => {
    expect(SPEAKING.headlineLines).toEqual(["Challenge assumptions."]);
    expect(SPEAKING.headlineEmphasis).toBe("Start better conversations.");
    expect(SPEAKING.primaryCta).toEqual({ label: "Invite me to speak", href: SITE.calendly });
  });

  it("uses a real photo of him speaking that exists in public/", () => {
    expect(existsSync(`public${SPEAKING.photo.src}`)).toBe(true);
    expect(SPEAKING.photo.alt).toBe("Vladimir Guzmán presenting at Clare Hall, Cambridge");
  });

  it("speaks about the three editorial territories", () => {
    expect(SPEAKING.topics.map((t) => t.title)).toEqual([
      "Entrepreneurship without mythology",
      "Technology beyond the hype",
      "Human potential and opportunity",
    ]);
    for (const topic of SPEAKING.topics) expect(topic.text.length).toBeGreaterThan(0);
  });

  it("introduces him with facts that appear elsewhere on the site", () => {
    expect(SPEAKING.bio).toContain("Y Combinator W22");
    expect(SPEAKING.bio).toContain("270+");
  });
});

describe("getConsulateEngagement", () => {
  const engagement = getConsulateEngagement();

  it("is derived from the Consulate milestone instead of repeating it", () => {
    expect(engagement.video).toEqual({
      youtubeId: "mp1-CpcOQUE",
      title: "Documentary of the first Entrepreneurship programme at the Colombian Consulate in London, 2023",
    });
    expect(engagement.facts.map((f) => f.value)).toEqual(["270+", "87.1"]);
  });

  it("has four photos that exist in public/", () => {
    expect(engagement.images).toHaveLength(4);
    for (const image of engagement.images) {
      expect(existsSync(`public${image.src}`), image.src).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
    }
  });
});
