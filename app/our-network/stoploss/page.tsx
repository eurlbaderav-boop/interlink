import type { Metadata } from "next";

import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import StoplossPage from "@/components/network/StoplossPage";

export const metadata: Metadata = {
  title: "STOPLOSS® Product Technology | Interlink International",
  description:
    "Technical product information for DRILCHEM STOPLOSS®, a broad-spectrum blend designed for severe to total loss circulation.",
  alternates: { canonical: "https://interlinkintl.com/our-network/stoploss" },
};

export default function StoplossProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F1E7] text-[#09243E]">
      <SiteHeader />
      <main>
        <StoplossPage />
      </main>
      <SiteFooter />
    </div>
  );
}
