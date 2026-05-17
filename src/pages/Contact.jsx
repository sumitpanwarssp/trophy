import React, { useState } from "react";
import Breadcrumb from "../utils/BreadCrumb";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight, FaPaperPlane } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";

const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const contactInfo = [
  {
    icon: <FaPhone size={18} />,
    label: "Call Us",
    value: "+91 XXXXX XXXXX",
    sub: "Mon – Sat, 9am – 7pm",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: <FaWhatsapp size={18} />,
    label: "WhatsApp",
    value: "+91 XXXXX XXXXX",
    sub: "Quick replies guaranteed",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    highlight: true,
  },
  {
    icon: <MdEmail size={18} />,
    label: "Email Us",
    value: "hello@yourbusiness.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@yourbusiness.com",
  },
  {
    icon: <FaMapMarkerAlt size={18} />,
    label: "Visit Us",
    value: "Your Business Address",
    sub: "City, State – PIN Code",
    href: "#map",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", type: "General Inquiry" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AType: ${form.type}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inquiryTypes = ["General Inquiry", "Bulk Order", "Custom Design", "Price Quote", "Other"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .contact-page {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
        }

        /* ── HERO BANNER ── */
        .contact-hero {
          position: relative;
          background: radial-gradient(ellipse at 60% 40%, #1a1000 0%, #0a0a0a 65%);
          padding: 5rem 6vw 4rem;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
        }
        .contact-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 20%, rgba(212,165,33,0.1) 0%, transparent 45%),
            radial-gradient(circle at 10% 80%, rgba(212,165,33,0.05) 0%, transparent 45%);
          pointer-events: none;
        }
        .contact-hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }
        .contact-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d4a521;
          background: rgba(212,165,33,0.08);
          border: 1px solid rgba(212,165,33,0.25);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 1.2rem;
          animation: fadeUp 0.5s ease both;
        }
        .contact-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          animation: fadeUp 0.5s 0.08s ease both;
        }
        .contact-title .gold {
          background: linear-gradient(135deg, #f5c842 0%, #d4a521 50%, #a67c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-sub {
          color: #888;
          font-size: 1rem;
          line-height: 1.7;
          margin-top: 0.9rem;
          max-width: 500px;
          animation: fadeUp 0.5s 0.16s ease both;
        }
        .hero-trophy-icon {
          font-size: 5rem;
          color: rgba(212,165,33,0.12);
          animation: heroFloat 3s ease-in-out infinite;
          display: none;
        }
        @media (min-width: 640px) { .hero-trophy-icon { display: block; } }

        /* ── MAIN LAYOUT ── */
        .contact-body {
          padding: 4rem 6vw 6rem;
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 3rem;
          align-items: start;
        }

        /* ── INFO COLUMN ── */
        .info-col {}
        .info-section-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4a521;
          margin-bottom: 1.5rem;
        }

        .info-cards { display: flex; flex-direction: column; gap: 1rem; }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem 1.4rem;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.5s ease both;
        }
        .info-card:nth-child(1) { animation-delay: 0.05s; }
        .info-card:nth-child(2) { animation-delay: 0.1s; }
        .info-card:nth-child(3) { animation-delay: 0.15s; }
        .info-card:nth-child(4) { animation-delay: 0.2s; }

        .info-card:hover {
          border-color: rgba(212,165,33,0.35);
          transform: translateX(4px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        .info-card.highlight {
          border-color: rgba(37,211,102,0.25);
          background: rgba(37,211,102,0.04);
        }
        .info-card.highlight:hover { border-color: rgba(37,211,102,0.5); }

        .info-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(212,165,33,0.1);
          border: 1px solid rgba(212,165,33,0.2);
          color: #d4a521;
        }
        .info-card.highlight .info-icon {
          background: rgba(37,211,102,0.1);
          border-color: rgba(37,211,102,0.2);
          color: #25d366;
        }
        .info-label { font-size: 0.72rem; color: #666; font-weight: 500; letter-spacing: 0.05em; margin-bottom: 3px; text-transform: uppercase; }
        .info-value { font-weight: 600; font-size: 0.95rem; color: #e8e8e8; }
        .info-sub { font-size: 0.78rem; color: #555; margin-top: 2px; }

        /* hours block */
        .hours-block {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 14px;
          animation: fadeUp 0.5s 0.3s ease both;
        }
        .hours-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d4a521;
          margin-bottom: 1rem;
        }
        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 0;
          border-bottom: 1px solid #1a1a1a;
          font-size: 0.85rem;
        }
        .hours-row:last-child { border-bottom: none; }
        .hours-day { color: #888; }
        .hours-time { color: #e0e0e0; font-weight: 500; }
        .hours-closed { color: #555; font-style: italic; }

        /* whatsapp CTA */
        .wa-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 14px 22px;
          border-radius: 10px;
          text-decoration: none;
          margin-top: 1.5rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 25px rgba(37,211,102,0.2);
          animation: fadeUp 0.5s 0.35s ease both;
        }
        .wa-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(37,211,102,0.35);
        }
        .wa-cta-arrow { margin-left: auto; opacity: 0.7; }

        /* ── FORM COLUMN ── */
        .form-col {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 20px;
          padding: 2.5rem;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }
        .form-subtitle { color: #666; font-size: 0.85rem; margin-bottom: 2rem; line-height: 1.5; }

        /* inquiry type pills */
        .type-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }
        .type-pill {
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #666;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .type-pill:hover { border-color: rgba(212,165,33,0.3); color: #aaa; }
        .type-pill.active {
          background: rgba(212,165,33,0.1);
          border-color: rgba(212,165,33,0.4);
          color: #d4a521;
          font-weight: 600;
        }

        /* fields */
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .field-group { margin-bottom: 1.25rem; position: relative; }
        .field-label {
          display: block;
          font-size: 0.73rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.5rem;
          transition: color 0.2s;
        }
        .field-group.is-focused .field-label { color: #d4a521; }

        .field-input {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 10px;
          padding: 13px 16px;
          color: #fff;
          font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
        }
        .field-input::placeholder { color: #3a3a3a; }
        .field-input:focus {
          border-color: rgba(212,165,33,0.5);
          box-shadow: 0 0 0 3px rgba(212,165,33,0.06);
        }
        textarea.field-input { min-height: 110px; }

        .submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #d4a521 0%, #a67c00 100%);
          color: #1a1000;
          font-weight: 700;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          padding: 15px 24px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 24px rgba(212,165,33,0.2);
          margin-top: 0.5rem;
          letter-spacing: 0.02em;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(212,165,33,0.35);
        }
        .submit-btn:active { transform: translateY(0); }

        /* success toast */
        .success-toast {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.3);
          color: #25d366;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 0.88rem;
          font-weight: 500;
          margin-top: 1rem;
          animation: fadeUp 0.3s ease;
        }

        /* divider */
        .or-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: #333;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .or-divider::before, .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1e1e1e;
        }

        .wa-form-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(37,211,102,0.3);
          color: #25d366;
          font-weight: 600;
          font-size: 0.88rem;
          font-family: 'DM Sans', sans-serif;
          padding: 13px 24px;
          border-radius: 10px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
        }
        .wa-form-btn:hover {
          background: rgba(37,211,102,0.06);
          border-color: rgba(37,211,102,0.5);
        }

        /* note */
        .form-note {
          text-align: center;
          color: #444;
          font-size: 0.75rem;
          margin-top: 1rem;
          line-height: 1.5;
        }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50%       { transform: translateY(-12px) rotate(5deg); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .contact-hero-grid { grid-template-columns: 1fr; }
          .contact-body { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 500px) {
          .form-col { padding: 1.5rem; }
          .contact-body { padding: 2.5rem 5vw 4rem; }
        }
      `}</style>

      <div className="contact-page">
        <Breadcrumb items={[{ label: "Contact" }]} />

        {/* ── HERO BANNER ── */}
        <div className="contact-hero">
          <div className="contact-hero-grid">
            <div>
              <div className="contact-eyebrow">
                <GiTrophy size={11} /> Get in Touch
              </div>
              <h1 className="contact-title">
                Let's Build Your <br />
                <span className="gold">Perfect Trophy.</span>
              </h1>
              <p className="contact-sub">
                Custom orders, bulk inquiries, or just a question — we're here to help. Reach out and get a quote within minutes.
              </p>
            </div>
            <div className="hero-trophy-icon">
              <GiTrophy />
            </div>
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div className="contact-body">

          {/* ── INFO COLUMN ── */}
          <div className="info-col">
            <p className="info-section-label">Contact Information</p>

            <div className="info-cards">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`info-card${item.highlight ? " highlight" : ""}`}
                >
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <div className="info-label">{item.label}</div>
                    <div className="info-value">{item.value}</div>
                    <div className="info-sub">{item.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="hours-block">
              <div className="hours-title">
                <FaClock size={13} /> Business Hours
              </div>
              {[
                { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
                { day: "Saturday", time: "9:00 AM – 5:00 PM" },
                { day: "Sunday", time: null },
              ].map((h, i) => (
                <div className="hours-row" key={i}>
                  <span className="hours-day">{h.day}</span>
                  {h.time
                    ? <span className="hours-time">{h.time}</span>
                    : <span className="hours-closed">Closed</span>
                  }
                </div>
              ))}
            </div>

            {/* WhatsApp Quick CTA */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="wa-cta" target="_blank" rel="noreferrer">
              <FaWhatsapp size={20} />
              Chat on WhatsApp Now
              <FaArrowRight size={13} className="wa-cta-arrow" />
            </a>
          </div>

          {/* ── FORM COLUMN ── */}
          <div className="form-col">
            <h2 className="form-title">Send an Inquiry</h2>
            <p className="form-subtitle">Fill in the details below — we'll get back to you on WhatsApp or email shortly.</p>

            {/* Inquiry Type */}
            <div className="type-pills">
              {inquiryTypes.map((t) => (
                <button
                  key={t}
                  className={`type-pill${form.type === t ? " active" : ""}`}
                  onClick={() => setForm({ ...form, type: t })}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className={`field-group${focused === "name" ? " is-focused" : ""}`}>
                  <label className="field-label">Your Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar"
                    className="field-input"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                  />
                </div>
                <div className={`field-group${focused === "phone" ? " is-focused" : ""}`}>
                  <label className="field-label">Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="field-input"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused("")}
                  />
                </div>
              </div>

              <div className={`field-group${focused === "email" ? " is-focused" : ""}`}>
                <label className="field-label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="field-input"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <div className={`field-group${focused === "message" ? " is-focused" : ""}`}>
                <label className="field-label">Your Message *</label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your order — quantity, occasion, engraving details..."
                  className="field-input"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                />
              </div>

              <button type="submit" className="submit-btn">
                <FaPaperPlane size={15} />
                Send Inquiry via WhatsApp
              </button>

              {submitted && (
                <div className="success-toast">
                  <FaWhatsapp size={16} />
                  Opening WhatsApp... We'll reply shortly!
                </div>
              )}
            </form>

            <div className="or-divider">or</div>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="wa-form-btn" target="_blank" rel="noreferrer">
              <FaWhatsapp size={17} />
              Message Us Directly on WhatsApp
            </a>

            <p className="form-note">
              🔒 Your information is private and never shared with third parties.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}