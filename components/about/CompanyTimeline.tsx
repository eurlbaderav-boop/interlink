"use client";

import type { CSSProperties } from "react";

import { companyMilestones } from "./aboutData";
import styles from "./AboutPage.module.css";
import { useAboutInView } from "./useAboutInView";

export default function CompanyTimeline() {
  const { ref, visible } = useAboutInView(0.22);

  return (
    <section ref={ref} id="journey" className={`${styles.timelineSection} ${visible ? styles.visible : ""}`} aria-labelledby="journey-heading">
      <div className={styles.timelineOman} aria-hidden="true" />
      <div className={styles.pageInner}>
        <header className={styles.timelineIntro}>
          <p className={styles.darkEyebrow}>OUR JOURNEY</p>
          <h2 id="journey-heading">Milestones of Progress.</h2>
        </header>

        {companyMilestones.length > 0 ? (
          <ol className={styles.timeline}>
            {companyMilestones.slice(0, 6).map((milestone, index) => (
              <li key={`${milestone.year}-${milestone.title}`} style={{ "--item-index": index } as CSSProperties}>
                <span className={styles.timelineNode} aria-hidden="true" />
                <time>{milestone.year}</time>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className={styles.timelineApproval}>
            <span className={styles.timelineNode} aria-hidden="true" />
            <div><small>CORPORATE HISTORY</small><h3>Verified milestones are being prepared for publication.</h3><p>Dates and historical claims will be added only after they have been confirmed against an approved company source.</p></div>
          </div>
        )}
      </div>
    </section>
  );
}
