import { describe, expect, it } from "vitest";
import { getMedia } from "./media";

describe("getMedia", () => {
  it("labels the photo viewer and the video link in English", () => {
    expect(getMedia("en")).toEqual({
      gallery: {
        viewer: "Photo viewer",
        close: "Close photo viewer",
        previous: "Previous photo",
        next: "Next photo",
      },
      watchOnYoutube: "Watch on YouTube",
    });
  });

  it("labels the photo viewer and the video link in Spanish", () => {
    expect(getMedia("es")).toEqual({
      gallery: {
        viewer: "Visor de fotos",
        close: "Cerrar visor de fotos",
        previous: "Foto anterior",
        next: "Foto siguiente",
      },
      watchOnYoutube: "Ver en YouTube",
    });
  });
});
