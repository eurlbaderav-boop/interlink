"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import OmanNetworkScene, { type RegionName } from "./OmanNetworkScene";
import styles from "./GlobalNetworkSection.module.css";
import { useReducedMotion } from "./useReducedMotion";

type RegionPanel = {
  name: RegionName;
  title: string;
  description: string;
  tags: string[];
  revealDelay: number;
  mobileRevealDelay: number;
};

const regions: RegionPanel[] = [
  {
    name: "GCC",
    title: "Regional Access & Strategic Partnerships",
    description:
      "Deep market understanding and trusted relationships across Gulf markets, supporting investment, market entry and long-term commercial partnerships.",
    tags: ["Investment", "Market Entry", "Partnerships"],
    revealDelay: 3600,
    mobileRevealDelay: 2200,
  },
  {
    name: "ASIA",
    title: "Sourcing, Industry & Growth Markets",
    description:
      "Connections across major Asian manufacturing, technology and sourcing markets, helping businesses identify suppliers, opportunities and strategic partners.",
    tags: ["Sourcing", "Manufacturing", "Technology"],
    revealDelay: 3900,
    mobileRevealDelay: 2450,
  },
  {
    name: "EUROPE",
    title: "Capital, Expertise & International Trade",
    description:
      "Access to European business networks, specialist expertise and commercial relationships supporting investment, industrial cooperation and cross-border trade.",
    tags: ["Capital", "Expertise", "Trade"],
    revealDelay: 4200,
    mobileRevealDelay: 2700,
  },
  {
    name: "AFRICA",
    title: "Emerging Markets & Commercial Expansion",
    description:
      "Strategic access to growing African markets, regional trade corridors and partnership opportunities linking Oman with East Africa and beyond.",
    tags: ["Expansion", "Trade Corridors", "Partnerships"],
    revealDelay: 4500,
    mobileRevealDelay: 2950,
  },
];

export default function GlobalNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapStageRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const ambientIndexRef = useRef(0);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [started, setStarted] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [previewRegion, setPreviewRegion] = useState<RegionName | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);
  const [interactionPulse, setInteractionPulse] = useState<RegionName | null>(null);
  const [ambientPulse, setAmbientPulse] = useState<RegionName | null>(null);
  const [ambientArrival, setAmbientArrival] = useState<RegionName | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const reducedMotion = useReducedMotion();
  const interactionRegion = previewRegion ?? selectedRegion;
  const ambientCanRender = inViewport && pageVisible && !reducedMotion && !interactionRegion;
  const activeRegion = interactionRegion ?? (ambientCanRender ? ambientArrival : null);
  const routeFocusRegion = interactionRegion ?? (ambientCanRender ? ambientPulse : null);
  const travelingRegion = interactionPulse ?? (ambientCanRender ? ambientPulse : null);
  const animationStarted = started || reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    const mapStage = mapStageRef.current;
    if (!section || !mapStage) return;

    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setStarted(true);
    };

    const Observer = globalThis.IntersectionObserver as typeof IntersectionObserver | undefined;

    if (!Observer) {
      const fallbackTimer = window.setTimeout(() => {
        setInViewport(true);
        startAnimation();
      }, 0);
      return () => window.clearTimeout(fallbackTimer);
    }

    const viewportObserver = new Observer(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "8% 0px 8% 0px" },
    );

    const entranceObserver = new Observer(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.34) startAnimation();
      },
      { threshold: [0, 0.34] },
    );

    viewportObserver.observe(section);
    entranceObserver.observe(mapStage);

    // Covers direct hash navigation and observers delayed by browser restoration.
    const initialCheck = window.requestAnimationFrame(() => {
      const sectionRect = section.getBoundingClientRect();
      const stageRect = mapStage.getBoundingClientRect();
      const sectionVisible = sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;
      const visibleStageHeight = Math.max(
        0,
        Math.min(stageRect.bottom, window.innerHeight) - Math.max(stageRect.top, 0),
      );

      setInViewport(sectionVisible);
      if (
        stageRect.width > 0
        && stageRect.height > 0
        && visibleStageHeight >= Math.min(stageRect.height * 0.34, window.innerHeight * 0.34)
      ) {
        startAnimation();
      }
    });

    return () => {
      window.cancelAnimationFrame(initialCheck);
      viewportObserver.disconnect();
      entranceObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!animationStarted || reducedMotion) return;
    const delay = window.matchMedia("(max-width: 767px)").matches ? 5000 : 7000;
    const timer = setTimeout(() => setEntranceComplete(true), delay);
    return () => clearTimeout(timer);
  }, [animationStarted, reducedMotion]);

  useEffect(() => {
    if (!entranceComplete || !inViewport || !pageVisible || reducedMotion || interactionRegion) return;

    const order: RegionName[] = ["GCC", "ASIA", "EUROPE", "AFRICA"];
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const travelDuration = mobile ? 1450 : 2100;
    const responseDuration = mobile ? 450 : 620;
    const routePause = mobile ? 1700 : 1100;
    const cyclePause = mobile ? 6000 : 4000;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    let cancelled = false;

    const schedule = (callback: () => void, delay: number) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        if (!cancelled) callback();
      }, delay);
      timers.add(timer);
    };

    const playRoute = () => {
      const region = order[ambientIndexRef.current];
      setAmbientPulse(region);
      setAmbientArrival(null);
      setPulseKey((value) => value + 1);

      schedule(() => {
        setAmbientArrival(region);
        schedule(() => {
          setAmbientPulse(null);
          setAmbientArrival(null);
          const completedCycle = ambientIndexRef.current === order.length - 1;
          ambientIndexRef.current = (ambientIndexRef.current + 1) % order.length;
          schedule(playRoute, completedCycle ? cyclePause : routePause);
        }, responseDuration);
      }, travelDuration);
    };

    schedule(playRoute, 0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [entranceComplete, inViewport, interactionRegion, pageVisible, reducedMotion]);

  const stopInteractionPulse = useCallback(() => {
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = null;
    setInteractionPulse(null);
  }, []);

  const playInteractionPulse = useCallback(
    (region: RegionName) => {
      stopInteractionPulse();
      if (reducedMotion) return;
      setInteractionPulse(region);
      setPulseKey((value) => value + 1);
      const duration = window.matchMedia("(max-width: 767px)").matches ? 2050 : 2800;
      interactionTimerRef.current = setTimeout(() => {
        setInteractionPulse(null);
        interactionTimerRef.current = null;
      }, duration);
    },
    [reducedMotion, stopInteractionPulse],
  );

  useEffect(() => () => {
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
  }, []);

  const preview = useCallback((region: RegionName) => {
    setPreviewRegion(region);
    playInteractionPulse(region);
  }, [playInteractionPulse]);

  const clearPreview = useCallback(() => {
    setPreviewRegion(null);
    stopInteractionPulse();
  }, [stopInteractionPulse]);

  const select = useCallback((region: RegionName) => {
    setSelectedRegion((current) => (current === region ? null : region));
    playInteractionPulse(region);
  }, [playInteractionPulse]);

  return (
    <section
      ref={sectionRef}
      id="network"
      className={`${styles.section} ${animationStarted ? styles.started : ""}`}
      aria-labelledby="network-heading"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div className={styles.eyebrow}><span aria-hidden="true" />OUR INTERNATIONAL NETWORK<span aria-hidden="true" /></div>
          <h2 id="network-heading">
            <span className={styles.headingLine}>From Oman to</span>
            <span className={`${styles.headingLine} ${styles.headingAccent}`}>Global Markets.</span>
          </h2>
          <p>
            Interlink connects local market knowledge with trusted relationships across the GCC, Asia, Europe and
            Africa—supporting investment, trade and strategic expansion across borders.
          </p>
        </header>

        <div ref={mapStageRef} className={styles.mapStage}>
          <OmanNetworkScene
            started={animationStarted}
            activeRegion={activeRegion}
            routeFocusRegion={routeFocusRegion}
            pulseRegion={travelingRegion}
            pulseKey={pulseKey}
            onRegionEnter={preview}
            onRegionLeave={clearPreview}
            onRegionSelect={select}
          />
        </div>

        <div className={styles.regionTable} aria-label="Regional network overview">
          {regions.map((region, index) => {
            const active = activeRegion === region.name;
            return (
              <article
                key={region.name}
                className={`${styles.panel} ${active ? styles.panelActive : ""}`}
                style={{
                  "--panel-delay": `${region.revealDelay}ms`,
                  "--panel-delay-mobile": `${region.mobileRevealDelay}ms`,
                } as CSSProperties}
              >
                <button
                  type="button"
                  className={styles.panelButton}
                  aria-pressed={selectedRegion === region.name}
                  onMouseEnter={() => preview(region.name)}
                  onMouseLeave={clearPreview}
                  onFocus={() => preview(region.name)}
                  onBlur={clearPreview}
                  onClick={() => select(region.name)}
                >
                  <span className={styles.panelIndex}>0{index + 1}</span>
                  <span className={styles.panelRegion}>{region.name}</span>
                  <span className={styles.panelRule} aria-hidden="true" />
                  <span className={styles.panelTitle}>{region.title}</span>
                  <span className={styles.panelDescription}>{region.description}</span>
                  <span className={styles.tags} aria-label={`${region.name} focus areas`}>
                    {region.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
