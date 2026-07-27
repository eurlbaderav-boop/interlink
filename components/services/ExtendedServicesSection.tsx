"use client";

import { useState } from "react";

import ServiceIcon from "./ServiceIcon";
import { extendedServices } from "./servicesData";
import styles from "./ServicesPage.module.css";
import { useInViewOnce } from "./useInViewOnce";

export default function ExtendedServicesSection() {
  const { ref, visible } = useInViewOnce(0.2);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className={`${styles.extendedSection} ${visible ? styles.sectionVisible : ""}`} aria-labelledby="extended-heading">
      <div className={styles.pageInner}>
        <div className={styles.extendedIntro}>
          <div><p className={styles.darkEyebrow}>EXTENDED SERVICES</p><h2 id="extended-heading">Beyond Advisory.<br /><span>Towards Execution.</span></h2></div>
          <p>We work alongside our partners to translate strategy into action, build capabilities and support sustainable long-term impact.</p>
        </div>
        <div className={styles.extendedSurface} onMouseLeave={() => setHoveredIndex(null)}>
          <span className={styles.extendedRail} aria-hidden="true" />
          {extendedServices.map((service, index) => (
            <article
              key={service.title}
              className={`${styles.extendedItem} ${hoveredIndex === index ? styles.extendedItemActive : ""} ${hoveredIndex !== null && hoveredIndex !== index ? styles.extendedItemDimmed : ""}`}
              style={{ "--extended-index": index } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <div className={styles.extendedMarker}><ServiceIcon name={service.icon} /></div>
              <span className={styles.extendedIndex}>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
