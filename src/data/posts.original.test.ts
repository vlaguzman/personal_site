import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * `posts.ts` holds the Spanish originals written by the site owner. They are never
 * edited, reformatted or moved. Any intentional edit of the originals must update
 * this hash on purpose, in the same change.
 */
const POSTS_SHA256 = "9fdc242e45f4e44190cafc2629ec9acbef8812f2be7c4b769b799ebe7fd70e36";

describe("the Spanish originals", () => {
  it("are byte-for-byte unchanged", () => {
    const hash = createHash("sha256").update(readFileSync("src/data/posts.ts")).digest("hex");
    expect(hash).toBe(POSTS_SHA256);
  });
});
