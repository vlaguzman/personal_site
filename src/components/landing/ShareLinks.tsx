"use client";

import { useSyncExternalStore } from "react";
import { getEssaysUi } from "@/data/essays-ui";
import type { Locale } from "@/i18n/config";
import { buildShareLinks } from "@/lib/essays";

const subscribe = () => () => {};
const currentUrl = () => window.location.href;
// Before hydration the page address is unknown, so links share the title with no url.
const serverUrl = () => "";

export function ShareLinks({ title, lang }: { title: string; lang: Locale }) {
  const { share } = getEssaysUi(lang);
  const url = useSyncExternalStore(subscribe, currentUrl, serverUrl);
  const links = buildShareLinks(title, url);

  return (
    <div className="essay-share" lang={lang}>
      <span className="eyebrow">{share.label}</span>
      <a href={links.x} target="_blank" rel="noopener noreferrer">
        {share.x} <span aria-hidden="true">↗</span>
      </a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
        {share.linkedin} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
