import React, { useState, useEffect } from "react";
import Breadcrumb from "../utils/BreadCrumb";
import {
  FaWhatsapp, FaPlus, FaMinus, FaTrash,
  FaShoppingCart, FaSearch, FaTimes,
  FaArrowRight, FaArrowLeft, FaCheckCircle,
} from "react-icons/fa";
import { GiTrophy, GiLaurelsTrophy, GiMedal } from "react-icons/gi";
import { TbTrophy, TbMedal, TbShield, TbPencil, TbPackage } from "react-icons/tb";
import { MdWorkspacePremium, MdDesignServices } from "react-icons/md";

/* ── CONFIG ── */
const WHATSAPP = "917533839843";
const SHEET_CSV =
  "https://docs.google.com/spreadsheets/d/1CTBk-pSh3cxuUUFZsC3WwlVkm1MqS3rWhZnA_oYwj_I/export?format=csv&gid=0";

/* ── CATEGORIES ── */
const CATEGORIES = [
  {
    key: "sports",
    label: "Sports Trophies",
    icon: <TbTrophy size={38} />,
    desc: "Trophies for cricket, football, badminton, athletics & all sports events.",
    tag: "Most Popular",
    tagColor: "#e74c3c",
    bg: "radial-gradient(circle at 60% 40%, #1a0800 0%, #0d0d0d 70%)",
    filter: "Sports",
  },
  {
    key: "corporate",
    label: "Corporate Awards",
    icon: <MdWorkspacePremium size={38} />,
    desc: "Premium recognition awards for employee excellence & corporate events.",
    tag: "Bulk Available",
    tagColor: "#D4AF37",
    bg: "radial-gradient(circle at 60% 40%, #001a0d 0%, #0d0d0d 70%)",
    filter: "Corporate",
  },
  {
    key: "academic",
    label: "Academic Trophies",
    icon: <GiLaurelsTrophy size={38} />,
    desc: "School & college prizes for academics, science fairs, quiz competitions.",
    tag: "School Special",
    tagColor: "#3498db",
    bg: "radial-gradient(circle at 60% 40%, #001220 0%, #0d0d0d 70%)",
    filter: "Academic",
  },
  {
    key: "medals",
    label: "Gold Medals",
    icon: <TbMedal size={38} />,
    desc: "Gold, silver & bronze medals for sports meets & prize distributions.",
    tag: "Events",
    tagColor: "#f39c12",
    bg: "radial-gradient(circle at 60% 40%, #1a1000 0%, #0d0d0d 70%)",
    filter: "Medals",
  },
  {
    key: "engraving",
    label: "Custom Engraving",
    icon: <MdDesignServices size={38} />,
    desc: "Personalized name, logo & message engraving on any trophy or award.",
    tag: "Personalized",
    tagColor: "#9b59b6",
    bg: "radial-gradient(circle at 60% 40%, #100020 0%, #0d0d0d 70%)",
    filter: "Engraving",
  },
  {
    key: "bulk",
    label: "Bulk Orders",
    icon: <TbPackage size={38} />,
    desc: "Special pricing for 10+ orders. Perfect for tournaments & annual days.",
    tag: "Best Price",
    tagColor: "#25d366",
    bg: "radial-gradient(circle at 60% 40%, #001a05 0%, #0d0d0d 70%)",
    filter: "All",
  },
];

/* ── CSV PARSER ── */
function parseCSV(raw) {
  const lines = raw.trim().split("\n").map(l => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/\s+/g, "_"));
  return lines.slice(1).map((line, idx) => {
    const cols = []; let cur = "", inQ = false;
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; }
      else if (ch === "," && !inQ) { cols.push(cur.trim()); cur = ""; }
      else cur += ch;
    }
    cols.push(cur.trim());
    const o = {};
    headers.forEach((h, i) => { o[h] = cols[i] || ""; });
    return {
      id:          o.id || o.product_id || String(idx + 1),
      name:        o.name || o.product_name || "Product",
      category:    o.category || "General",
      price:       parseInt(o.price) || 0,
      image:       o.image || o.image_name || "",
      description: o.description || o.desc || "",
      available:   (o.available || "yes").toLowerCase() !== "no",
    };
  }).filter(p => p.name && p.price > 0);
}

const fmt = n => "₹" + n.toLocaleString("en-IN");
const cartTotal = cart => cart.reduce((s, i) => s + i.price * i.qty, 0);
const cartCount = cart => cart.reduce((s, i) => s + i.qty, 0);

export default function Order() {
  /* view: "categories" | "products" */
  const [view,       setView]       = useState("categories");
  const [activeCat,  setActiveCat]  = useState(null);
  const [products,   setProducts]   = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search,     setSearch]     = useState("");
  const [cart,       setCart]       = useState([]);
  const [cartOpen,   setCartOpen]   = useState(false);
  const [checkout,   setCheckout]   = useState(false);
  const [customer,   setCustomer]   = useState({ name: "", mobile: "", city: "" });
  const [sent,       setSent]       = useState(false);
  const [addedId,    setAddedId]    = useState(null); // flash feedback

  /* fetch sheet once */
  useEffect(() => {
    setLoading(true);
    fetch(SHEET_CSV)
      .then(r => { if (!r.ok) throw new Error("Sheet not accessible"); return r.text(); })
      .then(t => { setProducts(parseCSV(t)); setFetchError(""); })
      .catch(e => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /* filtered products for active category */
  const catObj = CATEGORIES.find(c => c.key === activeCat);
  const filtered = products.filter(p => {
    if (!catObj) return true;
    const matchCat = catObj.filter === "All" || p.category.toLowerCase().includes(catObj.filter.toLowerCase());
    const matchQ   = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ && p.available;
  });

  /* cart actions */
  const addToCart = p => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
                : [...prev, { ...p, qty: 1 }];
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };
  const changeQty = (id, d) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const removeItem = id => setCart(prev => prev.filter(i => i.id !== id));

  const inCart = id => cart.find(i => i.id === id);

  /* open category */
  const openCategory = cat => {
    setActiveCat(cat.key);
    setSearch("");
    setView("products");
  };

  /* whatsapp message */
  const buildMsg = () => {
    const lines = cart.map((item, i) =>
      `${i + 1}. ${item.name}\n   Price: ${fmt(item.price)}\n   Qty: ${item.qty}\n   Subtotal: ${fmt(item.price * item.qty)}`
    ).join("\n\n");
    return encodeURIComponent(
      `Hello All In One Trophy & Memento Center,\n\nI want to place an order:\n\n${lines}\n\n────────────────\nTotal Amount: ${fmt(cartTotal(cart))}\n────────────────\n\nCustomer Details:\nName: ${customer.name}\nMobile: ${customer.mobile}\nCity: ${customer.city}\n\nPlease confirm my order. Thank you!`
    );
  };

  const sendOrder = () => {
    if (!customer.name || !customer.mobile) return;
    window.open(`https://wa.me/${WHATSAPP}?text=${buildMsg()}`, "_blank");
    setSent(true);
    setTimeout(() => { setSent(false); setCheckout(false); setCart([]); }, 3500);
  };

  const count = cartCount(cart);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Montserrat:wght@400;500;600;700;800&display=swap');
        :root {
          --gold:#D4AF37; --gold3:#a07800;
          --black:#0F0F0F; --off:#1A1A1A; --card:#141414;
          --white:#FFFFFF; --tgray:#E5E5E5; --muted:#888;
          --border:#2a2a2a; --green:#25d366;
        }
        .op { font-family:'Montserrat',sans-serif; background:var(--black); color:var(--tgray); min-height:100vh; }

        /* ══ HERO ══ */
        .op-hero {
          position:relative; padding:4.5rem 6vw 3.5rem;
          background:var(--off); border-bottom:1px solid var(--border); overflow:hidden;
          text-align:center;
        }
        .op-hero::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse at 50% 60%,rgba(212,175,55,.1) 0%,transparent 60%);
          pointer-events:none;
        }
        .op-eyebrow {
          display:inline-flex; align-items:center; gap:7px;
          font-size:.7rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
          color:var(--gold); background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.22);
          padding:5px 14px; border-radius:100px; margin-bottom:1.1rem;
        }
        .op-title {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.2rem,4vw,3.8rem); font-weight:900; color:var(--white); margin-bottom:.75rem;
        }
        .op-title span { color:var(--gold); }
        .op-sub { color:var(--muted); font-size:.88rem; max-width:520px; margin:0 auto; line-height:1.75; }

        /* HOW IT WORKS */
        .how-wrap {
          background:linear-gradient(90deg,#1a1200,var(--off),#1a1200);
          border-bottom:1px solid rgba(212,175,55,.12);
          padding:1.4rem 6vw;
          display:flex; align-items:center; justify-content:center; gap:0; flex-wrap:wrap;
        }
        .how-step { display:flex; align-items:center; gap:.7rem; padding:.45rem 1.2rem; }
        .how-num { width:26px;height:26px;border-radius:50%; background:var(--gold); color:var(--black); font-size:.68rem; font-weight:800; display:flex;align-items:center;justify-content:center; flex-shrink:0; }
        .how-text { font-size:.72rem; font-weight:600; color:#aaa; line-height:1.25; }
        .how-text span { display:block; font-size:.62rem; color:var(--muted); font-weight:400; }
        .how-arr { color:rgba(212,175,55,.3); font-size:.85rem; padding:0 .25rem; }

        /* ══ CATEGORIES VIEW ══ */
        .cat-view { padding:3.5rem 6vw 6rem; }
        .cat-section-label { text-align:center; margin-bottom:2.5rem; }
        .cat-section-label h2 { font-family:'Playfair Display',serif; font-size:clamp(1.8rem,3vw,2.5rem); font-weight:700; color:var(--white); margin-top:.5rem; }
        .divrow { display:flex;align-items:center;gap:1rem;justify-content:center;margin-bottom:.7rem; }
        .dline { width:55px;height:1px;background:linear-gradient(to right,transparent,var(--gold)); }
        .dline.r { background:linear-gradient(to left,transparent,var(--gold)); }
        .dtxt { font-size:.64rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold); }

        .cat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.4rem; }

        .cat-card {
          border-radius:16px; border:1px solid var(--border);
          padding:2.5rem 1.75rem 2rem;
          cursor:pointer; position:relative; overflow:hidden;
          display:flex; flex-direction:column; gap:.75rem;
          transition:border-color .3s,transform .3s,box-shadow .3s;
          animation:fadeUp .5s ease both;
        }
        .cat-card:hover { border-color:var(--gold); transform:translateY(-7px); box-shadow:0 20px 50px rgba(0,0,0,.5); }
        .cat-card::before {
          content:''; position:absolute; inset:0;
          opacity:0; transition:opacity .3s;
          background:radial-gradient(circle at 60% 30%,rgba(212,175,55,.06) 0%,transparent 65%);
        }
        .cat-card:hover::before { opacity:1; }

        .cat-tag {
          position:absolute; top:14px; right:14px;
          font-size:.6rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em;
          padding:3px 10px; border-radius:100px;
          border:1px solid currentColor;
        }
        .cat-icon-wrap {
          width:68px; height:68px; border-radius:16px;
          border:1.5px solid rgba(212,175,55,.25);
          background:rgba(212,175,55,.06);
          display:flex; align-items:center; justify-content:center;
          color:var(--gold); position:relative; z-index:1;
          transition:background .3s,box-shadow .3s;
        }
        .cat-card:hover .cat-icon-wrap { background:rgba(212,175,55,.12); box-shadow:0 0 20px rgba(212,175,55,.15); }
        .cat-name { font-family:'Playfair Display',serif; font-size:1.15rem; font-weight:700; color:var(--white); position:relative;z-index:1; }
        .cat-desc { font-size:.8rem; color:var(--muted); line-height:1.65; position:relative;z-index:1; flex:1; }
        .cat-cta {
          display:inline-flex; align-items:center; gap:7px;
          font-size:.75rem; font-weight:700; color:var(--gold);
          text-transform:uppercase; letter-spacing:.06em;
          position:relative; z-index:1; margin-top:.25rem;
          transition:gap .2s;
        }
        .cat-card:hover .cat-cta { gap:11px; }

        /* ══ PRODUCTS VIEW ══ */
        .prod-view { padding-bottom:5rem; }

        /* back bar */
        .back-bar {
          padding:1rem 6vw;
          background:var(--off); border-bottom:1px solid var(--border);
          display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
        }
        .back-btn {
          display:inline-flex; align-items:center; gap:7px;
          font-size:.78rem; font-weight:700; color:var(--muted);
          background:transparent; border:1px solid var(--border);
          padding:7px 14px; border-radius:7px; cursor:pointer;
          font-family:'Montserrat',sans-serif; transition:color .2s,border-color .2s;
        }
        .back-btn:hover { color:var(--gold); border-color:rgba(212,175,55,.3); }
        .back-crumb { font-size:.78rem; color:#444; }
        .back-crumb span { color:var(--gold); font-weight:600; }

        /* toolbar */
        .prod-toolbar {
          padding:.8rem 6vw; background:rgba(8,8,8,.95);
          border-bottom:1px solid var(--border);
          position:sticky; top:0; z-index:50; backdrop-filter:blur(14px);
          display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;
        }
        .srch-wrap { position:relative; }
        .srch-ico { position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#444;font-size:.78rem; }
        .srch-input {
          background:var(--card); border:1px solid var(--border); border-radius:8px;
          padding:8px 32px 8px 32px; color:var(--white); font-size:.8rem;
          font-family:'Montserrat',sans-serif; outline:none; width:210px;
          transition:border-color .2s;
        }
        .srch-input::placeholder { color:#444; }
        .srch-input:focus { border-color:rgba(212,175,55,.45); }
        .srch-clear { position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#555;cursor:pointer;font-size:.72rem; }
        .res-meta { font-size:.74rem; color:#444; }
        .res-meta span { color:var(--gold); font-weight:700; }

        /* product grid */
        .pgrid { display:grid; grid-template-columns:repeat(4,1fr); gap:1.2rem; padding:2.5rem 6vw 0; }

        .pcard {
          background:var(--card); border:1px solid var(--border);
          border-radius:12px; overflow:hidden;
          display:flex; flex-direction:column;
          transition:border-color .3s,transform .3s,box-shadow .3s;
          animation:fadeUp .4s ease both;
        }
        .pcard:hover { border-color:rgba(212,175,55,.35); transform:translateY(-5px); box-shadow:0 16px 38px rgba(0,0,0,.4); }

        .pimg-area {
          background:radial-gradient(circle at 50% 65%,#1a1000,#0d0d0d);
          display:flex;align-items:center;justify-content:center;
          padding:1.75rem 1rem 1.25rem; position:relative; overflow:hidden; min-height:170px;
        }
        .pimg-area::after { content:'';position:absolute;bottom:0;left:0;right:0;height:35px;background:linear-gradient(to top,var(--card),transparent); }
        .pimg { width:85px;height:120px;object-fit:contain; filter:drop-shadow(0 8px 20px rgba(212,175,55,.22)); transition:transform .4s; position:relative;z-index:1; }
        .pcard:hover .pimg { transform:scale(1.1) translateY(-5px); }
        .pcat-tag { position:absolute;top:9px;left:9px; font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em; background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.28);color:var(--gold); padding:3px 8px;border-radius:100px;z-index:2; }
        .pimg-ph { width:85px;height:120px;display:flex;align-items:center;justify-content:center; color:rgba(212,175,55,.13);font-size:3.5rem;position:relative;z-index:1; }

        .pbody { padding:1rem; flex:1; display:flex;flex-direction:column; }
        .pname { font-weight:700;font-size:.88rem;color:var(--white);margin-bottom:.25rem;line-height:1.3; }
        .pdesc { color:#555;font-size:.73rem;line-height:1.5;margin-bottom:.85rem;flex:1; }
        .pfoot { display:flex;align-items:center;justify-content:space-between;margin-bottom:.7rem; }
        .pprice { font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--gold); }
        .pid { font-size:.6rem;color:#3a3a3a;letter-spacing:.07em; }

        /* add button */
        .add-btn {
          display:flex;align-items:center;justify-content:center;gap:7px;
          width:100%;padding:10px; background:var(--gold);color:var(--black);
          font-weight:700;font-size:.76rem;text-transform:uppercase;letter-spacing:.06em;
          border-radius:8px;border:none;cursor:pointer; font-family:'Montserrat',sans-serif;
          transition:background .2s,transform .2s;
        }
        .add-btn:hover { background:#c9a227;transform:translateY(-1px); }
        .add-btn.added { background:#1a8a3f;color:#fff; animation:pulse .4s ease; }

        /* qty row when in cart */
        .qty-row { display:flex;align-items:center;gap:0;width:100%;border-radius:8px;overflow:hidden;border:1px solid rgba(212,175,55,.3); }
        .qbtn { width:38px;height:38px;flex-shrink:0;background:rgba(212,175,55,.1);border:none;cursor:pointer;color:var(--gold);font-size:.85rem;display:flex;align-items:center;justify-content:center;transition:background .2s;font-family:'Montserrat',sans-serif; }
        .qbtn:hover { background:rgba(212,175,55,.22); }
        .qval { flex:1;text-align:center;font-weight:700;font-size:.85rem;color:var(--white);background:var(--card);padding:0; }

        @keyframes pulse { 0%{transform:scale(1)} 50%{transform:scale(1.04)} 100%{transform:scale(1)} }

        /* empty/loading */
        .state-box { display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;gap:1rem;text-align:center; }
        .state-ico { font-size:3.5rem;color:rgba(212,175,55,.1); }
        .state-ttl { font-family:'Playfair Display',serif;font-size:1.3rem;color:#333; }
        .state-sub { font-size:.8rem;color:#2a2a2a;line-height:1.6;max-width:340px; }
        .spin { width:34px;height:34px;border:3px solid rgba(212,175,55,.12);border-top-color:var(--gold);border-radius:50%;animation:sp 1s linear infinite; }
        @keyframes sp { to{transform:rotate(360deg)} }

        /* ══ FLOATING CART BUTTON (corner) ══ */
        .float-cart {
          position:fixed; bottom:2rem; right:2rem; z-index:200;
          display:flex; flex-direction:column; align-items:center; gap:.35rem;
        }
        .float-btn {
          width:58px;height:58px;border-radius:16px;
          background:var(--gold);border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;color:var(--black);
          box-shadow:0 8px 28px rgba(212,175,55,.35);
          transition:transform .2s,box-shadow .2s;
        }
        .float-btn:hover { transform:scale(1.08);box-shadow:0 12px 36px rgba(212,175,55,.5); }
        .float-badge {
          position:absolute;top:-8px;right:-8px;
          width:20px;height:20px;border-radius:50%;
          background:#e74c3c;color:#fff;
          font-size:.6rem;font-weight:800;
          display:flex;align-items:center;justify-content:center;
          border:2px solid var(--black);
          animation:popIn .3s ease;
        }
        .float-label { font-size:.62rem;font-weight:700;color:var(--gold);letter-spacing:.08em;text-transform:uppercase; }
        @keyframes popIn { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }

        /* ══ CART DRAWER ══ */
        .cart-overlay { position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:300;animation:fi .2s ease; }
        .cart-drawer {
          position:fixed;top:0;right:0;bottom:0;width:min(400px,95vw);
          background:#0e0e0e;border-left:1px solid var(--border);
          z-index:301;display:flex;flex-direction:column;
          transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);
          box-shadow:-20px 0 60px rgba(0,0,0,.6);
        }
        .cart-drawer.open { transform:translateX(0); }
        .cd-head { padding:1.2rem 1.4rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between; }
        .cd-title { display:flex;align-items:center;gap:9px;font-weight:700;font-size:.95rem;color:var(--white); }
        .cd-close { width:32px;height:32px;border-radius:8px;background:var(--card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:#666;cursor:pointer;transition:all .2s; }
        .cd-close:hover { background:rgba(212,175,55,.1);color:var(--gold);border-color:rgba(212,175,55,.3); }
        .cd-items { flex:1;overflow-y:auto;padding:1rem 1.4rem; }
        .cd-item { display:flex;gap:.9rem;align-items:center;padding:.9rem 0;border-bottom:1px solid #161616; }
        .cd-img { width:50px;height:65px;object-fit:contain;background:#111;border-radius:8px;padding:.3rem;flex-shrink:0; }
        .cd-img-ph { width:50px;height:65px;background:#111;border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(212,175,55,.2);font-size:1.4rem;flex-shrink:0; }
        .cd-info { flex:1;min-width:0; }
        .cd-name { font-weight:700;font-size:.82rem;color:var(--white);margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
        .cd-price { font-family:'Playfair Display',serif;font-size:.9rem;font-weight:700;color:var(--gold);margin-bottom:.4rem; }
        .cd-ctrl { display:flex;align-items:center;gap:.4rem; }
        .cd-qb { width:24px;height:24px;border-radius:6px;background:var(--card);border:1px solid var(--border);color:var(--gold);font-size:.75rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s; }
        .cd-qb:hover { background:rgba(212,175,55,.12); }
        .cd-q { font-weight:700;font-size:.82rem;min-width:20px;text-align:center; }
        .cd-del { width:24px;height:24px;border-radius:6px;background:rgba(231,76,60,.08);border:1px solid rgba(231,76,60,.2);color:#e74c3c;font-size:.68rem;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:.2rem;transition:background .2s; }
        .cd-del:hover { background:rgba(231,76,60,.18); }
        .cd-empty { display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:.9rem;color:#333;text-align:center; }
        .cd-empty-ico { font-size:3.5rem;color:#1a1a1a; }
        .cd-foot { border-top:1px solid var(--border);padding:1.2rem 1.4rem; }
        .cd-summary { display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem; }
        .cd-tlbl { font-size:.75rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.08em; }
        .cd-tval { font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:700;color:var(--gold); }
        .cd-order-btn {
          display:flex;align-items:center;justify-content:center;gap:9px;
          width:100%;padding:13px;background:var(--green);color:#fff;
          font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:.06em;
          border-radius:9px;border:none;cursor:pointer;font-family:'Montserrat',sans-serif;
          transition:background .2s,transform .2s;box-shadow:0 0 22px rgba(37,211,102,.18);
        }
        .cd-order-btn:hover { background:#1fb558;transform:translateY(-1px); }
        .cd-clear { display:block;text-align:center;margin-top:.65rem;font-size:.7rem;color:#444;cursor:pointer;transition:color .2s; }
        .cd-clear:hover { color:#e74c3c; }

        /* ══ CHECKOUT MODAL ══ */
        .mo-ov { position:fixed;inset:0;background:rgba(0,0,0,.88);backdrop-filter:blur(8px);z-index:400;display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:fi .2s ease; }
        .mo-box { background:#0f0f0f;border:1px solid var(--border);border-radius:18px;width:100%;max-width:470px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.8);animation:su .3s ease; }
        .mo-head { padding:1.4rem 1.6rem;background:linear-gradient(135deg,#1a1200,var(--off));border-bottom:1px solid rgba(212,175,55,.15);display:flex;align-items:center;justify-content:space-between; }
        .mo-ttl { font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:700;color:var(--white); }
        .mo-cls { width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,.05);border:1px solid #2a2a2a;display:flex;align-items:center;justify-content:center;color:#666;cursor:pointer;transition:all .2s; }
        .mo-cls:hover { background:rgba(212,175,55,.1);color:var(--gold); }
        .mo-body { padding:1.6rem; }
        .mo-summary { background:var(--card);border:1px solid var(--border);border-radius:9px;padding:.9rem;margin-bottom:1.4rem; }
        .mo-slbl { font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:.7rem; }
        .mo-row { display:flex;justify-content:space-between;font-size:.78rem;padding:.35rem 0;border-bottom:1px solid #1a1a1a;color:#777; }
        .mo-row:last-of-type { border-bottom:none; }
        .mo-rname { font-weight:600;color:#bbb; }
        .mo-total-row { display:flex;justify-content:space-between;align-items:center;margin-top:.7rem;padding-top:.7rem;border-top:1px solid rgba(212,175,55,.12); }
        .mo-tlbl2 { font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted); }
        .mo-tamt { font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:var(--gold); }
        .frow { display:grid;grid-template-columns:1fr 1fr;gap:.8rem; }
        .fg { margin-bottom:.8rem; }
        .flbl { display:block;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#555;margin-bottom:.38rem; }
        .freq { color:#e74c3c; }
        .finp { width:100%;padding:10px 13px;background:var(--card);border:1px solid var(--border);border-radius:8px;color:var(--white);font-size:.82rem;font-family:'Montserrat',sans-serif;outline:none;transition:border-color .2s,box-shadow .2s; }
        .finp::placeholder { color:#333; }
        .finp:focus { border-color:rgba(212,175,55,.5);box-shadow:0 0 0 3px rgba(212,175,55,.05); }
        .mo-send-btn {
          display:flex;align-items:center;justify-content:center;gap:10px;
          width:100%;padding:13px;background:var(--green);color:#fff;
          font-weight:700;font-size:.88rem;text-transform:uppercase;letter-spacing:.06em;
          border-radius:9px;border:none;cursor:pointer;font-family:'Montserrat',sans-serif;
          transition:background .2s,transform .2s;margin-top:.4rem;
          box-shadow:0 0 22px rgba(37,211,102,.18);
        }
        .mo-send-btn:hover { background:#1fb558;transform:translateY(-1px); }
        .mo-send-btn:disabled { opacity:.45;cursor:not-allowed;transform:none; }
        .mo-note { font-size:.68rem;color:#444;text-align:center;margin-top:.7rem;line-height:1.5; }
        .success-state { display:flex;flex-direction:column;align-items:center;padding:2.5rem;text-align:center;gap:.9rem; }
        .succ-ico { font-size:3.5rem;color:var(--green);animation:popIn .4s ease; }
        .succ-ttl { font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:var(--white); }
        .succ-sub { color:var(--muted);font-size:.83rem;line-height:1.6; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fi    { from{opacity:0} to{opacity:1} }
        @keyframes su    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:1000px) { .pgrid{grid-template-columns:repeat(3,1fr)} .cat-grid{grid-template-columns:repeat(2,1fr)} }
        @media(max-width:700px)  { .pgrid{grid-template-columns:repeat(2,1fr)} .cat-grid{grid-template-columns:1fr 1fr} .frow{grid-template-columns:1fr} }
        @media(max-width:480px)  { .pgrid{grid-template-columns:repeat(2,1fr);gap:.7rem} .cat-grid{grid-template-columns:1fr} }
      `}</style>

      <div className="op">
        <Breadcrumb items={[
          { label: "Order Online" },
          ...(activeCat && view === "products"
            ? [{ label: CATEGORIES.find(c => c.key === activeCat)?.label || "" }]
            : [])
        ]} />

        {/* ── HERO ── */}
        <div className="op-hero">
          <div className="op-eyebrow"><GiTrophy size={11}/> Order Online</div>
          <h1 className="op-title">
            {view === "categories"
              ? <>Browse &amp; Order <span>Trophies Online</span></>
              : <>{CATEGORIES.find(c => c.key === activeCat)?.label}</>
            }
          </h1>
          <p className="op-sub">
            {view === "categories"
              ? "Choose a category below, add products to your cart, and send your order directly to our WhatsApp — no payment required upfront!"
              : "Browse products below. Add to cart, then proceed to send your complete order on WhatsApp."
            }
          </p>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div className="how-wrap">
          {[
            { n:1, t:"Choose Category",   s:"Pick what you need" },
            { n:2, t:"Add to Cart",       s:"Select products & qty" },
            { n:3, t:"Fill Details",      s:"Name, mobile & city" },
            { n:4, t:"Send on WhatsApp",  s:"We confirm instantly" },
          ].map((s, i, a) => (
            <React.Fragment key={i}>
              <div className="how-step">
                <div className="how-num">{s.n}</div>
                <div className="how-text">{s.t}<span>{s.s}</span></div>
              </div>
              {i < a.length - 1 && <div className="how-arr">›</div>}
            </React.Fragment>
          ))}
        </div>

        {/* ══════════════════════════════
            CATEGORIES VIEW
        ══════════════════════════════ */}
        {view === "categories" && (
          <div className="cat-view">
            <div className="cat-section-label">
              <div className="divrow"><div className="dline r"/><div className="dtxt">Select Category</div><div className="dline"/></div>
              <h2>What Are You Looking For?</h2>
            </div>
            <div className="cat-grid">
              {CATEGORIES.map((cat, i) => (
                <div
                  className="cat-card"
                  key={cat.key}
                  style={{ background: cat.bg, animationDelay: `${i * 0.08}s` }}
                  onClick={() => openCategory(cat)}
                >
                  <div
                    className="cat-tag"
                    style={{ color: cat.tagColor, borderColor: cat.tagColor, background: `${cat.tagColor}15` }}
                  >
                    {cat.tag}
                  </div>
                  <div className="cat-icon-wrap">{cat.icon}</div>
                  <div className="cat-name">{cat.label}</div>
                  <div className="cat-desc">{cat.desc}</div>
                  <div className="cat-cta">
                    Browse Products <FaArrowRight size={11}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            PRODUCTS VIEW
        ══════════════════════════════ */}
        {view === "products" && (
          <div className="prod-view">
            {/* back + breadcrumb */}
            <div className="back-bar">
              <button className="back-btn" onClick={() => { setView("categories"); setSearch(""); }}>
                <FaArrowLeft size={11}/> All Categories
              </button>
              <span className="back-crumb">
                Categories → <span>{CATEGORIES.find(c => c.key === activeCat)?.label}</span>
              </span>
            </div>

            {/* search toolbar */}
            <div className="prod-toolbar">
              <div style={{display:"flex",alignItems:"center",gap:".75rem",flexWrap:"wrap"}}>
                {CATEGORIES.map(c => (
                  <button
                    key={c.key}
                    className={`add-btn${activeCat===c.key?" ":" "}`}
                    style={{
                      width:"auto", padding:"6px 14px", fontSize:".72rem",
                      background: activeCat===c.key ? "var(--gold)" : "transparent",
                      color: activeCat===c.key ? "var(--black)" : "var(--muted)",
                      border: activeCat===c.key ? "none" : "1px solid var(--border)",
                      borderRadius:"100px",
                    }}
                    onClick={() => setActiveCat(c.key)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}>
                <div className="srch-wrap">
                  <FaSearch className="srch-ico"/>
                  <input className="srch-input" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}/>
                  {search && <FaTimes className="srch-clear" onClick={()=>setSearch("")}/>}
                </div>
                <div className="res-meta">Showing <span>{filtered.length}</span> products</div>
              </div>
            </div>

            {/* loading */}
            {loading && (
              <div className="state-box" style={{padding:"4rem 2rem"}}>
                <div className="spin"/><div style={{color:"#555",fontSize:".83rem"}}>Loading products…</div>
              </div>
            )}

            {/* error */}
            {!loading && fetchError && (
              <div className="state-box">
                <div className="state-ico"><GiTrophy/></div>
                <div className="state-ttl">Could not load products</div>
                <div className="state-sub">{fetchError}<br/><br/>Make sure your Google Sheet is set to <strong style={{color:"var(--gold)"}}>Anyone with the link can view</strong>.</div>
              </div>
            )}

            {/* empty */}
            {!loading && !fetchError && filtered.length === 0 && (
              <div className="state-box">
                <div className="state-ico"><GiTrophy/></div>
                <div className="state-ttl">No products found</div>
                <div className="state-sub">Try a different category or clear the search.</div>
              </div>
            )}

            {/* grid */}
            {!loading && !fetchError && filtered.length > 0 && (
              <div className="pgrid">
                {filtered.map((p, i) => {
                  const inC = inCart(p.id);
                  const wasAdded = addedId === p.id;
                  return (
                    <div className="pcard" key={p.id} style={{animationDelay:`${Math.min(i*.05,.4)}s`}}>
                      <div className="pimg-area">
                        <span className="pcat-tag">{p.category}</span>
                        {p.image
                          ? <img src={`/assets/${p.image}`} alt={p.name} className="pimg"
                              onError={e=>{e.target.style.display="none";e.target.nextSibling.style.display="flex";}}/>
                          : null
                        }
                        <div className="pimg-ph" style={{display: p.image ? "none" : "flex"}}><GiTrophy/></div>
                      </div>
                      <div className="pbody">
                        <div className="pname">{p.name}</div>
                        {p.description && <div className="pdesc">{p.description}</div>}
                        <div className="pfoot">
                          <div className="pprice">{fmt(p.price)}</div>
                          <div className="pid">#{p.id}</div>
                        </div>
                        {inC ? (
                          <div className="qty-row">
                            <button className="qbtn" onClick={()=>changeQty(p.id,-1)}>
                              {inC.qty===1 ? <FaTrash size={10}/> : <FaMinus size={10}/>}
                            </button>
                            <div className="qval">{inC.qty}</div>
                            <button className="qbtn" onClick={()=>changeQty(p.id,1)}><FaPlus size={10}/></button>
                          </div>
                        ) : (
                          <button
                            className={`add-btn${wasAdded?" added":""}`}
                            onClick={()=>addToCart(p)}
                          >
                            <FaShoppingCart size={12}/>
                            {wasAdded ? "Added!" : "Add to Cart"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════
            FLOATING CART (corner)
            Only shows when cart has items
        ════════════════════════════ */}
        {count > 0 && (
          <div className="float-cart">
            <button className="float-btn" onClick={()=>setCartOpen(true)}>
              <FaShoppingCart size={22}/>
              <span className="float-badge">{count}</span>
            </button>
            <span className="float-label">{fmt(cartTotal(cart))}</span>
          </div>
        )}

        {/* ════════════════════════════
            CART DRAWER
        ════════════════════════════ */}
        {cartOpen && <div className="cart-overlay" onClick={()=>setCartOpen(false)}/>}
        <div className={`cart-drawer${cartOpen?" open":""}`}>
          <div className="cd-head">
            <div className="cd-title">
              <FaShoppingCart size={15} style={{color:"var(--gold)"}}/>
              Your Cart
              {count > 0 && <span style={{fontSize:".72rem",color:"var(--muted)",fontWeight:400}}>({count} item{count>1?"s":""})</span>}
            </div>
            <button className="cd-close" onClick={()=>setCartOpen(false)}><FaTimes size={13}/></button>
          </div>

          <div className="cd-items">
            {cart.length === 0 ? (
              <div className="cd-empty">
                <div className="cd-empty-ico"><FaShoppingCart/></div>
                <div style={{color:"#444",fontSize:".83rem"}}>Your cart is empty.<br/>Browse products and add some!</div>
              </div>
            ) : cart.map(item => (
              <div className="cd-item" key={item.id}>
                {item.image
                  ? <img src={`/assets/${item.image}`} alt={item.name} className="cd-img" onError={e=>{e.target.style.display="none";}}/>
                  : <div className="cd-img-ph"><GiTrophy/></div>
                }
                <div className="cd-info">
                  <div className="cd-name">{item.name}</div>
                  <div className="cd-price">{fmt(item.price)} × {item.qty} = <span style={{color:"#fff"}}>{fmt(item.price*item.qty)}</span></div>
                  <div className="cd-ctrl">
                    <button className="cd-qb" onClick={()=>changeQty(item.id,-1)}><FaMinus size={9}/></button>
                    <span className="cd-q">{item.qty}</span>
                    <button className="cd-qb" onClick={()=>changeQty(item.id,1)}><FaPlus size={9}/></button>
                    <button className="cd-del" onClick={()=>removeItem(item.id)}><FaTrash size={9}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="cd-foot">
              <div className="cd-summary">
                <div className="cd-tlbl">Total Amount</div>
                <div className="cd-tval">{fmt(cartTotal(cart))}</div>
              </div>
              <button className="cd-order-btn" onClick={()=>{setCheckout(true);setCartOpen(false);}}>
                <FaWhatsapp size={17}/> Proceed to Order
              </button>
              <span className="cd-clear" onClick={()=>setCart([])}>Clear all items</span>
            </div>
          )}
        </div>

        {/* ════════════════════════════
            CHECKOUT MODAL
        ════════════════════════════ */}
        {checkout && (
          <div className="mo-ov" onClick={e=>{if(e.target===e.currentTarget)setCheckout(false);}}>
            <div className="mo-box">
              <div className="mo-head">
                <div className="mo-ttl">Complete Your Order</div>
                <button className="mo-cls" onClick={()=>setCheckout(false)}><FaTimes size={12}/></button>
              </div>
              <div className="mo-body">
                {sent ? (
                  <div className="success-state">
                    <div className="succ-ico"><FaCheckCircle/></div>
                    <div className="succ-ttl">Order Sent!</div>
                    <div className="succ-sub">WhatsApp is opening with your complete order. We'll confirm &amp; deliver soon!</div>
                  </div>
                ) : (
                  <>
                    <div className="mo-summary">
                      <div className="mo-slbl">Order Summary</div>
                      {cart.map(item => (
                        <div className="mo-row" key={item.id}>
                          <span className="mo-rname">{item.name} × {item.qty}</span>
                          <span>{fmt(item.price * item.qty)}</span>
                        </div>
                      ))}
                      <div className="mo-total-row">
                        <span className="mo-tlbl2">Total</span>
                        <span className="mo-tamt">{fmt(cartTotal(cart))}</span>
                      </div>
                    </div>
                    <div className="frow">
                      <div className="fg">
                        <label className="flbl">Your Name <span className="freq">*</span></label>
                        <input className="finp" placeholder="Rahul Kumar" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/>
                      </div>
                      <div className="fg">
                        <label className="flbl">Mobile No. <span className="freq">*</span></label>
                        <input className="finp" placeholder="+91 XXXXX XXXXX" type="tel" value={customer.mobile} onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
                      </div>
                    </div>
                    <div className="fg">
                      <label className="flbl">City / Area</label>
                      <input className="finp" placeholder="Dehradun" value={customer.city} onChange={e=>setCustomer({...customer,city:e.target.value})}/>
                    </div>
                    <button className="mo-send-btn" disabled={!customer.name||!customer.mobile} onClick={sendOrder}>
                      <FaWhatsapp size={17}/> Send Order on WhatsApp
                    </button>
                    <p className="mo-note">🔒 Your order opens in WhatsApp. Just press Send — we'll confirm &amp; deliver!</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}