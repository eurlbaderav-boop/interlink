"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && currentHash === "";
    if (href === "/our-network") return pathname === "/our-network" || pathname.startsWith("/our-network/");
    if (href === "/about") return pathname === "/about";
    if (href === "/contact") return pathname === "/contact";
    if (href === "/services") return pathname === "/services";
    if (href === "/news-media") return pathname === "/news-media";
    return false;
  };

  return (
    <header className="sticky top-0 z-50 h-[78px] border-b border-[#C9953D]/18 bg-white shadow-[0_8px_26px_rgba(6,31,60,0.08)]">
      <div className="mx-auto flex h-full max-w-[1200px] flex-nowrap items-center justify-between gap-7 px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="INTERLINK International home" onClick={() => setMobileOpen(false)}>
          <Image
            src={siteConfig.logoUrl}
            alt="INTERLINK International logo"
            width={156}
            height={54}
            preload
            className="h-[44px] w-auto object-contain"
            style={{ width: "auto" }}
          />
        </Link>

        <nav className="hidden shrink-0 flex-nowrap items-center gap-5 whitespace-nowrap text-[12px] font-semibold leading-none tracking-[0.02em] text-[#061F3C] xl:flex" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex shrink-0 items-center gap-1 whitespace-nowrap py-8 transition-colors hover:text-[#C9953D] ${active ? "text-[#C9953D]" : ""}`}
              >
                {item.label}
                {item.label === "Services" ? <span className="text-[11px]">⌄</span> : null}
                <span className={`absolute bottom-5 left-0 h-[2px] bg-[#C9953D] transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href="/contact"
            className="inline-flex h-[42px] shrink-0 items-center justify-center whitespace-nowrap rounded-[5px] bg-[#C9953D] px-[22px] text-[11px] font-bold uppercase tracking-[0.04em] text-white shadow-[0_14px_28px_rgba(201,149,61,0.26)] transition hover:bg-[#B9822F]"
          >
            REQUEST CONSULTATION <span className="ml-2">→</span>
          </Link>
          <button type="button" className="flex h-[42px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[6px] border border-[#C9953D]/35 px-[14px] text-[12px] font-bold text-[#061F3C]" aria-label="Select language">
            EN <span className="text-[#C9953D]">⌄</span>
          </button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded border border-[#C9953D]/35 text-[#061F3C] xl:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="h-0.5 w-5 bg-current shadow-[0_7px_0_current,0_-7px_0_current]" />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full border-t border-[#C9953D]/15 bg-white px-6 shadow-[0_18px_35px_rgba(6,31,60,0.12)] transition duration-200 xl:hidden ${mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <nav className="mx-auto flex max-w-[1200px] flex-col py-4 text-[13px] font-semibold text-[#061F3C]" aria-label="Mobile navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b border-[#061F3C]/8 py-3.5 ${isActive(item.href) ? "text-[#C9953D]" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[4px] bg-[#C9953D] px-5 text-[11px] font-bold tracking-[0.06em] text-white" onClick={() => setMobileOpen(false)}>
            REQUEST CONSULTATION <span className="ml-2">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
