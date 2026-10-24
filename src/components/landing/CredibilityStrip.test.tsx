import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getCredentials } from "@/data/credentials";
import { CredibilityStrip } from "./CredibilityStrip";

describe("CredibilityStrip", () => {
  it("renders every credential as a list item with its value and label", () => {
    render(<CredibilityStrip />);
    const items = getCredentials();
    const list = screen.getByRole("list", { name: "Track record" });
    expect(list.querySelectorAll("li")).toHaveLength(items.length);
    for (const item of items) {
      expect(screen.getByText(item.value)).toBeInTheDocument();
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });
});
