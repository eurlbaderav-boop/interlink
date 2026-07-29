import type { Metadata } from "next";

import DrilEzyPage from "@/components/network/DrilEzyPage";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "DRIL-EZY® Product Technology | Interlink International",
  description:
    "Technical product information for DRILCHEM DRIL-EZY®, an acid-soluble drilling fluid additive for protecting producing formations during drilling.",
  alternates: { canonical: "https://interlinkintl.com/our-network/dril-ezy" },
};

export default function DrilEzyProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F1E7] text-[#09243E]">
      <SiteHeader />
      <main>
        <DrilEzyPage />
      </main>
      <SiteFooter />
    </div>
  );
}
