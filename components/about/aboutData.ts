import type { StaticImageData } from "next/image";

import rootsImage from "@/public/herophotos/hero033.png";
import purposeImage from "@/public/herophotos/hero 022.png";
import perspectiveImage from "@/public/herophotos/heron011.png";

export type AboutIconName =
  | "integrity"
  | "partnership"
  | "excellence"
  | "innovation"
  | "global"
  | "commitment"
  | "market"
  | "relationships"
  | "sectors"
  | "support"
  | "perspective";

export type AboutNarrative = {
  key: "roots" | "purpose" | "perspective";
  number: string;
  eyebrow: string;
  headline: readonly [string, string, string];
  highlightedLines: readonly number[];
  paragraph: string;
  selector: string;
  image: StaticImageData;
  imageClass: "roots" | "purpose" | "perspective";
  imageAlt: string;
};

export const aboutNarratives: readonly AboutNarrative[] = [
  {
    key: "roots",
    number: "01",
    eyebrow: "ROOTED IN OMAN",
    headline: ["Rooted in Oman.", "Connected to", "the World."],
    highlightedLines: [1, 2],
    paragraph:
      "Based in Oman, Interlink International combines local market understanding with international relationships to connect businesses, capital and opportunities across borders.",
    selector: "OUR ROOTS",
    image: rootsImage,
    imageClass: "roots",
    imageAlt: "Contemporary Muscat and Omani business activity",
  },
  {
    key: "purpose",
    number: "02",
    eyebrow: "OUR PURPOSE",
    headline: ["Empowering Growth.", "Enabling Meaningful", "Impact."],
    highlightedLines: [1, 2],
    paragraph:
      "We bring together opportunity, expertise and trusted partnerships to help organizations make confident decisions and create sustainable long-term value.",
    selector: "OUR PURPOSE",
    image: purposeImage,
    imageClass: "purpose",
    imageAlt: "Omani and international professionals in a strategic business discussion",
  },
  {
    key: "perspective",
    number: "03",
    eyebrow: "LOCAL INSIGHT. GLOBAL PERSPECTIVE.",
    headline: ["Local Knowledge.", "International Reach.", "Strategic Direction."],
    highlightedLines: [2],
    paragraph:
      "Our perspective connects Omani insight with experience across regional and international markets, supporting investment, trade and strategic expansion.",
    selector: "OUR PERSPECTIVE",
    image: perspectiveImage,
    imageClass: "perspective",
    imageAlt: "Oman connected with international markets",
  },
] as const;

export const aboutValues = [
  { title: "Integrity", description: "We act with honesty, transparency and accountability in every engagement.", icon: "integrity" as const },
  { title: "Partnership", description: "We build relationships based on trust, collaboration and shared success.", icon: "partnership" as const },
  { title: "Excellence", description: "We pursue high standards and continually improve the value we deliver.", icon: "excellence" as const },
  { title: "Innovation", description: "We apply new ideas and practical intelligence to create long-term value.", icon: "innovation" as const },
  { title: "Global Mindset", description: "We combine local understanding with perspectives from international markets.", icon: "global" as const },
  { title: "Commitment", description: "We remain focused on our partners, our people and sustainable growth.", icon: "commitment" as const },
] as const;

// No source-backed numerical metrics currently exist in the repository.
export const institutionalProof = [
  { title: "International Market Connections", description: "Cross-border perspective grounded in Oman.", icon: "market" as const },
  { title: "Trusted Business Relationships", description: "A partnership-led approach to opportunity.", icon: "relationships" as const },
  { title: "Multi-Sector Experience", description: "Commercial understanding across diverse industries.", icon: "sectors" as const },
  { title: "End-to-End Support", description: "Guidance from evaluation through practical execution.", icon: "support" as const },
  { title: "Long-Term Perspective", description: "Decisions shaped around sustainable value.", icon: "perspective" as const },
] as const;

export type LeadershipProfile = {
  name: string;
  role: string;
  biography: string;
  image: StaticImageData;
  linkedin?: string;
};

// TODO(company approval): Add only approved names, roles, biographies, portraits and URLs.
export const leadershipProfiles: readonly LeadershipProfile[] = [];

export type CompanyMilestone = {
  year: string;
  title: string;
  description: string;
};

// TODO(company approval): Populate only from a verified corporate-history source.
export const companyMilestones: readonly CompanyMilestone[] = [];
