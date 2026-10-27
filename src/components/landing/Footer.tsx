import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";

export function Footer({ lang, year = new Date().getFullYear() }: { lang: Locale; year?: number }) {
  return (
    <footer className="wrap">
      <span>© {year} Vladimir Guzmán</span>
      <span>Colombian entrepreneur. Based in London.</span>
      <Link href={localePath(lang, "/journey")}>Journey</Link>
      <Link href={localePath(lang, "/speaking")}>Speaking</Link>
      <Link href={localePath(lang, "/work-together")}>Work together</Link>
      <Link href={localePath(lang, "/essays")}>Essays</Link>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}
