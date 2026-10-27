import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoEmbed } from "./VideoEmbed";

describe("VideoEmbed", () => {
  it("embeds the video privately and links to YouTube", () => {
    render(<VideoEmbed youtubeId="abc123" title="A talk" />);
    expect(screen.getByTitle("A talk")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/abc123");
    expect(screen.getByRole("link", { name: /Watch on YouTube/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc123",
    );
  });
});
