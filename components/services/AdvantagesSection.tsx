"use client";

import ServiceIcon from "./ServiceIcon";
import { advantages } from "./servicesData";
import styles from "./ServicesPage.module.css";
import { useInViewOnce } from "./useInViewOnce";

export default function AdvantagesSection() {
  const { ref, visible } = useInViewOnce(0.18);
  return (
    <section ref={ref} className={`${styles.advantagesSection} ${visible ? styles.sectionVisible : ""}`} aria-labelledby="advantages-heading">
      <div className={styles.pageInner}>
        <div className={styles.advantagesIntro}>
          <p className={styles.lightEyebrow}>WHY CHOOSE INTERLINK</p>
          <h2 id="advantages-heading">Our Advantage</h2>
        </div>
        <div className={styles.advantagesGrid}>
          {advantages.map((advantage, index) => (
            <article key={advantage.title} className={styles.advantageItem} style={{ "--advantage-index": index } as React.CSSProperties}>
              <div className={styles.advantageIcon}><ServiceIcon name={advantage.icon} /></div>
              <span className={styles.advantageNumber}>0{index + 1}</span>
              <h3>{advantage.title}</h3>
              <small>{advantage.descriptor}</small>
              <p>{advantage.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
