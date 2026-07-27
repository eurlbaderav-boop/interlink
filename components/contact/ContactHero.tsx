import Image from "next/image";

import interlinkWhiteLogo from "@/public/herophotos/interlinkwhite.png";
import type { AreaOfInterest } from "@/config/site";
import ContactIcon from "./ContactIcon";
import ConsultationForm from "./ConsultationForm";
import RotatingContactHeadline from "./RotatingContactHeadline";
import { contactContent } from "./contactContent";
import styles from "./ContactPage.module.css";

export default function ContactHero({ initialInterest }: { initialInterest?: AreaOfInterest }) {
  return (
    <section className={styles.hero} aria-labelledby="contact-heading">
      <svg className={styles.heroNetwork} viewBox="0 0 900 650" aria-hidden="true">
        <defs>
          <linearGradient id="contact-route" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#e1b766" stopOpacity=".75" />
            <stop offset="1" stopColor="#9b8057" stopOpacity=".18" />
          </linearGradient>
        </defs>
        <image href="/om.svg" x="370" y="210" width="210" height="210" preserveAspectRatio="xMidYMid meet" opacity=".23" />
        <g fill="none" stroke="url(#contact-route)" strokeWidth="1">
          <path className={styles.mapRoute} d="M520 300C420 235 300 210 190 235" />
          <path className={styles.mapRoute} d="M520 300C430 335 318 388 205 430" />
          <path className={styles.mapRoute} d="M520 300C605 230 680 176 785 158" />
        </g>
        <g fill="#d6a957">
          <circle cx="520" cy="300" r="3.5" /><circle cx="190" cy="235" r="2.5" />
          <circle cx="205" cy="430" r="2.5" /><circle cx="785" cy="158" r="2.5" />
          <circle className={styles.mapPulse} cx="520" cy="300" r="10" fill="none" stroke="#d6a957" />
        </g>
      </svg>

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <Image
            src={interlinkWhiteLogo}
            alt="Interlink International"
            className={styles.heroBrandLogo}
            sizes="(max-width: 767px) 170px, 205px"
            preload
          />
          <div className={styles.heroEyebrow}><span aria-hidden="true" />REQUEST A CONSULTATION</div>
          <RotatingContactHeadline />
          <p>Tell us about your goals, challenges or opportunities.<br />Our team will get back to you for a confidential and meaningful discussion.</p>

          <div className={styles.benefits}>
            {contactContent.benefits.map((benefit) => (
              <article key={benefit.title} className={styles.benefit}>
                <ContactIcon name={benefit.icon} />
                <span className={styles.benefitRule} aria-hidden="true" />
                <h2>{benefit.title}</h2>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>

        <ConsultationForm initialInterest={initialInterest} />
      </div>
    </section>
  );
}
