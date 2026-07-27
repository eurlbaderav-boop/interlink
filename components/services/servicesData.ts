import type { StaticImageData } from "next/image";

import investmentImage from "@/public/herophotos/hero 022.png";
import consultancyImage from "@/public/herophotos/hero033.png";
import tradeImage from "@/public/herophotos/heron011.png";

export type ServiceKey = "investment" | "import-export" | "consultancy";
export type ServiceIconName = "investment" | "trade" | "consultancy" | "partnership" | "liaison" | "intelligence" | "operations" | "reach" | "relationships" | "sectors" | "support" | "insight";

export type ServiceDefinition = {
  key: ServiceKey;
  number: string;
  eyebrow: string;
  title: string;
  headline: readonly [string, string, string];
  paragraph: string;
  focusDescription: string;
  dockDescription: string;
  capabilities: readonly string[];
  panelDescription: string;
  panelCapabilities: readonly string[];
  panelCta: string;
  panelHref: string;
  panelId: string;
  image: StaticImageData;
  imageAlt: string;
  icon: ServiceIconName;
  imageClass: "investment" | "trade" | "consultancy";
};

export const services: readonly ServiceDefinition[] = [
  {
    key: "investment",
    number: "01",
    eyebrow: "STRATEGIC INVESTMENT",
    title: "INVESTMENT",
    headline: ["Invest with Direction.", "Build Lasting Value.", "Grow with Purpose."],
    paragraph: "We identify, evaluate and structure high-potential opportunities across key sectors and markets, connecting capital with strategies designed for sustainable long-term value.",
    focusDescription: "Opportunity identification, due diligence, structuring and long-term portfolio support.",
    dockDescription: "Capital aligned with lasting value",
    capabilities: ["Investment Advisory", "Opportunity Sourcing", "Due Diligence", "Structuring & Execution"],
    panelDescription: "We identify, evaluate and structure high-impact investment opportunities across key sectors and markets, supporting sustainable value creation for our partners.",
    panelCapabilities: ["Investment Advisory", "Opportunity Sourcing", "Due Diligence & Evaluation", "Structuring & Execution", "Portfolio Support"],
    panelCta: "EXPLORE INVESTMENT",
    panelHref: "/services?service=investment#investment",
    panelId: "investment",
    image: investmentImage,
    imageAlt: "Strategic investment discussion overlooking Muscat",
    icon: "investment",
    imageClass: "investment",
  },
  {
    key: "import-export",
    number: "02",
    eyebrow: "INTERNATIONAL TRADE",
    title: "IMPORT & EXPORT",
    headline: ["Connect Markets.", "Move Trade Forward.", "Create New Value."],
    paragraph: "We facilitate reliable international trade by connecting businesses with suppliers, markets and logistics partners while supporting documentation, compliance and market access.",
    focusDescription: "Strategic sourcing, export-market access, logistics coordination and trade compliance.",
    dockDescription: "Reliable pathways across borders",
    capabilities: ["Global Sourcing", "Export Market Access", "Logistics Coordination", "Customs & Documentation"],
    panelDescription: "We facilitate international trade by connecting reliable suppliers, markets and logistics partners while supporting efficient movement and compliance.",
    panelCapabilities: ["Global Sourcing", "Export Market Access", "Logistics Coordination", "Customs & Documentation", "Trade Compliance"],
    panelCta: "EXPLORE TRADE CAPABILITIES",
    panelHref: "/services?service=import-export#import-export",
    panelId: "import-export",
    image: tradeImage,
    imageAlt: "International trade connections through an Omani port",
    icon: "trade",
    imageClass: "trade",
  },
  {
    key: "consultancy",
    number: "03",
    eyebrow: "STRATEGIC CONSULTANCY",
    title: "STRATEGIC CONSULTANCY",
    headline: ["See Markets Clearly.", "Decide with Confidence.", "Grow Strategically."],
    paragraph: "We help organizations navigate complexity, understand markets, evaluate opportunities and build practical strategies for entry, partnerships and sustainable expansion.",
    focusDescription: "Market-entry strategy, risk assessment, partner identification and growth planning.",
    dockDescription: "Clarity for confident decisions",
    capabilities: ["Market Entry Strategy", "Business Advisory", "Partner Identification", "Risk & Feasibility Analysis"],
    panelDescription: "We provide strategic advice that helps businesses understand markets, navigate complexity, identify partners and develop actionable growth strategies.",
    panelCapabilities: ["Market Entry Strategy", "Business Advisory", "Partner Identification", "Risk & Feasibility Analysis", "Growth & Expansion Strategy"],
    panelCta: "EXPLORE CONSULTANCY",
    panelHref: "/services?service=consultancy#strategic-consultancy",
    panelId: "strategic-consultancy",
    image: consultancyImage,
    imageAlt: "Strategic consultants reviewing opportunities in Muscat",
    icon: "consultancy",
    imageClass: "consultancy",
  },
] as const;

export const serviceIndexByKey: Record<ServiceKey, number> = {
  investment: 0,
  "import-export": 1,
  consultancy: 2,
};

export const extendedServices = [
  { title: "Partnership Development", description: "Connecting businesses and institutions to build trust, collaboration and shared value.", icon: "partnership" as const },
  { title: "Government & Stakeholder Liaison", description: "Supporting engagement with relevant institutions and key stakeholders to enable opportunities.", icon: "liaison" as const },
  { title: "Market Intelligence", description: "Providing focused market insight and structured analysis for confident decision-making.", icon: "intelligence" as const },
  { title: "Operational Support", description: "Supporting execution through coordination, implementation and practical follow-through.", icon: "operations" as const },
] as const;

export const advantages = [
  { title: "International Reach", descriptor: "Connected market perspective", text: "Cross-border insight that helps opportunities move between Oman, regional markets and international partners.", icon: "reach" as const },
  { title: "Trusted Relationships", descriptor: "Partnership-led approach", text: "A measured approach to building credible, long-term relationships around each opportunity.", icon: "relationships" as const },
  { title: "Multi-Sector Expertise", descriptor: "Context-aware guidance", text: "Commercial thinking shaped around different sectors, operating realities and market conditions.", icon: "sectors" as const },
  { title: "End-to-End Support", descriptor: "From evaluation to action", text: "Practical continuity from early assessment and planning through coordination and execution support.", icon: "support" as const },
  { title: "Local Insight, Global Reach", descriptor: "Oman-centered perspective", text: "Local market understanding combined with an outward-looking international business perspective.", icon: "insight" as const },
] as const;
