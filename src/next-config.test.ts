import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type Redirect = { source: string; destination: string; permanent: boolean };

/** next.config.mjs has no type declarations (allowJs is off), so it is loaded by URL. */
async function loadRedirects(): Promise<Redirect[]> {
  const url = pathToFileURL(resolve(process.cwd(), "next.config.mjs")).href;
  const config = (await import(/* @vite-ignore */ url)).default as { redirects?: () => Promise<Redirect[]> };
  return config.redirects ? config.redirects() : [];
}

/** Applies the `:locale(en|es)` parameter of a redirect source to a concrete path. */
function resolveRedirect(redirects: Redirect[], path: string) {
  for (const { source, destination, permanent } of redirects) {
    const match = source.match(/^\/:locale\(([^)]+)\)(\/.*)$/);
    if (!match) continue;
    const [, locales, rest] = match;
    const [, lang, tail] = path.match(/^\/([^/]+)(\/.*)$/) ?? [];
    if (lang && tail === rest && locales!.split("|").includes(lang)) {
      return { to: destination.replace(":locale", lang), permanent };
    }
  }
  return null;
}

describe("next.config redirects", () => {
  it("sends the removed essays hub to the writing section of the speaking page in each locale", async () => {
    const redirects = await loadRedirects();
    expect(resolveRedirect(redirects, "/en/essays")).toEqual({ to: "/en/speaking#writing", permanent: false });
    expect(resolveRedirect(redirects, "/es/essays")).toEqual({ to: "/es/speaking#writing", permanent: false });
  });

  it("leaves the essay articles and other locales alone", async () => {
    const redirects = await loadRedirects();
    expect(resolveRedirect(redirects, "/en/essays/ser-emprendedor")).toBeNull();
    expect(resolveRedirect(redirects, "/fr/essays")).toBeNull();
  });
});
