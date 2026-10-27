import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Speaking } from "@/components/landing/Speaking";

export const metadata: Metadata = {
  title: "Speaking | Vladimir Guzmán",
  description:
    "Talks and workshops on entrepreneurship, technology and human potential. Challenge assumptions, start better conversations.",
};

export default function SpeakingPage() {
  return (
    <>
      <Header currentPath="/speaking" />
      <main id="home">
        <Speaking />
      </main>
      <Footer />
    </>
  );
}
