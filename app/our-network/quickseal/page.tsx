import type { Metadata } from "next";

import QuicksealPage from "@/components/network/QuicksealPage";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "QUICKSEAL® Product Technology | Interlink International",
  description:
    "Technical product information for DRILCHEM QUICKSEAL®, a lost circulation material available in Fine, Medium and Coarse grades.",
  alternates: { canonical: "https://interlinkintl.com/our-network/quickseal" },
};

export default function QuicksealProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F1E7] text-[#09243E]">
      <SiteHeader />
      <main>
        <QuicksealPage />
      </main>
      <SiteFooter />
    </div>
  );
}
