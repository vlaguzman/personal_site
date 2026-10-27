export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
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
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
