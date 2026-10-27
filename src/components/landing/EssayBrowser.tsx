"use client";

import { useState } from "react";
import { getEssaysUi } from "@/data/essays-ui";
import type { Essay, Topic } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { topicsInUse } from "@/lib/essays";
import { EssayCard } from "./EssayCard";

export function EssayBrowser({ essays, lang }: { essays: readonly Essay[]; lang: Locale }) {
  const ui = getEssaysUi(lang);
  const [topic, setTopic] = useState<Topic | null>(null);
  const topics = topicsInUse(essays);
  const visible = topic ? essays.filter((e) => e.topic === topic) : essays;

  return (
    <div className="essays-browser">
      {topics.length > 0 && (
        <div className="essays-filters" role="group" aria-label={ui.filterLabel}>
          {[null, ...topics].map((t) => (
            <button key={t ?? "all"} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t ? ui.topics[t] : ui.allLabel}
            </button>
          ))}
        </div>
      )}
      <p className="essays-count" role="status" aria-live="polite">
        {ui.count(visible.length, essays.length)}
      </p>
      <div className="essays-grid">
        {visible.map((essay) => (
          <EssayCard key={essay.slug} essay={essay} lang={lang} />
        ))}
      </div>
    </div>
  );
}
