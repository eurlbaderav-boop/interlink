"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/home/useReducedMotion";
import ServiceIcon from "./ServiceIcon";
import { services, type ServiceDefinition } from "./servicesData";
import styles from "./ServicesPage.module.css";

const SERVICE_DURATION = 3000;

function ServiceCopy({ service, heading = false }: { service: ServiceDefinition; heading?: boolean }) {
  const lines = service.headline.map((line, index) => <span key={line} className={index === 2 ? styles.heroGoldLine : undefined}>{line}</span>);
  return (
    <>
      <p className={styles.heroEyebrow}><span aria-hidden="true" />{service.eyebrow}</p>
      {heading ? <h1>{lines}</h1> : <div className={styles.heroHeading}>{lines}</div>}
      <p className={styles.heroParagraph}>{service.paragraph}</p>
    </>
  );
}

export default function ServicesHero({ initialIndex }: { initialIndex: number }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [cycleKey, setCycleKey] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [documentPaused, setDocumentPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const dockRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTransitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerStartedAt = useRef(0);
  const remainingTime = useRef(SERVICE_DURATION);
  const timerRunning = useRef(false);
  const pendingFlip = useRef(false);
  const ghosts = useRef(new Set<HTMLElement>());
  const animations = useRef(new Set<Animation>());
  const isPaused = hoverPaused || focusPaused || documentPaused;

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    timerRunning.current = false;
  }, []);

  const animateReturningCard = useCallback((dockIndex: number) => {
    const hero = heroRef.current;
    const focus = focusRef.current;
    const dock = dockRefs.current[dockIndex];
    if (!hero || !focus || !dock || reducedMotion || window.innerWidth <= 767) return;

    const heroRect = hero.getBoundingClientRect();
    const focusRect = focus.getBoundingClientRect();
    const dockRect = dock.getBoundingClientRect();
    const ghost = focus.cloneNode(true) as HTMLElement;
    ghost.removeAttribute("id");
    ghost.removeAttribute("role");
    ghost.setAttribute("aria-hidden", "true");
    ghost.classList.add(styles.focusGhost);
    Object.assign(ghost.style, {
      left: `${focusRect.left - heroRect.left}px`,
      top: `${focusRect.top - heroRect.top}px`,
      width: `${focusRect.width}px`,
      height: `${focusRect.height}px`,
    });
    hero.appendChild(ghost);
    ghosts.current.add(ghost);

    const animation = ghost.animate([
      { transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
      {
        transform: `translate3d(${dockRect.left - focusRect.left}px, ${dockRect.top - focusRect.top}px, 0) scale(${dockRect.width / focusRect.width}, ${dockRect.height / focusRect.height})`,
        opacity: 0.18,
      },
    ], { duration: 560, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
    animations.current.add(animation);
    animation.finished.finally(() => {
      animations.current.delete(animation);
      ghosts.current.delete(ghost);
      ghost.remove();
    }).catch(() => undefined);
  }, [reducedMotion]);

  const changeService = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex) {
      if (copyTransitionRef.current) clearTimeout(copyTransitionRef.current);
      copyTransitionRef.current = null;
      setPreviousIndex(null);
      remainingTime.current = SERVICE_DURATION;
      setCycleKey((key) => key + 1);
      return;
    }
    animateReturningCard(activeIndex);
    if (copyTransitionRef.current) clearTimeout(copyTransitionRef.current);
    setPreviousIndex(activeIndex);
    copyTransitionRef.current = setTimeout(() => setPreviousIndex(null), 650);
    pendingFlip.current = true;
    setActiveIndex(nextIndex);
    setCycleKey((key) => key + 1);
  }, [activeIndex, animateReturningCard]);

  const activateService = useCallback((nextIndex: number) => {
    clearTimer();
    remainingTime.current = SERVICE_DURATION;
    changeService(nextIndex);
  }, [changeService, clearTimer]);

  useLayoutEffect(() => {
    if (!pendingFlip.current) return;
    pendingFlip.current = false;
    const focus = focusRef.current;
    const dock = dockRefs.current[activeIndex];
    if (!focus || !dock || reducedMotion) return;

    if (window.innerWidth <= 767) {
      const animation = focus.animate([
        { opacity: 0, transform: "translate3d(0,8px,0)" },
        { opacity: 1, transform: "translate3d(0,0,0)" },
      ], { duration: 360, easing: "ease-out" });
      animations.current.add(animation);
      animation.finished.finally(() => animations.current.delete(animation)).catch(() => undefined);
      return;
    }

    const focusRect = focus.getBoundingClientRect();
    const dockRect = dock.getBoundingClientRect();
    const animation = focus.animate([
      {
        transformOrigin: "top left",
        transform: `translate3d(${dockRect.left - focusRect.left}px, ${dockRect.top - focusRect.top}px, 0) scale(${dockRect.width / focusRect.width}, ${dockRect.height / focusRect.height})`,
        opacity: 0.2,
      },
      { transformOrigin: "top left", transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
    ], { duration: 620, easing: "cubic-bezier(.2,.72,.35,1)" });
    animations.current.add(animation);
    animation.finished.finally(() => animations.current.delete(animation)).catch(() => undefined);
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentPaused(document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      clearTimer();
      remainingTime.current = SERVICE_DURATION;
      return;
    }
    if (isPaused) {
      if (timerRunning.current) {
        remainingTime.current = Math.max(80, remainingTime.current - (performance.now() - timerStartedAt.current));
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
        remainingTime.current = SERVICE_DURATION;
        changeService((activeIndex + 1) % services.length);
      }, remainingTime.current);
    }
  }, [activeIndex, changeService, clearTimer, cycleKey, isPaused, reducedMotion]);

  useEffect(() => () => {
    clearTimer();
    if (copyTransitionRef.current) clearTimeout(copyTransitionRef.current);
    animations.current.forEach((animation) => animation.cancel());
    ghosts.current.forEach((ghost) => ghost.remove());
    animations.current.clear();
    ghosts.current.clear();
  }, [clearTimer]);

  const activeService = services[activeIndex];

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-label="Interlink services"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).matches(":focus-visible")) setFocusPaused(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);
      }}
    >
      <div className={styles.heroImages} aria-hidden="true">
        {services.map((service, index) => (
          <div key={service.key} className={`${styles.heroImageLayer} ${index === activeIndex ? styles.heroImageActive : ""}`}>
            <Image
              src={service.image}
              alt=""
              fill
              sizes="100vw"
              preload
              className={`${styles.heroImage} ${styles[`heroImage_${service.imageClass}`]}`}
            />
          </div>
        ))}
      </div>
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopyColumn}>
          <div className={styles.heroCopyStage}>
            {!reducedMotion && previousIndex !== null ? (
              <div className={`${styles.heroCopy} ${styles.heroCopyPrevious}`} aria-hidden="true">
                <ServiceCopy service={services[previousIndex]} />
              </div>
            ) : null}
            <div key={`${activeService.key}-${cycleKey}`} className={`${styles.heroCopy} ${styles.heroCopyCurrent}`}>
              <ServiceCopy service={activeService} heading />
            </div>
          </div>

          <div className={styles.focusSlot}>
            <div
              ref={focusRef}
              id="service-focus-panel"
              role="tabpanel"
              aria-labelledby={`service-selector-${activeService.key}`}
              className={styles.focusCard}
            >
              <div className={styles.focusIdentity}>
                <span className={styles.focusIcon}><ServiceIcon name={activeService.icon} /></span>
                <div><small>{activeService.number} / FOCUS</small><h2>{activeService.title}</h2></div>
              </div>
              <p>{activeService.focusDescription}</p>
              <div className={styles.focusCapabilities}>
                {activeService.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
              </div>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.primaryAction}>DISCUSS AN OPPORTUNITY <span aria-hidden="true">→</span></Link>
            <a href="#core-services" className={styles.secondaryAction}>EXPLORE ALL SERVICES</a>
          </div>
        </div>

        <div className={styles.serviceDock} role="tablist" aria-label="Select a service">
          {services.map((service, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={service.key}
                ref={(node) => { dockRefs.current[index] = node; }}
                id={`service-selector-${service.key}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="service-focus-panel"
                className={`${styles.dockCard} ${active ? styles.dockCardActive : ""}`}
                onClick={() => activateService(index)}
              >
                <span className={styles.dockNumber}>{service.number}</span>
                <span className={styles.dockIcon}><ServiceIcon name={service.icon} /></span>
                <span className={styles.dockText}><strong>{service.title}</strong><small>{service.dockDescription}</small></span>
                <span className={styles.progressTrack} aria-hidden="true">
                  {active ? <span key={cycleKey} className={`${styles.progressLine} ${isPaused ? styles.progressPaused : ""} ${reducedMotion ? styles.progressReduced : ""}`} /> : null}
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
