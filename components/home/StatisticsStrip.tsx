"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./StatisticsStrip.module.css";
import { useReducedMotion } from "./useReducedMotion";

type StatisticIcon = "globe" | "handshake" | "chart" | "people";

type Statistic = {
  value: number;
  label: string;
  accessibleLabel: string;
  icon: StatisticIcon;
  duration: number;
  delay: number;
};

const statistics: Statistic[] = [
  {
    value: 25,
    label: "Countries Connected",
    accessibleLabel: "25 plus countries connected",
    icon: "globe",
    duration: 2600,
    delay: 0,
  },
  {
    value: 150,
    label: "Global Partners",
    accessibleLabel: "150 plus global partners",
    icon: "handshake",
    duration: 3100,
    delay: 160,
  },
  {
    value: 300,
    label: "Successful Projects",
    accessibleLabel: "300 plus successful projects",
    icon: "chart",
    duration: 3500,
    delay: 320,
  },
  {
    value: 15,
    label: "Years of Excellence",
    accessibleLabel: "15 plus years of excellence",
    icon: "people",
    duration: 2400,
    delay: 480,
  },
];

function StatisticIcon({ name }: { name: StatisticIcon }) {
  const common = {
    className: styles.iconSvg,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.65,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21" />
        <path d="M12 3c-2.4 2.6-3.6 5.6-3.6 9s1.2 6.4 3.6 9" />
      </svg>
    );
  }

  if (name === "handshake") {
    return (
      <svg {...common}>
        <path d="m8 12 2.2-2.2a2.4 2.4 0 0 1 3.4 0L15 11.2" />
        <path d="m15 11.2 1.1-1.1a2.2 2.2 0 0 1 3.1 0L21 11.8" />
        <path d="m3 12 1.8-1.8a2.2 2.2 0 0 1 3.1 0L9 11.3" />
        <path d="m7 14 3.8 3.8a2 2 0 0 0 2.8 0l3.9-3.9" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 4-4 3 3 5-7" />
        <path d="M16 7h3v3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M3.5 20c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" />
      <path d="M11.5 20c.6-3.2 2.2-5 4.5-5s3.9 1.8 4.5 5" />
    </svg>
  );
}

export default function StatisticsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);
  const skipCountRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValues, setDisplayValues] = useState(() => statistics.map(() => 0));

  useEffect(() => {
    if (reducedMotion || hasStartedRef.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const start = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setHasStarted(true);
    };

    if (typeof IntersectionObserver === "undefined") {
      const fallbackId = setTimeout(() => {
        skipCountRef.current = true;
        setDisplayValues(statistics.map((statistic) => statistic.value));
        start();
      }, 0);

      return () => clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || entry.intersectionRatio < 0.4) return;
        start();
        observer.disconnect();
      },
      { threshold: [0, 0.4] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!hasStarted || reducedMotion || skipCountRef.current) return;

    const startedAt = performance.now();
    let cancelled = false;

    const update = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startedAt;
      let isComplete = true;
      const nextValues = statistics.map((statistic) => {
        const progress = Math.min(1, Math.max(0, (elapsed - statistic.delay) / statistic.duration));
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        if (progress < 1) isComplete = false;
        return Math.min(statistic.value, Math.round(statistic.value * easedProgress));
      });

      setDisplayValues(nextValues);

      if (!isComplete) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelled = true;
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [hasStarted, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${hasStarted ? styles.started : ""}`}
      aria-label="Interlink International statistics"
    >
      <div className={styles.topDivider} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.grid}>
          {statistics.map((statistic, index) => (
            <article
              key={statistic.label}
              className={styles.statistic}
              style={
                {
                  "--item-delay": `${statistic.delay}ms`,
                  "--number-width": `${statistic.value.toString().length * 0.66}em`,
                } as React.CSSProperties
              }
              aria-label={statistic.accessibleLabel}
            >
              <span className={styles.icon} aria-hidden="true">
                <StatisticIcon name={statistic.icon} />
              </span>
              <div className={styles.copy}>
                <span className={styles.number} aria-hidden="true">
                  <span className={styles.animatedValue}>{displayValues[index]}</span>
                  <span className={styles.finalValue}>{statistic.value}</span>
                  <span className={styles.plus}>+</span>
                </span>
                <p className={styles.label} aria-hidden="true">{statistic.label}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.bottomDivider} aria-hidden="true" />
    </section>
  );
}
