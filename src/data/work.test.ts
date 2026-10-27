import { describe, expect, it } from "vitest";
import { SITE } from "./site";
import { getGinggaUrl, WORK } from "./work";

describe("WORK", () => {
  it("leads with independent thinking and practical experience", () => {
    expect(WORK.headlineLines).toEqual(["Independent thinking."]);
    expect(WORK.headlineEmphasis).toBe("Practical experience.");
    expect(WORK.intro).toBe(
      "I work with founders and business leaders who need to make better decisions about strategy, technology and growth.",
    );
  });

  it("offers three kinds of work", () => {
    expect(WORK.offers.map((o) => o.title)).toEqual([
      "Strategic advisory",
      "AI and technology strategy",
      "Workshops and speaking",
    ]);
    for (const offer of WORK.offers) expect(offer.text.length).toBeGreaterThan(0);
  });

  it("links workshops to the speaking page", () => {
    expect(WORK.offers[2].link).toEqual({ label: "See speaking", href: "/speaking" });
  });

  it("considers each engagement individually", () => {
    expect(WORK.approach).toBe(
      "Engagements are considered individually, based on the problem, potential impact and fit.",
    );
  });

  it("opens a conversation through the booking link", () => {
    expect(WORK.cta).toEqual({ label: "Book a conversation", href: SITE.calendly });
  });

  it("does not sound like an agency", () => {
    const copy = JSON.stringify(WORK);
    expect(copy).not.toMatch(/consultan|consulting|expert|agency|packages?\b/i);
  });
});

describe("getGinggaUrl", () => {
  it("reads the Gingga link from the journey instead of repeating it", () => {
    expect(getGinggaUrl()).toBe("https://gingga.com/");
  });
});
