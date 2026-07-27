export const contactContent = {
  benefits: [
    { icon: "strategy", title: "Strategic Expertise", description: "Deep market understanding" },
    { icon: "network", title: "Global Network", description: "Trusted partners across key markets" },
    { icon: "solutions", title: "Tailored Solutions", description: "Practical strategies for real growth" },
  ],
  process: [
    { number: "01", icon: "request", title: "SUBMIT YOUR REQUEST", description: "Share your basic information and the area of interest." },
    { number: "02", icon: "review", title: "INITIAL REVIEW", description: "Our team reviews your inquiry and prepares for the discussion." },
    { number: "03", icon: "discussion", title: "CONFIDENTIAL DISCUSSION", description: "We schedule a call or meeting to understand your needs." },
    { number: "04", icon: "recommendation", title: "STRATEGIC RECOMMENDATION", description: "Receive initial insights and next steps tailored to you." },
  ],
  responsePromises: [
    "You’ll receive a confirmation after submission.",
    "Our team will review your request and contact you promptly.",
    "All conversations are treated as confidential.",
    "No obligation—just a conversation about possibilities.",
  ],
} as const;

export const countryCodes = [
  { code: "+968", label: "Oman" },
  { code: "+971", label: "United Arab Emirates" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+974", label: "Qatar" },
  { code: "+973", label: "Bahrain" },
  { code: "+965", label: "Kuwait" },
  { code: "+44", label: "United Kingdom" },
  { code: "+1", label: "United States and Canada" },
  { code: "+91", label: "India" },
] as const;
