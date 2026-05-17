import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../utils/BreadCrumb";
import { FaTimes, FaChevronLeft, FaChevronRight, FaWhatsapp, FaExpand } from "react-icons/fa";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";
import { TbTrophy, TbMedal } from "react-icons/tb";
import { MdWorkspacePremium } from "react-icons/md";

const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// ── Dynamic image imports ──
const importAll = (r) => r.keys().map(r);
const cupImages    = importAll(require.context("../assets/cup",     false, /\.(png|jpe?g|svg)$/));
const mementoImages= importAll(require.context("../assets/memento", false, /\.(png|jpe?g|svg)$/));
const trophyImages = importAll(require.context("../assets/trophy",  false, /\.(png|jpe?g|svg)$/));

const categories = [
  { key: "all",     label: "All",      icon: <GiLaurelsTrophy size={14} /> },
  { key: "trophy",  label: "Trophies", icon: <TbTrophy size={14} /> },
  { key: "cup",     label: "Cups",     icon: <GiTrophy size={14} /> },
  { key: "memento", label: "Mementos", icon: <MdWorkspacePremium size={14} /> },
];

// Build flat image list with category tags
const buildImages = () => [
  ...trophyImages.map((src, i) => ({ src, cat: "trophy", alt: `Trophy ${i + 1}` })),
  ...cupImages.map((src, i)    => ({ src, cat: "cup",    alt: `Cup ${i + 1}` })),
  ...mementoImages.map((src, i)=> ({ src, cat: "memento",alt: `Memento ${i + 1}` })),
];

export default function Gallery() {
  const [activeTab, setActiveTab]     = useState("all");
  const [lightbox, setLightbox]       = useState(null); // index into filtered
  const [loaded, setLoaded]           = useState({});

  const allImages  = buildImages();
  const filtered   = activeTab === "all" ? allImages : allImages.filter(i => i.cat === activeTab);

  // keyboard nav
  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === "ArrowRight") setLightbox(p => (p + 1) % filtered.length);
    if (e.key === "ArrowLeft")  setLightbox(p => (p - 1 + filtered.length) % filtered.length);
    if (e.key === "Escape")     setLightbox(null);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const openLightbox  = (i) => setLightbox(i);
  const closeLightbox = ()  => setLightbox(null);
  const prevImg = () => setLightbox(p => (p - 1 + filtered.length) % filtered.length);
  const nextImg = () => setLightbox(p => (p + 1) % filtered.length);

  const waMsg = (img) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in ordering something similar to ${img.alt}. Please share details.`)}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .gallery-page {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .gallery-hero {
          position: relative;
          padding: 5.5rem 6vw 4.5rem;
          text-align: center;
          background: radial-gradient(ellipse at 50% 70%, #1a1000 0%, #0a0a0a 65%);
          border-bottom: 1px solid #141414;
          overflow: hidden;
        }
        .gallery-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(212,165,33,0.07) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(212,165,33,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .gallery-hero-inner { position: relative; z-index: 1; }
        .gallery-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d4a521;
          background: rgba(212,165,33,0.08);
          border: 1px solid rgba(212,165,33,0.22);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 1.3rem;
          animation: fadeUp 0.45s ease both;
        }
        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.6rem, 5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          animation: fadeUp 0.45s 0.08s ease both;
        }
        .gallery-title .gold {
          background: linear-gradient(135deg, #f5c842 0%, #d4a521 50%, #a67c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gallery-sub {
          color: #555;
          font-size: 0.95rem;
          max-width: 460px;
          margin: 0 auto 2rem;
          line-height: 1.7;
          animation: fadeUp 0.45s 0.15s ease both;
        }
        .gallery-count-row {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          animation: fadeUp 0.45s 0.22s ease both;
        }
        .count-item { text-align: center; }
        .count-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #d4a521;
          line-height: 1;
        }
        .count-label { font-size: 0.7rem; color: #444; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; }

        /* ── TOOLBAR ── */
        .gallery-toolbar {
          padding: 0 6vw;
          background: rgba(8,8,8,0.95);
          border-bottom: 1px solid #141414;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(16px);
        }
        .toolbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.9rem 0;
          flex-wrap: wrap;
        }
        .tab-pills { display: flex; gap: 0.5rem; }
        .tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid #1e1e1e;
          background: transparent;
          color: #555;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .tab-pill:hover { border-color: rgba(212,165,33,0.3); color: #aaa; }
        .tab-pill.active {
          background: rgba(212,165,33,0.1);
          border-color: rgba(212,165,33,0.45);
          color: #d4a521;
          font-weight: 600;
        }
        .result-meta { font-size: 0.78rem; color: #333; white-space: nowrap; }
        .result-meta span { color: #d4a521; font-weight: 600; }

        /* ── GALLERY GRID ── */
        .gallery-body { padding: 3rem 6vw 6rem; }

        /* Masonry-style: auto rows for portrait images */
        .gallery-grid {
          columns: 4;
          column-gap: 1rem;
        }
        @media (max-width: 1100px) { .gallery-grid { columns: 3; } }
        @media (max-width: 700px)  { .gallery-grid { columns: 2; } }
        @media (max-width: 420px)  { .gallery-grid { columns: 2; column-gap: 0.6rem; } }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 1rem;
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          border: 1px solid #1a1a1a;
          animation: fadeUp 0.5s ease both;
        }
        .gallery-item:hover { border-color: rgba(212,165,33,0.3); }

        .gallery-img {
          display: block;
          width: 100%;
          height: auto;        /* let portrait images breathe naturally */
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), filter 0.4s;
          filter: brightness(0.92);
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.04);
          filter: brightness(1);
        }

        /* skeleton shimmer while loading */
        .gallery-skeleton {
          width: 100%;
          padding-bottom: 140%;   /* tall portrait placeholder */
          background: linear-gradient(90deg, #111 25%, #181818 50%, #111 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 14px;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        /* overlay */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1rem;
          gap: 0.5rem;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }

        .overlay-expand {
          position: absolute;
          top: 10px; right: 10px;
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 0.7rem;
          transition: background 0.2s;
        }
        .gallery-item:hover .overlay-expand { background: rgba(212,165,33,0.5); }

        .overlay-cat {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d4a521;
          background: rgba(212,165,33,0.15);
          border: 1px solid rgba(212,165,33,0.25);
          padding: 3px 8px;
          border-radius: 100px;
          width: fit-content;
        }
        .overlay-wa {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #fff;
          background: #25d366;
          padding: 6px 10px;
          border-radius: 7px;
          text-decoration: none;
          width: fit-content;
          transition: background 0.2s;
        }
        .overlay-wa:hover { background: #1fb558; }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          backdrop-filter: blur(10px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        .lightbox-inner {
          position: relative;
          max-width: min(520px, 90vw);
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem;
        }
        .lightbox-img-wrap {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #2a2a2a;
          box-shadow: 0 30px 80px rgba(0,0,0,0.8);
          background: #111;
          position: relative;
        }
        .lightbox-img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 75vh;
          object-fit: contain;
          animation: lightboxIn 0.25s ease;
        }
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* gold frame accent */
        .lightbox-img-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 1px solid rgba(212,165,33,0.15);
          pointer-events: none;
          z-index: 1;
        }

        .lightbox-close {
          position: absolute;
          top: -10px; right: -10px;
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s, color 0.2s;
        }
        .lightbox-close:hover { background: rgba(212,165,33,0.15); color: #d4a521; }

        .lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(10,10,10,0.8);
          border: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          z-index: 5;
        }
        .lb-nav:hover { background: rgba(212,165,33,0.15); color: #d4a521; border-color: rgba(212,165,33,0.3); }
        .lb-prev { left: -20px; }
        .lb-next { right: -20px; }

        .lb-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .lb-info { display: flex; flex-direction: column; gap: 2px; }
        .lb-cat {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #d4a521;
        }
        .lb-counter { font-size: 0.8rem; color: #444; }

        .lb-wa {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
          color: #fff;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 10px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 18px rgba(37,211,102,0.2);
          white-space: nowrap;
        }
        .lb-wa:hover { transform: translateY(-1px); box-shadow: 0 0 28px rgba(37,211,102,0.35); }

        /* dot indicator */
        .lb-dots {
          display: flex;
          gap: 5px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 200px;
        }
        .lb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #222;
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .lb-dot.active { background: #d4a521; transform: scale(1.3); }

        /* ── EMPTY STATE ── */
        .gallery-empty {
          text-align: center;
          padding: 6rem 2rem;
        }
        .empty-icon { font-size: 4rem; color: #1a1a1a; margin-bottom: 1rem; }
        .empty-title { font-family: 'Playfair Display',serif; font-size: 1.4rem; color: #333; margin-bottom: 0.5rem; }
        .empty-sub { color: #2a2a2a; font-size: 0.85rem; }

        /* ── CTA STRIP ── */
        .gallery-cta {
          margin: 0 6vw 5rem;
          background: linear-gradient(135deg, #1a1000 0%, #110c00 100%);
          border: 1px solid rgba(212,165,33,0.18);
          border-radius: 18px;
          padding: 2.5rem 3rem;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
          position: relative;
          overflow: hidden;
        }
        .gallery-cta::before {
          content: '';
          position: absolute;
          right: -30px; top: -30px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(212,165,33,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #d4a521; margin-bottom: 0.5rem; }
        .cta-title { font-family: 'Playfair Display',serif; font-size: clamp(1.3rem, 2.5vw, 1.9rem); font-weight: 700; margin-bottom: 0.4rem; }
        .cta-sub { color: #666; font-size: 0.85rem; line-height: 1.6; }
        .cta-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: #fff;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 14px 22px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 22px rgba(37,211,102,0.2);
        }
        .cta-wa-btn:hover { transform: translateY(-2px); box-shadow: 0 0 34px rgba(37,211,102,0.35); }

        /* ── ANIMS ── */
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }

        /* ── RESPONSIVE ── */
        @media (max-width:700px) {
          .gallery-cta { grid-template-columns:1fr; }
          .lb-prev { left: 4px; }
          .lb-next { right: 4px; }
          .gallery-count-row { gap: 1.5rem; }
          .tab-pills { flex-wrap: wrap; }
        }
      `}</style>

      <div className="gallery-page">
        <Breadcrumb items={[{ label: "Gallery" }]} />

        {/* ── HERO ── */}
        <div className="gallery-hero">
          <div className="gallery-hero-inner">
            <div className="gallery-eyebrow"><GiTrophy size={11} /> Our Work</div>
            <h1 className="gallery-title">
              Award <span className="gold">Gallery</span>
            </h1>
            <p className="gallery-sub">
              Browse our handcrafted trophies, cups & mementos. Every piece is made with precision and passion.
            </p>
            <div className="gallery-count-row">
              {[
                { num: trophyImages.length,  label: "Trophies"  },
                { num: cupImages.length,     label: "Cups"      },
                { num: mementoImages.length, label: "Mementos"  },
              ].map((c, i) => (
                <div className="count-item" key={i}>
                  <div className="count-num">{c.num}</div>
                  <div className="count-label">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="gallery-toolbar">
          <div className="toolbar-row">
            <div className="tab-pills">
              {categories.map((c) => (
                <button
                  key={c.key}
                  className={`tab-pill${activeTab === c.key ? " active" : ""}`}
                  onClick={() => setActiveTab(c.key)}
                >
                  {c.icon} {c.label}
                </button>
              ))}
            </div>
            <div className="result-meta">
              <span>{filtered.length}</span> photos
            </div>
          </div>
        </div>

        {/* ── MASONRY GRID ── */}
        <div className="gallery-body">
          {filtered.length === 0 ? (
            <div className="gallery-empty">
              <div className="empty-icon"><GiTrophy /></div>
              <div className="empty-title">No photos yet</div>
              <div className="empty-sub">Add images to the folder to see them here.</div>
            </div>
          ) : (
            <div className="gallery-grid">
              {filtered.map((img, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s` }}
                  onClick={() => openLightbox(i)}
                >
                  {!loaded[i] && <div className="gallery-skeleton" />}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="gallery-img"
                    style={{ display: loaded[i] ? "block" : "none" }}
                    onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
                  />
                  <div className="gallery-overlay">
                    <div className="overlay-expand"><FaExpand size={11} /></div>
                    <div className="overlay-cat">{img.cat}</div>
                    <a
                      href={waMsg(img)}
                      className="overlay-wa"
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                    >
                      <FaWhatsapp size={12} /> Order Similar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── LIGHTBOX ── */}
        {lightbox !== null && filtered[lightbox] && (
          <div className="lightbox-backdrop" onClick={closeLightbox}>
            <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
              {/* Image */}
              <div className="lightbox-img-wrap">
                <button className="lightbox-close" onClick={closeLightbox}><FaTimes size={14} /></button>
                <button className="lb-nav lb-prev" onClick={prevImg}><FaChevronLeft size={14} /></button>
                <button className="lb-nav lb-next" onClick={nextImg}><FaChevronRight size={14} /></button>
                <img
                  key={lightbox}
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  className="lightbox-img"
                />
              </div>

              {/* Footer row */}
              <div className="lb-footer">
                <div className="lb-info">
                  <div className="lb-cat">{filtered[lightbox].cat}</div>
                  <div className="lb-counter">{lightbox + 1} / {filtered.length}</div>
                </div>

                {/* dot indicators — show max 10 */}
                {filtered.length <= 20 && (
                  <div className="lb-dots">
                    {filtered.map((_, i) => (
                      <div
                        key={i}
                        className={`lb-dot${i === lightbox ? " active" : ""}`}
                        onClick={() => setLightbox(i)}
                      />
                    ))}
                  </div>
                )}

                <a
                  href={waMsg(filtered[lightbox])}
                  className="lb-wa"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp size={14} /> Order This
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA STRIP ── */}
        <div className="gallery-cta">
          <div>
            <div className="cta-eyebrow">Like What You See?</div>
            <div className="cta-title">Get Your Custom Trophy Today</div>
            <div className="cta-sub">Send us a photo of what you like and we'll craft an exact match — custom engraved for your event.</div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I saw your gallery and would like to order a custom trophy. Please help!")}`}
            className="cta-wa-btn"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={17} /> Order on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}