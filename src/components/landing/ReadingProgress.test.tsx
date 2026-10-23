import { fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReadingProgress } from "./ReadingProgress";

function setViewport({ scrollHeight, innerHeight, scrollY }: { scrollHeight: number; innerHeight: number; scrollY: number }) {
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(scrollHeight);
  vi.stubGlobal("innerHeight", innerHeight);
  vi.stubGlobal("scrollY", scrollY);
}

const bar = (c: HTMLElement) => c.querySelector<HTMLElement>(".reading-progress")!;

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ReadingProgress", () => {
  it("is hidden from assistive tech and starts empty", () => {
    setViewport({ scrollHeight: 2000, innerHeight: 1000, scrollY: 0 });
    const { container } = render(<ReadingProgress />);
    expect(bar(container)).toHaveAttribute("aria-hidden", "true");
    expect(bar(container).style.width).toBe("0%");
  });

  it("tracks scroll position as a percentage", () => {
    setViewport({ scrollHeight: 2000, innerHeight: 1000, scrollY: 0 });
    const { container } = render(<ReadingProgress />);
    vi.stubGlobal("scrollY", 250);
    fireEvent.scroll(window);
    expect(bar(container).style.width).toBe("25%");
    vi.stubGlobal("scrollY", 1000);
    fireEvent.scroll(window);
    expect(bar(container).style.width).toBe("100%");
  });

  it("recomputes on resize", () => {
    setViewport({ scrollHeight: 2000, innerHeight: 1000, scrollY: 500 });
    const { container } = render(<ReadingProgress />);
    expect(bar(container).style.width).toBe("50%");
    vi.stubGlobal("innerHeight", 1500);
    fireEvent(window, new Event("resize"));
    expect(bar(container).style.width).toBe("100%");
  });

  it("stays at 0% when the page does not scroll", () => {
    setViewport({ scrollHeight: 800, innerHeight: 1000, scrollY: 0 });
    const { container } = render(<ReadingProgress />);
    expect(bar(container).style.width).toBe("0%");
  });

  it("stops listening after unmount", () => {
    setViewport({ scrollHeight: 2000, innerHeight: 1000, scrollY: 0 });
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ReadingProgress />);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});
