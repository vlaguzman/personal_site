import { NAV_LINKS } from "@/data/site";

export function Header() {
  return (
    <header>
      <a className="wordmark" href="#home">
        Vladimir Guzmán<span>ENTREPRENEUR &amp; BUILDER</span>
      </a>
      <nav aria-label="Main navigation">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
            {href === "#contact" && (
              <>
                {" "}
                <span aria-hidden="true">↗</span>
              </>
            )}
          </a>
        ))}
      </nav>
    </header>
  );
}
