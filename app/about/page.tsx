import type { Metadata } from "next";

import AboutCTA from "@/components/about/AboutCTA";
import AboutHero from "@/components/about/AboutHero";
import CompanyProofStrip from "@/components/about/CompanyProofStrip";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import LeadershipSection from "@/components/about/LeadershipSection";
import PurposeValuesSection from "@/components/about/PurposeValuesSection";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "About Us | Interlink International",
  description:
    "Discover Interlink International's Oman-rooted purpose, values, international perspective and approach to creating sustainable opportunity.",
  alternates: { canonical: "https://interlinkintl.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#061F3C]">
      <SiteHeader />
      <main>
        <AboutHero />
        <PurposeValuesSection />
        <CompanyProofStrip />
        <LeadershipSection />
        <CompanyTimeline />
        <AboutCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
