"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/home/useReducedMotion";
import { aboutNarratives, type AboutNarrative } from "./aboutData";
import styles from "./AboutPage.module.css";

const NARRATIVE_DURATION = 3000;

function NarrativeCopy({ narrative, heading = false }: { narrative: AboutNarrative; heading?: boolean }) {
  const lines = narrative.headline.map((line, index) => (
    <span key={line} className={narrative.highlightedLines.includes(index) ? styles.heroAccent : undefined}>
      {line}
    </span>
  ));

  return (
    <>
      <p className={styles.heroEyebrow}><span aria-hidden="true" />{narrative.eyebrow}</p>
      {heading ? <h1>{lines}</h1> : <div className={styles.heroHeading}>{lines}</div>}
      <p className={styles.heroParagraph}>{narrative.paragraph}</p>
    </>
  );
}

export default function AboutHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const [documentPaused, setDocumentPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerStartedAt = useRef(0);
  const remainingTime = useRef(NARRATIVE_DURATION);
  const timerRunning = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    timerRunning.current = false;
  }, []);

  const changeNarrative = useCallback((nextIndex: number) => {
    if (previousRef.current) clearTimeout(previousRef.current);
    if (nextIndex !== activeIndex && !reducedMotion) {
      setPreviousIndex(activeIndex);
      previousRef.current = setTimeout(() => {
        setPreviousIndex(null);
        previousRef.current = null;
      }, 620);
    } else {
      setPreviousIndex(null);
    }
    setActiveIndex(nextIndex);
    setCycleKey((key) => key + 1);
  }, [activeIndex, reducedMotion]);

  const selectNarrative = useCallback((nextIndex: number) => {
    clearTimer();
    remainingTime.current = NARRATIVE_DURATION;
    changeNarrative(nextIndex);
  }, [changeNarrative, clearTimer]);

  useEffect(() => {
    const handleVisibility = () => setDocumentPaused(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      clearTimer();
      remainingTime.current = NARRATIVE_DURATION;
      return;
    }

    if (documentPaused) {
      if (timerRunning.current) {
        const elapsed = performance.now() - timerStartedAt.current;
        remainingTime.current = Math.max(80, remainingTime.current - elapsed);
        clearTimer();
      }
      return;
    }

    if (!timerRunning.current) {
      timerStartedAt.current = performance.now();
      timerRunning.current = true;
      timerRef.current = setTimeout(() => {
        timerRunning.current = false;
        timerRef.current = null;
        remainingTime.current = NARRATIVE_DURATION;
        changeNarrative((activeIndex + 1) % aboutNarratives.length);
      }, remainingTime.current);
    }
  }, [activeIndex, changeNarrative, clearTimer, cycleKey, documentPaused, reducedMotion]);

  useEffect(() => () => {
    clearTimer();
    if (previousRef.current) clearTimeout(previousRef.current);
  }, [clearTimer]);

  const activeNarrative = aboutNarratives[activeIndex];

  return (
    <section className={styles.hero} aria-label="About Interlink International">
      <div className={styles.heroImages} aria-hidden="true">
        {aboutNarratives.map((narrative, index) => (
          <div key={narrative.key} className={`${styles.heroImageLayer} ${index === activeIndex ? styles.heroImageActive : ""}`}>
            <Image
              src={narrative.image}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              fetchPriority={index === 0 ? "high" : "auto"}
              className={`${styles.heroImage} ${styles[`heroImage_${narrative.imageClass}`]}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopyStage}>
          {!reducedMotion && previousIndex !== null ? (
            <div className={`${styles.heroCopy} ${styles.heroCopyPrevious}`} aria-hidden="true">
              <NarrativeCopy narrative={aboutNarratives[previousIndex]} />
            </div>
          ) : null}
          <div
            key={`${activeNarrative.key}-${cycleKey}`}
            className={`${styles.heroCopy} ${styles.heroCopyCurrent}`}
          >
            <NarrativeCopy narrative={activeNarrative} heading />
          </div>
        </div>

        <div className={styles.heroActions}>
          <Link href="#purpose" className={styles.primaryAction}>DISCOVER OUR STORY <span aria-hidden="true">↓</span></Link>
          <Link href="#leadership" className={styles.secondaryAction}>MEET OUR LEADERSHIP</Link>
        </div>

        <div className={styles.selectors} role="group" aria-label="Select an About Interlink narrative">
          {aboutNarratives.map((narrative, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={narrative.key}
                type="button"
                aria-pressed={active}
                className={`${styles.selector} ${active ? styles.selectorActive : ""}`}
                onClick={() => selectNarrative(index)}
              >
                <span className={styles.selectorNumber}>{narrative.number}</span>
                <span className={styles.selectorTitle}>{narrative.selector}</span>
                <span className={styles.progressTrack} aria-hidden="true">
                  {active ? (
                    <span
                      key={cycleKey}
                      className={`${styles.progressLine} ${documentPaused ? styles.progressPaused : ""} ${reducedMotion ? styles.progressReduced : ""}`}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <span className={styles.heroBoundary} aria-hidden="true" />
    </section>
  );
}
