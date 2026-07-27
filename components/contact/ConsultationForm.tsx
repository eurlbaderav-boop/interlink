"use client";

import { useRef, useState } from "react";

import { areaOfInterestOptions, type AreaOfInterest } from "@/config/site";
import ContactIcon from "./ContactIcon";
import { countryCodes } from "./contactContent";
import styles from "./ContactPage.module.css";

type FieldName = "fullName" | "email" | "phone" | "consent";
type FormErrors = Partial<Record<FieldName, string>>;

export default function ConsultationForm({ initialInterest }: { initialInterest?: AreaOfInterest }) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = (data: FormData) => {
    const nextErrors: FormErrors = {};
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/[\s()-]/g, "");

    if (!fullName) nextErrors.fullName = "Please enter your full name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (phone && !/^\d{7,15}$/.test(phone)) nextErrors.phone = "Please enter a valid phone number using 7 to 15 digits.";
    if (data.get("consent") !== "on") nextErrors.consent = "Please provide consent before submitting your request.";
    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    setSubmitMessage("");

    if (Object.keys(nextErrors).length) {
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    submittingRef.current = true;
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Your request could not be submitted. Please try again.");

      form.reset();
      setErrors({});
      setStatus("success");
      setSubmitMessage(result.message || "Your consultation request has been received.");
    } catch (error) {
      setStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Your request could not be submitted. Please try again.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      submittingRef.current = false;
    }
  };

  const fieldError = (name: FieldName) => errors[name] ? <span id={`${name}-error`} className={styles.fieldError}>{errors[name]}</span> : null;

  return (
    <div className={styles.formPanel}>
      <div className={styles.formHeading}>
        <span>PRIVATE &amp; CONFIDENTIAL</span>
        <h2>Share Your Requirements</h2>
        <p>All fields are optional.</p>
      </div>

      {(status === "error" || status === "success") && (submitMessage || Object.keys(errors).length > 0) ? (
        <div
          ref={summaryRef}
          className={`${styles.formNotice} ${status === "success" ? styles.formSuccess : styles.formError}`}
          role={status === "success" ? "status" : "alert"}
          tabIndex={-1}
        >
          {submitMessage || "Please review the highlighted fields and submit again."}
        </div>
      ) : null}

      <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>
        <div className={styles.fieldRow}>
          <label className={styles.field}>
            <span>Full Name</span>
            <input name="fullName" type="text" autoComplete="name" aria-required="true" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
            {fieldError("fullName")}
          </label>
          <label className={styles.field}>
            <span>Company Name</span>
            <input name="companyName" type="text" autoComplete="organization" />
          </label>
        </div>

        <label className={styles.field}>
          <span>Email Address</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {fieldError("email")}
        </label>

        <fieldset className={styles.phoneField}>
          <legend>Phone Number</legend>
          <div className={styles.phoneInputs}>
            <label>
              <span className={styles.srOnly}>Country code</span>
              <select name="countryCode" defaultValue="+968" aria-label="Country calling code">
                {countryCodes.map((country) => <option key={`${country.label}-${country.code}`} value={country.code}>{country.code} — {country.label}</option>)}
              </select>
            </label>
            <label>
              <span className={styles.srOnly}>Phone number</span>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            </label>
          </div>
          {fieldError("phone")}
        </fieldset>

        <label className={styles.field}>
          <span>Area of Interest</span>
          <select name="interest" defaultValue={initialInterest ?? ""}>
            <option value="">Select an area</option>
            {areaOfInterestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className={styles.field}>
          <span>How can we help you?</span>
          <textarea name="message" rows={5} placeholder="Tell us about your goals, challenges or opportunities..." />
        </label>

        <label className={styles.consent}>
          <input name="consent" type="checkbox" aria-required="true" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>I agree to the <span className={styles.policyText}>Privacy Policy</span> and consent to Interlink International contacting me.</span>
        </label>
        {fieldError("consent")}

        <button type="submit" className={styles.submitButton} disabled={status === "loading"}>
          {status === "loading" ? "SUBMITTING…" : "SUBMIT REQUEST"}<span aria-hidden="true">→</span>
        </button>

        <p className={styles.securityNote}><ContactIcon name="lock" />Your information is secure and confidential.</p>
      </form>
    </div>
  );
}
