import type { Metadata } from "next";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { WorkTogether } from "@/components/landing/WorkTogether";

export const metadata: Metadata = {
  title: "Work together | Vladimir Guzmán",
  description:
    "Strategic advisory, AI and technology strategy, and workshops for founders and business leaders. Independent thinking, practical experience.",
};

export default function WorkTogetherPage() {
  return (
    <>
      <Header currentPath="/work-together" />
      <main id="home">
        <WorkTogether />
      </main>
      <Footer />
    </>
  );
}
