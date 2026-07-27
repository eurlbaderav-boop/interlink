import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ConsultationProcess from "@/components/contact/ConsultationProcess";
import DirectContactSection from "@/components/contact/DirectContactSection";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { interestQueryMap } from "@/config/site";

export const metadata: Metadata = {
  title: "Request a Consultation | Interlink International",
  description:
    "Contact Interlink International to discuss investment, import-export, strategic consultancy, market entry and international partnership opportunities.",
  alternates: { canonical: "https://interlinkintl.com/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedInterest = Array.isArray(params.interest) ? params.interest[0] : params.interest;
  const initialInterest = requestedInterest ? interestQueryMap[requestedInterest] : undefined;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#061F3C]">
      <SiteHeader />
      <main>
        <ContactHero initialInterest={initialInterest} />
        <ConsultationProcess />
        <DirectContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
