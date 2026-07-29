import type { Metadata } from "next";

import DrilchemPage from "@/components/network/DrilchemPage";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "DRILCHEM Partner | Interlink International",
  description:
    "Discover DRILCHEM's specialised fibre-based fluid-loss technologies, custom applications and technical expertise within the Interlink International network.",
  alternates: { canonical: "https://interlinkintl.com/our-network" },
};

export default function OurNetworkPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#061F3C]">
      <SiteHeader />
      <main>
        <DrilchemPage />
      </main>
      <SiteFooter />
    </div>
  );
}
