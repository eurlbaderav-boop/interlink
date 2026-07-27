"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, TransitionEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";
import swissLogo from "@/public/herophotos/Suiss.png";
import apexLogo from "@/public/herophotos/apex.png";
import oilBridgeLogo from "@/public/herophotos/oilbridge.png";
import drilchemLogo from "@/public/herophotos/drilchemlogo.png";
import worldGateLogo from "@/public/herophotos/WGI.png";

import styles from "./InternationalPartnersSection.module.css";

const HOLD_DURATION = 3000;
const ENTRANCE_DELAY = 900;

type Partner = {
  name: string;
  logo: StaticImageData;
  className: string;
};

const partners: readonly Partner[] = [
  { name: "Swiss Join & Invest", logo: swissLogo, className: styles.swiss },
  { name: "Apex London", logo: apexLogo, className: styles.apex },
  { name: "OilBridge Trading", logo: oilBridgeLogo, className: styles.oilBridge },
  { name: "Drilchem Indonesia", logo: drilchemLogo, className: styles.drilchem },
  { name: "World Gate Investment", logo: worldGateLogo, className: styles.worldGate },
];

const rollingPartners = Array.from({ length: 3 }, (_, cycle) =>
  partners.map((partner) => ({ partner, cycle })),
).flat();

export default function InternationalPartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const entranceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);
  const [sequenceReady, setSequenceReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [trackIndex, setTrackIndex] = useState(partners.length);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [moving, setMoving] = useState(false);
  const reducedMotion = useReducedMotion();

  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const Observer = globalThis.IntersectionObserver as typeof IntersectionObserver | undefined;
    if (!Observer) {
      const fallbackTimer = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const observer = new Observer(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.22 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    entranceTimerRef.current = setTimeout(() => {
      setSequenceReady(true);
      entranceTimerRef.current = null;
    }, ENTRANCE_DELAY);
    return () => {
      if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
      entranceTimerRef.current = null;
    };
  }, [reducedMotion, visible]);

  useEffect(() => {
    clearHoldTimer();
    if (!sequenceReady || moving || reducedMotion || !pageVisible || activeIndex === null) return;

    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      setActiveIndex(null);
      setMoving(true);
      setTrackIndex((index) => index + 1);
    }, HOLD_DURATION);

    return clearHoldTimer;
  }, [activeIndex, clearHoldTimer, moving, pageVisible, reducedMotion, sequenceReady, trackIndex]);

  useEffect(() => () => {
    clearHoldTimer();
    if (entranceTimerRef.current) clearTimeout(entranceTimerRef.current);
  }, [clearHoldTimer]);

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || !moving) return;

    const nextPartner = trackIndex % partners.length;
    setMoving(false);
    setActiveIndex(nextPartner);

    if (trackIndex >= partners.length * 2) {
      // The centered item is visually identical at both indices, making this reset imperceptible.
      setTrackIndex(partners.length);
    }
  };

  const trackStyle = {
    "--track-offset": `calc(-${trackIndex} * var(--partner-slot) - var(--partner-slot) / 2)`,
  } as CSSProperties;

  return (
    <section ref={sectionRef} className={`${styles.section} ${visible ? styles.visible : ""}`} aria-labelledby="partners-heading">
      <div className={styles.inner}>
        <header className={styles.intro}>
          <span className={styles.introRule} aria-hidden="true" />
          <h2 id="partners-heading">Our International<br /><span>Partners.</span></h2>
          <p>We collaborate with selected international partners across investment, trade and specialist industrial sectors to expand opportunity, strengthen execution and deliver long-term value.</p>
        </header>

        <div className={styles.showcase} aria-label="Interlink International partners">
          <span className={styles.centerZone} aria-hidden="true" />
          <div className={styles.viewport}>
            <div
              className={`${styles.track} ${moving ? styles.trackMoving : ""}`}
              style={trackStyle}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {rollingPartners.map(({ partner, cycle }, itemIndex) => {
                const active = !moving && itemIndex === trackIndex;
                const accessible = cycle === 1;
                return (
                  <figure
                    key={`${cycle}-${partner.name}`}
                    className={`${styles.partner} ${active ? styles.partnerActive : ""}`}
                    aria-hidden={accessible ? undefined : true}
                  >
                    <div className={styles.logoStage}>
                      <Image
                        src={partner.logo}
                        alt={accessible ? `${partner.name} logo` : ""}
                        sizes="(min-width: 1000px) 230px, (min-width: 600px) 210px, 180px"
                        className={`${styles.logo} ${partner.className}`}
                      />
                    </div>
                    <figcaption>{partner.name}</figcaption>
                    <span className={styles.partnerAccent} aria-hidden="true" />
                  </figure>
                );
              })}
            </div>
          </div>

          <div className={styles.staticPartners} aria-label="International partner logos">
            {partners.map((partner, index) => (
              <figure key={partner.name} className={`${styles.partner} ${index === 0 ? styles.partnerActive : ""}`}>
                <div className={styles.logoStage}>
                  <Image src={partner.logo} alt={`${partner.name} logo`} className={`${styles.logo} ${partner.className}`} />
                </div>
                <figcaption>{partner.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
