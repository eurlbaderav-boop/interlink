import type { Metadata } from "next";

import FracsealPage from "@/components/network/FracsealPage";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "FRACSEAL® Product Technology | Interlink International",
  description:
    "Technical product information for DRILCHEM FRACSEAL®, a micronised organic cellulose fibre used to prevent seepage and partial fluid losses.",
  alternates: { canonical: "https://interlinkintl.com/our-network/fracseal" },
};

export default function FracsealProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F6F1E7] text-[#09243E]">
      <SiteHeader />
      <main>
        <FracsealPage />
      </main>
      <SiteFooter />
    </div>
  );
}
