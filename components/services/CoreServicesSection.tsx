"use client";

import Image from "next/image";
import Link from "next/link";

import ServiceIcon from "./ServiceIcon";
import { services } from "./servicesData";
import styles from "./ServicesPage.module.css";
import { useInViewOnce } from "./useInViewOnce";

export default function CoreServicesSection() {
  const { ref, visible } = useInViewOnce(0.16);

  return (
    <section ref={ref} id="core-services" className={`${styles.coreSection} ${visible ? styles.sectionVisible : ""}`} aria-labelledby="core-services-heading">
      <div className={styles.pageInner}>
        <div className={styles.coreIntro}>
          <div>
            <p className={styles.lightEyebrow}>WHAT WE DO</p>
            <h2 id="core-services-heading">Our Core Services</h2>
          </div>
          <p>Three connected capabilities designed to move opportunities from evaluation to execution.</p>
        </div>

        <div className={styles.servicePanels}>
          {services.map((service, panelIndex) => (
            <article key={service.key} id={service.panelId} className={styles.servicePanel} style={{ "--panel-index": panelIndex } as React.CSSProperties}>
              <div className={styles.panelImage}>
                <Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" className={`${styles.panelPhoto} ${styles[`panelPhoto_${service.imageClass}`]}`} />
                <span className={styles.panelNumber}>{service.number}</span>
              </div>
              <div className={styles.panelIcon}><ServiceIcon name={service.icon} /></div>
              <div className={styles.panelBody}>
                <h3>{service.title}</h3>
                <p>{service.panelDescription}</p>
                <ul>
                  {service.panelCapabilities.map((capability, index) => (
                    <li key={capability} style={{ "--capability-index": index } as React.CSSProperties}><span aria-hidden="true">✓</span>{capability}</li>
                  ))}
                </ul>
                <Link href={service.panelHref} className={styles.panelCta}>{service.panelCta}<span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
