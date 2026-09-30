import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const eventTypes = ["Corporate Event", "Cultural Event", "Educational / Institutional Event", "Hybrid Event", "Workshops", "Private Events", "Film Production", "Music", "Live Event", "Original Showcase", "Other"];

export const Route = createFileRoute("/inquiry")({
  head: () => ({ meta: [
    { title: "Inquiry — YKR Events" },
    { name: "description", content: "Tell YKR Events about your event or production. Send an inquiry and we'll get in touch." },
    { property: "og:title", content: "Inquiry — YKR Events" },
    { property: "og:description", content: "Have an event or production in mind? Get in touch with YKR Events." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Inquiry,
});

function Inquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const { error } = await supabase.from("inquiries").insert({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      company: String(data.get("company") ?? "").trim() || null,
      event_type: String(data.get("event_type") ?? ""),
      event_location: String(data.get("event_location") ?? "").trim() || null,
      expected_date: String(data.get("expected_date") ?? "") || null,
      message: String(data.get("message") ?? "").trim(),
    });
    if (error) { setStatus("error"); return; }
    form.reset();
    setStatus("success");
  };
  return <main className="inquiry-page"><div className="site-container inquiry-layout">
    <div className="inquiry-intro"><span className="eyebrow"><span className="eyebrow-line" /> MAKE AN INQUIRY</span><h1>Let's start<br /><em>something great.</em></h1><p>Have an event or production in mind? Tell us a little about it and we'll get in touch.</p><div className="inquiry-aside"><span>OR REACH US DIRECTLY</span><a href="mailto:ykrevents08@gmail.com">ykrevents08@gmail.com</a><a href="tel:+917339552366">+91 73395 52366</a></div></div>
    <div className="inquiry-form-wrap">{status === "success" ? <div className="inquiry-success" role="status"><CheckCircle2 size={36} /><h2>Thank you.</h2><p>Your inquiry has been received. We'll get in touch with you soon.</p><Button variant="outline" onClick={() => setStatus("idle")}>Send another inquiry <ArrowRight /></Button></div> : <form onSubmit={submit} className="inquiry-form">
      <div className="form-head"><span>YOUR DETAILS</span><span>01 — 02</span></div>
      <div className="form-grid"><label>Name <span>*</span><input name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Your name" /></label><label>Email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label><label>Phone Number <span>*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="Your phone number" /></label><label>Company<input name="company" type="text" autoComplete="organization" maxLength={150} placeholder="Company or organization" /></label></div>
      <div className="form-head second-head"><span>ABOUT YOUR EVENT</span><span>02 — 02</span></div>
      <div className="form-grid"><label>Event Type <span>*</span><select name="event_type" required defaultValue=""><option value="" disabled>Select an event type</option>{eventTypes.map((type) => <option value={type} key={type}>{type}</option>)}</select></label><label>Event Location<input name="event_location" type="text" maxLength={160} placeholder="City or venue" /></label><label>Expected Date<input name="expected_date" type="date" /></label></div>
      <label className="message-field">Message <span>*</span><textarea name="message" required minLength={5} maxLength={3000} rows={5} placeholder="Tell us what you have in mind..." /></label>
      {status === "error" && <p className="form-error" role="alert">Your inquiry couldn't be sent. Please try again or email us directly.</p>}
      <Button type="submit" size="lg" className="brand-button form-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send Inquiry"} <ArrowRight /></Button>
    </form>}</div>
  </div></main>;
}
