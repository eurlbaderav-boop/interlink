import type { Metadata } from "next";

import NewsMediaContent from "@/components/news/NewsMediaContent";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "News & Media | Interlink International",
  description:
    "Explore verified Interlink International news, corporate developments, media resources and perspectives from Oman to international markets.",
  alternates: { canonical: "https://interlinkintl.com/news-media" },
};

export default function NewsMediaPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#061F3C]">
      <SiteHeader />
      <main>
        <NewsMediaContent />
      </main>
      <SiteFooter />
    </div>
  );
}
