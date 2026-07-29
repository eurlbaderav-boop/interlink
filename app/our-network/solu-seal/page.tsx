import type { Metadata } from "next";

import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import SoluSealPage from "@/components/network/SoluSealPage";

export const metadata: Metadata = {
  title: "SOLU-SEAL® Product Technology | Interlink International",
  description:
    "Technical product information for DRILCHEM SOLU-SEAL®, a reactive LCM pill for producing and reservoir formations.",
  alternates: { canonical: "https://interlinkintl.com/our-network/solu-seal" },
};

export default function SoluSealProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F1E7] text-[#09243E]">
      <SiteHeader />
      <main>
        <SoluSealPage />
      </main>
      <SiteFooter />
    </div>
  );
}
