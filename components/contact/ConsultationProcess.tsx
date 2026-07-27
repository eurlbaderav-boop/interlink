"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/home/useReducedMotion";
import interlinkFullLogo from "@/public/herophotos/interlinklogofull.png";
import ContactIcon from "./ContactIcon";
import { contactContent } from "./contactContent";
import styles from "./ContactPage.module.css";

export default function ConsultationProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!startedRef.current && entry.intersectionRatio >= 0.25) {
        startedRef.current = true;
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.process} ${started || reducedMotion ? styles.processStarted : ""}`} aria-labelledby="process-heading">
      <div className={styles.sectionInner}>
        <div className={styles.processIntro}>
          <div>
            <p className={styles.lightEyebrow}>OUR CONSULTATION PROCESS</p>
            <h2 id="process-heading">A Structured Approach to<br /><span>Meaningful Partnerships.</span></h2>
          </div>
          <div className={styles.processIntroAside}>
            <Image
              src={interlinkFullLogo}
              alt="Interlink International"
              className={styles.processBrandLogo}
              sizes="(max-width: 767px) 160px, 210px"
            />
            <p>We follow a clear and confidential process to understand your objectives and provide relevant guidance.</p>
          </div>
        </div>

        <div className={styles.processSteps}>
          {contactContent.process.map((step, index) => (
            <article key={step.number} className={styles.processStep}>
              <div className={styles.processTopline}>
                <div className={styles.processIcon}><ContactIcon name={step.icon} /></div>
                <span>{step.number}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < contactContent.process.length - 1 ? <span className={styles.processConnector} aria-hidden="true"><i /></span> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
