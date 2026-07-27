"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/home/useReducedMotion";
import styles from "./ContactPage.module.css";

const HEADLINE_DURATION = 3000;
const TRANSITION_DURATION = 650;

const contactHeadlines = [
  ["Let’s Build", "What’s Next,", "Together."],
  ["Your Vision.", "Our Strategic", "Direction."],
  ["From Opportunity", "to Meaningful", "Growth."],
] as const;

function HeadlineLines({ index }: { index: number }) {
  return contactHeadlines[index].map((line, lineIndex) => (
    <span key={line} className={lineIndex === 2 ? styles.headlineAccent : undefined}>{line}</span>
  ));
}

export default function RotatingContactHeadline() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const rotationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAtRef = useRef(0);
  const remainingRef = useRef(HEADLINE_DURATION);

  useEffect(() => {
    const clearRotationTimer = () => {
      if (rotationTimerRef.current) clearTimeout(rotationTimerRef.current);
      rotationTimerRef.current = null;
    };

    const clearTransitionTimer = () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    };

    if (reducedMotion) {
      clearRotationTimer();
      clearTransitionTimer();
      remainingRef.current = HEADLINE_DURATION;
      return;
    }

    const scheduleRotation = (delay: number) => {
      clearRotationTimer();
      remainingRef.current = delay;
      startedAtRef.current = Date.now();
      rotationTimerRef.current = setTimeout(() => {
        const current = activeIndexRef.current;
        const next = (current + 1) % contactHeadlines.length;

        setPreviousIndex(current);
        activeIndexRef.current = next;
        setActiveIndex(next);
        remainingRef.current = HEADLINE_DURATION;

        clearTransitionTimer();
        transitionTimerRef.current = setTimeout(() => setPreviousIndex(null), TRANSITION_DURATION);
        scheduleRotation(HEADLINE_DURATION);
      }, delay);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rotationTimerRef.current) {
          remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current));
          clearRotationTimer();
        }
        return;
      }

      scheduleRotation(remainingRef.current || HEADLINE_DURATION);
    };

    scheduleRotation(remainingRef.current);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearRotationTimer();
      clearTransitionTimer();
    };
  }, [reducedMotion]);

  const visibleIndex = reducedMotion ? 0 : activeIndex;

  return (
    <div className={styles.headlineStage}>
      {!reducedMotion && previousIndex !== null ? (
        <div className={`${styles.contactHeadline} ${styles.headlinePrevious}`} aria-hidden="true">
          <HeadlineLines index={previousIndex} />
        </div>
      ) : null}
      <h1 id="contact-heading" key={visibleIndex} className={`${styles.contactHeadline} ${styles.headlineCurrent}`}>
        <HeadlineLines index={visibleIndex} />
      </h1>
    </div>
  );
}
