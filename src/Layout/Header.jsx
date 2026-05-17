import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp, FaBars, FaTimes, FaChevronDown, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import { TbTrophy, TbMedal, TbShield, TbCertificate, TbPackage } from "react-icons/tb";
import { MdWorkspacePremium, MdDesignServices } from "react-icons/md";
import logo from "../assets/logo.jpg";

/* ── REAL BUSINESS INFO ── */
const WHATSAPP_NUMBER = "917533839843";
const PHONE_1         = "7533839843";
const PHONE_2         = "8279516071";
const BUSINESS_NAME   = "All In One Trophy";
const BUSINESS_SUB    = "& Memento Center · Dehradun";

const navLinks = [
  { label: "Home",       to: "/" },
  {
    label: "Categories",
    to: "/trophies",
    dropdown: [
      { label: "Sports Trophies",   to: "/trophies", icon: <TbTrophy size={15} /> },
      { label: "Corporate Awards",  to: "/trophies", icon: <MdWorkspacePremium size={15} /> },
      { label: "Academic Trophies", to: "/trophies", icon: <TbCertificate size={15} /> },
      { label: "Medals",            to: "/trophies", icon: <TbMedal size={15} /> },
      { label: "Shields & Plaques", to: "/trophies", icon: <TbShield size={15} /> },
      { label: "Custom Engraving",  to: "/contact",  icon: <MdDesignServices size={15} /> },
      { label: "Bulk Orders",       to: "/order",    icon: <TbPackage size={15} /> },
    ],
  },
  { label: "About",      to: "/about" },
  { label: "Gallery",    to: "/gallery" },
  { label: "Orders",     to: "/order" },
  { label: "Contact",    to: "/contact" },
];

export default function Header() {
  const [scrolled,     setScrolled]     = useState(false);
  const [scrollY,      setScrollY]      = useState(0);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location    = useLocation();

  /* ── scroll detection: track Y position ── */
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── lock body scroll when mobile drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  /* announcement bar hides after 80px scroll */
  const announceHidden = scrollY > 80;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Montserrat:wght@400;500;600;700&display=swap');

        :root {
          --gold:   #D4AF37;
          --gold3:  #a07800;
          --black:  #0F0F0F;
          --off:    #1A1A1A;
          --card:   #141414;
          --white:  #FFFFFF;
          --muted:  #888;
          --border: #252525;
          --green:  #25d366;
        }

        /* ══ WRAPPER ══ */
        .hdr-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'Montserrat', sans-serif;
        }

        /* ══ ANNOUNCEMENT BAR ══ */
        .ann-bar {
          background: var(--gold);
          padding: 7px 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          font-size: .72rem;
          font-weight: 700;
          color: #1a1000;
          letter-spacing: .04em;
          overflow: hidden;
          max-height: 38px;
          opacity: 1;
          transition: max-height .35s ease, opacity .35s ease, padding .35s ease;
        }
        .ann-bar.hide {
          max-height: 0;
          opacity: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
        .ann-item { display: flex; align-items: center; gap: 6px; white-space: nowrap; color: #1a1000; }
        .ann-right { display: flex; align-items: center; gap: 1.5rem; }
        .ann-right a {
          color: #1a1000; font-size: .72rem; font-weight: 700;
          text-decoration: none; display: flex; align-items: center; gap: 5px;
          opacity: 1; transition: opacity .2s;
        }
        .ann-right a:hover { opacity: .7; }

        /* ══ MAIN NAVBAR ══ */
        .nav-bar {
          background: rgba(10,10,10,.92);
          border-bottom: 1px solid rgba(212,175,55,.15);
          transition:
            background .3s ease,
            border-color .3s ease,
            box-shadow .3s ease,
            backdrop-filter .3s ease;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nav-bar.solid {
          background: rgba(6,6,6,.98);
          border-bottom-color: var(--border);
          box-shadow: 0 4px 32px rgba(0,0,0,.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
          height: 62px;
          gap: 1rem;
        }

        /* LOGO */
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-img {
          width: 40px; height: 40px;
          border-radius: 8px; object-fit: cover;
          border: 1.5px solid var(--gold);
          transition: transform .3s, box-shadow .3s;
          flex-shrink: 0;
        }
        .nav-logo:hover .logo-img {
          transform: rotate(-6deg) scale(1.07);
          box-shadow: 0 0 14px rgba(212,175,55,.4);
        }
        /* fallback icon if logo.jpg missing */
        .logo-icon-fallback {
          width: 40px; height: 40px; border-radius: 8px;
          background: linear-gradient(135deg, var(--gold), var(--gold3));
          display: flex; align-items: center; justify-content: center;
          color: #1a1000; flex-shrink: 0;
          transition: transform .3s;
        }
        .nav-logo:hover .logo-icon-fallback { transform: rotate(-6deg) scale(1.07); }

        .logo-text-wrap { line-height: 1.15; }
        .logo-main {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700;
          color: #ffffff; letter-spacing: .01em;
        }
        .logo-sub {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: .58rem; font-weight: 600;
          letter-spacing: .13em; text-transform: uppercase;
          color: var(--gold);
        }

        /* DESKTOP LINKS */
        .nav-links {
          display: flex; align-items: center;
          gap: .1rem; list-style: none; margin: 0; padding: 0;
        }
        .nav-li { position: relative; }
        .nav-a {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 7px 12px;
          font-size: .82rem; font-weight: 600;
          color: #e8e8e8; text-decoration: none;
          border-radius: 6px;
          transition: color .2s, background .2s;
          white-space: nowrap;
          cursor: pointer;
          background: transparent; border: none;
          border-bottom: 2px solid transparent;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: .02em;
        }
        .nav-a:hover { color: #ffffff; background: rgba(255,255,255,.07); }
        .nav-a.on  { color: var(--gold); border-bottom-color: var(--gold); background: rgba(212,175,55,.08); }

        .chev { transition: transform .25s; opacity: .8; flex-shrink: 0; color: #e8e8e8; }
        .chev.up { transform: rotate(180deg); opacity: 1; color: var(--gold); }

        /* DROPDOWN */
        .nav-drop {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%; transform: translateX(-50%);
          background: #0d0d0d;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: .5rem;
          min-width: 220px;
          box-shadow: 0 20px 50px rgba(0,0,0,.7);
          animation: dropIn .18s ease;
          z-index: 200;
        }
        .nav-drop::before {
          content: '';
          position: absolute; top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px; height: 10px;
          background: #0d0d0d;
          border-top: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 11px; border-radius: 8px;
          font-size: .78rem; font-weight: 600;
          color: #666; text-decoration: none;
          transition: background .15s, color .15s;
          font-family: 'Montserrat', sans-serif;
        }
        .drop-item:hover { background: rgba(212,175,55,.08); color: var(--gold); }
        .drop-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: var(--off); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: #555; flex-shrink: 0;
          transition: background .15s, color .15s, border-color .15s;
        }
        .drop-item:hover .drop-icon {
          background: rgba(212,175,55,.1); color: var(--gold);
          border-color: rgba(212,175,55,.3);
        }

        /* NAV RIGHT */
        .nav-right { display: flex; align-items: center; gap: .65rem; flex-shrink: 0; }
        .nav-phone {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .75rem; font-weight: 700; color: #e0e0e0;
          text-decoration: none; white-space: nowrap;
          letter-spacing: .02em;
          transition: color .2s;
        }
        .nav-phone:hover { color: var(--gold); }
        .nav-wa {
          display: inline-flex; align-items: center; gap: 7px;
          background: var(--green); color: #fff;
          font-weight: 700; font-size: .72rem;
          text-transform: uppercase; letter-spacing: .06em;
          padding: 8px 16px; border-radius: 5px;
          text-decoration: none;
          transition: background .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 0 16px rgba(37,211,102,.2);
          white-space: nowrap; font-family: 'Montserrat', sans-serif;
        }
        .nav-wa:hover { background: #1fb558; transform: translateY(-1px); box-shadow: 0 0 26px rgba(37,211,102,.35); }

        /* HAMBURGER */
        .hbg {
          display: none;
          width: 38px; height: 38px; border-radius: 8px;
          background: var(--card); border: 1px solid var(--border);
          align-items: center; justify-content: center;
          color: #777; cursor: pointer;
          transition: background .2s, color .2s, border-color .2s;
        }
        .hbg:hover { background: rgba(212,175,55,.08); border-color: rgba(212,175,55,.3); color: var(--gold); }

        /* ══ MOBILE DRAWER ══ */
        .mob-ov {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,.75); backdrop-filter: blur(5px);
          z-index: 1100; animation: fi .2s ease;
        }
        .mob-ov.open { display: block; }
        .mob-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(310px, 88vw);
          background: #080808; border-left: 1px solid var(--border);
          z-index: 1101; display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .3s cubic-bezier(.4,0,.2,1);
          box-shadow: -20px 0 60px rgba(0,0,0,.7);
        }
        .mob-drawer.open { transform: translateX(0); }

        .drw-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 1.4rem; border-bottom: 1px solid var(--border);
        }
        .drw-close {
          width: 32px; height: 32px; border-radius: 7px;
          background: var(--card); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: #666; cursor: pointer; transition: all .2s;
        }
        .drw-close:hover { background: rgba(212,175,55,.1); color: var(--gold); border-color: rgba(212,175,55,.3); }

        .drw-body { flex: 1; overflow-y: auto; padding: .75rem; }

        .drw-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 13px; border-radius: 9px;
          font-size: .83rem; font-weight: 600; color: #777;
          text-decoration: none; cursor: pointer;
          transition: background .2s, color .2s;
          margin-bottom: 2px;
          border: none; background: transparent;
          width: 100%; text-align: left;
          font-family: 'Montserrat', sans-serif;
        }
        .drw-link:hover { background: var(--off); color: #ddd; }
        .drw-link.on { background: rgba(212,175,55,.08); color: var(--gold); }

        .drw-sub {
          margin: 1px 0 4px 14px; padding-left: 10px;
          border-left: 2px solid rgba(212,175,55,.2);
          overflow: hidden; max-height: 0;
          transition: max-height .3s ease;
        }
        .drw-sub.open { max-height: 400px; }
        .drw-sub-item {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 7px;
          font-size: .78rem; font-weight: 500; color: #555;
          text-decoration: none;
          transition: background .15s, color .15s; margin-bottom: 1px;
          font-family: 'Montserrat', sans-serif;
        }
        .drw-sub-item:hover { background: rgba(212,175,55,.06); color: var(--gold); }

        /* contact info in drawer */
        .drw-contact {
          padding: .75rem 1.4rem; border-top: 1px solid var(--border);
          display: flex; flex-direction: column; gap: .5rem;
        }
        .drw-contact-item {
          display: flex; align-items: center; gap: 8px;
          font-size: .72rem; color: #555; text-decoration: none;
          font-family: 'Montserrat', sans-serif; transition: color .2s;
        }
        .drw-contact-item:hover { color: var(--gold); }
        .drw-contact-item svg { color: var(--gold); flex-shrink: 0; }

        .drw-foot {
          padding: 1rem 1.1rem; border-top: 1px solid var(--border);
        }
        .drw-wa {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          width: 100%; padding: 12px;
          background: var(--green); color: #fff;
          font-weight: 700; font-size: .82rem;
          text-transform: uppercase; letter-spacing: .06em;
          border-radius: 8px; text-decoration: none;
          box-shadow: 0 0 18px rgba(37,211,102,.2);
          transition: background .2s, transform .2s;
          font-family: 'Montserrat', sans-serif;
        }
        .drw-wa:hover { background: #1fb558; transform: translateY(-1px); }

        @keyframes fi { from{opacity:0} to{opacity:1} }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 960px) {
          .nav-links, .nav-wa, .nav-phone { display: none !important; }
          .hbg { display: flex; }
          .ann-right { display: none; }
        }
        @media (max-width: 480px) {
          .ann-bar { font-size: .62rem; }
          .nav-inner { height: 56px; }
        }

        /* ══ SPACER ══ */
        .hdr-spacer { height: 98px; transition: height .3s; }
        .hdr-spacer.compact { height: 62px; }
      `}</style>

      {/* ══ FIXED WRAPPER ══ */}
      <div className="hdr-root">

        {/* ANNOUNCEMENT BAR */}
        <div className={`ann-bar${announceHidden ? " hide" : ""}`}>
          <div className="ann-item">
            <FaMapMarkerAlt size={10}/>
            Opp. DAV PG College, Karanpur Chowk, Dehradun – 248001
          </div>
          <div className="ann-right">
            <a href={`tel:+91${PHONE_1}`}><FaPhone size={9}/> +91 {PHONE_1}</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
              <FaWhatsapp size={10}/> WhatsApp
            </a>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <nav className={`nav-bar${scrolled ? " solid" : ""}`}>
          <div className="nav-inner">

            {/* Logo */}
            <Link to="/" className="nav-logo">
              <img
                src={logo}
                alt="All In One Trophy Logo"
                className="logo-img"
                onError={e => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span className="logo-icon-fallback" style={{display:"none"}}>
                <GiTrophy size={20}/>
              </span>
              <div className="logo-text-wrap">
                <div className="logo-main">{BUSINESS_NAME}</div>
                <span className="logo-sub">{BUSINESS_SUB}</span>
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul className="nav-links">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <li key={link.label} className="nav-li" ref={dropdownRef}>
                    <button
                      className={`nav-a${isActive(link.to) ? " on" : ""}`}
                      onClick={() => setDropdownOpen(p => !p)}
                    >
                      {link.label}
                      <FaChevronDown size={9} className={`chev${dropdownOpen ? " up" : ""}`}/>
                    </button>
                    {dropdownOpen && (
                      <div className="nav-drop">
                        {link.dropdown.map(d => (
                          <Link
                            key={d.label} to={d.to}
                            className="drop-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="drop-icon">{d.icon}</div>
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.label} className="nav-li">
                    <Link to={link.to} className={`nav-a${isActive(link.to) ? " on" : ""}`}>
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Right side */}
            <div className="nav-right">
              <a href={`tel:+91${PHONE_1}`} className="nav-phone">
                <FaPhone size={11}/> +91 {PHONE_1}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place an order.")}`}
                className="nav-wa"
                target="_blank" rel="noreferrer"
              >
                <FaWhatsapp size={14}/> Order Now
              </a>
              <button className="hbg" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                <FaBars size={16}/>
              </button>
            </div>

          </div>
        </nav>
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      <div className={`mob-ov${mobileOpen ? " open" : ""}`} onClick={() => setMobileOpen(false)}/>
      <div className={`mob-drawer${mobileOpen ? " open" : ""}`}>

        {/* Drawer header */}
        <div className="drw-head">
          <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            <img
              src={logo} alt="Logo" className="logo-img"
              style={{width:34,height:34}}
              onError={e => { e.target.style.display="none"; }}
            />
            <div className="logo-text-wrap">
              <div className="logo-main" style={{fontSize:".88rem"}}>{BUSINESS_NAME}</div>
              <span className="logo-sub">Dehradun</span>
            </div>
          </Link>
          <button className="drw-close" onClick={() => setMobileOpen(false)}>
            <FaTimes size={14}/>
          </button>
        </div>

        {/* Drawer nav */}
        <div className="drw-body">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  className={`drw-link${isActive(link.to) ? " on" : ""}`}
                  onClick={() => setDropdownOpen(p => !p)}
                >
                  {link.label}
                  <FaChevronDown
                    size={10}
                    style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform .25s" }}
                  />
                </button>
                <div className={`drw-sub${dropdownOpen ? " open" : ""}`}>
                  {link.dropdown.map(d => (
                    <Link
                      key={d.label} to={d.to}
                      className="drw-sub-item"
                      onClick={() => setMobileOpen(false)}
                    >
                      {d.icon} {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label} to={link.to}
                className={`drw-link${isActive(link.to) ? " on" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Contact info in drawer */}
        <div className="drw-contact">
          <a href={`tel:+91${PHONE_1}`} className="drw-contact-item">
            <FaPhone size={11}/> +91 {PHONE_1}
          </a>
          <a href={`tel:+91${PHONE_2}`} className="drw-contact-item">
            <FaPhone size={11}/> +91 {PHONE_2}
          </a>
          <a href="mailto:doontrophy@gmail.com" className="drw-contact-item">
            📧 doontrophy@gmail.com
          </a>
          <span className="drw-contact-item">
            <FaMapMarkerAlt size={11}/> Karanpur Chowk, Dehradun
          </span>
        </div>

        {/* WhatsApp CTA */}
        <div className="drw-foot">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to place an order.")}`}
            className="drw-wa"
            target="_blank" rel="noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            <FaWhatsapp size={17}/> Order on WhatsApp
          </a>
        </div>
      </div>

      {/* SPACER — compensates for fixed header height */}
      <div className={`hdr-spacer${scrolled ? " compact" : ""}`}/>
    </>
  );
}