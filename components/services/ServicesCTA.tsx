import Image from "next/image";
import Link from "next/link";

import ctaImage from "@/public/herophotos/hero033.png";
import styles from "./ServicesPage.module.css";

export default function ServicesCTA() {
  return (
    <section className={styles.servicesCta} aria-labelledby="services-cta-heading">
      <Image src={ctaImage} alt="" fill sizes="100vw" className={styles.servicesCtaImage} />
      <div className={styles.servicesCtaOverlay} aria-hidden="true" />
      <div className={styles.servicesCtaInner}>
        <p>START A STRATEGIC CONVERSATION</p>
        <h2 id="services-cta-heading">Let’s Build the Next<br /><span>Opportunity, Together.</span></h2>
        <div><p>Tell us about your goals and we will connect you with the right opportunities, partners and markets.</p><Link href="/contact">REQUEST A CONSULTATION <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}
