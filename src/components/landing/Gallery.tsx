"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getMedia } from "@/data/media";
import type { GalleryImage } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { bentoShapes } from "@/lib/bento";

const FOCUSABLE = "button:not([disabled])";

function Lightbox({
  images,
  index,
  lang,
  onChange,
  onClose,
}: {
  images: readonly GalleryImage[];
  lang: Locale;
  index: number;
  onChange: (next: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const image = images[index];
  const labels = getMedia(lang).gallery;

  const step = useCallback((delta: number) => onChange((index + delta + count) % count), [index, count, onChange]);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight" && count > 1) {
        step(1);
      } else if (event.key === "ArrowLeft" && count > 1) {
        step(-1);
      } else if (event.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        const inside = dialogRef.current?.contains(active);
        if (event.shiftKey && (active === first || !inside)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !inside)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [count, onClose, step]);

  return createPortal(
    // The backdrop click closes the modal; keyboard users have Escape and the close button.
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={labels.viewer}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="lightbox-close" aria-label={labels.close} onClick={onClose}>
        <span aria-hidden="true">×</span>
      </button>
      {count > 1 && (
        <button type="button" className="lightbox-nav lightbox-prev" aria-label={labels.previous} onClick={() => step(-1)}>
          <span aria-hidden="true">←</span>
        </button>
      )}
      <figure className="lightbox-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} />
      </figure>
      {count > 1 && (
        <button type="button" className="lightbox-nav lightbox-next" aria-label={labels.next} onClick={() => step(1)}>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>,
    document.body,
  );
}

export function Gallery({ images, lang }: { images: readonly GalleryImage[]; lang: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const single = images.length === 1;
  const shapes = bentoShapes(images.length);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const isOpen = openIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <div className={single ? "gallery single" : "gallery"}>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className={single ? "gallery-item" : `gallery-item gallery-${shapes[i]}`}
            aria-haspopup="dialog"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setOpenIndex(i);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {isOpen && <Lightbox images={images} lang={lang} index={openIndex} onChange={setOpenIndex} onClose={close} />}
    </>
  );
}
