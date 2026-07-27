import { siteConfig } from "@/config/site";
import ContactIcon from "./ContactIcon";
import { contactContent } from "./contactContent";
import styles from "./ContactPage.module.css";

export default function DirectContactSection() {
  const contactRows = [
    { icon: "phone", label: "Telephone", value: siteConfig.contact.phone ?? siteConfig.contact.phoneFallback, href: siteConfig.contact.phone ? `tel:${siteConfig.contact.phone}` : undefined },
    { icon: "email", label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: "location", label: "Location", value: siteConfig.contact.location, href: undefined },
  ];

  return (
    <section className={styles.direct} aria-labelledby="direct-heading">
      <svg className={styles.directOman} viewBox="0 0 500 500" aria-hidden="true">
        <image href="/om.svg" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid meet" />
      </svg>
      <div className={styles.sectionInner}>
        <div className={styles.directGrid}>
          <div className={styles.directCopy}>
            <p className={styles.darkEyebrow}>PREFER TO TALK DIRECTLY?</p>
            <h2 id="direct-heading">We’re Here to<br /><span>Connect.</span></h2>
            <p>Reach out to our team directly for immediate assistance or to schedule a meeting.</p>
            <div className={styles.contactRows}>
              {contactRows.map((row) => (
                <div key={row.label} className={styles.contactRow} id={row.label === "Location" ? "office-location" : undefined}>
                  <ContactIcon name={row.icon} />
                  <div><span>{row.label}</span>{row.href ? <a href={row.href}>{row.value}</a> : <strong>{row.value}</strong>}</div>
                </div>
              ))}
            </div>
            <a href="#office-location" className={styles.locationAction}>VIEW OUR LOCATION <span aria-hidden="true">→</span></a>
          </div>

          <aside className={styles.nextPanel} aria-labelledby="next-heading">
            <div className={styles.nextPanelHeading}><span>04</span><h2 id="next-heading">What Happens Next?</h2></div>
            <ol>
              {contactContent.responsePromises.map((promise, index) => (
                <li key={promise}>
                  <span><ContactIcon name={index === 2 ? "lock" : "check"} /></span>
                  <p>{promise}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
