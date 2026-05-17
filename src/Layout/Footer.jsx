import React from "react";
import { FaWhatsapp, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaYoutube, FaArrowUp, FaArrowRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";

const WHATSAPP_NUMBER = "917533839843";

const quickLinks = [
  { label: "Home",        href: "/" },
  { label: "Trophies",   href: "/trophies" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Order Online", href: "/order" },
  { label: "About Us",   href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const categories = [
  { label: "Sports Trophies",  href: "/trophies" },
  { label: "Corporate Awards", href: "/trophies" },
  { label: "Academic Trophies",href: "/trophies" },
  { label: "Gold Medals",      href: "/trophies" },
  { label: "Custom Engraving", href: "/contact"  },
  { label: "Bulk Orders",      href: "/contact"  },
];

const socials = [
  { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: <FaFacebookF size={15} />, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaYoutube size={16} />,   href: "https://www.youtube.com/",   label: "YouTube" },
  { icon: <FaWhatsapp size={16} />,  href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .footer {
          font-family: 'DM Sans', sans-serif;
          background: #080808;
          border-top: 1px solid #161616;
          position: relative;
          overflow: hidden;
        }

        /* ambient glow top */
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,165,33,0.4), transparent);
        }
        .footer::after {
          content: '';
          position: absolute;
          top: -60px; left: 50%;
          transform: translateX(-50%);
          width: 400px;
          height: 120px;
          background: radial-gradient(ellipse, rgba(212,165,33,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── CTA STRIP ── */
        .footer-cta {
          background: linear-gradient(135deg, #1a1000 0%, #120d00 100%);
          border-bottom: 1px solid rgba(212,165,33,0.12);
          padding: 2.5rem 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .footer-cta-left {}
        .footer-cta-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4a521;
          margin-bottom: 0.4rem;
        }
        .footer-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-weight: 700;
          color: #fff;
        }
        .footer-cta-title span {
          background: linear-gradient(135deg, #f5c842, #d4a521);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: #fff;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 13px 24px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 24px rgba(37,211,102,0.2);
        }
        .footer-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(37,211,102,0.35); }

        /* ── MAIN BODY ── */
        .footer-body {
          padding: 4rem 6vw 3rem;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
          gap: 3rem;
          position: relative;
          z-index: 1;
        }

        /* ── BRAND COL ── */
        .footer-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.2rem;
          text-decoration: none;
        }
        .brand-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: linear-gradient(135deg, #d4a521, #a67c00);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a1000;
          flex-shrink: 0;
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .brand-name span {
          display: block;
          font-size: 0.65rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4a521;
        }

        .footer-brand-desc {
          color: #555;
          font-size: 0.85rem;
          line-height: 1.75;
          margin-bottom: 1.5rem;
          max-width: 280px;
        }

        /* socials */
        .footer-socials {
          display: flex;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .social-btn {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #111;
          border: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          text-decoration: none;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
        }
        .social-btn:hover {
          background: rgba(212,165,33,0.1);
          border-color: rgba(212,165,33,0.35);
          color: #d4a521;
          transform: translateY(-2px);
        }

        /* trust badge */
        .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.75rem;
          color: #555;
        }
        .trust-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #25d366;
          box-shadow: 0 0 6px rgba(37,211,102,0.5);
          flex-shrink: 0;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── LINK COLS ── */
        .footer-col-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4a521;
          margin-bottom: 1.3rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(212,165,33,0.25), transparent);
        }

        .footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-links li a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #555;
          font-size: 0.85rem;
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
        }
        .footer-links li a:hover { color: #d4a521; gap: 10px; }
        .link-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #2a2a2a;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .footer-links li a:hover .link-dot { background: #d4a521; }

        /* ── CONTACT COL ── */
        .contact-items { display: flex; flex-direction: column; gap: 1rem; }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s;
        }
        .contact-item:hover { transform: translateX(3px); }
        .contact-item-icon {
          width: 34px; height: 34px;
          min-width: 34px;
          border-radius: 8px;
          background: rgba(212,165,33,0.08);
          border: 1px solid rgba(212,165,33,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4a521;
          font-size: 0.85rem;
        }
        .contact-item.wa .contact-item-icon {
          background: rgba(37,211,102,0.08);
          border-color: rgba(37,211,102,0.2);
          color: #25d366;
        }
        .contact-item-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #444;
          margin-bottom: 2px;
        }
        .contact-item-value {
          font-size: 0.83rem;
          color: #777;
          line-height: 1.5;
          transition: color 0.2s;
        }
        .contact-item:hover .contact-item-value { color: #d4a521; }
        .contact-item.wa:hover .contact-item-value { color: #25d366; }

        /* ── DIVIDER ── */
        .footer-divider {
          margin: 0 6vw;
          height: 1px;
          background: linear-gradient(90deg, transparent, #1a1a1a 20%, #1a1a1a 80%, transparent);
          position: relative;
          z-index: 1;
        }

        /* ── BOTTOM BAR ── */
        .footer-bottom {
          padding: 1.4rem 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .footer-copyright {
          font-size: 0.75rem;
          color: #333;
          line-height: 1.6;
        }
        .footer-copyright span { color: #d4a521; font-weight: 600; }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .footer-bottom-links a {
          font-size: 0.75rem;
          color: #333;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover { color: #d4a521; }
        .bottom-sep { color: #222; }

        /* scroll to top */
        .scroll-top-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: #111;
          border: 1px solid #222;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .scroll-top-btn:hover {
          background: rgba(212,165,33,0.1);
          border-color: rgba(212,165,33,0.35);
          color: #d4a521;
          transform: translateY(-2px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1000px) {
          .footer-body { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-body { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 5vw 2rem; }
          .footer-cta { flex-direction: column; align-items: flex-start; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
        }
      `}</style>

      <footer className="footer">

        {/* ── CTA STRIP ── */}
        <div className="footer-cta">
          <div className="footer-cta-left">
            <div className="footer-cta-eyebrow">Special Offer</div>
            <div className="footer-cta-title">
              Order Now & Get <span>Free Engraving</span>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place an order and claim the free engraving offer.")}`}
            className="footer-wa-btn"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={17} /> Order on WhatsApp
          </a>
        </div>

        {/* ── MAIN BODY ── */}
        <div className="footer-body">

          {/* Brand */}
          <div>
            <a href="/" className="footer-brand-logo">
              <div className="brand-icon"><GiTrophy size={22} /></div>
              <div className="brand-name">
                All In One Trophy
                <span>& Memento Center · Dehradun</span>
              </div>
            </a>

            <p className="footer-brand-desc">
              Wholesale & Retail Supplier of Awards, Trophies & Mementos. Located opposite DAV PG College, Karanpur Chowk, Dehradun. Serving schools, colleges, corporates & events across India.
            </p>

            <div className="footer-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="social-btn" target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="trust-badge">
              <div className="trust-dot" />
              GSTIN: 05HGEPP3764H1Z4
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <a href={l.href}>
                    <span className="link-dot" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-col-title">Categories</div>
            <ul className="footer-links">
              {categories.map((l, i) => (
                <li key={i}>
                  <a href={l.href}>
                    <span className="link-dot" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-title">Contact Us</div>
            <div className="contact-items">

              <a href="tel:+917533839843" className="contact-item">
                <div className="contact-item-icon"><FaPhone size={14} /></div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-value">+91 75338 39843</div>
                </div>
              </a>

              <a href="tel:+918279516071" className="contact-item">
                <div className="contact-item-icon"><FaPhone size={14} /></div>
                <div>
                  <div className="contact-item-label">Phone 2</div>
                  <div className="contact-item-value">+91 82795 16071</div>
                </div>
              </a>

              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="contact-item wa" target="_blank" rel="noreferrer">
                <div className="contact-item-icon"><FaWhatsapp size={15} /></div>
                <div>
                  <div className="contact-item-label">WhatsApp</div>
                  <div className="contact-item-value">+91 75338 39843</div>
                </div>
              </a>

              <a href="mailto:doontrophy@gmail.com" className="contact-item">
                <div className="contact-item-icon"><MdEmail size={16} /></div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value">doontrophy@gmail.com</div>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Opposite+DAV+PG+College+Karanpur+Chowk+Dehradun"
                className="contact-item"
                target="_blank"
                rel="noreferrer"
              >
                <div className="contact-item-icon"><FaMapMarkerAlt size={14} /></div>
                <div>
                  <div className="contact-item-label">Address</div>
                  <div className="contact-item-value">
                    Opp. DAV PG College,<br />
                    Karanpur Chowk, Dehradun – 248001
                  </div>
                </div>
              </a>

            </div>
          </div>

        </div>

        {/* ── DIVIDER ── */}
        <div className="footer-divider" />

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <span>All In One Trophy & Memento Center</span>. All rights reserved. &nbsp;·&nbsp; Dehradun, Uttarakhand
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="bottom-sep">·</span>
            <a href="/terms">Terms of Service</a>
            <span className="bottom-sep">·</span>
            <a href="/contact">Support</a>
            <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Back to top">
              <FaArrowUp size={13} />
            </button>
          </div>
        </div>

      </footer>
    </>
  );
}