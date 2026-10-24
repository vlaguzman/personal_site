"use client";

import { useEffect } from "react";

/**
 * Fades matching elements up as they scroll into view.
 * Renders nothing. Targets stay fully visible unless JS runs, IntersectionObserver exists
 * and the user has not asked for reduced motion.
 */
export function ScrollReveal({ selector }: { selector: string }) {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    for (const el of document.querySelectorAll(selector)) {
      // Anything already on screen stays put; only content below the fold animates in.
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.classList.add("reveal-pending");
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const el of document.querySelectorAll(selector)) el.classList.remove("reveal-pending");
    };
  }, [selector]);

  return null;
}
