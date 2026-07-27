"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import collaborationImage from "@/public/herophotos/hero 022.png";
import growthImage from "@/public/herophotos/hero033.png";
import connectivityImage from "@/public/herophotos/heron011.png";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/components/home/useReducedMotion";

import { latestNewsChannels, mediaGallery, perspectiveTopics } from "./newsMediaData";
import styles from "./NewsMediaPage.module.css";

const galleryImages = {
  connectivity: connectivityImage,
  collaboration: collaborationImage,
  "oman-growth": growthImage,
} as const;

export default function NewsMediaContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealItems = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealAll = () => revealItems.forEach((item) => item.setAttribute("data-visible", "true"));

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      const fallbackId = window.setTimeout(revealAll, 0);
      return () => window.clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8%" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="news-media-heading">
        <Image
          src={growthImage}
          alt="Oman-centered international business perspective"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroInner} data-reveal data-visible="true">
          <p className={styles.eyebrow}><span aria-hidden="true" />NEWS &amp; MEDIA</p>
          <h1 id="news-media-heading">Clarity in Every Update.<br /><span>Perspective for What&apos;s Next.</span></h1>
          <p className={styles.heroCopy}>A dedicated source for verified Interlink announcements, corporate developments, media resources and perspectives from Oman to international markets.</p>
          <div className={styles.heroActions}>
            <Link href="#latest-news" className={styles.primaryAction}>VIEW LATEST NEWS <span aria-hidden="true">↓</span></Link>
            <Link href="#media-contact" className={styles.secondaryAction}>PRESS &amp; MEDIA CONTACT</Link>
          </div>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-heading">
        <div className={styles.sectionInner}>
          <div className={styles.featuredGrid}>
            <div className={styles.featuredCopy} data-reveal>
              <p className={styles.lightEyebrow}>FEATURED</p>
              <h2 id="featured-heading">A Verified Record of<br /><span>Interlink Developments.</span></h2>
              <p>This newsroom is being prepared as the official home for approved company news and media materials. Content will be published only after facts, dates and public wording have been confirmed.</p>
              <div className={styles.statusLine}><span aria-hidden="true" />EDITORIAL ARCHIVE IN PREPARATION</div>
            </div>
            <figure className={styles.featuredVisual} data-reveal>
              <Image src={collaborationImage} alt="Strategic business collaboration in Oman" fill sizes="(min-width: 900px) 52vw, 100vw" />
              <figcaption><span>01</span> OFFICIAL NEWSROOM</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="latest-news" className={styles.latest} aria-labelledby="latest-heading">
        <div className={styles.sectionInner}>
          <header className={styles.sectionIntro} data-reveal>
            <div><p className={styles.lightEyebrow}>LATEST NEWS</p><h2 id="latest-heading">Company Updates.<br /><span>Published with Care.</span></h2></div>
            <p>There are no approved public releases in the project archive yet. These editorial channels are ready for verified content when supplied.</p>
          </header>
          <div className={styles.newsGrid} data-reveal>
            {latestNewsChannels.map((channel) => (
              <article key={channel.number} className={styles.newsChannel}>
                <span className={styles.channelNumber}>{channel.number}</span>
                <p className={styles.channelType}>NEWS CHANNEL</p>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
                <div className={styles.channelStatus}><span aria-hidden="true" />{channel.status}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="gallery-heading">
        <div className={styles.sectionInner}>
          <header className={styles.galleryIntro} data-reveal>
            <p className={styles.darkEyebrow}>MEDIA GALLERY</p>
            <h2 id="gallery-heading">An Oman-Centered<br /><span>International Perspective.</span></h2>
            <p>Approved Interlink visual assets for corporate and editorial context.</p>
          </header>
          <div className={styles.galleryGrid} data-reveal>
            {mediaGallery.map((item, index) => (
              <figure key={item.key} className={styles.galleryItem}>
                <div className={styles.galleryImage}>
                  <Image
                    src={galleryImages[item.key]}
                    alt={item.title}
                    fill
                    sizes="(min-width: 900px) 34vw, (min-width: 600px) 50vw, 100vw"
                  />
                </div>
                <figcaption><span>0{index + 1}</span><div><strong>{item.title}</strong><small>{item.description}</small></div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.perspectives} aria-labelledby="perspectives-heading">
        <div className={styles.sectionInner}>
          <header className={styles.sectionIntro} data-reveal>
            <div><p className={styles.lightEyebrow}>PERSPECTIVES</p><h2 id="perspectives-heading">Topics Shaping<br /><span>Tomorrow&apos;s Opportunities.</span></h2></div>
            <p>Our perspective programme will share measured commentary only when authored material has been reviewed and approved for publication.</p>
          </header>
          <div className={styles.perspectiveGrid} data-reveal>
            {perspectiveTopics.map((topic) => (
              <article key={topic.index} className={styles.perspectiveItem}>
                <span>{topic.index}</span>
                <p>EDITORIAL FOCUS</p>
                <h3>{topic.title}</h3>
                <div aria-hidden="true" />
                <p>{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="media-contact" className={styles.mediaContact} aria-labelledby="media-contact-heading">
        <div className={styles.mediaContactInner} data-reveal>
          <div>
            <p className={styles.darkEyebrow}>PRESS &amp; MEDIA CONTACT</p>
            <h2 id="media-contact-heading">For Official Information<br /><span>and Media Enquiries.</span></h2>
          </div>
          <div className={styles.contactDetails}>
            <p>For verified company information, approved visual materials or an official response, contact Interlink International directly.</p>
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="news-cta-heading">
        <Image src={connectivityImage} alt="" fill sizes="100vw" className={styles.ctaImage} />
        <div className={styles.ctaOverlay} aria-hidden="true" />
        <div className={styles.ctaContent} data-reveal>
          <p className={styles.darkEyebrow}>START A CONVERSATION</p>
          <h2 id="news-cta-heading">Let&apos;s Discuss the Next<br /><span>Opportunity, Together.</span></h2>
          <p>Connect with Interlink International for a confidential discussion about your objectives, markets and opportunities.</p>
          <Link href="/contact">REQUEST A CONSULTATION <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}
