import type { Locale } from "@/i18n/config";

export type MediaContent = {
  gallery: {
    /** Accessible name of the photo viewer dialog. */
    viewer: string;
    close: string;
    previous: string;
    next: string;
  };
  watchOnYoutube: string;
};

const MEDIA: Record<Locale, MediaContent> = {
  en: {
    gallery: {
      viewer: "Photo viewer",
      close: "Close photo viewer",
      previous: "Previous photo",
      next: "Next photo",
    },
    watchOnYoutube: "Watch on YouTube",
  },
  es: {
    gallery: {
      viewer: "Visor de fotos",
      close: "Cerrar visor de fotos",
      previous: "Foto anterior",
      next: "Foto siguiente",
    },
    watchOnYoutube: "Ver en YouTube",
  },
};

export function getMedia(lang: Locale): MediaContent {
  return MEDIA[lang];
}
