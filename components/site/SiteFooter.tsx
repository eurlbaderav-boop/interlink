import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

function FooterColumn({ title, items }: { title: string; items: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#E1B766]">{title}</h3>
      <ul className="mt-5 space-y-2.5 text-[13px] leading-[1.6] text-white/76">
        {items.map((item) => (
          <li key={item.label}><Link href={item.href} className="transition hover:text-[#E1B766]">{item.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-[#031B35] px-6 pt-[60px] text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 border-b border-white/10 pb-11 md:grid-cols-2 lg:grid-cols-[1.35fr_0.82fr_0.82fr_0.9fr_1.08fr]">
        <div>
          <Image src={siteConfig.logoUrl} alt="INTERLINK International logo" width={196} height={72} className="h-auto w-[196px] brightness-0 invert" style={{ height: "auto" }} />
          <p className="mt-5 max-w-[290px] text-[13px] leading-[1.7] text-white/76">{siteConfig.description}</p>
        </div>
        <FooterColumn title="Company" items={siteConfig.footer.company} />
        <FooterColumn title="Services" items={siteConfig.footer.services} />
        <FooterColumn title="Resources" items={siteConfig.footer.resources} />
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#E1B766]">Contact</h3>
          <ul className="mt-5 space-y-3 text-[13px] leading-[1.65] text-white/76">
            <li><a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-[#E1B766]">{siteConfig.contact.email}</a></li>
            <li>{siteConfig.contact.location}</li>
            <li><Link href="/contact" className="transition hover:text-[#E1B766]">Request Consultation</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-4 py-5 text-[12px] text-white/62 md:flex-row">
        <p>© 2026 Interlink International. All Rights Reserved.</p>
        <div className="flex gap-4" aria-label="Legal information">
          <span>Privacy Policy</span><span className="text-white/30">|</span><span>Terms of Use</span>
        </div>
      </div>
    </footer>
  );
}
