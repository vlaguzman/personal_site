import Link from "next/link";
import { NAV_LINKS } from "@/data/site";
import { localePath, type Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = {
  lang: Locale;
  /** Locale-free route of the sub-page being shown. Omit on the home page, where anchors stay in-page. */
  currentPath?: string;
  /** Locale-free path of the page being rendered, used by the language switcher. Defaults to `currentPath`. */
  path?: string;
};

export function Header({ lang, currentPath, path }: Props) {
  // On a sub-page, in-page anchors must lead back to the home page.
  const resolve = (href: string) => (currentPath && href.startsWith("#") ? `/${href}` : href);

  return (
    <header>
      <HeaderLink className="wordmark" lang={lang} href={resolve("#home")}>
        Vladimir Guzmán<span>ENTREPRENEUR &amp; BUILDER</span>
      </HeaderLink>
      <nav aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <HeaderLink key={href} lang={lang} href={resolve(href)} current={href === currentPath}>
            {label}
            {href === "#contact" && (
              <>
                {" "}
                <span aria-hidden="true">↗</span>
              </>
            )}
          </HeaderLink>
        ))}
      </nav>
      <LanguageSwitcher lang={lang} path={path ?? currentPath ?? "/"} />
    </header>
  );
}

function HeaderLink({
  lang,
  href,
  current,
  className,
  children,
}: {
  lang: Locale;
  /** Locale-free href. */
  href: string;
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ariaCurrent = current ? ("page" as const) : undefined;
  const localized = localePath(lang, href);
  // Plain anchors for in-page hashes; next/link for real routes.
  return href.startsWith("/") && !href.startsWith("/#") ? (
    <Link className={className} href={localized} aria-current={ariaCurrent}>
      {children}
    </Link>
  ) : (
    <a className={className} href={localized} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}
