"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import AboutIcon from "./AboutIcon";
import { aboutValues } from "./aboutData";
import styles from "./AboutPage.module.css";
import { useAboutInView } from "./useAboutInView";

export default function PurposeValuesSection() {
  const { ref, visible } = useAboutInView(0.2);

  return (
    <section ref={ref} id="purpose" className={`${styles.purposeSection} ${visible ? styles.visible : ""}`} aria-labelledby="purpose-heading">
      <div className={styles.pageInner}>
        <div className={styles.purposeLayout}>
          <div className={styles.purposeCopy}>
            <p className={styles.lightEyebrow}>OUR PURPOSE</p>
            <h2 id="purpose-heading">Empowering Growth.<br /><span>Enabling Impact.</span></h2>
            <span className={styles.bronzeRule} aria-hidden="true" />
            <p>We connect opportunities with expertise, businesses with markets and ideas with practical execution—helping our partners move forward with confidence and create lasting value.</p>
            <Link href="#journey">OUR STORY <span aria-hidden="true">→</span></Link>
          </div>

          <div id="values" className={styles.valuesGrid} aria-label="Interlink values">
            {aboutValues.map((value, index) => (
              <article key={value.title} className={styles.valueItem} style={{ "--item-index": index } as CSSProperties}>
                <span className={styles.valueIcon}><AboutIcon name={value.icon} /></span>
                <span className={styles.valueIndex}>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
