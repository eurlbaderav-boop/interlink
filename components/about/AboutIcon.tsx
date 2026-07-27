import type { AboutIconName } from "./aboutData";

export default function AboutIcon({ name }: { name: AboutIconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "integrity") return <svg {...common}><path d="M12 3 5.5 6v5.2c0 4.1 2.6 7.5 6.5 9.3 3.9-1.8 6.5-5.2 6.5-9.3V6L12 3Z" /><path d="m8.8 12 2 2 4.5-4.7" /></svg>;
  if (name === "partnership" || name === "relationships") return <svg {...common}><path d="m3 10 4-4 3.2 1.2 1.8-1 2 .8 3-1 4 4-5.4 6.4a2 2 0 0 1-2.9.1L8.5 12.3" /><path d="m7 14-2-2" /></svg>;
  if (name === "excellence") return <svg {...common}><path d="m12 3 2.6 5.3 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3Z" /></svg>;
  if (name === "innovation") return <svg {...common}><path d="M9 18h6M9.5 21h5" /><path d="M8.2 15.5C6.8 14.3 6 12.5 6 10.6A6 6 0 0 1 18 10c0 2.2-.9 4.1-2.4 5.5-.6.5-.8 1.1-.8 1.5H9c0-.5-.2-1-.8-1.5Z" /><path d="M12 3V1M4.6 4.2 3.2 2.8M19.4 4.2l1.4-1.4" /></svg>;
  if (name === "global" || name === "market") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21M12 3C9.7 5.5 8.5 8.5 8.5 12s1.2 6.5 3.5 9" /></svg>;
  if (name === "commitment") return <svg {...common}><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (name === "sectors") return <svg {...common}><path d="M4 20V9l5 3V9l5 3V6h6v14H4Z" /><path d="M8 17h.1M12 17h.1M16 17h.1" /></svg>;
  if (name === "support") return <svg {...common}><path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-3" /><path d="M4 12v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2M20 12v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2" /></svg>;
  return <svg {...common}><path d="M4 19h16M6 16l4-4 3 2 5-7" /><circle cx="18" cy="7" r="2" /></svg>;
}
