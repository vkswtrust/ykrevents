import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type FormEvent } from "react";
import { Button } from "@/components/ui/button";

const eventTypes = ["Corporate Event", "Cultural Event", "Educational / Institutional Event", "Hybrid Event", "Workshops", "Private Events", "Film Production", "Music", "Live Event", "Original Showcase", "Other"];

export const Route = createFileRoute("/inquiry")({
  head: () => ({ meta: [
    { title: "Inquiry — YKR Events" },
    { name: "description", content: "Tell YKR Events about your event or production. Prepare your inquiry in Gmail." },
    { property: "og:title", content: "Inquiry — YKR Events" },
    { property: "og:description", content: "Have an event or production in mind? Get in touch with YKR Events." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Inquiry,
});

function Inquiry() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const body = [
      "Hello YKR Events,",
      "",
      "I would like to enquire about an event. Please find my details below:",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Phone Number: ${value("phone")}`,
      `Company: ${value("company") || "Not provided"}`,
      `Event Type: ${value("event_type")}`,
      `Event Location: ${value("event_location") || "Not provided"}`,
      `Expected Date: ${value("expected_date") || "Not provided"}`,
      "",
      "Message:",
      value("message"),
      "",
      "Kind regards,",
      value("name"),
    ].join("\n");
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "ykrevents08@gmail.com",
      su: `Event inquiry — ${value("event_type")} — ${value("name")}`,
      body,
    });
    window.location.assign(`https://mail.google.com/mail/?${params.toString()}`);
  };
  return <main className="inquiry-page"><div className="site-container inquiry-layout">
    <div className="inquiry-intro"><span className="eyebrow"><span className="eyebrow-line" /> MAKE AN INQUIRY</span><h1>Let's start<br /><em>something great.</em></h1><p>Have an event or production in mind? Tell us a little about it and we'll get in touch.</p><div className="inquiry-aside"><span>OR REACH US DIRECTLY</span><a href="mailto:ykrevents08@gmail.com">ykrevents08@gmail.com</a><a href="tel:+917339552366">+91 73395 52366</a></div></div>
    <div className="inquiry-form-wrap"><form onSubmit={submit} className="inquiry-form">
      <div className="form-head"><span>YOUR DETAILS</span><span>01 — 02</span></div>
      <div className="form-grid"><label>Name <span>*</span><input name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" /></label><label>Email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label><label>Phone Number <span>*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="Your phone number" /></label><label>Company<input name="company" type="text" autoComplete="organization" maxLength={150} placeholder="Company or organization" /></label></div>
      <div className="form-head second-head"><span>ABOUT YOUR EVENT</span><span>02 — 02</span></div>
      <div className="form-grid"><label>Event Type <span>*</span><select name="event_type" required defaultValue=""><option value="" disabled>Select an event type</option>{eventTypes.map((type) => <option value={type} key={type}>{type}</option>)}</select></label><label>Event Location<input name="event_location" type="text" maxLength={160} placeholder="City or venue" /></label><label>Expected Date<input name="expected_date" type="date" /></label></div>
      <label className="message-field">Message <span>*</span><textarea name="message" required minLength={5} maxLength={3000} rows={5} placeholder="Tell us what you have in mind..." /></label>
      <Button type="submit" size="lg" className="brand-button form-submit">Continue to Gmail <ArrowRight /></Button>
    </form></div>
  </div></main>;
}
