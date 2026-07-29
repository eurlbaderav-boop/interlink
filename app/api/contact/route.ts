import { NextResponse } from "next/server";

import { areaOfInterestOptions } from "@/config/site";

type Submission = {
  fullName?: unknown;
  companyName?: unknown;
  email?: unknown;
  countryCode?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  consent?: unknown;
};

const asText = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(request: Request) {
  let data: Submission;
  try {
    data = await request.json() as Submission;
  } catch {
    return NextResponse.json({ message: "The submitted request was not valid." }, { status: 400 });
  }

  const fullName = asText(data.fullName);
  const email = asText(data.email);
  const phone = asText(data.phone).replace(/[\s()-]/g, "");
  const interest = asText(data.interest);

  if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please provide a valid name and email address." }, { status: 400 });
  }
  if (phone && !/^\d{7,15}$/.test(phone)) {
    return NextResponse.json({ message: "Please provide a valid phone number." }, { status: 400 });
  }
  if (data.consent !== "on") {
    return NextResponse.json({ message: "Consent is required before a consultation request can be submitted." }, { status: 400 });
  }
  if (interest && !areaOfInterestOptions.includes(interest as (typeof areaOfInterestOptions)[number])) {
    return NextResponse.json({ message: "Please select a valid area of interest." }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Online submission is not configured yet. Please email contact@interlink-om.com for immediate assistance." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        companyName: asText(data.companyName),
        email,
        countryCode: asText(data.countryCode),
        phone,
        interest,
        message: asText(data.message),
        consent: true,
        source: "interlink-contact-page",
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error("Webhook rejected the submission");
    return NextResponse.json({ message: "Your consultation request has been received. Our team will contact you promptly." });
  } catch {
    return NextResponse.json(
      { message: "The request could not be delivered. Please retain your details and try again, or contact us by email." },
      { status: 502 },
    );
  }
}
