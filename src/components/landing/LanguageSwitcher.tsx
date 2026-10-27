import Link from "next/link";
import { LOCALES, localePath, type Locale } from "@/i18n/config";

/** Short label shown in the header and the language's name in its own language. */
const LANGUAGES: Record<Locale, { label: string; name: string }> = {
  en: { label: "EN", name: "English" },
  es: { label: "ES", name: "Español" },
};

type Props = {
  /** Locale of the page being shown. */
  lang: Locale;
  /** Locale-free path of the page being shown, so the switch lands on the equivalent page. */
  path: string;
};

export function LanguageSwitcher({ lang, path }: Props) {
  return (
    <nav className="lang-switch" aria-label="Language">
      {LOCALES.map((target) => (
        <Link
          key={target}
          href={localePath(target, path)}
          lang={target}
          hrefLang={target}
          aria-label={LANGUAGES[target].name}
          aria-current={target === lang ? "true" : undefined}
        >
          {LANGUAGES[target].label}
        </Link>
      ))}
    </nav>
  );
}
