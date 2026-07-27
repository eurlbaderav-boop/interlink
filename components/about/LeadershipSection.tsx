"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { leadershipProfiles } from "./aboutData";
import styles from "./AboutPage.module.css";
import { useAboutInView } from "./useAboutInView";

export default function LeadershipSection() {
  const { ref, visible } = useAboutInView(0.2);

  return (
    <section ref={ref} id="leadership" className={`${styles.leadershipSection} ${visible ? styles.visible : ""}`} aria-labelledby="leadership-heading">
      <div className={styles.pageInner}>
        <div className={styles.leadershipLayout}>
          <header className={styles.leadershipIntro}>
            <p className={styles.lightEyebrow}>LEADERSHIP</p>
            <h2 id="leadership-heading">Experienced Leadership.<br /><span>Local Insight. Global Perspective.</span></h2>
            <p>Our leadership combines local market understanding with international experience, strategic thinking and practical execution.</p>
          </header>

          {leadershipProfiles.length > 0 ? (
            <div className={styles.profileGrid}>
              {leadershipProfiles.slice(0, 3).map((profile, index) => (
                <article key={profile.name} className={styles.profile} style={{ "--item-index": index } as CSSProperties}>
                  <div className={styles.profileImage}><Image src={profile.image} alt={`Portrait of ${profile.name}`} fill sizes="(min-width: 900px) 24vw, 90vw" /></div>
                  <div className={styles.profileBody}><h3>{profile.name}</h3><p>{profile.role}</p><span>{profile.biography}</span>{profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label={`${profile.name} on LinkedIn`}>in</a> : null}</div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.approvalPanel}>
              <span>LEADERSHIP INFORMATION</span>
              <h3>Profiles available through direct introduction.</h3>
              <p>Approved leadership names, biographies and portraits have not yet been supplied for publication. We do not publish unverified executive information.</p>
              <Link href="/contact">REQUEST AN INTRODUCTION <span aria-hidden="true">→</span></Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
