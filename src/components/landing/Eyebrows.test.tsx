import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import type { Locale } from "@/i18n/config";
import { Beliefs } from "./Beliefs";
import { Contact } from "./Contact";
import { Conversations } from "./Conversations";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Ideas } from "./Ideas";
import { Intro } from "./Intro";
import { Journey } from "./Journey";
import { Purpose } from "./Purpose";

type Section = (props: { lang: Locale }) => ReactElement;

const sections: Record<string, Section> = { Beliefs, Contact, Conversations, Experience, Hero, Ideas, Intro, Journey, Purpose };

describe("section eyebrows", () => {
  it.each(Object.entries(sections))("%s has no ordinal number, so sections can be reordered freely", (_name, Section) => {
    const { container } = render(<Section lang="en" />);
    const eyebrows = [...container.querySelectorAll("section > .eyebrow, section > div .eyebrow")];
    for (const el of eyebrows) expect(el.textContent).not.toMatch(/^\d{2}\s*\//);
  });

  it("keeps the descriptive label after dropping the number", () => {
    const text = (Section: Section) => render(<Section lang="en" />).container.querySelector(".eyebrow")?.textContent;
    expect(text(Purpose)).toBe("WHAT CONNECTS IT ALL");
    expect(text(Beliefs)).toBe("PRINCIPLES");
    expect(text(Conversations)).toBe("SPEAKING & WRITING");
    expect(text(Contact)).toBe("THE NEXT CONVERSATION");
  });
});
