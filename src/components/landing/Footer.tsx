import Link from "next/link";

export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className="wrap">
      <span>© {year} Vladimir Guzmán</span>
      <span>Colombian entrepreneur. Based in London.</span>
      <Link href="/essays">Essays</Link>
      <a href="#home">Back to top ↑</a>
    </footer>
  );
}
