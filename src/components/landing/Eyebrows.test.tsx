import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Beliefs } from "./Beliefs";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Ideas } from "./Ideas";
import { Intro } from "./Intro";
import { Journey } from "./Journey";
import { Purpose } from "./Purpose";
import { Talks } from "./Talks";

const sections = { Beliefs, Contact, Experience, Hero, Ideas, Intro, Journey, Purpose, Talks };

describe("section eyebrows", () => {
  it.each(Object.entries(sections))("%s has no ordinal number, so sections can be reordered freely", (_name, Section) => {
    const { container } = render(<Section />);
    const eyebrows = [...container.querySelectorAll("section > .eyebrow, section > div .eyebrow")];
    for (const el of eyebrows) expect(el.textContent).not.toMatch(/^\d{2}\s*\//);
  });

  it("keeps the descriptive label after dropping the number", () => {
    const text = (Section: () => React.ReactElement) => render(<Section />).container.querySelector(".eyebrow")?.textContent;
    expect(text(Purpose)).toBe("WHAT CONNECTS IT ALL");
    expect(text(Beliefs)).toBe("PRINCIPLES");
    expect(text(Talks)).toBe("TALKS & EVENTS");
    expect(text(Contact)).toBe("THE NEXT CONVERSATION");
  });
});
