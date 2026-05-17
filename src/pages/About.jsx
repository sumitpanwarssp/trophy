import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../utils/BreadCrumb";
import { Link } from "react-router-dom";
import {
  FaWhatsapp, FaArrowRight, FaCheckCircle, FaStar,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaQuoteLeft
} from "react-icons/fa";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";
import {
  TbTrophy, TbMedal, TbShield, TbCertificate, TbDiamond, TbPackage
} from "react-icons/tb";
import { MdWorkspacePremium, MdLocalShipping, MdDesignServices } from "react-icons/md";

/* ── REAL BUSINESS INFO ── */
const WHATSAPP = "917533839843";
const PHONE1   = "+91 75338 39843";
const PHONE2   = "+91 82795 16071";
const EMAIL    = "doontrophy@gmail.com";
const ADDRESS  = "Opp. DAV PG College, Karanpur Chowk, Dehradun – 248001";
const GSTIN    = "05HGEPP3764H1Z4";

/* ── DATA ── */
const stats = [
  { end: 100,  suffix: "+",  label: "Happy Customers",  icon: <GiTrophy size={20}/> },
  { end: 500,  suffix: "+",  label: "Awards Delivered", icon: <GiLaurelsTrophy size={20}/> },
  { end: 50,   suffix: "+",  label: "Event Partners",   icon: <TbPackage size={20}/> },
  { end: 100,  suffix: "%",  label: "Satisfaction Rate",icon: <FaCheckCircle size={18}/> },
];

const offerings = [
  { icon: <TbTrophy size={24}/>,        label: "Trophies",              desc: "Gold, silver & crystal finish" },
  { icon: <TbMedal size={24}/>,         label: "Medals",                desc: "Sports & academic medals" },
  { icon: <GiLaurelsTrophy size={24}/>, label: "Mementos",              desc: "Keepsake & souvenir pieces" },
  { icon: <TbShield size={24}/>,        label: "Shields & Plaques",     desc: "Wooden & acrylic shields" },
  { icon: <MdDesignServices size={24}/>,label: "Custom Engraving",      desc: "Names, logos & messages" },
  { icon: <MdWorkspacePremium size={24}/>,label:"Corporate Awards",     desc: "Executive recognition gifts" },
  { icon: <TbCertificate size={24}/>,   label: "Academic Awards",       desc: "School & college prizes" },
  { icon: <TbPackage size={24}/>,       label: "Bulk Orders",           desc: "Special event pricing" },
];

const whyUs = [
  {
    icon: <TbDiamond size={28}/>,
    title: "Premium Quality",
    desc: "We use only the finest materials — crystal, metal, resin & wood — ensuring every award lasts a lifetime and impresses everyone.",
    highlight: "Finest Materials",
  },
  {
    icon: <MdDesignServices size={28}/>,
    title: "Custom Engraving",
    desc: "Your name, your logo, your message — engraved with precision on every product. Fully personalised for every occasion.",
    highlight: "100% Personalised",
  },
  {
    icon: <MdLocalShipping size={28}/>,
    title: "On-Time Delivery",
    desc: "We understand events have deadlines. We guarantee delivery before your event — every single time, no excuses.",
    highlight: "Always On Time",
  },
  {
    icon: <TbPackage size={28}/>,
    title: "Bulk Order Discounts",
    desc: "Schools, colleges, corporates & tournament organizers get special pricing on bulk orders. The more you order, the more you save.",
    highlight: "Best Bulk Rates",
  },
];

const timeline = [
  { year: "Jan 2025",  title: "Founded",            desc: "Started with a dream to provide the highest quality trophies and awards in Dehradun.", dot: "big" },
  { year: "Feb 2025",  title: "First 10 Customers", desc: "Served our first schools and sports clubs, building trust from day one with quality craftsmanship." },
  { year: "Apr 2025",  title: "50+ Customers",       desc: "Word spread fast — corporates and colleges started choosing us for their annual award ceremonies." },
  { year: "Jun 2025",  title: "100+ Customers",      desc: "Crossed 100 happy customers milestone. Expanded our product range to include crystal and acrylic awards." },
  { year: "Today",     title: "Growing Strong",       desc: "Serving Dehradun and beyond, delivering premium awards every day with pride and passion.", dot: "gold" },
];

const testimonials = [
  { name: "Rajesh Sharma",  role: "School Principal, DPS Dehradun",   stars: 5, text: "Outstanding quality and on-time delivery! Our annual prize distribution was a huge success because of their beautiful trophies." },
  { name: "Priya Mehta",    role: "Event Manager, Uttarakhand Sports", stars: 5, text: "Ordered 200+ medals for our district sports meet. Flawless quality, perfect engraving, delivered 2 days early. Highly recommended!" },
  { name: "Amit Verma",     role: "HR Manager, Tech Corp Dehradun",    stars: 5, text: "Our employee appreciation awards looked incredibly premium. The whole team was impressed with the craftsmanship and presentation." },
];

const values = [
  { emoji: "🏅", title: "Excellence",   desc: "Every product meets our highest quality standards before it leaves our shop." },
  { emoji: "🤝", title: "Trust",        desc: "Built on honesty and reliability — 100% of our customers come back." },
  { emoji: "🎨", title: "Creativity",   desc: "We help you design awards that truly represent the occasion." },
  { emoji: "⚡", title: "Speed",        desc: "Quick turnaround without compromising on quality — ever." },
];

/* ── COUNTER HOOK ── */
function useCountUp(end, duration = 1800, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, end, duration]);
  return val;
}

function StatCard({ end, suffix, label, icon, active }) {
  const n = useCountUp(end, 1800, active);
  return (
    <div className="ab-stat">
      <div className="ab-stat-icon">{icon}</div>
      <div className="ab-stat-num">{n}{suffix}</div>
      <div className="ab-stat-lbl">{label}</div>
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,700&family=Montserrat:wght@300;400;500;600;700;800&display=swap');

        :root {
          --gold:   #D4AF37;
          --gold2:  #f5d060;
          --gold3:  #a07800;
          --black:  #0F0F0F;
          --off:    #1A1A1A;
          --card:   #111111;
          --card2:  #0d0d0d;
          --cream:  #F8F4EC;
          --white:  #FFFFFF;
          --tgray:  #E5E5E5;
          --muted:  #777;
          --border: #252525;
          --green:  #25d366;
        }

        .ab { font-family:'Montserrat',sans-serif; background:var(--black); color:var(--tgray); overflow-x:hidden; }

        /* ════ HERO ════ */
        .ab-hero {
          position:relative; min-height:60vh;
          background:var(--off);
          display:flex; align-items:center; justify-content:center;
          text-align:center; padding:5rem 6vw 4rem;
          overflow:hidden;
          border-bottom:1px solid var(--border);
        }
        .ab-hero-bg {
          position:absolute; inset:0;
          background:
            radial-gradient(ellipse at 50% 80%, rgba(212,175,55,.13) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 20%, rgba(212,175,55,.06) 0%, transparent 45%),
            radial-gradient(ellipse at 80% 10%, rgba(212,175,55,.05) 0%, transparent 40%);
          pointer-events:none;
        }
        /* animated gold rings */
        .ab-rings { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
        .ab-ring {
          position:absolute; border-radius:50%;
          border:1px solid rgba(212,175,55,.08);
          top:50%; left:50%; transform:translate(-50%,-50%);
        }
        .ab-r1 { width:280px; height:280px; }
        .ab-r2 { width:480px; height:480px; border-style:dashed; border-color:rgba(212,175,55,.04); animation:rotSlow 30s linear infinite; }
        .ab-r3 { width:680px; height:680px; animation:rotSlow 50s linear infinite reverse; }
        @keyframes rotSlow { to { transform:translate(-50%,-50%) rotate(360deg); } }

        .ab-hero-inner { position:relative; z-index:1; max-width:700px; }
        .ab-eyebrow {
          display:inline-flex; align-items:center; gap:7px;
          font-size:.7rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
          color:var(--gold); background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.22);
          padding:5px 15px; border-radius:100px; margin-bottom:1.3rem;
          animation:fadeUp .5s ease both;
        }
        .ab-hero-title {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.6rem,5vw,5rem); font-weight:900; line-height:1.0;
          color:var(--white); margin-bottom:.5rem;
          animation:fadeUp .5s .07s ease both;
        }
        .ab-hero-title .gld {
          background:linear-gradient(135deg,var(--gold2) 0%,var(--gold) 50%,var(--gold3) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .ab-hero-tagline {
          font-family:'Playfair Display',serif; font-style:italic;
          font-size:clamp(1rem,2vw,1.25rem); color:#666;
          margin:1rem 0 2rem; animation:fadeUp .5s .14s ease both;
        }
        .ab-hero-tagline span { color:var(--gold); }
        .ab-hero-chips {
          display:flex; justify-content:center; gap:.6rem; flex-wrap:wrap;
          animation:fadeUp .5s .2s ease both;
        }
        .hero-chip {
          display:inline-flex; align-items:center; gap:6px;
          padding:5px 13px; border-radius:100px;
          background:rgba(255,255,255,.04); border:1px solid var(--border);
          font-size:.72rem; font-weight:600; color:#888;
        }
        .hero-chip .cdot { width:6px;height:6px;border-radius:50%;background:var(--gold); }

        /* scroll indicator */
        .scroll-hint {
          position:absolute; bottom:1.5rem; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:5px;
          color:#444; font-size:.62rem; letter-spacing:.12em; text-transform:uppercase;
        }
        .scroll-line { width:1px;height:36px;background:linear-gradient(to bottom,var(--gold),transparent); animation:scrollPulse 1.6s ease-in-out infinite; }
        @keyframes scrollPulse { 0%{transform:scaleY(0);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} 51%{transform-origin:bottom} 100%{transform:scaleY(0);transform-origin:bottom} }

        /* ════ SHARED ════ */
        .sec { padding:5.5rem 6vw; }
        .sec-black  { background:var(--black); }
        .sec-off    { background:var(--off); }
        .sec-card   { background:var(--card); }
        .sec-cream  { background:var(--cream); }

        .sec-head { text-align:center; margin-bottom:3.5rem; }
        .divrow { display:flex;align-items:center;gap:1rem;justify-content:center;margin-bottom:.75rem; }
        .dline { width:55px;height:1px;background:linear-gradient(to right,transparent,var(--gold)); }
        .dline.r { background:linear-gradient(to left,transparent,var(--gold)); }
        .dtxt { font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold); }
        .sec-title { font-family:'Playfair Display',serif; font-size:clamp(1.9rem,3vw,2.9rem); font-weight:700; color:var(--white); }
        .sec-title.dark { color:#1a1a1a; }
        .sec-title .gld { color:var(--gold); }
        .sec-sub { color:var(--muted); font-size:.88rem; line-height:1.75; max-width:560px; margin:.75rem auto 0; }
        .sec-sub.dark { color:#555; }
        .gold-bar { width:44px;height:3px;background:var(--gold);border-radius:2px;margin:1rem auto 0; }

        /* ════ WHO WE ARE ════ */
        .who-grid { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }

        .who-visual {
          position:relative; border-radius:16px; overflow:hidden;
          min-height:440px; border:1px solid var(--border);
          background:radial-gradient(circle at 50% 60%,#1a1000,#0d0d0d);
          display:flex; align-items:center; justify-content:center;
        }
        .who-trophy { font-size:9rem; color:rgba(212,175,55,.12); animation:float 3.5s ease-in-out infinite; }
        /* dot grid decoration */
        .who-dots {
          position:absolute; top:1rem; left:-1rem;
          display:grid; grid-template-columns:repeat(6,10px); gap:11px;
          opacity:.06; pointer-events:none;
        }
        .who-dots span { width:4px;height:4px;border-radius:50%;background:var(--gold);display:block; }
        .who-badge1 {
          position:absolute; bottom:1.25rem; left:1.25rem;
          background:linear-gradient(135deg,var(--gold),var(--gold3));
          color:#1a1000; font-weight:800; font-size:.75rem;
          letter-spacing:.08em; text-transform:uppercase;
          padding:.75rem 1.25rem; border-radius:8px;
        }
        .who-badge2 {
          position:absolute; top:1.25rem; right:1.25rem;
          background:rgba(37,211,102,.1); border:1px solid rgba(37,211,102,.3);
          color:#25d366; font-size:.68rem; font-weight:700;
          padding:5px 12px; border-radius:100px; letter-spacing:.08em;
        }
        .who-gstin {
          position:absolute; top:1.25rem; left:1.25rem;
          background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.2);
          color:var(--gold); font-size:.6rem; font-weight:700;
          padding:4px 10px; border-radius:100px; letter-spacing:.06em;
        }

        .who-eyebrow { font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.7rem; }
        .who-title { font-family:'Playfair Display',serif; font-size:clamp(1.6rem,2.5vw,2.4rem); font-weight:700; color:var(--white); line-height:1.15; margin-bottom:1rem; }
        .who-bar { width:44px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:1.25rem; }
        .who-desc { color:var(--muted);font-size:.88rem;line-height:1.85;margin-bottom:1.5rem; }
        .who-info-grid { display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.5rem; }
        .who-info-item {
          display:flex;align-items:flex-start;gap:9px;
          padding:.9rem;background:rgba(212,175,55,.04);
          border:1px solid rgba(212,175,55,.1);border-radius:8px;
        }
        .who-info-icon { color:var(--gold);flex-shrink:0;margin-top:1px; }
        .who-info-label { font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#555;margin-bottom:2px; }
        .who-info-val { font-size:.78rem;color:#ccc;line-height:1.4; }
        .who-checks { display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.75rem; }
        .who-check { display:flex;align-items:center;gap:9px;font-size:.83rem;color:#aaa; }
        .who-check svg { color:var(--gold);flex-shrink:0; }
        .who-btns { display:flex;gap:.85rem;flex-wrap:wrap; }
        .btn-gold {
          display:inline-flex;align-items:center;gap:8px;
          background:var(--gold);color:#1a1000;
          font-weight:700;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;
          padding:12px 22px;border-radius:6px;text-decoration:none;
          transition:background .2s,transform .2s;
        }
        .btn-gold:hover { background:#c9a227;transform:translateY(-2px); }
        .btn-wa {
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;border:1px solid rgba(37,211,102,.3);
          color:var(--green);font-weight:700;font-size:.78rem;
          padding:11px 20px;border-radius:6px;text-decoration:none;
          transition:background .2s,border-color .2s;
        }
        .btn-wa:hover { background:rgba(37,211,102,.06);border-color:rgba(37,211,102,.5); }

        /* ════ STATS ════ */
        .stats-band {
          background:linear-gradient(135deg,#0f0a00 0%,#1a1000 50%,#0f0a00 100%);
          border-top:1px solid rgba(212,175,55,.12);
          border-bottom:1px solid rgba(212,175,55,.12);
          padding:4.5rem 6vw;
        }
        .stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.08);border-radius:12px;overflow:hidden; }
        .ab-stat {
          background:#0f0a00;
          padding:2.5rem 1.5rem; text-align:center;
          display:flex;flex-direction:column;align-items:center;gap:.6rem;
          transition:background .3s;
        }
        .ab-stat:hover { background:#1a1000; }
        .ab-stat-icon { color:var(--gold);opacity:.7; }
        .ab-stat-num {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.5rem,4vw,3.8rem); font-weight:900;
          background:linear-gradient(135deg,var(--gold2),var(--gold));
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
          line-height:1;
        }
        .ab-stat-lbl { color:#555;font-size:.8rem;letter-spacing:.06em; }

        /* ════ TIMELINE ════ */
        .timeline-grid { display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start; }
        .tl-intro-eye { font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.6rem; }
        .tl-intro-title { font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.5vw,2.4rem);font-weight:700;color:var(--white);line-height:1.15;margin-bottom:1rem; }
        .tl-intro-bar { width:44px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:1.2rem; }
        .tl-intro-desc { color:var(--muted);font-size:.87rem;line-height:1.85; }

        .timeline { position:relative;padding-left:1.75rem; }
        .timeline::before {
          content:'';position:absolute;left:0;top:10px;bottom:0;width:1px;
          background:linear-gradient(to bottom,var(--gold),rgba(212,175,55,.05));
        }
        .tl-item { position:relative;padding-bottom:2.25rem;padding-left:1.5rem; }
        .tl-item:last-child { padding-bottom:0; }
        .tl-dot {
          position:absolute;left:-1.75rem;top:8px;
          width:13px;height:13px;border-radius:50%;
          background:var(--gold);border:2px solid var(--black);
          box-shadow:0 0 10px rgba(212,175,55,.45);
          transform:translateX(-50%);
        }
        .tl-dot.big { width:16px;height:16px;box-shadow:0 0 16px rgba(212,175,55,.6); }
        .tl-year { font-size:.65rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.3rem; }
        .tl-title { font-weight:700;font-size:.95rem;color:var(--white);margin-bottom:.3rem; }
        .tl-desc { font-size:.8rem;color:#555;line-height:1.65; }

        /* ════ OFFERINGS ════ */
        .off-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem; }
        .off-card {
          background:var(--card);border:1px solid var(--border);
          border-radius:12px;padding:1.6rem 1rem 1.4rem;
          text-align:center;display:flex;flex-direction:column;align-items:center;gap:.65rem;
          transition:border-color .3s,transform .3s,box-shadow .3s;
          position:relative;overflow:hidden;
          animation:fadeUp .5s ease both;
        }
        .off-card::before {
          content:'';position:absolute;inset:0;
          background:radial-gradient(circle at 50% 0%,rgba(212,175,55,.07) 0%,transparent 65%);
          opacity:0;transition:opacity .3s;
        }
        .off-card:hover { border-color:var(--gold);transform:translateY(-5px);box-shadow:0 14px 36px rgba(0,0,0,.4); }
        .off-card:hover::before { opacity:1; }
        .off-icon { width:52px;height:52px;border-radius:13px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.18);display:flex;align-items:center;justify-content:center;color:var(--gold);position:relative;z-index:1;transition:background .3s; }
        .off-card:hover .off-icon { background:rgba(212,175,55,.15); }
        .off-label { font-weight:700;font-size:.82rem;color:var(--white);position:relative;z-index:1; }
        .off-desc { font-size:.7rem;color:#555;position:relative;z-index:1;line-height:1.45; }

        /* ════ VALUES ════ */
        .values-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem; }
        .val-card {
          background:var(--card2);border:1px solid var(--border);
          border-radius:14px;padding:2rem 1.25rem;text-align:center;
          transition:border-color .3s,transform .3s;
        }
        .val-card:hover { border-color:rgba(212,175,55,.3);transform:translateY(-4px); }
        .val-emoji { font-size:2.5rem;margin-bottom:.75rem;display:block; }
        .val-title { font-weight:700;font-size:.9rem;color:var(--white);margin-bottom:.5rem; }
        .val-desc { font-size:.78rem;color:#555;line-height:1.6; }

        /* ════ WHY US ════ */
        .why-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem; }
        .why-card {
          background:var(--card);border:1px solid var(--border);
          border-radius:14px;padding:1.75rem;
          display:flex;align-items:flex-start;gap:1.1rem;
          transition:border-color .3s,transform .3s;
          position:relative;overflow:hidden;
        }
        .why-card::after { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--gold);transform:scaleY(0);transition:transform .3s;transform-origin:bottom; }
        .why-card:hover { border-color:rgba(212,175,55,.3);transform:translateX(4px); }
        .why-card:hover::after { transform:scaleY(1); }
        .why-icon-box { width:52px;height:52px;min-width:52px;border-radius:12px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.18);display:flex;align-items:center;justify-content:center;color:var(--gold); }
        .why-hi { font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--gold);margin-bottom:.3rem; }
        .why-title { font-weight:700;font-size:.93rem;color:var(--white);margin-bottom:.4rem; }
        .why-desc { font-size:.81rem;color:#666;line-height:1.7; }

        /* ════ TESTIMONIALS ════ */
        .testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:1.35rem; }
        .testi-card {
          background:var(--card);border:1px solid var(--border);
          border-radius:14px;padding:1.75rem;
          transition:border-color .3s,transform .3s,box-shadow .3s;
        }
        .testi-card:hover { border-color:rgba(212,175,55,.3);transform:translateY(-5px);box-shadow:0 18px 44px rgba(0,0,0,.35); }
        .testi-top { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.85rem; }
        .testi-stars { display:flex;gap:3px;color:var(--gold);font-size:.7rem; }
        .testi-quote { color:rgba(212,175,55,.18);font-size:2.8rem;line-height:1; }
        .testi-text { color:#6a6a6a;font-size:.83rem;line-height:1.75;margin-bottom:1.4rem; font-style:italic; }
        .testi-foot { display:flex;align-items:center;gap:.8rem;padding-top:1rem;border-top:1px solid var(--border); }
        .testi-av { width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold3));display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.8rem;color:#1a1000;flex-shrink:0; }
        .testi-name { font-weight:700;font-size:.83rem;color:#e0e0e0; }
        .testi-role { font-size:.68rem;color:#555;margin-top:1px; }

        /* ════ CONTACT BAND (CREAM) ════ */
        .contact-band { background:var(--cream);padding:4rem 6vw; }
        .cb-inner { display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;max-width:960px;margin:0 auto; }
        .cb-title { font-family:'Playfair Display',serif;font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:700;color:#1a1a1a;margin-bottom:.85rem; }
        .cb-title span { color:var(--gold); }
        .cb-desc { color:#666;font-size:.85rem;line-height:1.8;margin-bottom:1.5rem; }
        .cb-items { display:flex;flex-direction:column;gap:.85rem; }
        .cb-item { display:flex;align-items:flex-start;gap:.85rem;text-decoration:none;color:inherit;transition:transform .2s; }
        .cb-item:hover { transform:translateX(4px); }
        .cb-item-icon { width:36px;height:36px;min-width:36px;border-radius:8px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.2);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0; }
        .cb-item.wa .cb-item-icon { background:rgba(37,211,102,.1);border-color:rgba(37,211,102,.25);color:var(--green); }
        .cb-label { font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#888;margin-bottom:2px; }
        .cb-val { font-size:.82rem;color:#444;line-height:1.45; }
        .cb-item:hover .cb-val { color:var(--gold); }
        .cb-item.wa:hover .cb-val { color:var(--green); }
        .cb-gstin { margin-top:1rem;padding:.75rem 1rem;background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.15);border-radius:7px;font-size:.72rem;color:#888; }
        .cb-gstin strong { color:var(--gold); }

        /* ════ CTA FINAL ════ */
        .ab-cta {
          text-align:center;padding:6rem 6vw;
          background:radial-gradient(ellipse at center,#1a1000 0%,var(--black) 65%);
          position:relative;overflow:hidden;
          border-top:1px solid rgba(212,175,55,.1);
        }
        .ab-cta::before { content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:550px;height:200px;background:radial-gradient(ellipse,rgba(212,175,55,.07) 0%,transparent 70%);pointer-events:none; }
        .cta-title { font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:900;color:var(--white);margin-bottom:.85rem;position:relative;z-index:1; }
        .cta-gold { color:var(--gold); }
        .cta-sub { color:var(--muted);font-size:.9rem;max-width:480px;margin:0 auto 2.25rem;line-height:1.7;position:relative;z-index:1; }
        .cta-divider { width:48px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto 2rem;position:relative;z-index:1; }
        .cta-btns { display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;z-index:1; }

        /* ════ ANIMATIONS ════ */
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-16px) rotate(4deg)} }

        /* ════ RESPONSIVE ════ */
        @media(max-width:1000px) { .off-grid{grid-template-columns:repeat(2,1fr)} .values-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:800px)  {
          .who-grid{grid-template-columns:1fr} .who-visual{display:none}
          .timeline-grid{grid-template-columns:1fr}
          .why-grid{grid-template-columns:1fr}
          .testi-grid{grid-template-columns:1fr}
          .cb-inner{grid-template-columns:1fr}
          .stats-grid{grid-template-columns:repeat(2,1fr)}
          .who-info-grid{grid-template-columns:1fr}
        }
        @media(max-width:500px) {
          .off-grid{grid-template-columns:repeat(2,1fr)}
          .values-grid{grid-template-columns:1fr 1fr}
          .sec{padding:3.5rem 5vw}
        }
      `}</style>

      <div className="ab">
        <Breadcrumb items={[{ label: "About Us" }]} />

        {/* ════ HERO ════ */}
        <div className="ab-hero">
          <div className="ab-hero-bg"/>
          <div className="ab-rings">
            <div className="ab-ring ab-r1"/><div className="ab-ring ab-r2"/><div className="ab-ring ab-r3"/>
          </div>
          <div className="ab-hero-inner">
            <div className="ab-eyebrow"><GiTrophy size={11}/> Our Story</div>
            <h1 className="ab-hero-title">
              We Craft <span className="gld">Excellence.</span><br/>
              We Deliver <span className="gld">Pride.</span>
            </h1>
            <p className="ab-hero-tagline">
              <span>"</span>Celebrating every achievement, one award at a time — since 2025<span>"</span>
            </p>
            <div className="ab-hero-chips">
              {["Dehradun Based","Premium Quality","Custom Engraving","Bulk Orders","All India Delivery"].map((c,i)=>(
                <div className="hero-chip" key={i}><div className="cdot"/>{c}</div>
              ))}
            </div>
          </div>
          <div className="scroll-hint">
            <span>Scroll</span><div className="scroll-line"/>
          </div>
        </div>

        {/* ════ WHO WE ARE ════ */}
        <div className="sec sec-black">
          <div className="who-grid">
            {/* Visual */}
            <div className="who-visual">
              <div className="who-dots">{Array(30).fill(null).map((_,i)=><span key={i}/>)}</div>
              <div className="who-trophy"><GiTrophy/></div>
              <div className="who-gstin">GSTIN: {GSTIN}</div>
              <div className="who-badge2">✓ Est. 1 Jan 2025</div>
              <div className="who-badge1">Dehradun's Trophy Center</div>
            </div>
            {/* Text */}
            <div>
              <div className="who-eyebrow">Who We Are</div>
              <h2 className="who-title">All In One Trophy<br/>&amp; Memento Center</h2>
              <div className="who-bar"/>
              <p className="who-desc">
                We are Dehradun's dedicated destination for premium trophies, medals, mementos, shields and customized awards. Located opposite DAV PG College, Karanpur Chowk, we proudly serve schools, colleges, corporates, and events across India with the highest quality recognition products.
              </p>

              {/* Quick info grid */}
              <div className="who-info-grid">
                <div className="who-info-item">
                  <FaMapMarkerAlt className="who-info-icon" size={14}/>
                  <div>
                    <div className="who-info-label">Address</div>
                    <div className="who-info-val">Opp. DAV PG College,<br/>Karanpur Chowk, Dehradun</div>
                  </div>
                </div>
                <div className="who-info-item">
                  <FaPhone className="who-info-icon" size={13}/>
                  <div>
                    <div className="who-info-label">Contact</div>
                    <div className="who-info-val">{PHONE1}<br/>{PHONE2}</div>
                  </div>
                </div>
                <div className="who-info-item">
                  <FaEnvelope className="who-info-icon" size={13}/>
                  <div>
                    <div className="who-info-label">Email</div>
                    <div className="who-info-val">{EMAIL}</div>
                  </div>
                </div>
                <div className="who-info-item">
                  <GiTrophy className="who-info-icon" size={15}/>
                  <div>
                    <div className="who-info-label">Business Type</div>
                    <div className="who-info-val">Wholesale &amp; Retail Supplier</div>
                  </div>
                </div>
              </div>

              <div className="who-checks">
                {["Premium quality craftsmanship on every product","Custom name, logo & message engraving","Serving all event types — sports, academic, corporate","Fast delivery across Dehradun and all India"].map((p,i)=>(
                  <div className="who-check" key={i}><FaCheckCircle size={13}/>{p}</div>
                ))}
              </div>

              <div className="who-btns">
                <Link to="/contact" className="btn-gold">Get a Free Quote <FaArrowRight size={11}/></Link>
                <a href={`https://wa.me/${WHATSAPP}`} className="btn-wa" target="_blank" rel="noreferrer">
                  <FaWhatsapp size={14}/> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ════ STATS ════ */}
        <div className="stats-band" ref={statsRef}>
          <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <div className="divrow"><div className="dline r"/><div className="dtxt">By The Numbers</div><div className="dline"/></div>
            <div className="sec-title">Our <span className="gld">Achievements</span></div>
          </div>
          <div className="stats-grid">
            {stats.map((s,i)=>(
              <StatCard key={i} end={s.end} suffix={s.suffix} label={s.label} icon={s.icon} active={statsOn}/>
            ))}
          </div>
        </div>

        {/* ════ JOURNEY / TIMELINE ════ */}
        <div className="sec sec-off">
          <div className="timeline-grid">
            <div>
              <div className="tl-intro-eye">Our Journey</div>
              <div className="tl-intro-title">From a Vision<br/>to <span style={{color:"var(--gold)"}}>Reality</span></div>
              <div className="tl-intro-bar"/>
              <p className="tl-intro-desc">
                We started on 1st January 2025 with a clear vision — to become Dehradun's most trusted trophy and award supplier. In just a few months, we've served over 100 happy customers and are growing every day, driven by passion and the trust our clients place in us.
              </p>
            </div>
            <div className="timeline">
              {timeline.map((t,i)=>(
                <div className="tl-item" key={i}>
                  <div className={`tl-dot${t.dot==="big"||t.dot==="gold"?" big":""}`}/>
                  <div className="tl-year">{t.year}</div>
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ WHAT WE OFFER ════ */}
        <div className="sec sec-black">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Our Products</div><div className="dline"/></div>
            <div className="sec-title">What We <span className="gld">Offer</span></div>
            <p className="sec-sub">From individual trophies to bulk event awards — we have it all, custom made to perfection.</p>
            <div className="gold-bar"/>
          </div>
          <div className="off-grid">
            {offerings.map((o,i)=>(
              <div className="off-card" key={i} style={{animationDelay:`${i*.06}s`}}>
                <div className="off-icon">{o.icon}</div>
                <div className="off-label">{o.label}</div>
                <div className="off-desc">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ OUR VALUES ════ */}
        <div className="sec sec-off">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Our Values</div><div className="dline"/></div>
            <div className="sec-title">What <span className="gld">Drives Us</span></div>
            <p className="sec-sub">These are the principles behind every trophy we make and every customer we serve.</p>
          </div>
          <div className="values-grid">
            {values.map((v,i)=>(
              <div className="val-card" key={i}>
                <span className="val-emoji">{v.emoji}</span>
                <div className="val-title">{v.title}</div>
                <div className="val-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ WHY CHOOSE US ════ */}
        <div className="sec sec-black">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Why Choose Us</div><div className="dline"/></div>
            <div className="sec-title">Crafted with <span className="gld">Excellence</span></div>
            <p className="sec-sub">Four reasons our customers keep coming back — and recommending us to everyone they know.</p>
          </div>
          <div className="why-grid">
            {whyUs.map((w,i)=>(
              <div className="why-card" key={i}>
                <div className="why-icon-box">{w.icon}</div>
                <div>
                  <div className="why-hi">{w.highlight}</div>
                  <div className="why-title">{w.title}</div>
                  <div className="why-desc">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ TESTIMONIALS ════ */}
        <div className="sec sec-off">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Testimonials</div><div className="dline"/></div>
            <div className="sec-title">What Our <span className="gld">Clients Say</span></div>
          </div>
          <div className="testi-grid">
            {testimonials.map((t,i)=>(
              <div className="testi-card" key={i}>
                <div className="testi-top">
                  <div className="testi-stars">{Array(t.stars).fill(null).map((_,j)=><FaStar key={j}/>)}</div>
                  <FaQuoteLeft className="testi-quote" size={28}/>
                </div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-foot">
                  <div className="testi-av">{t.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════ CONTACT INFO BAND (cream bg) ════ */}
        <div className="contact-band">
          <div className="cb-inner">
            <div>
              <div style={{fontSize:".68rem",fontWeight:700,letterSpacing:".18em",textTransform:"uppercase",color:"var(--gold)",marginBottom:".6rem"}}>Find Us</div>
              <div className="cb-title">Visit Our <span>Shop</span></div>
              <p className="cb-desc">
                Walk in anytime during business hours or call ahead. We'd love to show you our full collection in person and help you choose the perfect award.
              </p>
              <div style={{fontSize:".72rem",color:"#888",background:"rgba(212,175,55,.07)",border:"1px solid rgba(212,175,55,.15)",borderRadius:7,padding:".6rem .9rem",display:"inline-block",marginBottom:"1.25rem"}}>
                🕐 Mon – Sat: 10:00 AM – 7:00 PM
              </div>
              <Link to="/contact" className="btn-gold" style={{display:"inline-flex"}}>
                Contact Us <FaArrowRight size={11}/>
              </Link>
            </div>
            <div className="cb-items">
              <a href={`https://maps.google.com/?q=Opp+DAV+PG+College+Karanpur+Chowk+Dehradun`} className="cb-item" target="_blank" rel="noreferrer">
                <div className="cb-item-icon"><FaMapMarkerAlt size={14}/></div>
                <div><div className="cb-label">Address</div><div className="cb-val">{ADDRESS}</div></div>
              </a>
              <a href={`tel:+91${PHONE1.replace(/\D/g,"")}`} className="cb-item">
                <div className="cb-item-icon"><FaPhone size={13}/></div>
                <div><div className="cb-label">Phone 1</div><div className="cb-val">{PHONE1}</div></div>
              </a>
              <a href={`tel:+91${PHONE2.replace(/\D/g,"")}`} className="cb-item">
                <div className="cb-item-icon"><FaPhone size={13}/></div>
                <div><div className="cb-label">Phone 2</div><div className="cb-val">{PHONE2}</div></div>
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} className="cb-item wa" target="_blank" rel="noreferrer">
                <div className="cb-item-icon"><FaWhatsapp size={15}/></div>
                <div><div className="cb-label">WhatsApp</div><div className="cb-val">+91 75338 39843</div></div>
              </a>
              <a href={`mailto:${EMAIL}`} className="cb-item">
                <div className="cb-item-icon"><FaEnvelope size={13}/></div>
                <div><div className="cb-label">Email</div><div className="cb-val">{EMAIL}</div></div>
              </a>
              <div className="cb-gstin">GSTIN: <strong>{GSTIN}</strong> &nbsp;·&nbsp; Wholesale &amp; Retail Supplier</div>
            </div>
          </div>
        </div>

        {/* ════ FINAL CTA ════ */}
        <div className="ab-cta">
          <div className="cta-divider"/>
          <h2 className="cta-title">
            Ready to <span className="cta-gold">Celebrate Success?</span>
          </h2>
          <p className="cta-sub">
            Contact us today for custom trophies, medals &amp; awards for your next event. Bulk orders welcome — special pricing available!
          </p>
          <div className="cta-btns">
            <Link to="/order" className="btn-gold" style={{padding:"14px 28px",fontSize:".85rem"}}>
              Order Online <FaArrowRight size={12}/>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to know more about your trophy collection and pricing.")}`}
              className="btn-wa"
              style={{padding:"13px 26px",fontSize:".85rem"}}
              target="_blank" rel="noreferrer"
            >
              <FaWhatsapp size={16}/> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}