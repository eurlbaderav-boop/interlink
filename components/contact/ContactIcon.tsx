export default function ContactIcon({ name, className = "" }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<string, React.ReactNode> = {
    strategy: <><path d="M4 19 10 5l3.2 6L20 8l-4 11H4Z" /><path d="m10 5 1.8 9.5L20 8" /></>,
    network: <><circle cx="12" cy="12" r="3" /><circle cx="5" cy="7" r="1.7" /><circle cx="19" cy="6" r="1.7" /><circle cx="19" cy="18" r="1.7" /><path d="m6.5 7.8 3.1 2.5m4.7-.4 3.2-2.7m-3.2 7 3.2 2.7" /></>,
    solutions: <><path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3Z" /><path d="M9 22h6M9 10l2 2 4-4" /></>,
    request: <><path d="M6 3h9l3 3v15H6V3Z" /><path d="M15 3v4h4M9 11h6M9 15h6" /></>,
    review: <><circle cx="11" cy="11" r="6" /><path d="m16 16 5 5M8.5 11l1.7 1.7 3.4-3.7" /></>,
    discussion: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    recommendation: <><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    phone: <path d="M7.2 3H4.5C3.7 3 3 3.7 3 4.5 3 13.6 10.4 21 19.5 21c.8 0 1.5-.7 1.5-1.5v-2.7l-4-1-1.2 2.1a14.7 14.7 0 0 1-9.7-9.7L8.2 7l-1-4Z" />,
    email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return <svg {...common}>{paths[name] ?? paths.check}</svg>;
}
