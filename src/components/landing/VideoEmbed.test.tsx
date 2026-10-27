import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VideoEmbed } from "./VideoEmbed";

describe("VideoEmbed", () => {
  it("embeds the video privately and links to YouTube", () => {
    render(<VideoEmbed lang="en" youtubeId="abc123" title="A talk" />);
    expect(screen.getByTitle("A talk")).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/abc123");
    const link = screen.getByRole("link", { name: /Watch on YouTube/ });
    expect(link).toHaveAttribute("href", "https://www.youtube.com/watch?v=abc123");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("labels the YouTube link in Spanish", () => {
    render(<VideoEmbed lang="es" youtubeId="abc123" title="A talk" />);
    expect(screen.getByRole("link", { name: /Ver en YouTube/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc123",
    );
    expect(screen.queryByRole("link", { name: /Watch on YouTube/ })).not.toBeInTheDocument();
  });
});
