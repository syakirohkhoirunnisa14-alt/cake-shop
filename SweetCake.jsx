import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

const Icons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Tiktok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.73a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/>
    </svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" fill="#facc15" width="16" height="16">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Whatsapp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// Curated Unsplash photos per cake flavour
const cakeImages = [
  "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=500&q=85",   // 0 Chocolate Heaven
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=85",   // 1 Strawberry Dream
  "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=85",   // 2 Vanilla Delight
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=85",   // 3 Blueberry Bliss
  "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500&q=85",   // 4 Red Velvet
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85",   // 5 Oreo Crunch
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=85",      // 6 Matcha Cake
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&q=85",   // 7 Rainbow Cake
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=85",   // 8 Tiramisu Cake
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=85",   // 9 Fruit Paradise
];

// Gallery photos — additional bakery / cake shots
const galleryPhotos = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85", label: "Artisan Craft" },
  { src: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&q=85", label: "Celebration" },
  { src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=85", label: "Elegant Layers" },
  { src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=85", label: "Sweet Moments" },
  { src: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=600&q=85", label: "Floral Design" },
  { src: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=600&q=85", label: "Party Cake" },
];

const cakes = [
  { name: "Chocolate Heaven",  price: "Rp 285.000", desc: "Rich dark chocolate layers" },
  { name: "Strawberry Dream",  price: "Rp 265.000", desc: "Fresh strawberry cream" },
  { name: "Vanilla Delight",   price: "Rp 245.000", desc: "Classic vanilla sponge" },
  { name: "Blueberry Bliss",   price: "Rp 275.000", desc: "Wild blueberry compote" },
  { name: "Red Velvet",        price: "Rp 295.000", desc: "Velvety cream cheese frosting" },
  { name: "Oreo Crunch",       price: "Rp 280.000", desc: "Cookies & cream filling" },
  { name: "Matcha Cake",       price: "Rp 290.000", desc: "Premium ceremonial matcha" },
  { name: "Rainbow Cake",      price: "Rp 320.000", desc: "Seven colourful layers" },
  { name: "Tiramisu Cake",     price: "Rp 310.000", desc: "Italian espresso mascarpone" },
  { name: "Fruit Paradise",    price: "Rp 300.000", desc: "Seasonal fresh fruit medley" },
];

const reviews = [
  { name: "Ayu Rahmawati",  role: "Food Blogger",     text: "Sweet Cake is absolutely divine! The Red Velvet was so moist and creamy. My guests were blown away — I'll never order from anywhere else.", avatar: "AR" },
  { name: "Budi Santoso",   role: "Event Organizer",  text: "Ordered the Rainbow Cake for a birthday party and it was a showstopper. Tastes as good as it looks. Fast delivery too!", avatar: "BS" },
  { name: "Citra Dewi",     role: "Home Baker",       text: "As someone who bakes myself, I'm very picky. Sweet Cake's Tiramisu Cake has authentic Italian flavour — rich, balanced, and not too sweet.", avatar: "CD" },
  { name: "Dimas Prakoso",  role: "Wedding Planner",  text: "We've partnered with Sweet Cake for multiple weddings. Always professional, always delicious, always on time. Highly recommended!", avatar: "DP" },
  { name: "Eka Fitriani",   role: "Regular Customer", text: "The Matcha Cake is my weekly treat. Premium quality matcha, light cream, and beautiful presentation every single time.", avatar: "EF" },
];

function FloatingDeco({ style, children }) {
  return (
    <div style={{ position: "absolute", animation: "float 6s ease-in-out infinite", pointerEvents: "none", ...style }}>
      {children}
    </div>
  );
}

export default function SweetCake() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", cake: "", message: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) return alert("Mohon isi nama dan nomor HP.");
    const msg = encodeURIComponent(
      `Halo Sweet Cake,\nNama: ${form.name}\nNo HP: ${form.phone}\nKue: ${form.cake || "-"}\nPesan: ${form.message || "-"}\nSaya ingin melakukan pemesanan.`
    );
    window.open(`https://wa.me/6282282383264?text=${msg}`, "_blank");
  };

  const orderCake = (cakeName) => {
    const msg = encodeURIComponent(`Halo Sweet Cake,\nSaya ingin memesan: ${cakeName}\nMohon info lebih lanjut.`);
    window.open(`https://wa.me/6282282383264?text=${msg}`, "_blank");
  };

  const navLinks = ["Home", "About", "Catalog", "Reviews", "Contact"];

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", overflowX: "hidden", background: "#faf8ff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(3deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes floatSlow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer { 0%,100% { opacity:.6; } 50% { opacity:1; } }
        .display-font { font-family: 'Playfair Display', Georgia, serif; }
        .body-font { font-family: 'Inter', system-ui, sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, #8B5CF6, #f472b6);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glass-card {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.85);
          box-shadow: 0 8px 32px rgba(139,92,246,0.10);
        }
        .hero-bg {
          background: linear-gradient(135deg,#f3e8ff 0%,#fce7f3 40%,#e0e7ff 100%);
          background-size: 300% 300%; animation: gradient 8s ease infinite;
        }
        .btn-primary {
          background: linear-gradient(135deg,#8B5CF6,#f472b6); color:#fff; border:none;
          padding:14px 32px; border-radius:50px; font-weight:600; font-size:15px;
          cursor:pointer; transition:all .3s; box-shadow:0 4px 20px rgba(139,92,246,.4);
          letter-spacing:.3px; font-family:inherit;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(139,92,246,.55); }
        .btn-outline {
          background:transparent; color:#8B5CF6; border:2px solid #8B5CF6;
          padding:12px 28px; border-radius:50px; font-weight:600; font-size:14px;
          cursor:pointer; transition:all .3s; font-family:inherit;
        }
        .btn-outline:hover { background:#8B5CF6; color:#fff; transform:translateY(-2px); }
        .cake-card { transition:all .35s ease; cursor:pointer; }
        .cake-card:hover { transform:translateY(-8px); box-shadow:0 24px 55px rgba(139,92,246,.22) !important; }
        .cake-card:hover .cake-img { transform:scale(1.1); }
        .cake-img { transition:transform .5s ease; }
        .nav-link {
          position:relative; color:#4b5563; font-weight:500; text-decoration:none;
          font-size:15px; transition:color .2s; cursor:pointer;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px;
          background:linear-gradient(90deg,#8B5CF6,#f472b6); transition:width .3s; border-radius:2px;
        }
        .nav-link:hover { color:#8B5CF6; }
        .nav-link:hover::after { width:100%; }
        .input-field {
          width:100%; padding:14px 18px; border:2px solid #e9d5ff; border-radius:14px;
          font-size:15px; background:rgba(255,255,255,.9); transition:all .3s; outline:none;
          font-family:inherit; color:#374151;
        }
        .input-field:focus { border-color:#8B5CF6; box-shadow:0 0 0 4px rgba(139,92,246,.1); background:#fff; }
        .section-label {
          display:inline-block;
          background:linear-gradient(135deg,rgba(139,92,246,.12),rgba(244,114,182,.12));
          color:#8B5CF6; padding:6px 18px; border-radius:50px; font-size:13px;
          font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px;
          border:1px solid rgba(139,92,246,.2);
        }
        .review-card { transition:all .3s; }
        .review-card:hover { transform:translateY(-5px); box-shadow:0 18px 45px rgba(139,92,246,.18) !important; }
        .gallery-item { cursor:pointer; transition:all .35s; border-radius:20px; overflow:hidden; }
        .gallery-item:hover { transform:scale(1.03); box-shadow:0 20px 50px rgba(139,92,246,.25); }
        .gallery-item img { transition:transform .5s ease; width:100%; height:100%; object-fit:cover; display:block; }
        .gallery-item:hover img { transform:scale(1.08); }
        .lightbox-overlay {
          position:fixed; inset:0; background:rgba(15,10,30,.88); z-index:9999;
          display:flex; align-items:center; justify-content:center; padding:20px;
          backdrop-filter:blur(6px);
        }
        ::-webkit-scrollbar { width:7px; }
        ::-webkit-scrollbar-track { background:#f3e8ff; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#8B5CF6,#f472b6); border-radius:4px; }
        .deco-blob { border-radius:50%; position:absolute; filter:blur(60px); opacity:.3; pointer-events:none; }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .about-grid { grid-template-columns:1fr !important; }
          .delivery-grid { grid-template-columns:1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; }
          .footer-grid { grid-template-columns:1fr !important; }
          .hero-title { font-size:2.2rem !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:1000,
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled ? "rgba(255,255,255,.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,.12)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(139,92,246,.08)" : "none",
        transition:"all .3s"
      }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#f472b6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 4px 15px rgba(139,92,246,.4)" }}>🎂</div>
            <span className="display-font" style={{ fontSize:22, fontWeight:700 }}>
              <span style={{ color:"#8B5CF6" }}>Sweet</span><span style={{ color:"#f472b6" }}> Cake</span>
            </span>
          </div>
          {/* Desktop links */}
          <div style={{ display:"flex", gap:32, alignItems:"center" }}>
            {navLinks.map(l => (
              <span key={l} className="nav-link body-font"
                style={{ display: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : undefined }}
                onClick={() => scrollTo(l.toLowerCase())}>{l}</span>
            ))}
            <button className="btn-primary" style={{ padding:"10px 24px", fontSize:14 }} onClick={() => scrollTo("contact")}>Order Now</button>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"#6b7280", display:"none" }}>
              {menuOpen ? <Icons.X/> : <Icons.Menu/>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position:"fixed", top:68, left:0, right:0, zIndex:999, background:"rgba(255,255,255,.97)", backdropFilter:"blur(20px)", padding:"16px 24px 28px", borderBottom:"1px solid #e9d5ff", boxShadow:"0 20px 40px rgba(139,92,246,.1)" }}>
          {navLinks.map(l => (
            <div key={l} onClick={() => scrollTo(l.toLowerCase())} className="nav-link body-font"
              style={{ display:"block", padding:"13px 0", fontSize:17, borderBottom:"1px solid #f3e8ff", color:"#374151" }}>{l}</div>
          ))}
          <button className="btn-primary" style={{ marginTop:16, width:"100%" }} onClick={() => scrollTo("contact")}>Order Now</button>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="hero-bg" style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div className="deco-blob" style={{ width:500, height:500, background:"#c4b5fd", top:-100, right:-100 }}/>
        <div className="deco-blob" style={{ width:400, height:400, background:"#f9a8d4", bottom:-80, left:-80 }}/>
        <div className="deco-blob" style={{ width:250, height:250, background:"#a78bfa", top:"40%", left:"30%" }}/>
        <FloatingDeco style={{ top:"15%", left:"5%", fontSize:36, animationDelay:"0s" }}>🍰</FloatingDeco>
        <FloatingDeco style={{ top:"22%", right:"7%", fontSize:28, animationDelay:"1s" }}>🌸</FloatingDeco>
        <FloatingDeco style={{ bottom:"22%", left:"7%", fontSize:32, animationDelay:"2s" }}>🍓</FloatingDeco>
        <FloatingDeco style={{ bottom:"28%", right:"5%", fontSize:22, animationDelay:".5s" }}>✨</FloatingDeco>
        <FloatingDeco style={{ top:"60%", left:"14%", fontSize:18, animationDelay:"1.5s" }}>🎀</FloatingDeco>
        <FloatingDeco style={{ top:"8%", right:"28%", fontSize:22, animationDelay:"2.5s" }}>🌷</FloatingDeco>

        <div className="hero-grid" style={{ maxWidth:1200, margin:"0 auto", padding:"120px 24px 80px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center", width:"100%", position:"relative", zIndex:2 }}>
          <div>
            <div className="section-label body-font">✦ Premium Artisan Bakery</div>
            <h1 className="display-font hero-title" style={{ fontSize:"3.4rem", fontWeight:900, lineHeight:1.15, color:"#1f2937", marginBottom:24, marginTop:12 }}>
              Freshly Baked <span className="gradient-text">Happiness</span> Every Day
            </h1>
            <p className="body-font" style={{ fontSize:17, color:"#6b7280", lineHeight:1.8, marginBottom:36, maxWidth:440 }}>
              Premium cakes crafted with love and quality ingredients. Each slice is a moment of pure joy, made fresh daily in our artisan kitchen.
            </p>
            <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
              <button className="btn-primary" style={{ fontSize:16, padding:"16px 38px" }} onClick={() => scrollTo("contact")}>Order Now 🎂</button>
              <button className="btn-outline" onClick={() => scrollTo("catalog")}>View Catalog</button>
            </div>
            <div style={{ display:"flex", gap:36, marginTop:40, flexWrap:"wrap" }}>
              {[["500+","Happy Clients"],["50+","Cake Flavors"],["5★","Rating"]].map(([n,l]) => (
                <div key={l}>
                  <div className="display-font gradient-text" style={{ fontSize:28, fontWeight:800 }}>{n}</div>
                  <div className="body-font" style={{ fontSize:13, color:"#9ca3af", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ position:"relative", width:420, height:420, animation:"floatSlow 5s ease-in-out infinite" }}>
              <div style={{ position:"absolute", inset:-20, borderRadius:"50%", background:"linear-gradient(135deg,rgba(139,92,246,.25),rgba(244,114,182,.25))", filter:"blur(30px)", animation:"shimmer 3s ease-in-out infinite" }}/>
              <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", border:"4px solid rgba(255,255,255,.85)", boxShadow:"0 30px 80px rgba(139,92,246,.3)", position:"relative", zIndex:1 }}>
                <img src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=90" alt="Featured Cake"
                  style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              </div>
              <div className="glass-card body-font" style={{ position:"absolute", bottom:20, left:-20, borderRadius:16, padding:"12px 18px", display:"flex", alignItems:"center", gap:10, zIndex:3 }}>
                <span style={{ fontSize:26 }}>⭐</span>
                <div>
                  <div style={{ fontSize:11, color:"#9ca3af" }}>Rating</div>
                  <div style={{ fontSize:16, fontWeight:700, color:"#1f2937" }}>5.0 / 5.0</div>
                </div>
              </div>
              <div className="glass-card body-font" style={{ position:"absolute", top:20, right:-20, borderRadius:16, padding:"12px 18px", zIndex:3 }}>
                <div style={{ fontSize:11, color:"#9ca3af" }}>Today's Special</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#8B5CF6" }}>Red Velvet 🍒</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position:"absolute", bottom:0, left:0, right:0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg"><path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#faf8ff"/></svg>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"80px 0 70px", background:"#faf8ff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
            {[
              { icon:"🌾", title:"Fresh Ingredients", desc:"Sourced daily from trusted local farms. Only the finest go into our cakes.", bg:"#f3e8ff" },
              { icon:"👐", title:"Handmade Daily", desc:"Every cake is crafted by hand with passion and precision by our skilled bakers.", bg:"#fce7f3" },
              { icon:"🏆", title:"Premium Quality", desc:"Award-winning recipes perfected over years of dedication to the craft.", bg:"#ede9fe" },
              { icon:"🚚", title:"Fast Delivery", desc:"Same-day delivery available. Fresh from our oven to your doorstep.", bg:"#fdf2f8" },
            ].map((f,i) => (
              <AnimatedSection key={f.title} delay={i*.1}>
                <div style={{ background:f.bg, borderRadius:24, padding:"32px 28px", border:"1px solid rgba(255,255,255,.9)", boxShadow:"0 4px 20px rgba(139,92,246,.07)", height:"100%" }}>
                  <div style={{ fontSize:44, marginBottom:16 }}>{f.icon}</div>
                  <h3 className="display-font" style={{ fontSize:20, fontWeight:700, color:"#1f2937", marginBottom:10 }}>{f.title}</h3>
                  <p className="body-font" style={{ color:"#6b7280", lineHeight:1.65, fontSize:15 }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding:"80px 0", background:"linear-gradient(180deg,#faf8ff 0%,#f3e8ff 100%)" }}>
        <div className="about-grid" style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:70, alignItems:"center" }}>
          <AnimatedSection delay={0}>
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:32, overflow:"hidden", boxShadow:"0 30px 70px rgba(139,92,246,.25)", border:"4px solid rgba(255,255,255,.9)" }}>
                <img src="https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=700&q=85" alt="Our Bakery"
                  style={{ width:"100%", height:480, objectFit:"cover", display:"block" }}/>
              </div>
              <div className="glass-card body-font" style={{ position:"absolute", bottom:-20, right:-20, borderRadius:20, padding:"18px 22px", boxShadow:"0 8px 30px rgba(139,92,246,.2)" }}>
                <div style={{ fontSize:32, textAlign:"center" }}>🎂</div>
                <div style={{ fontSize:24, fontWeight:800, color:"#8B5CF6", textAlign:"center", fontFamily:"Georgia" }}>10+</div>
                <div style={{ fontSize:13, color:"#9ca3af", textAlign:"center" }}>Years Baking</div>
              </div>
              <div style={{ position:"absolute", top:-15, left:-15, width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#f472b6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, boxShadow:"0 8px 25px rgba(139,92,246,.4)" }}>🌸</div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div>
              <div className="section-label body-font">Our Story</div>
              <h2 className="display-font" style={{ fontSize:"2.4rem", fontWeight:800, color:"#1f2937", lineHeight:1.2, marginBottom:20 }}>
                Baked with Love,<br/><span className="gradient-text">Served with Joy</span>
              </h2>
              <p className="body-font" style={{ color:"#6b7280", lineHeight:1.8, marginBottom:18, fontSize:16 }}>
                Sweet Cake was born from a simple dream — to bring smiles to people's faces through the magic of baking. Founded in 2014, our journey began in a small home kitchen in Palembang, South Sumatra.
              </p>
              <p className="body-font" style={{ color:"#6b7280", lineHeight:1.8, marginBottom:30, fontSize:16 }}>
                Today, we proudly craft over 200 cakes daily, each one made by hand using time-honoured recipes and the finest ingredients. From birthday celebrations to wedding milestones — Sweet Cake has been part of life's most beautiful moments.
              </p>
              {["Premium Belgian chocolate and imported vanilla","Certified halal and free from artificial preservatives","Custom orders and personalised cake designs"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14 }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#f472b6)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"white", marginTop:1 }}>
                    <Icons.Check/>
                  </div>
                  <span className="body-font" style={{ color:"#4b5563", fontSize:15, lineHeight:1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" style={{ padding:"90px 0", background:"#faf8ff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div className="section-label body-font">Our Creations</div>
              <h2 className="display-font" style={{ fontSize:"2.6rem", fontWeight:800, color:"#1f2937", marginBottom:14 }}>
                Explore Our <span className="gradient-text">Cake Catalog</span>
              </h2>
              <p className="body-font" style={{ color:"#9ca3af", fontSize:16, maxWidth:500, margin:"0 auto" }}>
                Every cake is a masterpiece. Discover flavours crafted to make every occasion unforgettable.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:24 }}>
            {cakes.map((cake,i) => (
              <AnimatedSection key={cake.name} delay={(i%5)*.07}>
                <div className="cake-card glass-card" style={{ borderRadius:24, overflow:"hidden", border:"1px solid rgba(255,255,255,.9)" }}>
                  {/* Photo */}
                  <div style={{ overflow:"hidden", height:210, position:"relative" }}>
                    <img className="cake-img" src={cakeImages[i]} alt={cake.name}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                    {/* Price badge */}
                    <div style={{ position:"absolute", top:12, right:12, background:"linear-gradient(135deg,#8B5CF6,#f472b6)", color:"white", padding:"4px 12px", borderRadius:50, fontSize:11, fontWeight:700 }}>
                      {cake.price}
                    </div>
                  </div>
                  {/* Info */}
                  <div style={{ padding:"18px 16px 20px" }}>
                    <h3 className="display-font" style={{ fontSize:16, fontWeight:700, color:"#1f2937", marginBottom:4 }}>{cake.name}</h3>
                    <p className="body-font" style={{ fontSize:12, color:"#9ca3af", marginBottom:14 }}>{cake.desc}</p>
                    <button onClick={() => orderCake(cake.name)} className="btn-primary"
                      style={{ width:"100%", padding:"10px", fontSize:13, borderRadius:50, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                      <Icons.Whatsapp/> Order Now
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section style={{ padding:"80px 0", background:"linear-gradient(180deg,#faf8ff,#f3e8ff)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign:"center", marginBottom:50 }}>
              <div className="section-label body-font">Gallery</div>
              <h2 className="display-font" style={{ fontSize:"2.4rem", fontWeight:800, color:"#1f2937", marginBottom:12 }}>
                A Feast for <span className="gradient-text">the Eyes</span>
              </h2>
              <p className="body-font" style={{ color:"#9ca3af", fontSize:16 }}>
                Every photo tells a story of craftsmanship and sweetness.
              </p>
            </div>
          </AnimatedSection>

          {/* Masonry-style grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gridAutoRows:"220px", gap:16 }}>
            {galleryPhotos.map((photo,i) => (
              <AnimatedSection key={i} delay={i*.08}>
                <div className="gallery-item" style={{ height: i===0||i===3 ? "100%" : "100%", gridRow: i===0?"span 1":"span 1", position:"relative" }}
                  onClick={() => setLightbox(photo)}>
                  <img src={photo.src} alt={photo.label} style={{ borderRadius:20 }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(30,10,60,.55),transparent)", borderRadius:20, display:"flex", alignItems:"flex-end", padding:16, opacity:0, transition:"opacity .3s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity=1}
                    onMouseLeave={e => e.currentTarget.style.opacity=0}>
                    <span className="body-font" style={{ color:"white", fontWeight:600, fontSize:15 }}>{photo.label}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Hero gallery row — big feature photos */}
          <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:16, marginTop:16 }}>
            <AnimatedSection delay={0.1}>
              <div className="gallery-item" style={{ height:280 }} onClick={() => setLightbox({ src:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=85", label:"Tiramisu Elegance" })}>
                <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=900&q=85" alt="Tiramisu" style={{ borderRadius:20, height:"100%" }}/>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.18}>
              <div className="gallery-item" style={{ height:280 }} onClick={() => setLightbox({ src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85", label:"Artisan Slice" })}>
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85" alt="Artisan" style={{ borderRadius:20, height:"100%" }}/>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div style={{ maxWidth:800, width:"100%", position:"relative" }} onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.label} style={{ width:"100%", borderRadius:24, display:"block", boxShadow:"0 30px 80px rgba(0,0,0,.5)" }}/>
            {lightbox.label && (
              <div className="body-font" style={{ textAlign:"center", color:"rgba(255,255,255,.8)", marginTop:14, fontSize:16, fontWeight:500 }}>{lightbox.label}</div>
            )}
            <button onClick={() => setLightbox(null)} style={{ position:"absolute", top:-16, right:-16, width:40, height:40, borderRadius:"50%", background:"white", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 4px 15px rgba(0,0,0,.3)" }}>✕</button>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <section id="reviews" style={{ padding:"90px 0", background:"linear-gradient(180deg,#f3e8ff 0%,#fce7f3 100%)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div className="section-label body-font">Testimonials</div>
              <h2 className="display-font" style={{ fontSize:"2.5rem", fontWeight:800, color:"#1f2937", marginBottom:14 }}>
                What Our <span className="gradient-text">Customers Say</span>
              </h2>
            </div>
          </AnimatedSection>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
            {reviews.map((r,i) => (
              <AnimatedSection key={r.name} delay={i*.1}>
                <div className="review-card glass-card" style={{ borderRadius:24, padding:"28px 26px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:-10, right:20, fontSize:100, color:"rgba(139,92,246,.06)", fontFamily:"Georgia", lineHeight:1 }}>"</div>
                  <div style={{ display:"flex", gap:3, marginBottom:16 }}>{[...Array(5)].map((_,j) => <Icons.Star key={j}/>)}</div>
                  <p className="body-font" style={{ color:"#4b5563", lineHeight:1.7, marginBottom:20, fontSize:15, fontStyle:"italic" }}>"{r.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:46, height:46, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#f472b6)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:700, fontSize:15, flexShrink:0 }}>{r.avatar}</div>
                    <div>
                      <div className="body-font" style={{ fontWeight:700, color:"#1f2937", fontSize:15 }}>{r.name}</div>
                      <div className="body-font" style={{ fontSize:13, color:"#8B5CF6" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER BANNER */}
      <section style={{ padding:"0 24px 80px", background:"#faf8ff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <AnimatedSection>
            <div style={{ borderRadius:32, overflow:"hidden", position:"relative", background:"linear-gradient(135deg,#7c3aed 0%,#a855f7 40%,#ec4899 100%)", padding:"60px 48px", boxShadow:"0 20px 60px rgba(139,92,246,.35)" }}>
              <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"rgba(255,255,255,.08)", top:-80, right:80 }}/>
              <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.06)", bottom:-60, left:60 }}/>
              <FloatingDeco style={{ top:"20%", left:"42%", fontSize:28, opacity:.35 }}>🎉</FloatingDeco>
              <FloatingDeco style={{ bottom:"20%", right:"14%", fontSize:24, opacity:.3, animationDelay:"1s" }}>✨</FloatingDeco>
              <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:30 }}>
                <div>
                  <div className="body-font" style={{ color:"rgba(255,255,255,.8)", fontSize:13, fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>🎊 Limited Time Offer</div>
                  <h2 className="display-font" style={{ fontSize:"2.8rem", fontWeight:900, color:"white", lineHeight:1.1, marginBottom:14 }}>
                    Get <span style={{ color:"#fde68a" }}>50% OFF</span><br/>Your First Order!
                  </h2>
                  <p className="body-font" style={{ color:"rgba(255,255,255,.8)", fontSize:16, lineHeight:1.6, maxWidth:450 }}>
                    Use code <strong style={{ background:"rgba(255,255,255,.2)", padding:"3px 12px", borderRadius:8 }}>SWEETFIRST</strong> on your first purchase. Valid until end of month.
                  </p>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:72, marginBottom:16 }}>🎂</div>
                  <button onClick={() => scrollTo("contact")} style={{ background:"white", color:"#8B5CF6", border:"none", padding:"14px 30px", borderRadius:50, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 8px 25px rgba(0,0,0,.2)", fontFamily:"inherit", transition:"transform .2s" }}
                    onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="none"}>
                    Claim Offer Now →
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* DELIVERY */}
      <section style={{ padding:"20px 24px 90px", background:"#faf8ff" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="delivery-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>
            <AnimatedSection delay={0}>
              <div>
                <div className="section-label body-font">Delivery</div>
                <h2 className="display-font" style={{ fontSize:"2.3rem", fontWeight:800, color:"#1f2937", marginBottom:20, lineHeight:1.25 }}>
                  Your Cake, <span className="gradient-text">Delivered Fresh</span>
                </h2>
                <p className="body-font" style={{ color:"#6b7280", lineHeight:1.8, marginBottom:28, fontSize:16 }}>
                  We partner with trusted couriers to ensure your cake arrives in perfect condition — every layer intact, every frosting flawless.
                </p>
                {[
                  { icon:"⚡", title:"Same-Day Delivery", desc:"Order before 12:00 PM for delivery the same day" },
                  { icon:"📦", title:"Secure Packaging", desc:"Custom cake boxes protect every tier in transit" },
                  { icon:"📍", title:"Palembang Coverage", desc:"Full coverage across all Palembang city areas" },
                  { icon:"🔔", title:"Live Tracking", desc:"Real-time updates from kitchen to doorstep" },
                ].map((item,i) => (
                  <div key={item.title} style={{ display:"flex", gap:16, marginBottom:20, alignItems:"flex-start" }}>
                    <div style={{ width:48, height:48, borderRadius:16, flexShrink:0, background: i%2===0 ? "linear-gradient(135deg,#f3e8ff,#ede9fe)" : "linear-gradient(135deg,#fce7f3,#fdf2f8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{item.icon}</div>
                    <div>
                      <div className="body-font" style={{ fontWeight:700, color:"#1f2937", fontSize:15, marginBottom:3 }}>{item.title}</div>
                      <div className="body-font" style={{ color:"#9ca3af", fontSize:14, lineHeight:1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div style={{ borderRadius:32, overflow:"hidden", background:"linear-gradient(135deg,#f3e8ff,#fce7f3)", padding:36, textAlign:"center", boxShadow:"0 20px 60px rgba(139,92,246,.15)", border:"2px solid rgba(255,255,255,.9)" }}>
                <div style={{ fontSize:110, marginBottom:16, animation:"floatSlow 4s ease-in-out infinite" }}>🚚</div>
                <div className="display-font gradient-text" style={{ fontSize:"1.7rem", fontWeight:800, marginBottom:6 }}>Free Delivery</div>
                <div className="body-font" style={{ color:"#6b7280", fontSize:15, marginBottom:28 }}>On orders above Rp 300.000</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[["30 min","Avg. Delivery"],["100%","On Time"],["4.9★","Delivery Rating"],["Free","Above 300k"]].map(([v,l]) => (
                    <div key={l} style={{ background:"rgba(255,255,255,.7)", borderRadius:16, padding:"14px 10px", backdropFilter:"blur(10px)" }}>
                      <div className="display-font gradient-text" style={{ fontSize:20, fontWeight:800 }}>{v}</div>
                      <div className="body-font" style={{ fontSize:12, color:"#9ca3af", marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding:"90px 24px", background:"linear-gradient(180deg,#faf8ff,#f3e8ff)" }}>
        <div style={{ maxWidth:680, margin:"0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div className="section-label body-font">Order Now</div>
              <h2 className="display-font" style={{ fontSize:"2.4rem", fontWeight:800, color:"#1f2937", marginBottom:14 }}>
                Place Your <span className="gradient-text">Sweet Order</span>
              </h2>
              <p className="body-font" style={{ color:"#9ca3af", fontSize:16 }}>
                Fill in the details and we'll connect via WhatsApp right away.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="glass-card" style={{ borderRadius:32, padding:"38px 36px", boxShadow:"0 20px 60px rgba(139,92,246,.15)" }}>
              <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
                <div>
                  <label className="body-font" style={{ display:"block", fontSize:14, fontWeight:600, color:"#374151", marginBottom:8 }}>Your Name *</label>
                  <input className="input-field body-font" type="text" placeholder="e.g. Siti Rahma"
                    value={form.name} onChange={e => setForm({...form, name:e.target.value})}/>
                </div>
                <div>
                  <label className="body-font" style={{ display:"block", fontSize:14, fontWeight:600, color:"#374151", marginBottom:8 }}>Phone Number *</label>
                  <input className="input-field body-font" type="tel" placeholder="e.g. 08123456789"
                    value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}/>
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <label className="body-font" style={{ display:"block", fontSize:14, fontWeight:600, color:"#374151", marginBottom:8 }}>Cake Selection</label>
                <select className="input-field body-font" value={form.cake} onChange={e => setForm({...form, cake:e.target.value})}>
                  <option value="">— Choose your cake —</option>
                  {cakes.map(c => <option key={c.name} value={c.name}>{c.name} — {c.price}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:28 }}>
                <label className="body-font" style={{ display:"block", fontSize:14, fontWeight:600, color:"#374151", marginBottom:8 }}>Message</label>
                <textarea className="input-field body-font" rows={4}
                  placeholder="Ceritakan detail pesananmu — ukuran, dekorasi khusus, tanggal pengiriman..."
                  value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                  style={{ resize:"vertical", minHeight:110 }}/>
              </div>
              <button className="btn-primary body-font" onClick={handleSubmit}
                style={{ width:"100%", fontSize:16, padding:"16px", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                <Icons.Whatsapp/> Kirim via WhatsApp
              </button>
              <p className="body-font" style={{ textAlign:"center", fontSize:13, color:"#9ca3af", marginTop:12 }}>
                Kamu akan diarahkan ke WhatsApp untuk menyelesaikan pesananmu 💜
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"linear-gradient(135deg,#1e1b2e,#2d1b69)", padding:"60px 24px 28px", color:"white" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:48, marginBottom:44 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{ width:46, height:46, borderRadius:"50%", background:"linear-gradient(135deg,#8B5CF6,#f472b6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🎂</div>
                <span className="display-font" style={{ fontSize:22, fontWeight:700 }}>
                  <span style={{ color:"#c4b5fd" }}>Sweet</span><span style={{ color:"#f9a8d4" }}> Cake</span>
                </span>
              </div>
              <p className="body-font" style={{ color:"rgba(255,255,255,.5)", lineHeight:1.75, fontSize:14, maxWidth:280 }}>
                Crafting moments of joy, one slice at a time. Premium cakes made with heart, delivered with love.
              </p>
              <div style={{ display:"flex", gap:12, marginTop:22 }}>
                {[<Icons.Instagram/>, <Icons.Facebook/>, <Icons.Tiktok/>].map((icon,i) => (
                  <a key={i} href="#" style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.65)", textDecoration:"none", transition:"all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background="linear-gradient(135deg,#8B5CF6,#f472b6)"; e.currentTarget.style.color="white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.color="rgba(255,255,255,.65)"; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="body-font" style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#c4b5fd", marginBottom:18 }}>Navigation</div>
              {navLinks.map(l => (
                <div key={l} onClick={() => scrollTo(l.toLowerCase())} className="body-font"
                  style={{ color:"rgba(255,255,255,.5)", fontSize:14, marginBottom:12, cursor:"pointer", transition:"color .2s" }}
                  onMouseEnter={e=>e.target.style.color="#f9a8d4"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.5)"}>
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="body-font" style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"#c4b5fd", marginBottom:18 }}>Contact</div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, color:"rgba(255,255,255,.5)" }}>
                <Icons.Mail/>
                <a href="mailto:syakirohkhoirunnisa14@gmail.com" className="body-font"
                  style={{ fontSize:12, color:"inherit", textDecoration:"none", wordBreak:"break-all" }}>
                  syakirohkhoirunnisa14@gmail.com
                </a>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, color:"rgba(255,255,255,.5)" }}>
                <Icons.Whatsapp/>
                <a href="https://wa.me/6282282383264" className="body-font"
                  style={{ fontSize:12, color:"inherit", textDecoration:"none" }}>+62 822-8238-3264</a>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, color:"rgba(255,255,255,.5)" }}>
                <span>📍</span>
                <span className="body-font" style={{ fontSize:12 }}>Palembang, South Sumatra, Indonesia</span>
              </div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.1)", paddingTop:22, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <p className="body-font" style={{ color:"rgba(255,255,255,.3)", fontSize:13 }}>© 2024 Sweet Cake. All rights reserved. Made with 💜</p>
            <p className="body-font" style={{ color:"rgba(255,255,255,.3)", fontSize:13 }}>Palembang, South Sumatra</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
