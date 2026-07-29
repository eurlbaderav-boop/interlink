import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./DrilchemProductPage.module.css";

type Specification = {
  label: string;
  value: string;
};

type AdditionalSection = {
  index: string;
  label: string;
  title: string;
  paragraphs: readonly string[];
  listLabel?: string;
  listItems?: readonly string[];
  closingParagraph?: string;
};

type ProductVariant = {
  name: string;
  summary: string;
  description: string;
};

export type DrilchemProductPageProps = {
  productName: string;
  productIndex: string;
  productLogo: string;
  accent: string;
  valueAccent: string;
  presentationVideo?: {
    src: string;
    poster?: string;
    label: string;
    caption?: string;
  };
  introduction: string;
  descriptionParagraphs: readonly string[];
  applications?: readonly string[];
  productVariants?: {
    label: string;
    items: readonly ProductVariant[];
  };
  packaging: {
    amount: string;
    unit: string;
    metric: string;
    copy: string;
  };
  treatment: readonly string[];
  properties: readonly Specification[];
  safety: readonly string[];
  additionalSection?: AdditionalSection;
};

export default function DrilchemProductPage({
  productName,
  productIndex,
  productLogo,
  accent,
  valueAccent,
  presentationVideo,
  introduction,
  descriptionParagraphs,
  applications,
  productVariants,
  packaging,
  treatment,
  properties,
  safety,
  additionalSection,
}: DrilchemProductPageProps) {
  const pageStyle = {
    "--product-accent": accent,
    "--product-value": valueAccent,
  } as CSSProperties;

  return (
    <article className={styles.page} style={pageStyle}>
      <div className={styles.edgePattern} aria-hidden="true" />

      <header className={`${styles.inner} ${styles.identity} ${presentationVideo ? styles.identityWithVideo : ""}`}>
        <p className={styles.kicker}>DRILCHEM / PRODUCT TECHNOLOGY / {productIndex}</p>
        <div className={styles.brandStack}>
          <Image
            src="/herophotos/drilchemlogo.png"
            alt="DRILCHEM"
            width={500}
            height={163}
            className={styles.drilchemLogo}
            priority
          />
          <span className={styles.brandRule} aria-hidden="true" />
          <span className={styles.brandLabel}>PRODUCT TECHNOLOGY</span>
          <Image
            src={productLogo}
            alt={productName}
            width={566}
            height={137}
            className={styles.productLogo}
            priority
          />
        </div>
        <p className={`${styles.introduction} ${presentationVideo ? styles.introductionBeforeVideo : ""}`}>
          {introduction}
        </p>
        {presentationVideo ? (
          <figure className={styles.videoFrame}>
            <div className={styles.videoHeading}>
              <span aria-hidden="true" />
              <p>{presentationVideo.label}</p>
            </div>
            <video
              className={styles.presentationVideo}
              controls
              preload="metadata"
              playsInline
              poster={presentationVideo.poster}
              aria-label={presentationVideo.caption ?? presentationVideo.label}
            >
              <source src={presentationVideo.src} type="video/mp4" />
            </video>
            {presentationVideo.caption ? (
              <figcaption>{presentationVideo.caption}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </header>

      <div className={`${styles.inner} ${styles.dossier}`} aria-label={`${productName} technical product information`}>
        <section className={styles.block} aria-labelledby="applications-title">
          <p className={styles.blockIndex}>01 / APPLICATION</p>
          <h2 id="applications-title">Description &amp; application</h2>
          {descriptionParagraphs.map((paragraph) => (
            <p className={styles.bodyCopy} key={paragraph}>{paragraph}</p>
          ))}
          {applications ? (
            <ol className={styles.applicationList}>
              {applications.map((application, index) => (
                <li key={application}>
                  <span>0{index + 1}</span>
                  <p>{application}</p>
                </li>
              ))}
            </ol>
          ) : null}
          {productVariants ? (
            <div className={styles.variantSystem}>
              <p className={styles.variantLabel}>{productVariants.label}</p>
              <ol className={styles.variantList}>
                {productVariants.items.map((variant, index) => (
                  <li key={variant.name}>
                    <div>
                      <span>0{index + 1}</span>
                      <h3>{variant.name}</h3>
                    </div>
                    <p className={styles.variantSummary}>{variant.summary}</p>
                    <p>{variant.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </section>

        <section className={styles.block} aria-labelledby="packaging-title">
          <p className={styles.blockIndex}>02 / SUPPLY</p>
          <h2 id="packaging-title">Packaging</h2>
          <p className={styles.packageValue}>{packaging.amount} <span>{packaging.unit}</span></p>
          <p className={styles.packageMetric}>{packaging.metric}</p>
          <p className={styles.bodyCopy}>{packaging.copy}</p>
        </section>

        <section className={styles.block} aria-labelledby="treatment-title">
          <p className={styles.blockIndex}>03 / TREATMENT</p>
          <h2 id="treatment-title">Recommended treatment</h2>
          {treatment.map((paragraph) => (
            <p className={styles.bodyCopy} key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className={styles.block} aria-labelledby="properties-title">
          <p className={styles.blockIndex}>04 / SPECIFICATION</p>
          <h2 id="properties-title">Physical &amp; chemical properties</h2>
          <dl className={styles.specificationList}>
            {properties.map((property) => (
              <div key={property.label}>
                <dt>{property.label}</dt>
                <dd>{property.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className={`${styles.block} ${additionalSection ? "" : styles.fullWidth}`}
          aria-labelledby="safety-title"
        >
          <p className={styles.blockIndex}>05 / STEWARDSHIP</p>
          <h2 id="safety-title">Environmental safety, handling &amp; shipping</h2>
          {safety.map((paragraph) => (
            <p className={styles.bodyCopy} key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {additionalSection ? (
          <section className={styles.block} aria-labelledby="additional-section-title">
            <p className={styles.blockIndex}>{additionalSection.index} / {additionalSection.label}</p>
            <h2 id="additional-section-title">{additionalSection.title}</h2>
            {additionalSection.paragraphs.map((paragraph) => (
              <p className={styles.bodyCopy} key={paragraph}>{paragraph}</p>
            ))}
            {additionalSection.listLabel && additionalSection.listItems ? (
              <>
                <p className={styles.formationLabel}>{additionalSection.listLabel}</p>
                <ul className={styles.formations} aria-label={additionalSection.listLabel}>
                  {additionalSection.listItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            ) : null}
            {additionalSection.closingParagraph ? (
              <p className={styles.bodyCopy}>{additionalSection.closingParagraph}</p>
            ) : null}
          </section>
        ) : null}
      </div>

      <nav className={`${styles.inner} ${styles.backNavigation}`} aria-label="Product navigation">
        <Link href="/our-network">← <span>Back to DRILCHEM</span></Link>
      </nav>
    </article>
  );
}
