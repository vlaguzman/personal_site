import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

type Callback = (entries: Partial<IntersectionObserverEntry>[]) => void;

function stubObserver() {
  const instances: { cb: Callback; observed: Element[]; disconnect: ReturnType<typeof vi.fn>; unobserve: ReturnType<typeof vi.fn> }[] = [];
  class FakeObserver {
    cb: Callback;
    observed: Element[] = [];
    disconnect = vi.fn();
    unobserve = vi.fn();
    constructor(cb: Callback) {
      this.cb = cb;
      instances.push(this);
    }
    observe(el: Element) {
      this.observed.push(el);
    }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  return instances;
}

function stubMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce"), media: query, addEventListener() {}, removeEventListener() {} }));
}


afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function setup() {
  return render(
    <>
      <div className="item" data-testid="a" />
      <div className="item" data-testid="b" />
      <ScrollReveal selector=".item" />
    </>,
  );
}

describe("ScrollReveal", () => {
  it("renders nothing and leaves targets untouched without IntersectionObserver (SSR / old browsers)", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    stubMotion(false);
    const { getByTestId } = setup();
    expect(getByTestId("a").className).toBe("item");
  });

  it("leaves targets fully visible when the user prefers reduced motion", () => {
    const instances = stubObserver();
    stubMotion(true);
    const { getByTestId } = setup();
    expect(getByTestId("a").className).toBe("item");
    expect(instances).toHaveLength(0);
  });

  it("hides off-screen targets, then reveals them when they intersect", () => {
    const instances = stubObserver();
    stubMotion(false);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5100 } as DOMRect);
    const { getByTestId } = setup();
    const a = getByTestId("a");
    expect(a).toHaveClass("reveal-pending");
    expect(instances[0].observed).toHaveLength(2);
    act(() => instances[0].cb([{ target: a, isIntersecting: true }]));
    expect(a).toHaveClass("is-visible");
    expect(a).not.toHaveClass("reveal-pending");
    expect(getByTestId("b")).toHaveClass("reveal-pending");
    expect(instances[0].unobserve).toHaveBeenCalledWith(a);
  });

  it("does not hide targets that are already in the viewport", () => {
    stubObserver();
    stubMotion(false);
    vi.stubGlobal("innerHeight", 800);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 100, bottom: 200 } as DOMRect);
    const { getByTestId } = setup();
    expect(getByTestId("a")).not.toHaveClass("reveal-pending");
  });

  it("disconnects on unmount", () => {
    const instances = stubObserver();
    stubMotion(false);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5100 } as DOMRect);
    const { unmount } = setup();
    unmount();
    expect(instances[0].disconnect).toHaveBeenCalled();
  });
});
