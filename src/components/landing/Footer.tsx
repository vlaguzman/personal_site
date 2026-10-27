import Link from "next/link";
import { getChrome } from "@/data/chrome";
import { localePath, type Locale } from "@/i18n/config";

export function Footer({ lang, year = new Date().getFullYear() }: { lang: Locale; year?: number }) {
  const { footer } = getChrome(lang);
  return (
    <footer className="wrap">
      <span>© {year} Vladimir Guzmán</span>
      <span>{footer.tagline}</span>
      <Link href={localePath(lang, "/journey")}>{footer.links.journey}</Link>
      <Link href={localePath(lang, "/speaking")}>{footer.links.speaking}</Link>
      <Link href={localePath(lang, "/work-together")}>{footer.links.workTogether}</Link>
      <Link href={localePath(lang, "/essays")}>{footer.links.essays}</Link>
      <a href="#home">{footer.backToTop}</a>
    </footer>
  );
}
