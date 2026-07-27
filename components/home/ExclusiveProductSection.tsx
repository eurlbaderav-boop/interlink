"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import drilchemLogo from "@/public/herophotos/drilchemlogo.png";
import stoplossProductImage from "@/public/herophotos/stoploss.png";

import styles from "./ExclusiveProductSection.module.css";
import { useReducedMotion } from "./useReducedMotion";

const productContent = {
  partnerPreface: {
    title: ["One of Our Exclusive Products", "From an Indonesian Partner"],
    paragraph:
      "We proudly present STOPLOSS® as one of our exclusive specialist products, delivered through our partnership with an Indonesian industry partner and introduced to support demanding technical and operational requirements.",
    logoAlt: "Drilchem",
  },
  exclusiveLabel: "EXCLUSIVE PRODUCT",
  name: "STOPLOSS®",
  headline: ["Advanced Control for Severe", "Circulation Losses."],
  introduction:
    "STOPLOSS® is a reactive lost-circulation material system designed to address severe-to-total circulation losses in highly porous, fractured and vugular formations.",
  supporting:
    "Its proprietary single-sack blend combines graded sealing particles in a practical formulation developed to support efficient placement, reliable sealing and simplified field deployment.",
  video: {
    src: "/herophotos/fracseal-stoploss.mp4",
    poster: "/herophotos/fracseal-stoploss-poster.png",
    duration: "08:15",
  },
  productVisual: {
    image: stoplossProductImage,
    alt: "STOPLOSS lost-circulation material product packaging",
    label: "PHYSICAL PRODUCT",
    title: "Single-Sack Field Format",
    detail: "25 lb / 11.34 kg packaging",
  },
  actions: [
    { label: "REQUEST PRODUCT INFORMATION", href: "/contact?interest=stoploss", primary: true },
    { label: "DISCUSS A TECHNICAL REQUIREMENT", href: "/contact?interest=technical-product", primary: false },
  ],
  capabilities: [
    {
      label: "APPLICATION",
      title: "Severe-to-Total Loss Control",
      description:
        "Developed for demanding circulation-loss situations where conventional approaches may require larger treatment volumes.",
    },
    {
      label: "FORMULATION",
      title: "Single-Sack Sealing System",
      description:
        "A proprietary blend of sized and shaped materials designed to simplify preparation and field deployment.",
    },
    {
      label: "FORMATION TYPE",
      title: "Porous, Fractured & Vugular Zones",
      description:
        "Designed for challenging formations where circulation losses can be difficult to control.",
    },
    {
      label: "DEPLOYMENT",
      title: "Practical Field Handling",
      description:
        "Packaged for efficient storage, transportation and use in operational environments.",
    },
  ],
  metadata: ["Reactive LCM system", "Multiple drilling-fluid compatibility", "25 lb / 11.34 kg packaging"],
} as const;

function ProductVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setHasStarted(true);
    } catch {
      setHasStarted(false);
    }
  };

  const resetPlayback = () => {
    const video = videoRef.current;
    if (video) video.currentTime = 0;
    setHasStarted(false);
  };

  return (
    <div className={styles.videoShell}>
      <div className={styles.videoMeta}>
        <div className={styles.videoIdentity}>
          <span className={styles.videoIndex}>01</span>
          <i aria-hidden="true" />
          <span className={styles.videoTitle}>
            <strong>STOPLOSS®</strong>
            <small>Product presentation</small>
          </span>
        </div>
        <span className={styles.videoDuration}><small>DURATION</small>{productContent.video.duration}</span>
      </div>
      <div className={styles.videoFrame}>
        <video
          ref={videoRef}
          className={styles.video}
          src={productContent.video.src}
          poster={productContent.video.poster}
          preload="metadata"
          playsInline
          controls={hasStarted}
          title="STOPLOSS product presentation"
          onPlay={() => setHasStarted(true)}
          onEnded={resetPlayback}
        />
        <button
          type="button"
          className={`${styles.playOverlay} ${hasStarted ? styles.playOverlayHidden : ""}`}
          onClick={startPlayback}
          aria-label="Play STOPLOSS product presentation"
          aria-hidden={hasStarted}
          tabIndex={hasStarted ? -1 : 0}
          disabled={hasStarted}
        >
          <span className={styles.playControl} aria-hidden="true"><i /></span>
          <span className={styles.playLabel}>Watch Product Presentation</span>
        </button>
      </div>
      <div className={styles.videoFooter}>
        <span>Specialist loss-circulation solution</span>
        <i aria-hidden="true" />
        <span>Technical film</span>
      </div>
    </div>
  );
}

function ProductVisual() {
  const product = productContent.productVisual;

  return (
    <figure className={styles.productVisual}>
      <div className={styles.productImageStage}>
        <Image
          src={product.image}
          alt={product.alt}
          sizes="(max-width: 767px) 116px, 132px"
          className={styles.productImage}
        />
        <span aria-hidden="true" />
      </div>
      <figcaption>
        <span className={styles.productVisualLabel}>{product.label}</span>
        <strong>{product.title}</strong>
        <span>{product.detail}</span>
      </figcaption>
      <span className={styles.productVisualRule} aria-hidden="true" />
    </figure>
  );
}

function ProductActions() {
  return (
    <div className={styles.actions}>
      {productContent.actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className={action.primary ? styles.primaryAction : styles.secondaryAction}
        >
          {action.label}{action.primary ? <span aria-hidden="true">→</span> : null}
        </Link>
      ))}
    </div>
  );
}

function ProductCapabilities() {
  return (
    <div className={styles.capabilityRail} aria-label="STOPLOSS technical capabilities">
      {productContent.capabilities.map((capability, index) => (
        <article key={capability.label} className={styles.capability} tabIndex={0}>
          <div className={styles.capabilityTopline}>
            <span>0{index + 1}</span>
            <span>{capability.label}</span>
          </div>
          <span className={styles.capabilityMarker} aria-hidden="true" />
          <h3>{capability.title}</h3>
          <p>{capability.description}</p>
        </article>
      ))}
    </div>
  );
}

export default function ExclusiveProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();
  const visible = started || reducedMotion;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!startedRef.current && entry.intersectionRatio >= 0.3) {
          startedRef.current = true;
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stoploss"
      className={`${styles.section} ${visible ? styles.started : ""}`}
      aria-labelledby="stoploss-heading"
    >
      <svg className={styles.particleMotif} viewBox="0 0 500 500" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M95 115 170 82l68 78 86-43 71 73M170 82l-8 118 76-40 22 106 64-149M162 200l-54 92 102 51 50-77 101 45" />
        </g>
        <g fill="currentColor">
          <circle cx="95" cy="115" r="9" /><circle cx="170" cy="82" r="5" />
          <circle cx="238" cy="160" r="12" /><circle cx="324" cy="117" r="7" />
          <circle cx="395" cy="190" r="10" /><circle cx="162" cy="200" r="6" />
          <circle cx="108" cy="292" r="11" /><circle cx="210" cy="343" r="5" />
          <circle cx="260" cy="266" r="9" /><circle cx="361" cy="311" r="13" />
        </g>
      </svg>

      <div className={styles.inner}>
        <div className={styles.partnerPreface}>
          <h2 className={styles.partnerTitle}>
            <span>{productContent.partnerPreface.title[0]}</span>
            <span className={styles.partnerOrigin}>
              {productContent.partnerPreface.title[1]}
            </span>
          </h2>
          <p className={styles.partnerCopy}>{productContent.partnerPreface.paragraph}</p>
          <Image
            src={drilchemLogo}
            alt={productContent.partnerPreface.logoAlt}
            sizes="(max-width: 767px) 150px, 180px"
            className={styles.partnerLogo}
          />
        </div>

        <div className={styles.editorialGrid}>
          <div className={styles.introduction}>
            <div className={styles.eyebrow}>
              <span aria-hidden="true" />
              {productContent.exclusiveLabel}
            </div>
            <p className={styles.productName}>{productContent.name}</p>
            <h2 id="stoploss-heading">
              {productContent.headline.map((line) => <span key={line}>{line}</span>)}
            </h2>
            <p className={styles.introCopy}>{productContent.introduction}</p>
          </div>

          <div className={styles.videoColumn}>
            <ProductVideo />
            <ProductVisual />
          </div>

          <div className={styles.supportingBlock}>
            <p>{productContent.supporting}</p>
            <ProductActions />
          </div>
        </div>

        <ProductCapabilities />

        <div className={styles.productStrip}>
          <div className={styles.metadata}>
            {productContent.metadata.map((item) => <span key={item}>{item}</span>)}
          </div>
          <Link href="/contact?interest=stoploss">Request technical and commercial information <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
