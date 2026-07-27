import type { ServiceIconName } from "./servicesData";

export default function ServiceIcon({ name }: { name: ServiceIconName }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (name === "investment") return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M8 14.5l2.5-3 2.2 1.7L16 8.7M8 17h8" /></svg>;
  if (name === "trade") return <svg {...common}><path d="M3 15.5h18l-2.4 3.2H6L3 15.5ZM6 15.5V8h9v7.5M15 10h3l3 3v2.5M8.5 11h4" /><circle cx="8" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>;
  if (name === "consultancy") return <svg {...common}><path d="M5 19v-7M12 19V5M19 19v-10M3 19h18M8.5 8.5 12 5l3 2.5L19 4" /></svg>;
  if (name === "partnership" || name === "relationships") return <svg {...common}><path d="m8.5 12 2 2a2 2 0 0 0 3 0l3.8-3.8M3 10l4-4 3 1 2-1 3 1 2-1 4 4-5.5 6.5a2 2 0 0 1-3 0l-.5-.5M7 14l-2-2" /></svg>;
  if (name === "liaison") return <svg {...common}><path d="M4 20v-9h16v9M2 20h20M6 11V7l6-3 6 3v4M8 14v3M12 14v3M16 14v3" /></svg>;
  if (name === "intelligence" || name === "insight") return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="m15.5 15.5 4 4M8 12l2-2 2 1 2-3" /></svg>;
  if (name === "operations" || name === "support") return <svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="4" /></svg>;
  if (name === "reach") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21M12 3C9.5 5.5 8.5 8.5 8.5 12S9.5 18.5 12 21" /></svg>;
  if (name === "sectors") return <svg {...common}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></svg>;
  return <svg {...common}><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></svg>;
}
