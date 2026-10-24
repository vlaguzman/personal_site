"use client";

import { useSyncExternalStore } from "react";
import { buildShareLinks } from "@/lib/essays";

const subscribe = () => () => {};
const currentUrl = () => window.location.href;
// Before hydration the page address is unknown, so links share the title with no url.
const serverUrl = () => "";

export function ShareLinks({ title }: { title: string }) {
  const url = useSyncExternalStore(subscribe, currentUrl, serverUrl);
  const links = buildShareLinks(title, url);

  return (
    <div className="essay-share">
      <span className="eyebrow">SHARE</span>
      <a href={links.x} target="_blank" rel="noopener noreferrer">
        Share on X <span aria-hidden="true">↗</span>
      </a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
        Share on LinkedIn <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
