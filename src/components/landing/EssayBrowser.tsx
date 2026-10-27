"use client";

import { useState } from "react";
import type { Essay, Topic } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { topicsInUse } from "@/lib/essays";
import { EssayCard } from "./EssayCard";

export function EssayBrowser({ essays, lang }: { essays: readonly Essay[]; lang: Locale }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const topics = topicsInUse(essays);
  const visible = topic ? essays.filter((e) => e.topic === topic) : essays;

  return (
    <div className="essays-browser">
      {topics.length > 0 && (
        <div className="essays-filters" role="group" aria-label="Filter by topic">
          {[null, ...topics].map((t) => (
            <button key={t ?? "all"} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t ?? "All"}
            </button>
          ))}
        </div>
      )}
      <p className="essays-count" role="status" aria-live="polite">
        Showing {visible.length} of {essays.length} {essays.length === 1 ? "essay" : "essays"}
      </p>
      <div className="essays-grid">
        {visible.map((essay) => (
          <EssayCard key={essay.slug} essay={essay} lang={lang} />
        ))}
      </div>
    </div>
  );
}
