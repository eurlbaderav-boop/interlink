import Image from "next/image";
import Link from "next/link";

import ctaImage from "@/public/herophotos/hero033.png";
import styles from "./AboutPage.module.css";

export default function AboutCTA() {
  return (
    <section className={styles.aboutCta} aria-labelledby="about-cta-heading">
      <Image src={ctaImage} alt="" fill sizes="100vw" className={styles.aboutCtaImage} />
      <div className={styles.aboutCtaOverlay} aria-hidden="true" />
      <div className={styles.aboutCtaInner}>
        <p>START A STRATEGIC CONVERSATION</p>
        <h2 id="about-cta-heading">Let’s Build the Next<br /><span>Opportunity, Together.</span></h2>
        <div><p>We are ready to connect, collaborate and create lasting value across borders.</p><Link href="/contact">REQUEST A CONSULTATION <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}
