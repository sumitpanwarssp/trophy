import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp, FaArrowRight, FaStar, FaHeadset,
} from "react-icons/fa";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";
import { TbDiamond } from "react-icons/tb";
import { MdDesignServices, MdLocalShipping } from "react-icons/md";

// ── IMAGE IMPORTS ──
import heroTrophy   from "../assets/OTHER/Home.png";
import sportsTrophy from "../assets/OTHER/sports-trophy.png.png";
import corpTrophy   from "../assets/OTHER/corporate-trophy.png.png";
import acadTrophy   from "../assets/OTHER/academic-trophy.png.png";
import medalImg     from "../assets/OTHER/medal.png.png";
import shieldImg    from "../assets/OTHER/shield.png.png";

const WHATSAPP = "91XXXXXXXXXX";

/* ─── DATA ─── */
const categories = [
  { label: "Trophies",        img: sportsTrophy, href: "/trophies" },
  { label: "Mementos",        img: acadTrophy,   href: "/trophies" },
  { label: "Medals",          img: medalImg,     href: "/trophies" },
  { label: "Awards",          img: corpTrophy,   href: "/trophies" },
  { label: "Corporate Gifts", img: shieldImg,    href: "/trophies" },
  { label: "Customized",      img: sportsTrophy, href: "/contact"  },
];

const whyUs = [
  { icon: <TbDiamond size={34}/>,        title: "Premium Quality",  desc: "We use the finest quality materials to ensure long lasting products." },
  { icon: <MdDesignServices size={34}/>, title: "Customization",    desc: "Personalized designs as per your requirements." },
  { icon: <MdLocalShipping size={34}/>,  title: "Fast Delivery",    desc: "Timely delivery across India with safe packaging." },
  { icon: <FaHeadset size={30}/>,        title: "Customer Support", desc: "We are always here to assist you with the best service." },
];

const aboutStats = [
  { value: "10+",       label: "Years of Experience", icon: <GiTrophy size={22}/> },
  { value: "5000+",     label: "Happy Customers",     icon: <GiLaurelsTrophy size={22}/> },
  { value: "1000+",     label: "Unique Designs",      icon: <MdDesignServices size={22}/> },
  { value: "All India", label: "Delivery",            icon: <MdLocalShipping size={22}/> },
];

const testimonials = [
  { name: "Rajesh Sharma", role: "School Principal", stars: 5, text: "Outstanding quality! Our annual prize distribution ceremony was elevated with these beautiful handcrafted trophies. Highly recommend!" },
  { name: "Priya Mehta",   role: "Event Manager",    stars: 5, text: "Fast delivery and perfect custom engraving every time. Best place for bulk event orders in Dehradun without any doubt." },
  { name: "Amit Verma",    role: "HR Manager",       stars: 5, text: "Corporate awards looked incredibly premium. Our entire team was absolutely thrilled with the quality and finish." },
];

/* ─── COUNTER HOOK ─── */
function useCountUp(target, active) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active || isNaN(parseInt(target))) return;
    const n = parseInt(target); let s = null;
    const step = ts => { if (!s) s = ts; const p = Math.min((ts - s) / 1600, 1); setV(Math.floor(p * n)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [active]);
  return v;
}

function StatCard({ value, label, icon, active }) {
  const suffix = value.replace(/[\d,]/g, "");
  const n = useCountUp(value, active);
  const display = isNaN(parseInt(value)) ? value : n.toLocaleString() + suffix;
  return (
    <div className="abt-stat">
      <div className="abt-stat-icon">{icon}</div>
      <div>
        <div className="abt-stat-val">{display}</div>
        <div className="abt-stat-lbl">{label}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide]     = useState(0);
  const [statsOn, setStatsOn] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % 3), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: .3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Montserrat:wght@400;500;600;700;800&display=swap');

        :root {
          --gold:   #D4AF37;
          --gold2:  #F5E6C8;
          --gold3:  #a07800;
          --black:  #0F0F0F;
          --off:    #1A1A1A;
          --card:   #141414;
          --white:  #FFFFFF;
          --tgray:  #E5E5E5;
          --muted:  #888888;
          --border: #2a2a2a;
          --cream:  #F8F4EC;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hp {
          font-family: 'Montserrat', sans-serif;
          background: var(--black);
          color: var(--tgray);
          overflow-x: hidden;
        }

        /* ════════════════════════════════
           HERO
        ════════════════════════════════ */
        .hero {
          min-height: 88vh;
          background: var(--off);
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 0 6vw;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 72% 35%, rgba(212,175,55,.16) 0%, transparent 55%),
            radial-gradient(ellipse at 8%  80%, rgba(212,175,55,.07) 0%, transparent 45%);
          pointer-events: none;
        }
        .hero-dots-bg {
          position: absolute; right: 3vw; top: 50%; transform: translateY(-50%);
          display: grid; grid-template-columns: repeat(8,10px); gap: 10px;
          opacity: .06; pointer-events: none;
        }
        .hero-dots-bg span { width:4px; height:4px; border-radius:50%; background:var(--gold); display:block; }
        .hero-left { position: relative; z-index: 2; padding: 4rem 0; }
        .h-eyebrow {
          display: block;
          font-size: .7rem; font-weight: 700; letter-spacing: .22em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.1rem;
          animation: fadeUp .5s ease both;
        }
        .h-title-white {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem,5vw,5.5rem);
          font-weight: 900; color: var(--white);
          line-height: .95;
          animation: fadeUp .5s .07s ease both;
        }
        .h-title-gold {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem,5vw,5.5rem);
          font-weight: 900;
          background: linear-gradient(135deg,#f5d060 0%,#D4AF37 55%,#a07800 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1.05; display: block;
          margin-bottom: 1.6rem;
          animation: fadeUp .5s .12s ease both;
        }
        .h-desc {
          color: #aaa; font-size: .88rem; line-height: 1.85;
          max-width: 400px; margin-bottom: 2.2rem;
          animation: fadeUp .5s .17s ease both;
        }
        .h-btns { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp .5s .22s ease both; }
        .btn-gold-fill {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--gold); color: var(--black);
          font-weight: 700; font-size: .78rem;
          text-transform: uppercase; letter-spacing: .07em;
          padding: 13px 26px; border-radius: 3px;
          text-decoration: none;
          transition: background .2s, transform .2s;
          border: 2px solid var(--gold);
        }
        .btn-gold-fill:hover { background: #c9a227; border-color: #c9a227; transform: translateY(-2px); }
        .btn-gold-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--white);
          font-weight: 700; font-size: .78rem;
          text-transform: uppercase; letter-spacing: .07em;
          padding: 11px 24px; border-radius: 3px;
          border: 2px solid rgba(255,255,255,.3);
          text-decoration: none;
          transition: border-color .2s, color .2s;
        }
        .btn-gold-outline:hover { border-color: var(--gold); color: var(--gold); }
        .hero-slide-dots { display: flex; gap: 8px; margin-top: 2.5rem; animation: fadeUp .5s .28s ease both; }
        .slide-dot { width: 30px; height: 3px; border-radius: 2px; background: #333; cursor: pointer; transition: background .3s, width .3s; }
        .slide-dot.on { background: var(--gold); width: 48px; }
        .hero-right { display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }
        .hero-img-stage { position: relative; animation: float 3.5s ease-in-out infinite; }
        .hero-img { width: clamp(280px,40vw,520px); filter: drop-shadow(0 40px 80px rgba(212,175,55,.3)); }
        .hero-glow { position: absolute; width: 65%; height: 65%; bottom: -8%; left: 17%; background: radial-gradient(circle,rgba(212,175,55,.2) 0%,transparent 70%); filter: blur(35px); border-radius: 50%; }
        .sparkle { position: absolute; border-radius: 50%; background: var(--gold); opacity: .6; animation: sparkle 2s ease-in-out infinite; }
        .sp1 { width:8px; height:8px; top:10%; right:5%; animation-delay:0s; }
        .sp2 { width:5px; height:5px; top:60%; left:2%; animation-delay:.7s; }
        .sp3 { width:6px; height:6px; bottom:20%; right:10%; animation-delay:1.4s; }
        @keyframes sparkle { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:.8;transform:scale(1.2)} }

        /* ════════════════════════════════
           MARQUEE
        ════════════════════════════════ */
        .mq-wrap { background: var(--gold); padding: 12px 0; overflow: hidden; display: flex; }
        .mq-track { display: flex; gap: 3rem; animation: mq 22s linear infinite; white-space: nowrap; }
        .mq-item { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; color: var(--black); }
        .mq-sep { color: rgba(0,0,0,.3); font-size: 1rem; }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ════════════════════════════════
           SHARED SECTION STYLES
        ════════════════════════════════ */
        .sec { padding: 5.5rem 6vw; }
        .sec-black { background: var(--black); }
        .sec-off   { background: var(--off); }
        .sec-cream { background: var(--cream); color: #1a1a1a; }
        .sec-head { text-align: center; margin-bottom: 3.5rem; }
        .divrow { display: flex; align-items: center; gap: 1rem; justify-content: center; margin-bottom: .8rem; }
        .dline { width: 60px; height: 1px; background: linear-gradient(to right,transparent,var(--gold)); }
        .dline.r { background: linear-gradient(to left,transparent,var(--gold)); }
        .dtxt { font-size: .65rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); }
        .sec-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem,3vw,2.9rem); font-weight: 700; color: var(--white); }

        /* ════════════════════════════════
           CATEGORY SECTION
        ════════════════════════════════ */
        .cat-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 1.1rem; }
        .cat-card {
          background: var(--card); border: 1px solid var(--border); border-radius: 6px;
          padding: 1.75rem .75rem 1.4rem; text-align: center; text-decoration: none;
          display: flex; flex-direction: column; align-items: center;
          transition: border-color .3s, transform .3s, box-shadow .3s;
          position: relative; overflow: hidden;
        }
        .cat-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 0%,rgba(212,175,55,.07) 0%,transparent 65%); opacity: 0; transition: opacity .3s; }
        .cat-card:hover { border-color: var(--gold); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(212,175,55,.14); }
        .cat-card:hover::before { opacity: 1; }
        .cat-img { width: 85px; height: 115px; object-fit: contain; margin-bottom: 1rem; filter: drop-shadow(0 8px 20px rgba(212,175,55,.22)); transition: transform .4s; position: relative; z-index: 1; }
        .cat-card:hover .cat-img { transform: scale(1.1) translateY(-5px); }
        .cat-label { font-weight: 700; font-size: .78rem; color: var(--white); text-transform: uppercase; letter-spacing: .08em; margin-bottom: .55rem; position: relative; z-index: 1; }
        .cat-link { display: inline-flex; align-items: center; gap: 5px; font-size: .7rem; color: var(--gold); font-weight: 700; letter-spacing: .04em; position: relative; z-index: 1; }

        /* ════════════════════════════════
           WHY CHOOSE US
        ════════════════════════════════ */
        .why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
        .why-card { background: var(--card); padding: 3rem 1.5rem 2.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.1rem; transition: background .3s; position: relative; overflow: hidden; }
        .why-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform .3s; }
        .why-card:hover { background: #181818; }
        .why-card:hover::after { transform: scaleX(1); }
        .why-icon { width: 70px; height: 70px; border-radius: 50%; border: 1.5px solid var(--gold); display: flex; align-items: center; justify-content: center; color: var(--gold); transition: background .3s, box-shadow .3s; }
        .why-card:hover .why-icon { background: rgba(212,175,55,.08); box-shadow: 0 0 20px rgba(212,175,55,.2); }
        .why-title { font-weight: 700; font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; color: var(--white); }
        .why-desc { color: var(--muted); font-size: .8rem; line-height: 1.7; max-width: 200px; }

        /* ════════════════════════════════
           ABOUT SECTION
        ════════════════════════════════ */
        .about-wrap { display: grid; grid-template-columns: 1.1fr 1fr 0.9fr; gap: 3.5rem; align-items: center; }
        .about-img-col { position: relative; border-radius: 10px; overflow: hidden; min-height: 420px; background: linear-gradient(145deg,#1a1a00,#0d0d0d); border: 1px solid rgba(212,175,55,.2); display: flex; align-items: center; justify-content: center; }
        .about-big-trophy { font-size: 9rem; color: rgba(212,175,55,.12); animation: float 3.5s ease-in-out infinite; }
        .about-dots { position: absolute; top: 0; left: -20px; display: grid; grid-template-columns: repeat(5,10px); gap: 12px; opacity: .08; pointer-events: none; }
        .about-dots span { width:4px; height:4px; border-radius:50%; background:var(--gold); display:block; }
        .about-img-badge { position: absolute; bottom: 1rem; left: 1rem; right: 1rem; background: linear-gradient(135deg,var(--gold),var(--gold3)); color: var(--black); font-weight: 700; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; padding: .8rem 1rem; border-radius: 4px; text-align: center; }
        .about-eyebrow { font-size: .68rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: .6rem; }
        .about-title { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem,2.5vw,2.3rem); font-weight: 700; color: #1a1a1a; line-height: 1.2; margin-bottom: 1rem; }
        .about-bar { width: 44px; height: 3px; background: var(--gold); border-radius: 2px; margin-bottom: 1.2rem; }
        .about-desc { color: #555; font-size: .85rem; line-height: 1.85; margin-bottom: 1.75rem; }
        .about-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--gold); color: var(--black); font-weight: 700; font-size: .75rem; text-transform: uppercase; letter-spacing: .08em; padding: 12px 22px; border-radius: 3px; text-decoration: none; transition: background .2s, transform .2s; }
        .about-btn:hover { background: #c9a227; transform: translateY(-1px); }
        .about-stats { display: flex; flex-direction: column; gap: 1.1rem; }
        .abt-stat { display: flex; align-items: center; gap: 1rem; padding: 1.1rem 1.25rem; background: var(--white); border: 1px solid #e8dfc8; border-left: 3px solid var(--gold); border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,.05); transition: transform .2s, box-shadow .2s; }
        .abt-stat:hover { transform: translateX(5px); box-shadow: 0 4px 18px rgba(0,0,0,.1); }
        .abt-stat-icon { width: 40px; height: 40px; border-radius: 8px; background: rgba(212,175,55,.1); display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; }
        .abt-stat-val { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--gold); line-height: 1; }
        .abt-stat-lbl { font-size: .72rem; color: #666; margin-top: 2px; font-weight: 500; }

        /* ════════════════════════════════
           FEATURED PRODUCTS STRIP
        ════════════════════════════════ */
        .products-strip { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.25rem; }
        .prod-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; transition: border-color .3s, transform .3s, box-shadow .3s; cursor: pointer; }
        .prod-card:hover { border-color: var(--gold); transform: translateY(-6px); box-shadow: 0 18px 44px rgba(212,175,55,.13); }
        .prod-img-wrap { background: radial-gradient(circle at 50% 60%,#1a1000,#0f0f0f); display: flex; align-items: center; justify-content: center; padding: 2rem 1rem 1.5rem; position: relative; overflow: hidden; }
        .prod-img { width: 90px; height: 120px; object-fit: contain; filter: drop-shadow(0 10px 24px rgba(212,175,55,.25)); transition: transform .4s; }
        .prod-card:hover .prod-img { transform: scale(1.08) translateY(-5px); }
        .prod-badge { position: absolute; top: 10px; left: 10px; background: var(--gold); color: var(--black); font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; padding: 3px 9px; border-radius: 2px; }
        .prod-body { padding: 1.1rem; }
        .prod-stars { display: flex; gap: 2px; color: var(--gold); font-size: .65rem; margin-bottom: .5rem; }
        .prod-name { font-weight: 700; font-size: .88rem; color: var(--white); margin-bottom: .3rem; }
        .prod-price { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--gold); margin-bottom: .9rem; }
        .prod-btn { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; padding: 9px; background: var(--gold); color: var(--black); font-weight: 700; font-size: .75rem; text-transform: uppercase; letter-spacing: .06em; border-radius: 3px; text-decoration: none; transition: background .2s; }
        .prod-btn:hover { background: #c9a227; }

        /* ════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════ */
        .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .testi-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 2rem; transition: border-color .3s, transform .3s, box-shadow .3s; position: relative; }
        .testi-card:hover { border-color: var(--gold); transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,.3); }
        .testi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .testi-stars { display: flex; gap: 3px; color: var(--gold); font-size: .72rem; }
        .testi-quote-mark { font-family: 'Playfair Display', serif; font-size: 3rem; color: rgba(212,175,55,.18); line-height: 1; }
        .testi-text { color: #777; font-size: .84rem; line-height: 1.75; margin-bottom: 1.5rem; }
        .testi-author { display: flex; align-items: center; gap: .85rem; padding-top: 1rem; border-top: 1px solid var(--border); }
        .testi-av { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg,var(--gold),var(--gold3)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .82rem; color: var(--black); }
        .testi-name { font-weight: 700; font-size: .85rem; color: #e8e8e8; }
        .testi-role { font-size: .7rem; color: var(--muted); margin-top: 1px; }

        /* ════════════════════════════════
           CTA BANNER
        ════════════════════════════════ */
        .cta-section { background: linear-gradient(135deg,#1c1400 0%,var(--off) 100%); border-top: 1px solid rgba(212,175,55,.15); border-bottom: 1px solid rgba(212,175,55,.15); padding: 5rem 6vw; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); width: 600px; height: 220px; background: radial-gradient(ellipse,rgba(212,175,55,.08) 0%,transparent 70%); pointer-events: none; }
        .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem,3.5vw,3.3rem); font-weight: 700; color: var(--white); margin-bottom: .8rem; position: relative; z-index: 1; }
        .cta-title span { color: var(--gold); }
        .cta-sub { color: var(--muted); font-size: .88rem; max-width: 500px; margin: 0 auto 2.2rem; line-height: 1.7; position: relative; z-index: 1; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }
        .btn-wa { display: inline-flex; align-items: center; gap: 10px; background: #25d366; color: #fff; font-weight: 700; font-size: .82rem; text-transform: uppercase; letter-spacing: .06em; padding: 13px 26px; border-radius: 3px; text-decoration: none; transition: background .2s, transform .2s; box-shadow: 0 0 24px rgba(37,211,102,.2); }
        .btn-wa:hover { background: #1fb558; transform: translateY(-2px); }

        /* ════════════════════════════════
           ANIMATIONS
        ════════════════════════════════ */
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

        /* ════════════════════════════════
           RESPONSIVE
        ════════════════════════════════ */
        @media(max-width:1100px) {
          .cat-grid { grid-template-columns: repeat(3,1fr); }
        }
        @media(max-width:900px) {
          .hero { grid-template-columns: 1fr; padding: 4rem 5vw 3rem; text-align: center; }
          .h-desc { margin: 0 auto 2rem; }
          .h-btns { justify-content: center; }
          .hero-slide-dots { justify-content: center; }
          .hero-right { display: none; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .about-wrap { grid-template-columns: 1fr; }
          .about-img-col { display: none; }
          .products-strip { grid-template-columns: 1fr 1fr; }
          .testi-grid { grid-template-columns: 1fr; }
        }
        @media(max-width:600px) {
          .cat-grid { grid-template-columns: repeat(2,1fr); }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .products-strip { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="hp">

        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="hero-dots-bg">
            {Array(40).fill(null).map((_,i) => <span key={i}/>)}
          </div>
          <div className="hero-left">
            <span className="h-eyebrow">Celebrate Every Achievement</span>
            <h1>
              <span className="h-title-white">TROPHIES &amp;</span>
              <span className="h-title-gold">MEMENTOS</span>
            </h1>
            <p className="h-desc">
              Premium quality trophies and mementos for every occasion. Customized designs for schools, colleges, corporates and special events.
            </p>
            <div className="h-btns">
              <Link to="/trophies" className="btn-gold-fill">Explore Products <FaArrowRight size={11}/></Link>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to customize a trophy.")}`} className="btn-gold-outline" target="_blank" rel="noreferrer">Customize Now</a>
            </div>
            <div className="hero-slide-dots">
              {[0,1,2].map(i => (
                <div key={i} className={`slide-dot${slide===i?" on":""}`} onClick={() => setSlide(i)}/>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-stage">
              <div className="sparkle sp1"/><div className="sparkle sp2"/><div className="sparkle sp3"/>
              <div className="hero-glow"/>
              <img src={heroTrophy} alt="Trophy Collection" className="hero-img"/>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <div className="mq-wrap">
          {[0,1].map(k => (
            <div className="mq-track" key={k} aria-hidden={k===1}>
              {["Custom Trophies","Free Engraving","Bulk Orders","Sports Medals","Corporate Awards","School Prizes","On-Time Delivery","Crystal Trophies","Metal Shields","Mementos"].map((t,j) => (
                <React.Fragment key={j}>
                  <div className="mq-item"><GiTrophy size={13}/>{t}</div>
                  <span className="mq-sep">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        {/* ══ SHOP BY CATEGORY ══ */}
        <section className="sec sec-black">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Our Collection</div><div className="dline"/></div>
            <h2 className="sec-title">Shop By Category</h2>
          </div>
          <div className="cat-grid">
            {categories.map((cat,i) => (
              <Link to={cat.href} className="cat-card" key={i}>
                <img src={cat.img} alt={cat.label} className="cat-img"/>
                <div className="cat-label">{cat.label}</div>
                <div className="cat-link">View All <FaArrowRight size={9}/></div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ WHY CHOOSE US ══ */}
        <section className="sec sec-off">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Why Choose Us</div><div className="dline"/></div>
            <h2 className="sec-title">Quality You Can Trust</h2>
          </div>
          <div className="why-grid">
            {whyUs.map((w,i) => (
              <div className="why-card" key={i}>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ FEATURED PRODUCTS ══ */}
        <section className="sec sec-black">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Our Products</div><div className="dline"/></div>
            <h2 className="sec-title">Featured Collection</h2>
          </div>
          <div className="products-strip">
            {[
              { name:"Golden Sports Trophy",   price:"₹450", img:sportsTrophy, badge:"Best Seller" },
              { name:"Crystal Corporate Award",price:"₹750", img:corpTrophy,   badge:"Premium" },
              { name:"Gold Medal Set",          price:"₹180", img:medalImg,    badge:"Bulk" },
              { name:"Executive Shield",        price:"₹850", img:shieldImg,   badge:"Luxury" },
            ].map((p,i) => (
              <div className="prod-card" key={i}>
                <div className="prod-img-wrap">
                  <span className="prod-badge">{p.badge}</span>
                  <img src={p.img} alt={p.name} className="prod-img"/>
                </div>
                <div className="prod-body">
                  <div className="prod-stars">{Array(5).fill(null).map((_,j) => <FaStar key={j}/>)}</div>
                  <div className="prod-name">{p.name}</div>
                  <div className="prod-price">{p.price}</div>
                  <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'm interested in "+p.name+" ("+p.price+"). Please share details.")}`} className="prod-btn" target="_blank" rel="noreferrer">
                    <FaWhatsapp size={13}/> Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"2.5rem"}}>
            <Link to="/trophies" className="btn-gold-fill">View All Products <FaArrowRight size={11}/></Link>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="sec sec-cream">
          <div className="about-wrap">
            <div className="about-img-col">
              <div className="about-dots">{Array(25).fill(null).map((_,i) => <span key={i}/>)}</div>
              <div className="about-big-trophy"><GiTrophy/></div>
              <div className="about-img-badge">Dehradun's Most Trusted Trophy Center</div>
            </div>
            <div>
              <div className="about-eyebrow">About Us</div>
              <h2 className="about-title">All In One Trophy &amp; Momento Center</h2>
              <div className="about-bar"/>
              <p className="about-desc">
                Based in Dehradun, we are your one-stop destination for high-quality trophies, mementos, medals and awards. We believe in recognizing achievements with the best quality and unique designs — serving schools, colleges, corporates, and events across India.
              </p>
              <Link to="/about" className="about-btn">Know More About Us <FaArrowRight size={11}/></Link>
            </div>
            <div className="about-stats" ref={statsRef}>
              {aboutStats.map((s,i) => (
                <StatCard key={i} value={s.value} label={s.label} icon={s.icon} active={statsOn}/>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section className="sec sec-off">
          <div className="sec-head">
            <div className="divrow"><div className="dline r"/><div className="dtxt">Testimonials</div><div className="dline"/></div>
            <h2 className="sec-title">What Our Clients Say</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t,i) => (
              <div className="testi-card" key={i}>
                <div className="testi-top">
                  <div className="testi-stars">{Array(t.stars).fill(null).map((_,j) => <FaStar key={j}/>)}</div>
                  <div className="testi-quote-mark">"</div>
                </div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-author">
                  <div className="testi-av">{t.name.split(" ").map(n=>n[0]).join("")}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to <span>Celebrate Success?</span></h2>
          <p className="cta-sub">Contact us today for custom trophies and awards for your next event. Special bulk discounts available for schools, colleges, and corporates.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn-gold-fill">Get a Free Quote <FaArrowRight size={11}/></Link>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! I'd like to place a bulk order for trophies.")}`} className="btn-wa" target="_blank" rel="noreferrer">
              <FaWhatsapp size={16}/> Order on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </>
  );
}