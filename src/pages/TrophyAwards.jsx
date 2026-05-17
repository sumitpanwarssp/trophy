import React, { useState } from "react";
import Breadcrumb from "../utils/BreadCrumb";
import { FaWhatsapp, FaArrowRight, FaStar, FaFire } from "react-icons/fa";
import { TbTrophy, TbMedal, TbShield, TbCertificate, TbAdjustmentsHorizontal } from "react-icons/tb";
import { GiTrophy, GiLaurelsTrophy } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";

const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const categories = [
  { label: "All", icon: <GiLaurelsTrophy /> },
  { label: "Sports", icon: <TbTrophy /> },
  { label: "Corporate", icon: <MdWorkspacePremium /> },
  { label: "Academic", icon: <TbCertificate /> },
  { label: "Medals", icon: <TbMedal /> },
  { label: "Shields", icon: <TbShield /> },
];

const products = [
  {
    name: "Golden Sports Trophy",
    price: "₹450",
    originalPrice: "₹550",
    category: "Sports",
    tag: "Best Seller",
    tagColor: "fire",
    rating: 4.9,
    reviews: 128,
    img: "/assets/OTHER/sports-trophy.png.png",
    desc: "Premium gold-finish sports trophy for champions.",
  },
  {
    name: "Cricket Champion Cup",
    price: "₹650",
    originalPrice: null,
    category: "Sports",
    tag: "Popular",
    tagColor: "gold",
    rating: 4.8,
    reviews: 94,
    img: "/assets/OTHER/sports-trophy.png.png",
    desc: "Elegant cricket cup with custom engraving.",
  },
  {
    name: "Corporate Award Trophy",
    price: "₹750",
    originalPrice: "₹900",
    category: "Corporate",
    tag: "Premium",
    tagColor: "gold",
    rating: 4.9,
    reviews: 76,
    img: "/assets/OTHER/corporate-trophy.png.png",
    desc: "Sophisticated design for employee recognition.",
  },
  {
    name: "School Achievement Trophy",
    price: "₹350",
    originalPrice: null,
    category: "Academic",
    tag: "Budget Pick",
    tagColor: "green",
    rating: 4.7,
    reviews: 210,
    img: "/assets/OTHER/academic-trophy.png.png",
    desc: "Ideal for annual prize distribution events.",
  },
  {
    name: "Gold Medal Set",
    price: "₹180",
    originalPrice: "₹220",
    category: "Medals",
    tag: "Bulk Available",
    tagColor: "gold",
    rating: 4.8,
    reviews: 310,
    img: "/assets/OTHER/medal.png.png",
    desc: "High-quality medals for sports & academic events.",
  },
  {
    name: "Executive Shield Plaque",
    price: "₹850",
    originalPrice: null,
    category: "Shields",
    tag: "Premium",
    tagColor: "gold",
    rating: 5.0,
    reviews: 42,
    img: "/assets/OTHER/shield.png.png",
    desc: "Luxury shield plaques with laser engraving.",
  },
  {
    name: "Football Championship Cup",
    price: "₹580",
    originalPrice: "₹700",
    category: "Sports",
    tag: "New",
    tagColor: "blue",
    rating: 4.7,
    reviews: 55,
    img: "/assets/OTHER/sports-trophy.png.png",
    desc: "Bold design perfect for football tournaments.",
  },
  {
    name: "Corporate Crystal Award",
    price: "₹1,200",
    originalPrice: null,
    category: "Corporate",
    tag: "Luxury",
    tagColor: "gold",
    rating: 5.0,
    reviews: 28,
    img: "/assets/OTHER/corporate-trophy.png.png",
    desc: "Premium crystal awards for top executives.",
  },
];

const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Top Rated"];

export default function Trophies() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [showSort, setShowSort] = useState(false);

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      const numA = parseInt(a.price.replace(/[₹,]/g, ""));
      const numB = parseInt(b.price.replace(/[₹,]/g, ""));
      if (sortBy === "Price: Low to High") return numA - numB;
      if (sortBy === "Price: High to Low") return numB - numA;
      if (sortBy === "Top Rated") return b.rating - a.rating;
      return 0;
    });

  const tagStyles = {
    fire: { bg: "rgba(255,80,40,0.12)", border: "rgba(255,80,40,0.3)", color: "#ff5028" },
    gold: { bg: "rgba(212,165,33,0.1)", border: "rgba(212,165,33,0.3)", color: "#d4a521" },
    green: { bg: "rgba(37,211,102,0.1)", border: "rgba(37,211,102,0.25)", color: "#25d366" },
    blue: { bg: "rgba(80,140,255,0.1)", border: "rgba(80,140,255,0.25)", color: "#508cff" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cat-page {
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
          color: #fff;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .cat-hero {
          position: relative;
          background: radial-gradient(ellipse at 65% 40%, #1a1000 0%, #0a0a0a 65%);
          padding: 5rem 6vw 4rem;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
        }
        .cat-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 85% 15%, rgba(212,165,33,0.1) 0%, transparent 45%),
            radial-gradient(circle at 5% 85%, rgba(212,165,33,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        .cat-hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
        }
        .cat-eyebrow {
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
          animation: fadeUp 0.4s ease both;
        }
        .cat-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.02em;
          animation: fadeUp 0.4s 0.07s ease both;
        }
        .cat-title .gold {
          background: linear-gradient(135deg, #f5c842 0%, #d4a521 50%, #a67c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cat-sub {
          color: #777;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-top: 0.8rem;
          max-width: 480px;
          animation: fadeUp 0.4s 0.14s ease both;
        }
        .hero-count {
          text-align: center;
          animation: fadeUp 0.4s 0.1s ease both;
        }
        .hero-count-num {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f5c842, #d4a521);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .hero-count-label { color: #555; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }

        /* ── TOOLBAR ── */
        .toolbar {
          padding: 0 6vw;
          background: #0a0a0a;
          border-bottom: 1px solid #141414;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(12px);
        }
        .toolbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0;
          flex-wrap: wrap;
        }

        /* category pills */
        .cat-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .cat-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid #222;
          background: transparent;
          color: #666;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
        }
        .cat-pill:hover { border-color: rgba(212,165,33,0.3); color: #aaa; }
        .cat-pill.active {
          background: rgba(212,165,33,0.1);
          border-color: rgba(212,165,33,0.45);
          color: #d4a521;
          font-weight: 600;
        }

        /* sort */
        .sort-wrap { position: relative; }
        .sort-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid #222;
          background: #111;
          color: #888;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .sort-btn:hover { border-color: rgba(212,165,33,0.3); color: #ccc; }
        .sort-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: #111;
          border: 1px solid #222;
          border-radius: 10px;
          overflow: hidden;
          min-width: 180px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          z-index: 100;
          animation: fadeUp 0.2s ease;
        }
        .sort-option {
          display: block;
          width: 100%;
          padding: 10px 16px;
          background: transparent;
          border: none;
          color: #888;
          font-size: 0.83rem;
          font-family: 'DM Sans', sans-serif;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .sort-option:hover { background: #181818; color: #d4a521; }
        .sort-option.active { color: #d4a521; font-weight: 600; }

        /* ── GRID ── */
        .products-section { padding: 3rem 6vw 6rem; }
        .results-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        .results-count { color: #555; font-size: 0.83rem; }
        .results-count span { color: #d4a521; font-weight: 600; }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
        }

        /* ── PRODUCT CARD ── */
        .product-card {
          background: #111;
          border: 1px solid #1e1e1e;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          animation: fadeUp 0.5s ease both;
          position: relative;
        }
        .product-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212,165,33,0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,165,33,0.08);
        }

        .card-img-wrap {
          position: relative;
          background: radial-gradient(circle at 50% 60%, #1a1000 0%, #0f0f0f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem 1.5rem;
          min-height: 180px;
          overflow: hidden;
        }
        .card-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40px;
          background: linear-gradient(to top, #111, transparent);
        }
        .card-img {
          width: 100px;
          height: 120px;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(212,165,33,0.25));
          transition: transform 0.4s;
          position: relative;
          z-index: 1;
        }
        .product-card:hover .card-img { transform: scale(1.08) translateY(-4px); }

        .card-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 5px;
          z-index: 2;
        }

        .card-body { padding: 1.2rem; flex: 1; display: flex; flex-direction: column; }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 0.5rem;
        }
        .card-stars { display: flex; gap: 2px; color: #d4a521; font-size: 0.65rem; }
        .card-rating-num { font-size: 0.75rem; font-weight: 600; color: #d4a521; }
        .card-reviews { font-size: 0.72rem; color: #555; }

        .card-name {
          font-weight: 600;
          font-size: 0.92rem;
          color: #e8e8e8;
          line-height: 1.35;
          margin-bottom: 0.35rem;
        }
        .card-desc { color: #555; font-size: 0.78rem; line-height: 1.5; margin-bottom: 1rem; flex: 1; }

        .card-footer { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.9rem; }
        .card-price {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #f5c842;
        }
        .card-original {
          font-size: 0.78rem;
          color: #444;
          text-decoration: line-through;
          margin-left: 6px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        .card-discount {
          font-size: 0.7rem;
          font-weight: 700;
          color: #25d366;
          background: rgba(37,211,102,0.1);
          padding: 2px 7px;
          border-radius: 100px;
        }

        .card-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px;
          background: linear-gradient(135deg, #d4a521 0%, #a67c00 100%);
          color: #1a1000;
          font-weight: 700;
          font-size: 0.82rem;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 16px rgba(212,165,33,0.15);
        }
        .card-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(212,165,33,0.3);
        }
        .card-btn-wa {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 1px solid rgba(37,211,102,0.25);
          color: #25d366;
          font-weight: 600;
          font-size: 0.8rem;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s;
          margin-top: 0.5rem;
        }
        .card-btn-wa:hover { background: rgba(37,211,102,0.06); border-color: rgba(37,211,102,0.5); }

        /* ── EMPTY STATE ── */
        .empty-state {
          text-align: center;
          padding: 6rem 2rem;
          grid-column: 1 / -1;
        }
        .empty-icon { font-size: 4rem; color: #222; margin-bottom: 1rem; }
        .empty-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #444; margin-bottom: 0.5rem; }
        .empty-sub { color: #333; font-size: 0.85rem; }

        /* ── BULK CTA ── */
        .bulk-cta {
          margin: 0 6vw 5rem;
          background: linear-gradient(135deg, #1a1000 0%, #110c00 100%);
          border: 1px solid rgba(212,165,33,0.2);
          border-radius: 20px;
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 2rem;
          position: relative;
          overflow: hidden;
        }
        .bulk-cta::before {
          content: '';
          position: absolute;
          right: -40px;
          top: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(212,165,33,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .bulk-eyebrow {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #d4a521;
          margin-bottom: 0.6rem;
        }
        .bulk-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .bulk-sub { color: #777; font-size: 0.88rem; line-height: 1.6; }
        .bulk-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 14px 24px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 24px rgba(37,211,102,0.2);
        }
        .bulk-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(37,211,102,0.35); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 800px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .cat-hero-inner { grid-template-columns: 1fr; }
          .bulk-cta { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }
          .products-section { padding: 2rem 4vw 4rem; }
          .bulk-cta { margin: 0 4vw 3rem; padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="cat-page">
        <Breadcrumb items={[{ label: "Trophies" }]} />

        {/* ── HERO ── */}
        <div className="cat-hero">
          <div className="cat-hero-inner">
            <div>
              <div className="cat-eyebrow"><GiTrophy size={11} /> Premium Collection</div>
              <h1 className="cat-title">
                Our Trophy <br />
                <span className="gold">Collection.</span>
              </h1>
              <p className="cat-sub">
                Handcrafted trophies for every occasion — sports, academics, corporate events & more. Custom engraving available on all items.
              </p>
            </div>
            <div className="hero-count">
              <div className="hero-count-num">{products.length}+</div>
              <div className="hero-count-label">Products</div>
            </div>
          </div>
        </div>

        {/* ── TOOLBAR ── */}
        <div className="toolbar">
          <div className="toolbar-inner">
            <div className="cat-pills">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  className={`cat-pill${activeCategory === cat.label ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat.label)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="sort-wrap">
              <button className="sort-btn" onClick={() => setShowSort(!showSort)}>
                <TbAdjustmentsHorizontal size={14} /> Sort: {sortBy}
              </button>
              {showSort && (
                <div className="sort-dropdown">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      className={`sort-option${sortBy === opt ? " active" : ""}`}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PRODUCTS GRID ── */}
        <div className="products-section">
          <div className="results-meta">
            <p className="results-count">
              Showing <span>{filtered.length}</span> of {products.length} products
              {activeCategory !== "All" && <> in <span>{activeCategory}</span></>}
            </p>
          </div>

          <div className="products-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><GiTrophy /></div>
                <div className="empty-title">No products found</div>
                <div className="empty-sub">Try selecting a different category</div>
              </div>
            ) : (
              filtered.map((item, i) => {
                const tag = tagStyles[item.tagColor];
                const origNum = item.originalPrice ? parseInt(item.originalPrice.replace(/[₹,]/g, "")) : null;
                const currNum = parseInt(item.price.replace(/[₹,]/g, ""));
                const discount = origNum ? Math.round(((origNum - currNum) / origNum) * 100) : null;
                const waMsg = `Hi! I'm interested in *${item.name}* (${item.price}). Please share more details.`;

                return (
                  <div
                    className="product-card"
                    key={i}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Image */}
                    <div className="card-img-wrap">
                      <div
                        className="card-tag"
                        style={{ background: tag.bg, border: `1px solid ${tag.border}`, color: tag.color }}
                      >
                        {item.tagColor === "fire" && <FaFire size={9} />}
                        {item.tag}
                      </div>
                      <img src={item.img} alt={item.name} className="card-img" />
                    </div>

                    {/* Body */}
                    <div className="card-body">
                      {/* Rating */}
                      <div className="card-rating">
                        <div className="card-stars">
                          {Array(5).fill(null).map((_, j) => (
                            <FaStar key={j} style={{ opacity: j < Math.round(item.rating) ? 1 : 0.2 }} />
                          ))}
                        </div>
                        <span className="card-rating-num">{item.rating}</span>
                        <span className="card-reviews">({item.reviews})</span>
                      </div>

                      <div className="card-name">{item.name}</div>
                      <div className="card-desc">{item.desc}</div>

                      {/* Price */}
                      <div className="card-footer">
                        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                          <span className="card-price">{item.price}</span>
                          {item.originalPrice && (
                            <span className="card-original">{item.originalPrice}</span>
                          )}
                        </div>
                        {discount && (
                          <span className="card-discount">{discount}% OFF</span>
                        )}
                      </div>

                      {/* Buttons */}
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                        className="card-btn"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Order Now <FaArrowRight size={11} />
                      </a>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        className="card-btn-wa"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaWhatsapp size={14} /> Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── BULK ORDER CTA ── */}
        <div className="bulk-cta">
          <div>
            <div className="bulk-eyebrow">Special Offer</div>
            <div className="bulk-title">Need 10+ Trophies? Get Bulk Discounts!</div>
            <div className="bulk-sub">
              Schools, corporates & event organizers — contact us for exclusive bulk pricing, free engraving & priority delivery.
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in bulk trophy orders. Please share pricing details.")}`}
            className="bulk-btn"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={17} /> Get Bulk Quote
          </a>
        </div>
      </div>
    </>
  );
}