"use client";

import type { CSSProperties } from "react";

import AboutIcon from "./AboutIcon";
import { institutionalProof } from "./aboutData";
import styles from "./AboutPage.module.css";
import { useAboutInView } from "./useAboutInView";

export default function CompanyProofStrip() {
  const { ref, visible } = useAboutInView(0.25);

  return (
    <section ref={ref} className={`${styles.proofSection} ${visible ? styles.visible : ""}`} aria-label="Interlink institutional strengths">
      <div className={styles.proofGrid}>
        {institutionalProof.map((item, index) => (
          <article key={item.title} className={styles.proofItem} style={{ "--item-index": index } as CSSProperties}>
            <span className={styles.proofIcon}><AboutIcon name={item.icon} /></span>
            <div><h2>{item.title}</h2><p>{item.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
