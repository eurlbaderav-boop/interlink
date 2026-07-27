import type { Metadata } from "next";

import AdvantagesSection from "@/components/services/AdvantagesSection";
import CoreServicesSection from "@/components/services/CoreServicesSection";
import ExtendedServicesSection from "@/components/services/ExtendedServicesSection";
import ServicesCTA from "@/components/services/ServicesCTA";
import ServicesHero from "@/components/services/ServicesHero";
import { serviceIndexByKey, type ServiceKey } from "@/components/services/servicesData";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Services | Interlink International",
  description: "Explore Interlink International services across investment, import and export, strategic consultancy and execution support.",
  alternates: { canonical: "https://interlinkintl.com/services" },
};

const isServiceKey = (value: string | undefined): value is ServiceKey => Boolean(value && value in serviceIndexByKey);

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const params = await searchParams;
  const requested = Array.isArray(params.service) ? params.service[0] : params.service;
  const initialIndex = isServiceKey(requested) ? serviceIndexByKey[requested] : 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#061F3C]">
      <SiteHeader />
      <main>
        <ServicesHero initialIndex={initialIndex} />
        <CoreServicesSection />
        <ExtendedServicesSection />
        <AdvantagesSection />
        <ServicesCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
