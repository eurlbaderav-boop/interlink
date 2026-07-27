import Link from "next/link";
import type { ReactNode } from "react";

import GlobalNetworkSection from "@/components/home/GlobalNetworkSection";
import ExclusiveProductSection from "@/components/home/ExclusiveProductSection";
import HeroCarousel from "@/components/home/HeroCarousel";
import InternationalPartnersSection from "@/components/home/InternationalPartnersSection";
import StatisticsStrip from "@/components/home/StatisticsStrip";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

const services = [
  {
    title: "INVESTMENT",
    text: "Unlock opportunities and drive growth through strategic investments across high-potential sectors in Oman and global markets.",
    icon: "coins",
    href: "/services?service=investment#investment",
  },
  {
    title: "IMPORT EXPORT",
    text: "Facilitating seamless global trade with reliable sourcing, efficient logistics and regulatory excellence.",
    icon: "ship",
    href: "/services?service=import-export#import-export",
  },
  {
    title: "CONSULTANCY",
    text: "Tailored advisory services to help businesses navigate complexity, mitigate risk and achieve long-term success.",
    icon: "people",
    href: "/services?service=consultancy#strategic-consultancy",
  },
];

const industries = [
  ["energy", "Energy & Renewables"],
  ["construction", "Infrastructure & Construction"],
  ["factory", "Manufacturing & Industrial"],
  ["truck", "Logistics & Supply Chain"],
  ["agriculture", "Food & Agriculture"],
  ["technology", "Technology & Innovation"],
  ["healthcare", "Healthcare & Pharma"],
  ["tourism", "Tourism & Hospitality"],
];

function Icon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "ship") {
    return (
      <svg {...common}>
        <path d="M3 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1" />
        <path d="M5 12h14l-2.2 5H7.2L5 12Z" />
        <path d="M8 12V7h8v5" />
        <path d="M10 7V4h4v3" />
      </svg>
    );
  }

  if (name === "coins") {
    return (
      <svg {...common}>
        <path d="M4 16c0 1.7 2.2 3 5 3s5-1.3 5-3" />
        <path d="M4 12c0 1.7 2.2 3 5 3s5-1.3 5-3-2.2-3-5-3-5 1.3-5 3Z" />
        <path d="M14 8c2.8 0 5 1.3 5 3 0 1.3-1.4 2.4-3.4 2.8" />
        <path d="M14 4c2.8 0 5 1.3 5 3 0 1.1-1 2.1-2.5 2.6" />
        <path d="m8 8 3-4 3 4" />
      </svg>
    );
  }

  if (name === "people") {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M3.5 20c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" />
        <path d="M11.5 20c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21" />
        <path d="M12 3c-2.4 2.6-3.6 5.6-3.6 9s1.2 6.4 3.6 9" />
      </svg>
    );
  }

  if (name === "energy") {
    return (
      <svg {...common}>
        <path d="M13 2 5 13h6l-1 9 8-12h-6l1-8Z" />
      </svg>
    );
  }

  if (name === "construction") {
    return (
      <svg {...common}>
        <path d="M4 20h16" />
        <path d="M6 20V8l6-4 6 4v12" />
        <path d="M9 20v-7h6v7" />
        <path d="M8 10h8" />
      </svg>
    );
  }

  if (name === "factory") {
    return (
      <svg {...common}>
        <path d="M4 20V9l5 3V9l5 3V7h6v13H4Z" />
        <path d="M8 17h.1M12 17h.1M16 17h.1" />
      </svg>
    );
  }

  if (name === "truck") {
    return (
      <svg {...common}>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    );
  }

  if (name === "agriculture") {
    return (
      <svg {...common}>
        <path d="M12 21V9" />
        <path d="M12 12c-4 0-7-2.5-7-7 4 0 7 2.5 7 7Z" />
        <path d="M12 14c4 0 7-2.5 7-7-4 0-7 2.5-7 7Z" />
      </svg>
    );
  }

  if (name === "technology") {
    return (
      <svg {...common}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  if (name === "healthcare") {
    return (
      <svg {...common}>
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
        <path d="M12 9v6M9 12h6" />
      </svg>
    );
  }

  if (name === "tourism") {
    return (
      <svg {...common}>
        <path d="M4 20h16" />
        <path d="M6 20c.4-4 2.4-7 6-9 3.6 2 5.6 5 6 9" />
        <path d="M12 11V4" />
        <path d="M8 7c1-2 2.3-3 4-3s3 1 4 3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function DottedPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute opacity-35 [background-image:radial-gradient(rgba(225,183,102,0.55)_1px,transparent_1px)] [background-size:18px_18px] ${className}`}
      aria-hidden="true"
    />
  );
}

function Label({ children, align = "left" }: { children: ReactNode; align?: "left" | "center" }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.18em] text-[#C9953D] ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {children}
    </p>
  );
}

function HexIcon({ icon, className = "" }: { icon: string; className?: string }) {
  return (
    <div
      className={`flex h-[86px] w-[78px] items-center justify-center bg-[#061F3C] text-[#E1B766] shadow-[0_14px_28px_rgba(6,31,60,0.18)] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] ${className}`}
    >
      <Icon name={icon} className="h-9 w-9" />
    </div>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <article className="group flex min-h-[252px] flex-col rounded-[8px] border border-[#C9953D]/18 bg-white p-7 shadow-[0_18px_42px_rgba(6,31,60,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#C9953D]/40 hover:shadow-[0_24px_54px_rgba(6,31,60,0.13)] md:p-8">
      <div className="flex items-start justify-between gap-5">
        <HexIcon icon={service.icon} className="h-[74px] w-[68px] shrink-0" />
        <span className="mt-3 h-px flex-1 bg-[#C9953D]/45" />
      </div>
      <h3 className="mt-7 text-[15px] font-bold uppercase tracking-[0.05em] text-[#061F3C]">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-[13.5px] leading-[1.75] text-[#4b5b69]">{service.text}</p>
      <Link
        href={service.href}
        className="mt-6 inline-flex items-center text-[12px] font-bold uppercase tracking-[0.08em] text-[#C9953D]"
      >
        Learn More <span className="ml-2 transition group-hover:translate-x-1">→</span>
      </Link>
    </article>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#FBFAF7] px-6 pb-16 pt-20 md:pb-[72px] md:pt-[88px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Label>WHAT WE DO</Label>
            <h2 className="mt-2 font-serif text-[clamp(2rem,3.3vw,2.95rem)] font-bold leading-[1.08] tracking-[-0.02em] text-[#061F3C]">
              Our Core Services
            </h2>
            <div className="mt-4 h-px w-20 bg-[#C9953D]" />
          </div>
          <p className="max-w-[520px] text-[15px] leading-[1.75] text-[#172f48] lg:ml-auto">
            We provide end-to-end solutions that connect capital, markets, and expertise to create sustainable value.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#061F3C]">
      <SiteHeader />

      <HeroCarousel />

      <GlobalNetworkSection />

      <StatisticsStrip />

      <ExclusiveProductSection />

      <InternationalPartnersSection />

      <ServicesSection />

      <section id="industries" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <Label align="center">INDUSTRIES WE SERVE</Label>
          <h2 className="mt-2 text-center font-serif text-[clamp(2rem,3vw,2.8rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#061F3C]">
            Powering Growth Across Key Sectors
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-[#C9953D]" />
          <div className="mt-8 grid gap-y-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {industries.map(([icon, label], index) => (
              <div
                key={label}
                className={`group flex flex-col items-center px-3 text-center ${
                  index > 0 ? "lg:border-l lg:border-[#C9953D]/28" : ""
                }`}
              >
                <Icon name={icon} className="h-8 w-8 text-[#C9953D] transition duration-500 ease-out group-hover:scale-[1.4] group-hover:text-[#E1B766] group-hover:drop-shadow-[0_8px_18px_rgba(201,149,61,0.35)]" />
                <p className="mt-3 text-[12px] font-semibold leading-[1.35] text-[#061F3C]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white px-6 pb-20 pt-2">
        <div className="relative mx-auto flex min-h-[108px] max-w-[1200px] items-center overflow-hidden rounded-[14px] bg-[#061F3C] px-7 py-7 text-white shadow-[0_18px_42px_rgba(6,31,60,0.2)] md:px-10">
          <DottedPattern className="bottom-0 right-0 h-44 w-96 opacity-20" />
          <div className="relative z-10 flex w-full flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="flex items-center gap-6">
              <HexIcon icon="globe" className="hidden scale-90 md:flex" />
              <div>
                <h2 className="font-serif text-[clamp(1.7rem,2.5vw,2.45rem)] font-bold leading-[1.15] text-white">
                  Ready to Expand Your Horizons?
                </h2>
                <p className="mt-2 text-[14px] leading-[1.65] text-white/82">
                  Let&apos;s build new pathways for your business success.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-[48px] shrink-0 items-center justify-center rounded-[5px] bg-[#C9953D] px-7 text-[12px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_14px_28px_rgba(201,149,61,0.28)] transition hover:bg-[#B9822F]"
            >
              REQUEST CONSULTATION <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
