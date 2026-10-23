import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { milestones } from "@/data/milestones";
import { Journey } from "./Journey";

describe("Journey", () => {
  it("renders the section heading and anchor", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("section#journey")).not.toBeNull();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Different ventures.One purpose.");
  });

  it("renders every milestone as an article with its id and eyebrow", () => {
    const { container } = render(<Journey />);
    const articles = container.querySelectorAll("article.milestone");
    expect(articles).toHaveLength(milestones.length);
    for (const m of milestones) {
      const el = container.querySelector(`article#${m.id}`);
      expect(el).not.toBeNull();
      expect(el).toHaveTextContent(m.eyebrow);
      expect(el).toHaveTextContent(m.period);
    }
  });

  it("marks only the Now milestone as current", () => {
    const { container } = render(<Journey />);
    const current = container.querySelectorAll("article.current");
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("id", "now");
    expect(current[0].querySelector(".year i")).not.toBeNull();
  });

  it("renders the Dfounders venture tree linking to its ventures", () => {
    const { container } = render(<Journey />);
    const tree = screen.getByLabelText("Ventures that emerged from Dfounders");
    expect(container.querySelector("#year2016")).toHaveClass("company-builder");
    expect(tree.querySelector("a[href='#year2017']")).toHaveTextContent("Beer Happy Club");
    expect(tree.querySelector("a[href='#year2019']")).toHaveTextContent("HoyTrabajas");
    expect(tree).toHaveTextContent("Other initiatives");
  });

  it("renders origin links first inside the story", () => {
    const { container } = render(<Journey />);
    const story = container.querySelector("#year2017 .story")!;
    expect(story.firstElementChild).toHaveClass("venture-origin");
    expect(story.firstElementChild).toHaveAttribute("href", "#year2016");
  });

  it("renders facts, details, roles, YC badge and the Gingga button", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#year2014-fluvip .fact")).toHaveTextContent("4people in the team at the beginning20developers led");
    expect(container.querySelector("#year2014-fluvip details summary")).toHaveTextContent("Building for international growth +");
    expect(container.querySelectorAll("#year2023-community .role-history > div")).toHaveLength(2);
    expect(container.querySelector("#year2022 .yc")).toHaveTextContent("Y Combinator");
    const button = screen.getByRole("link", { name: /Explore Gingga/ });
    expect(button).toHaveAttribute("href", "https://gingga.com/");
    expect(button).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses the smaller year style for ranges", () => {
    const { container } = render(<Journey />);
    expect(container.querySelector("#year2012 .year")).toHaveClass("words");
    expect(container.querySelector("#year2010 .year")).not.toHaveClass("words");
  });
});
