import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import DrilchemMotion from "./DrilchemMotion";
import styles from "./DrilchemPage.module.css";

const values = [
  {
    title: "Product Technology",
    copy: "Specialised fibre-based technologies developed around the challenge of fluid loss.",
  },
  {
    title: "Operational Solutions",
    copy: "A solutions-led approach designed to support time, cost and well productivity objectives.",
  },
  {
    title: "Technical Expertise",
    copy: "A team focused on difficult drilling challenges and practical application requirements.",
  },
  {
    title: "Custom Applications",
    copy: "Products can be designed and manufactured around individual drilling applications.",
  },
  {
    title: "Health & Safety",
    copy: "Health and safety remain integral to the way solutions are considered and delivered.",
  },
] as const;

const products: readonly { name: string; src: string; href?: string }[] = [
  { name: "FRACSEAL®", src: "/herophotos/FRACSEAL.png", href: "/our-network/fracseal" },
  { name: "DRIL-EZY®", src: "/herophotos/DRILEZY.png", href: "/our-network/dril-ezy" },
  { name: "STOPLOSS®", src: "/herophotos/STOPLOS.png", href: "/our-network/stoploss" },
  { name: "SOLU-SEAL®", src: "/herophotos/SOLU-SEAL.png", href: "/our-network/solu-seal" },
  { name: "QUICKSEAL®", src: "/herophotos/QUICKSEAL.png", href: "/our-network/quickseal" },
] as const;

export default function DrilchemPage() {
  return (
    <div className={styles.page}>
      <DrilchemMotion />

      <section className={styles.hero} aria-labelledby="drilchem-title">
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          data-hero-video
        >
          <source
            src="/herophotos/PT OBM Drilchem Company Profile - Caffeine Production (1080p, h264).mp4"
            type="video/mp4"
          />
        </video>
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={`${styles.inner} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Interlink International × Drilchem</p>
            <h1 id="drilchem-title" className={`${styles.display}`}>
              <span>Engineered</span>
              <span>to stop</span>
              <span>fluid loss.</span>
            </h1>
            <p className={styles.heroDescription}>
              DRILCHEM develops specialised fibre-based technologies designed to prevent fluid loss during drilling operations—bringing focused product innovation to demanding well environments.
            </p>
          </div>

          <div className={styles.heroMark} aria-label="DRILCHEM">
            <Image
              src="/herophotos/drilchemlogo.png"
              alt="DRILCHEM logo"
              width={500}
              height={163}
              className={styles.heroLogo}
              priority
            />
          </div>

          <div className={styles.heroProductSystem} aria-label="DRILCHEM product system">
            <p className={styles.heroProductLabel}>DRILCHEM PRODUCT SYSTEM</p>
            <div className={styles.heroProductLogos}>
              {products.map((product, index) => (
                <figure
                  key={product.name}
                  className={styles.heroProduct}
                  data-reveal
                  style={{ "--item-index": index } as CSSProperties}
                >
                  {product.href ? (
                    <Link
                      href={product.href}
                      className={styles.heroProductLink}
                      aria-label={`View ${product.name} product details`}
                    >
                      <Image
                        src={product.src}
                        alt={`${product.name} product logo`}
                        width={566}
                        height={137}
                        className={styles.heroProductLogo}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={product.src}
                      alt={`${product.name} product logo`}
                      width={566}
                      height={137}
                      className={styles.heroProductLogo}
                    />
                  )}
                </figure>
              ))}
            </div>
          </div>
        </div>
        <p className={styles.heroScroll} aria-hidden="true"><span />SCROLL TO EXPLORE</p>
      </section>

      <section className={styles.ecosystem} aria-labelledby="ecosystem-title">
        <div className={styles.inner}>
          <div className={styles.ecosystemIntro}>
            <div data-reveal>
              <p className={styles.sectionIndex}>Product System / 01</p>
              <h2 id="ecosystem-title" className={styles.display}>A specialised<br /><span>product ecosystem.</span></h2>
            </div>
            <p data-reveal>DRILCHEM concentrates on solutions that stop fluid loss, alongside products custom-designed for individual drilling applications.</p>
          </div>
        </div>
      </section>

      <section className={styles.value} aria-labelledby="value-title">
        <div className={styles.inner}>
          <div className={styles.valueHeader} data-reveal>
            <div>
              <p className={styles.eyebrow}>Solution Value / 02</p>
              <h2 id="value-title" className={styles.display}>One connected<br />technical system.</h2>
            </div>
            <p>From product development through customised application, DRILCHEM brings technology and technical thinking together around customer needs.</p>
          </div>
          <ol className={styles.milestones} data-reveal>
            {values.map((item, index) => (
              <li key={item.title} style={{ "--item-index": index } as CSSProperties}>
                <small>0{index + 1}</small>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.custom} aria-labelledby="custom-title">
        <div className={styles.customLines} aria-hidden="true">
          <svg viewBox="0 0 1440 720" preserveAspectRatio="none">
            <path d="M790 -20 C835 105 800 175 900 252 S1052 359 1018 476 1090 641 1230 745" fill="none" stroke="rgba(62,128,173,.45)" />
            <path d="M860 -20 C890 109 862 188 952 258 S1110 370 1073 484 1148 642 1304 745" fill="none" stroke="rgba(225,183,102,.28)" />
            <path d="M930 -20 C957 118 920 198 1015 273 S1172 378 1133 497 1215 660 1385 745" fill="none" stroke="rgba(255,255,255,.1)" />
            <path d="M764 364 H1435" stroke="rgba(255,255,255,.08)" strokeDasharray="2 10" />
            <circle cx="1019" cy="364" r="7" fill="#061d35" stroke="#d2a657" />
          </svg>
        </div>
        <div className={styles.inner}>
          <div className={styles.customContent} data-reveal>
            <p className={styles.eyebrow}>Custom Engineering / 03</p>
            <h2 id="custom-title" className={styles.display}>When standard<br /><span>isn’t enough.</span></h2>
            <p className={styles.customCopy}>DRILCHEM does more than supply an established range. The team custom-designs and manufactures products for individual applications, developing a response around the specific fluid-loss challenge at hand.</p>
            <p className={styles.motto}>“No problem is too difficult for our team.”</p>
          </div>
        </div>
      </section>

      <section className={styles.network} aria-labelledby="network-title">
        <div className={`${styles.inner} ${styles.networkLayout}`}>
          <div data-reveal>
            <p className={styles.sectionIndex}>Interlink Network / 04</p>
            <h2 id="network-title" className={styles.display}>Global expertise.<br />Connected through<br /><span>Interlink.</span></h2>
            <p className={styles.networkCopy}>DRILCHEM is presented within Interlink International’s network of specialised international partners, connecting focused product technology and application expertise with customer requirements.</p>
          </div>
          <div className={styles.identityLockup} data-reveal aria-label="Interlink International and DRILCHEM">
            <p className={styles.interlinkWord}>INTERLINK<small>INTERNATIONAL</small></p>
            <span className={styles.identityTimes}>×</span>
            <Image
              src="/herophotos/drilchemlogo.png"
              alt="DRILCHEM"
              width={500}
              height={163}
              className={styles.identityLogo}
            />
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={`${styles.inner} ${styles.ctaLayout}`} data-reveal>
          <div>
            <p className={styles.eyebrow}>Start a conversation</p>
            <h2 id="cta-title" className={styles.display}>Need a specialised<br />drilling solution?</h2>
            <p className={styles.ctaCopy}>Connect with Interlink International to discuss DRILCHEM solutions and application requirements.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact?interest=technical-product" className={styles.primaryButton}>REQUEST A CONSULTATION&nbsp; →</Link>
            <Link href="/contact" className={styles.secondaryButton}>CONTACT INTERLINK</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
