export const siteConfig = {
  name: "Interlink International",
  logoUrl: "https://i.imgur.com/csmyA4n.png",
  description:
    "Connecting global opportunities with local expertise to deliver sustainable value and long-term impact.",
  contact: {
    email: "contact@interlink-om.com",
    location: "Muscat, Sultanate of Oman",
    // TODO: Add the verified public telephone number when supplied by Interlink.
    phone: null as string | null,
    phoneFallback: "Available through a consultation request",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Partners", href: "/our-network" },
    { label: "News & Media", href: "/news-media" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#journey" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Industries", href: "/#industries" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Investment", href: "/services?service=investment#investment" },
      { label: "Import & Export", href: "/services?service=import-export#import-export" },
      { label: "Consultancy", href: "/services?service=consultancy#strategic-consultancy" },
    ],
    resources: [
      { label: "News & Media", href: "/news-media" },
      { label: "Our Partners", href: "/our-network" },
      { label: "Request Consultation", href: "/contact" },
    ],
  },
} as const;

export const areaOfInterestOptions = [
  "Investment",
  "Import & Export",
  "Strategic Consultancy",
  "Market Entry",
  "International Partnerships",
  "STOPLOSS® Product Information",
  "Technical Product Requirement",
  "Other",
] as const;

export type AreaOfInterest = (typeof areaOfInterestOptions)[number];

export const interestQueryMap: Record<string, AreaOfInterest> = {
  investment: "Investment",
  "import-export": "Import & Export",
  consultancy: "Strategic Consultancy",
  "market-entry": "Market Entry",
  partnerships: "International Partnerships",
  stoploss: "STOPLOSS® Product Information",
  "technical-product": "Technical Product Requirement",
  other: "Other",
};
