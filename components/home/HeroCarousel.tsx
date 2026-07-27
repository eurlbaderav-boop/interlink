"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import heroOne from "@/public/herophotos/heron011.png";
import heroTwo from "@/public/herophotos/hero 022.png";
import heroThree from "@/public/herophotos/hero033.png";

import styles from "./HeroCarousel.module.css";
import { useReducedMotion } from "./useReducedMotion";

const SLIDE_DURATION = 3000;

type HeroSlide = {
  image: StaticImageData;
  eyebrow: string;
  headline: [string, string];
  paragraph: string;
  chip: string;
  imageClassName: string;
};

const heroSlides: HeroSlide[] = [
  {
    image: heroOne,
    eyebrow: "STRATEGIC INVESTMENT",
    headline: ["Investing in Opportunity.", "Building Lasting Value."],
    paragraph:
      "We identify and structure high-potential opportunities across Oman and international markets, connecting capital with sectors positioned for sustainable growth.",
    chip: "INVESTMENT",
    imageClassName: styles.imageOne,
  },
  {
    image: heroTwo,
    eyebrow: "GLOBAL TRADE",
    headline: ["Connecting Markets.", "Moving Business Forward."],
    paragraph:
      "From strategic sourcing to market access and commercial coordination, we create reliable pathways for goods, suppliers and businesses across borders.",
    chip: "IMPORT & EXPORT",
    imageClassName: styles.imageTwo,
  },
  {
    image: heroThree,
    eyebrow: "MARKET INTELLIGENCE",
    headline: ["Strategic Insight.", "Confident Decisions."],
    paragraph:
      "We help organizations understand markets, identify trusted partners and develop clear strategies for entry, expansion and long-term success.",
    chip: "STRATEGIC CONSULTANCY",
    imageClassName: styles.imageThree,
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [documentPaused, setDocumentPaused] = useState(false);
  const [imageStatus, setImageStatus] = useState<Array<"loading" | "ready" | "error">>(
    () => heroSlides.map(() => "loading"),
  );
  const reducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerStartedAt = useRef(0);
  const remainingTime = useRef(SLIDE_DURATION);
  const timerRunning = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    timerRunning.current = false;
  }, []);

  const activateSlide = useCallback(
    (index: number) => {
      clearTimer();
      remainingTime.current = SLIDE_DURATION;
      setActiveIndex(index);
      setCycleKey((value) => value + 1);
    },
    [clearTimer],
  );

  useEffect(() => {
    const onVisibilityChange = () => setDocumentPaused(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      clearTimer();
      remainingTime.current = SLIDE_DURATION;
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
        remainingTime.current = SLIDE_DURATION;
        setActiveIndex((index) => (index + 1) % heroSlides.length);
        setCycleKey((value) => value + 1);
      }, remainingTime.current);
    }
  }, [activeIndex, clearTimer, cycleKey, documentPaused, reducedMotion]);

  useEffect(() => clearTimer, [clearTimer]);

  const activeSlide = heroSlides[activeIndex];
  const firstReadyIndex = imageStatus.findIndex((status) => status === "ready");
  const fallbackImageIndex = firstReadyIndex >= 0 ? firstReadyIndex : 0;
  const visualIndex = activeIndex === 0 && imageStatus[0] === "loading"
    ? 0
    : imageStatus[activeIndex] === "ready"
      ? activeIndex
      : fallbackImageIndex;

  const updateImageStatus = (index: number, status: "ready" | "error") => {
    setImageStatus((current) =>
      current[index] === status
        ? current
        : current.map((value, itemIndex) => (itemIndex === index ? status : value)),
    );
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Interlink capabilities"
    >
      <div className={styles.images} aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div key={slide.chip} className={`${styles.imageLayer} ${index === visualIndex ? styles.imageActive : ""}`}>
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              fetchPriority={index === 0 ? "high" : "auto"}
              onLoad={() => updateImageStatus(index, "ready")}
              onError={() => updateImageStatus(index, "error")}
              className={`${styles.image} ${slide.imageClassName}`}
            />
          </div>
        ))}
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copyColumn}>
          <div key={`${activeIndex}-${cycleKey}`} className={styles.copy} aria-live="polite" aria-atomic="true">
            <div className={styles.eyebrow}>
              <span aria-hidden="true" />
              {activeSlide.eyebrow}
            </div>
            <h1>
              <span>{activeSlide.headline[0]}</span>
              <span className={styles.goldLine}>{activeSlide.headline[1]}</span>
            </h1>
            <p>{activeSlide.paragraph}</p>
          </div>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryAction}>
              DISCUSS AN OPPORTUNITY <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services" className={styles.secondaryAction}>
              EXPLORE OUR CAPABILITIES
            </Link>
          </div>

          <div className={styles.chips} aria-label="Select hero topic">
            {heroSlides.map((slide, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={slide.chip}
                  type="button"
                  className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                  aria-pressed={active}
                  onClick={() => activateSlide(index)}
                >
                  <span className={styles.chipNumber}>0{index + 1}</span>
                  <span className={styles.chipTitle}>{slide.chip}</span>
                  <span className={styles.progressTrack} aria-hidden="true">
                    {active ? (
                      <span
                        key={cycleKey}
                        className={`${styles.progress} ${documentPaused ? styles.progressPaused : ""} ${reducedMotion ? styles.progressReduced : ""}`}
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.boundary} aria-hidden="true" />
    </section>
  );
}
