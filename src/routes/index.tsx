import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, Play, Sparkles, Star, Target } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import goa1 from "@/assets/goa-1.webp.asset.json";
import goa2 from "@/assets/goa-2.webp.asset.json";
import goa3 from "@/assets/goa-3.webp.asset.json";
import goa4 from "@/assets/goa-4.webp.asset.json";
import goa5 from "@/assets/goa-5.webp.asset.json";

const photos = [goa1.url, goa2.url, goa3.url, goa4.url, goa5.url];
const categories = ["Corporate", "Cultural", "Educational", "Hybrid", "Film", "Music", "Live"];
const events = ["Corporate Events", "Entertainment & Cultural Events", "Educational", "Institutional Events", "Hybrid Events", "Workshops", "Private Events"];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "YKR Events — Where grandeur meets soul." },
    { name: "description", content: "YKR Events creates elegant, soulful events and productions. Explore our work in Goa and get in touch." },
    { property: "og:title", content: "YKR Events — Where grandeur meets soul." },
    { property: "og:description", content: "Elegant, soulful events and productions by YKR Events." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

function GoaCarousel() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStart = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const change = (direction: number) => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
    timer.current = setTimeout(() => {
      setIndex((current) => (current + direction + photos.length) % photos.length);
      setVisible(true);
    }, 170);
  };
  const current = String(index + 1).padStart(2, "0");
  const total = String(photos.length).padStart(2, "0");
  return <div className="work-viewer">
    <div className="viewer-image" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
      if (touchStart.current === null) return;
      const delta = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
      if (Math.abs(delta) > 45) change(delta < 0 ? 1 : -1);
      touchStart.current = null;
    }}>
      <img src={photos[index]} alt={`Goa event photograph ${index + 1} of ${photos.length}`} className={`viewer-photo ${visible ? "is-visible" : ""}`} />
    </div>
    <div className="viewer-controls">
      <span className="viewer-count" aria-live="polite">{current} <span>/</span> {total}</span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="viewer-arrow" aria-label="Previous photograph" onClick={() => change(-1)}><ChevronLeft /></Button>
        <Button variant="outline" size="icon" className="viewer-arrow" aria-label="Next photograph" onClick={() => change(1)}><ChevronRight /></Button>
      </div>
    </div>
  </div>;
}

function Home() {
  return <main>
    <section className="hero" id="home">
      <div className="hero-photo" style={{ backgroundImage: `url(${goa3.url})` }} aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="site-container hero-inner">
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> YKR EVENTS</div>
          <h1>Where<br />grandeur<br /><em>meets soul.</em></h1>
          <p>We craft elegant, soulful events and productions — the kind that move people, and quietly hand the stage back to the talent that deserves it.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="brand-button"><Link to="/" hash="work">Explore Our Work <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="hero-outline"><Link to="/inquiry">Make an Inquiry <ArrowRight /></Link></Button>
          </div>
        </div>
        <div className="hero-bottom"><span>EVENTS WITH PURPOSE</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
      </div>
    </section>

    <section className="categories-band" aria-label="What we create"><div className="site-container categories-inner">
      <span className="category-label">WHAT WE DO</span>
      <div className="category-list">{categories.map((item) => <span key={item}>{item}</span>)}</div>
    </div></section>

    <section className="section vision-section" id="vision"><div className="site-container">
      <div className="section-intro vision-intro"><div><span className="eyebrow"><span className="eyebrow-line" /> OUR VISION</span><h2>A stage, and<br />a sanctuary.</h2></div><p>YKR exists at the intersection of spectacle and sincerity. Our work is built on two unwavering convictions.</p></div>
      <div className="vision-grid">
        <article className="vision-item"><div className="vision-icon"><Target size={23} strokeWidth={1.6} /></div><span className="item-number">01 / OUR VISION</span><h3>Make room for brilliance.</h3><p>To be the most celebrated stage where grandeur meets soul — and where young talent is seen, celebrated, and transformed.</p></article>
        <article className="vision-item"><div className="vision-icon"><Sparkles size={23} strokeWidth={1.6} /></div><span className="item-number">02 / OUR MISSION</span><h3>Give talent the stage.</h3><p>To craft elegant, soulful events that move people — and to actively seek, nurture, and elevate young talent on the grandest possible stage.</p></article>
      </div>
    </div></section>

    <section className="section services-section" id="services"><div className="site-container">
       <div className="section-intro"><div><span className="eyebrow"><span className="eyebrow-line" /> WHAT WE CREATE</span><h2>Events for<br />every occasion.</h2></div><p>From the first idea to the final applause, we bring every detail together with care and intention.</p></div>
      <div className="service-grid">
        <article className="service-column"><div className="service-top"><span>01</span><Star className="service-symbol" size={28} strokeWidth={1.7} aria-hidden="true" /></div><h3>Events</h3><ul>{events.map((item) => <li key={item}>{item}<ArrowUpRight size={17} /></li>)}</ul></article>
      </div>
      <p className="services-quote">“We don't just produce events. We compose moments — where light, sound, story and silence conspire to leave a room different than they found it.”</p>
    </div></section>

    <section className="section work-section" id="work"><div className="site-container">
      <div className="section-intro work-intro"><div><span className="eyebrow"><span className="eyebrow-line" /> MOMENTS THAT MATTER</span><h2>Our Work<span className="accent-dot">.</span></h2></div><p>A glimpse into the experiences we've brought to life.</p></div>
      <div className="work-heading"><div><span className="work-overline">FEATURED PAST EVENT</span><h3>Goa</h3></div><span className="past-label"><span /> PAST EVENT</span></div>
      <GoaCarousel />
      <div className="video-feature">
        <a className="video-thumb" href="https://www.youtube.com/live/9AkFTixnEMk?si=uCoWoCF9Zekf0TTx" target="_blank" rel="noopener noreferrer" aria-label="Watch the Goa Monsoon Premier League video on YouTube"><img src={goa5.url} alt="Players at the Goa event" /><span className="play-circle"><Play size={24} fill="currentColor" /></span></a>
        <div className="video-copy"><span className="eyebrow">THE GOA EVENT · VIDEO &amp; COVERAGE</span><h3>Goa Monsoon Premier League: Goals and entertainment as GFA experiments with new format</h3><blockquote>“The Vasudhaiva Kutumbakam Social Welfare Trust approached us and we had no hesitation in giving this (format) a try. Let’s see how this goes. They have bigger and better plans for the future.”</blockquote><p className="quote-credit">— Caitano Fernandes, GFA president, as reported by The Times of India</p><div className="video-links"><a className="video-link" href="https://www.youtube.com/live/9AkFTixnEMk?si=uCoWoCF9Zekf0TTx" target="_blank" rel="noopener noreferrer">Watch the live video <ArrowUpRight size={18} /></a><a className="video-link" href="https://timesofindia.indiatimes.com/city/goa/goa-monsoon-premier-league-goals-and-entertainment-as-gfa-experiments-with-new-format/articleshow/122590412.cms" target="_blank" rel="noopener noreferrer">Read the Times of India article <ArrowUpRight size={18} /></a></div></div>
      </div>
    </div></section>

    <section className="section philosophy-section" id="philosophy"><div className="site-container philosophy-inner">
      <div><span className="eyebrow"><span className="eyebrow-line" /> OUR PHILOSOPHY</span><h2>Grandeur<br /><em>meets soul.</em></h2></div>
      <div className="philosophy-copy"><p>Meaningful experiences begin with what matters most. We bring people, talent, stories and creativity together to create moments that stay with you.</p><div className="philosophy-tags"><span>People</span><span>Talent</span><span>Stories</span><span>Experiences</span><span>Creativity</span></div></div>
    </div></section>

    <section className="section contact-section" id="contact"><div className="site-container contact-inner"><div><span className="eyebrow"><span className="eyebrow-line" /> GET IN TOUCH</span><h2>Let's build something<br /><em>unforgettable.</em></h2><Button asChild size="lg" className="brand-button"><Link to="/inquiry">Start an Inquiry <ArrowRight /></Link></Button></div>
      <div className="contact-details"><div><span>TELEPHONE</span><a href="tel:+917339552366">+91 73395 52366</a></div><div><span>EMAIL</span><a href="mailto:ykrevents08@gmail.com">ykrevents08@gmail.com</a></div><div><span>STUDIO</span><p>YKR Events, Balaji Nagar,<br />IOB Colony, Maruthamalai Road,<br />Coimbatore — 641046</p></div><div className="contact-social"><span>FOLLOW US</span><a href="https://www.instagram.com/ykrevents?stkn=dGgzOWk0MWdlNjk4" target="_blank" rel="noopener noreferrer" aria-label="YKR Events on Instagram" title="Instagram"><Instagram size={25} strokeWidth={1.8} /></a></div></div>
    </div></section>
  </main>;
}
