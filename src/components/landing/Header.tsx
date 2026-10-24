import Link from "next/link";
import { NAV_LINKS } from "@/data/site";

type Props = {
  /** Route of the sub-page being shown. Omit on the home page, where anchors stay in-page. */
  currentPath?: string;
};

export function Header({ currentPath }: Props = {}) {
  // On a sub-page, in-page anchors must lead back to the home page.
  const resolve = (href: string) => (currentPath && href.startsWith("#") ? `/${href}` : href);

  return (
    <header>
      <HeaderLink className="wordmark" href={resolve("#home")}>
        Vladimir Guzmán<span>ENTREPRENEUR &amp; BUILDER</span>
      </HeaderLink>
      <nav aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <HeaderLink key={href} href={resolve(href)} current={href === currentPath}>
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
    </header>
  );
}

function HeaderLink({
  href,
  current,
  className,
  children,
}: {
  href: string;
  current?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ariaCurrent = current ? ("page" as const) : undefined;
  // Plain anchors for in-page hashes; next/link for real routes.
  return href.startsWith("/") && !href.startsWith("/#") ? (
    <Link className={className} href={href} aria-current={ariaCurrent}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}
