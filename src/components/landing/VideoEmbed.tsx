import { getMedia } from "@/data/media";
import type { Locale } from "@/i18n/config";

export function VideoEmbed({ youtubeId, title, lang }: { youtubeId: string; title: string; lang: Locale }) {
  return (
    <figure className="video">
      <iframe
        className="video-embed"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <figcaption>
        <a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">
          {getMedia(lang).watchOnYoutube} <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
