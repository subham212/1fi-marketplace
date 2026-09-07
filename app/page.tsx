"use client";

import { useEffect, useMemo, useState } from "react";

type ShopTab = "brands" | "nearby" | "marketplace";
type ProductCategory = "All" | "Mobiles" | "Laptops" | "Audio";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: Exclude<ProductCategory, "All">;
  price: number;
  mrp: number;
  monthlyEmi: number;
  badge: string;
  rating: string;
  reviewCount: string;
  description: string;
  colors: string[];
  variants: string[];
  variantPrices: Record<string, number>;
  image: "phone" | "laptop" | "headphones";
  highlights: { label: string; value: string }[];
};

type EmiPlan = { months: number; interest: number };
type PaymentMode = "emi" | "full";

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Shop", icon: "shop" },
  { label: "EMI Dues", icon: "receipt" },
  { label: "Limit", icon: "chart" },
  { label: "Profile", icon: "profile" },
] as const;

const categories: ProductCategory[] = ["All", "Mobiles", "Laptops", "Audio"];

const products: Product[] = [
  { id: "iphone-15", name: "iPhone 15", brand: "APPLE", category: "Mobiles", price: 69999, mrp: 79999, monthlyEmi: 5833, badge: "No-cost EMI", rating: "4.6", reviewCount: "2.1K+", description: "128 GB · Dynamic Island · 48MP camera", colors: ["#181818", "#afd9f4", "#e9d4d8"], variants: ["128 GB", "256 GB", "512 GB"], variantPrices: { "128 GB": 69999, "256 GB": 79999, "512 GB": 99999 }, image: "phone", highlights: [{ label: "Display", value: "Super Retina XDR" }, { label: "Camera", value: "48MP Main Camera" }, { label: "Battery", value: "All-day battery life" }] },
  { id: "macbook-air", name: "MacBook Air M2", brand: "APPLE", category: "Laptops", price: 89990, mrp: 99990, monthlyEmi: 7499, badge: "From ₹7,499/mo", rating: "4.8", reviewCount: "1.4K+", description: "13-inch · 8GB RAM · 256GB SSD", colors: ["#b2b8bd", "#b8a9ca"], variants: ["8 GB / 256 GB", "8 GB / 512 GB"], variantPrices: { "8 GB / 256 GB": 89990, "8 GB / 512 GB": 104990 }, image: "laptop", highlights: [{ label: "Processor", value: "Apple M2 chip" }, { label: "Memory", value: "8 GB unified memory" }, { label: "Battery", value: "Up to 18 hours" }] },
  { id: "sony-headphones", name: "Sony WH-1000XM5", brand: "SONY", category: "Audio", price: 29990, mrp: 34990, monthlyEmi: 2499, badge: "No-cost EMI", rating: "4.4", reviewCount: "3.5K+", description: "Noise cancelling · 30-hour battery", colors: ["#1e1e20", "#e8e0d7"], variants: ["Black", "Cream"], variantPrices: { Black: 29990, Cream: 31990 }, image: "headphones", highlights: [{ label: "Connection", value: "Bluetooth 5.2" }, { label: "Audio", value: "Industry-leading ANC" }, { label: "Battery", value: "30 hours playback" }] },
  { id: "pixel-9", name: "Google Pixel 9", brand: "GOOGLE", category: "Mobiles", price: 79999, mrp: 89999, monthlyEmi: 6666, badge: "Popular", rating: "4.5", reviewCount: "980+", description: "256 GB · AI camera · All-day battery", colors: ["#e6ded3", "#b6d4cf"], variants: ["128 GB", "256 GB"], variantPrices: { "128 GB": 79999, "256 GB": 84999 }, image: "phone", highlights: [{ label: "Display", value: "Actua display" }, { label: "Camera", value: "50MP wide camera" }, { label: "Processor", value: "Google Tensor G4" }] },
];

const nearbyStores = [
  { name: "TripBouquet", distance: "1292 KM", address: "241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018", logo: "T" },
  { name: "Charger On Wheels", distance: "1293 KM", address: "Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101", logo: "⚡" },
];

const brands = [
  { name: "Air India", months: 18, color: "#e4002b", logo: "AIR INDIA" },
  { name: "Apple Premium Reseller", months: 24, color: "#101010", logo: "APPLE" },
  { name: "CaratLane", months: 18, color: "#a90091", logo: "CARATLANE" },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<ShopTab>("marketplace");
  const [category, setCategory] = useState<ProductCategory>("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = !query || `${product.name} ${product.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <main className="app-stage">
      <div className="device-frame">
        <div className="app-shell">
          <header className="status-bar" aria-label="Device status">
            <span>10:49</span>
            <span className="status-right"><span className="network">VoLTE</span><span className="signal" aria-hidden="true"><i /><i /><i /><i /></span><span className="battery"><span />30%</span></span>
          </header>

          <section className="hero-panel">
            <div className="hero-copy">
              <div className="emi-pill"><span>✦</span> NO-COST EMIs</div>
              <h1>Shop today,<br /><em>Pay later using</em><br />Mutual funds.</h1>
              <p>No credit score required. No interest.<br />Backed by your investments.</p>
            </div>
            <HeroArtwork />
            <div className="hero-curve" />
          </section>

          <section className="tab-switcher" aria-label="Shop sections">
            {([["brands", "Top Brands"], ["nearby", "Nearby Stores"], ["marketplace", "Marketplace"]] as const).map(([tab, label]) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={activeTab === tab ? "active" : ""}>{label}{activeTab === tab && <span />}</button>
            ))}
          </section>

          {activeTab === "marketplace" ? (
            <section className="content-panel">
              <label className="search-field"><Icon name="search" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." aria-label="Search products" /></label>
              <div className="category-row" aria-label="Product categories">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={category === item ? "selected" : ""}>{item}</button>)}</div>
              <div className="section-heading"><div><p className="eyebrow">1FI MARKETPLACE</p><h2>Shop smarter</h2></div><span>{filteredProducts.length} items</span></div>
              {filteredProducts.length > 0 ? <div className="product-masonry">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />)}</div> : <div className="empty-state"><Icon name="search" /><strong>No products found</strong><span>Try another search or category.</span></div>}
            </section>
          ) : <ShopPlaceholder activeTab={activeTab} />}

          {selectedProduct && <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

          <nav className="bottom-nav" aria-label="Main navigation">
            {navItems.map((item) => <button key={item.label} type="button" className={item.label === "Shop" ? "active" : ""}><Icon name={item.icon} /><span>{item.label}</span></button>)}
          </nav>
        </div>
      </div>
    </main>
  );
}

function HeroArtwork() {
  return <div className="hero-art" aria-hidden="true"><div className="art-glow" /><div className="art-laptop"><div /><span /></div><div className="art-phone"><div /></div><div className="art-bag"><div /><span /><i /></div><div className="art-car"><span /><i /><b /></div><div className="art-confetti one" /><div className="art-confetti two" /></div>;
}

function Icon({ name }: { name: typeof navItems[number]["icon"] | "search" }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
  if (name === "home") return <svg {...common}><path d="m3 10 9-7 9 7v10H3z" /><path d="M9 21v-6h6v6" /></svg>;
  if (name === "shop") return <svg {...common}><path d="M4 10h16v10H4z" /><path d="M3 10 5 5h14l2 5" /><path d="M8 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0" /></svg>;
  if (name === "receipt") return <svg {...common}><path d="M5 3h14v18l-3-2-4 2-4-2-3 2z" /><path d="M8 8h8M8 12h6" /></svg>;
  if (name === "chart") return <svg {...common}><path d="M4 19 10 13l4 3 6-8" /><path d="M17 8h3v3" /><path d="M4 21h16" /></svg>;
  return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5 21c.5-4 2.8-6 7-6s6.5 2 7 6" /></svg>;
}

function ProductVisual({ type, large = false }: { type: Product["image"]; large?: boolean }) {
  return <div className={`product-visual visual-${type} ${large ? "large" : ""}`} aria-hidden="true">{type === "phone" && <><div className="phone-camera" /><div className="phone-screen" /></>}{type === "laptop" && <><div className="laptop-screen" /><div className="laptop-base" /></>}{type === "headphones" && <><div className="headband" /><div className="ear left" /><div className="ear right" /></>}</div>;
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return <article className="product-card" onClick={onSelect}><div className="product-card-media"><div className="rating-chip"><span>★</span> {product.rating} <i>|</i> {product.reviewCount}</div><ProductVisual type={product.image} /></div><div className="product-card-body"><strong className="card-emi">{formatPrice(product.monthlyEmi)}/m</strong><span className="card-plan">Plan may differ <b>◕</b></span><p className="product-category">{product.brand}</p><h3>{product.name}</h3><div className="card-price"><span>{formatPrice(product.price)}</span><del>{formatPrice(product.mrp)}</del><strong>{Math.round((1 - product.price / product.mrp) * 100)}% OFF</strong></div></div></article>;
}

function PaymentPlan({
  product,
  price,
  plans,
  months,
  paymentMode,
  onSelectPlan,
  onSelectFull,
}: {
  product: Product;
  price: number;
  plans: EmiPlan[];
  months: number;
  paymentMode: PaymentMode;
  onSelectPlan: (months: number) => void;
  onSelectFull: () => void;
}) {
  const selectedPlan = plans.find((plan) => plan.months === months) ?? plans[0];
  const installment = Math.ceil(price / selectedPlan.months);
  const installmentDates = selectedPlan.months === 3 ? ["Today", "5 Oct", "5 Nov"] : ["Today", "5 Oct", "5 Nov"];
  const visibleInstallments = installmentDates.slice(0, Math.min(selectedPlan.months, 3));

  return (
    <section className="emi-box" aria-label="Payment plan">
      <div className="emi-box-heading">
        <h2>Select payment plan:</h2>
        <span className="no-cost-label"><span aria-hidden="true">✳</span> No cost EMI</span>
      </div>
      <div className="payment-plan-options" aria-label="EMI duration">
        {plans.map((plan) => (
          <button
            key={plan.months}
            type="button"
            className={paymentMode === "emi" && months === plan.months ? "payment-plan-option selected" : "payment-plan-option"}
            onClick={() => onSelectPlan(plan.months)}
          >
            Pay in {plan.months}
          </button>
        ))}
      </div>
      <div className={paymentMode === "emi" ? "selected-plan-card selected" : "selected-plan-card"}>
        <div className="selected-plan-heading">
          <strong>Pay in {selectedPlan.months}</strong>
          <span className="plan-radio" aria-hidden="true">✓</span>
        </div>
        <div className="installment-row">
          {visibleInstallments.map((date, index) => (
            <div className="installment-card" key={date}>
              <span className="installment-icon" aria-hidden="true">{index === visibleInstallments.length - 1 ? "✓" : "◐"}</span>
              <strong>{formatPrice(installment)}</strong>
              <small>{date}</small>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={paymentMode === "full" ? "full-pay-option selected" : "full-pay-option"}
        onClick={onSelectFull}
      >
        <span className="full-pay-copy">
          <strong>Pay in full</strong>
          <small>{formatPrice(product.price)} <del>{formatPrice(product.mrp)}</del></small>
        </span>
        <span className="full-pay-reward">▰ Get ₹69 Cashback with super.money UPI</span>
        <span className="full-pay-radio" aria-hidden="true">{paymentMode === "full" ? "✓" : ""}</span>
      </button>
    </section>
  );
}

function ProductDetails({ product, onClose }: { product: Product; onClose: () => void }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [months, setMonths] = useState(3);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("emi");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryStartX, setGalleryStartX] = useState<number | null>(null);
  const [relatedIndex, setRelatedIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const galleryImages = [0, 1, 2, 3];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  const plans: EmiPlan[] = [{ months: 3, interest: 0 }, { months: 6, interest: 0 }, { months: 12, interest: 14 }];
  const selectedPrice = product.variantPrices[variant] ?? product.price;
  const selectedPlan = plans.find((plan) => plan.months === months) ?? plans[0];
  const interest = paymentMode === "emi" ? Math.round(selectedPrice * (selectedPlan.interest / 100) * (selectedPlan.months / 12)) : 0;
  const total = selectedPrice + interest;
  const monthly = paymentMode === "full" ? selectedPrice : Math.ceil(total / selectedPlan.months);
  const selectedMrp = Math.max(product.mrp, selectedPrice);

  return <div className="details-overlay"><div className="details-sheet"><div className="details-promo">PAY LATER WITH YOUR MUTUAL FUNDS · NO-COST EMI AVAILABLE</div><header className="details-header"><button type="button" onClick={onClose} aria-label="Close product details">←</button><label className="details-search"><Icon name="search" /><span>{product.name}</span></label><span className="secure-label"><Icon name="receipt" /> Secure</span></header><div className="details-gallery"><div className="fulfilled-chip"><span>1</span> Fulfilled by 1Fi</div><div className="gallery-actions"><button type="button" className={wishlisted ? "wishlist-button active" : "wishlist-button"} onClick={() => setWishlisted((value) => !value)} aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>{wishlisted ? "♥" : "♡"}</button><span className="gallery-rating"><span>★</span> {product.rating} <i>|</i> {product.reviewCount}</span></div><div className="gallery-viewport" onPointerDown={(event) => { setGalleryStartX(event.clientX); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { if (galleryStartX !== null) { const delta = event.clientX - galleryStartX; if (Math.abs(delta) > 36) setGalleryIndex((index) => Math.max(0, Math.min(galleryImages.length - 1, index + (delta < 0 ? 1 : -1)))); } setGalleryStartX(null); }}><div className="gallery-track" style={{ transform: `translateX(-${galleryIndex * 100}%)` }}>{galleryImages.map((index) => <div className="gallery-slide" key={index}><ProductVisual type={product.image} large /></div>)}</div></div><div className="gallery-dots" aria-label="Product images">{galleryImages.map((index) => <button key={index} type="button" aria-label={`Show product image ${index + 1}`} className={galleryIndex === index ? "active" : ""} onClick={() => setGalleryIndex(index)} />)}</div></div><div className="benefit-row"><span>✳ <strong>No Cost EMI</strong></span><span>◈ 7 Days Replacement Policy</span></div><section className="details-content"><p className="eyebrow">{product.brand}</p><h1>{product.name}</h1><div className="details-emi-price"><strong>{formatPrice(monthly)}/m</strong><span>({selectedPlan.months} months)</span></div><div className="details-market-price"><span>{formatPrice(selectedPrice)}</span><del>{formatPrice(selectedMrp)}</del><strong>{Math.max(0, Math.round((1 - selectedPrice / selectedMrp) * 100))}% off</strong></div><div className="choice-group"><h2>Choose variant</h2><div className="choice-row">{product.variants.map((item) => <button key={item} type="button" onClick={() => setVariant(item)} className={variant === item ? "selected" : ""}>{item}</button>)}</div></div><div className="choice-group"><h2>Choose colour</h2><div className="color-row">{product.colors.map((item) => <button key={item} type="button" onClick={() => setColor(item)} className={color === item ? "selected" : ""} style={{ backgroundColor: item }} aria-label={`Select colour ${item}`} />)}</div></div><PaymentPlan product={product} price={selectedPrice} plans={plans} months={months} paymentMode={paymentMode} onSelectPlan={(nextMonths) => { setMonths(nextMonths); setPaymentMode("emi"); setSubmitted(false); }} onSelectFull={() => { setPaymentMode("full"); setSubmitted(false); }} /><section className="highlights-section">
  <div className="section-title-row"><div><p className="section-kicker">PRODUCT OVERVIEW</p><h2>Highlights</h2></div><span className="verified-mark">✓ Verified specs</span></div>
  <div className="highlights-grid">{product.highlights.map((item) => <article className="highlight-card" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}</div>
</section>
<section className="detail-accordion">
  <button type="button" onClick={() => setDetailsOpen((value) => !value)} aria-expanded={detailsOpen}><span><strong>Other details</strong><small>Features, description and more</small></span><span className={detailsOpen ? "chevron open" : "chevron"}>⌄</span></button>
  {detailsOpen && <div className="detail-accordion-content"><p>{product.description}</p><ul>{product.highlights.map((item) => <li key={item.label}>{item.label}: {item.value}</li>)}</ul></div>}
</section>
<section className="reviews redesign-section">
  <div className="section-title-row"><div><p className="section-kicker">REAL CUSTOMER FEEDBACK</p><h2>Customer reviews</h2></div><span className="review-summary">{product.rating} ★</span></div>
  <div className="review-overview"><strong>{product.rating}</strong><span><b>★★★★★</b><small>Based on {product.reviewCount} ratings</small></span></div>
  <form className="review-form" onSubmit={(event) => { event.preventDefault(); if (review.trim()) setReviewSubmitted(true); }}><label htmlFor="review">Share your experience</label><textarea id="review" value={review} onChange={(event) => setReview(event.target.value)} placeholder="Tell other shoppers what you think" rows={3} /><button type="submit">Submit review</button>{reviewSubmitted && <span role="status">Thanks — your review was submitted.</span>}</form>
</section>
<section className="related-section redesign-section"><div className="section-title-row"><div><p className="section-kicker">YOU MAY ALSO LIKE</p><h2>Related products</h2></div><div className="carousel-controls"><button type="button" aria-label="Previous related product" onClick={() => setRelatedIndex((index) => Math.max(0, index - 1))}>←</button><button type="button" aria-label="Next related product" onClick={() => setRelatedIndex((index) => Math.min(products.length - 2, index + 1))}>→</button></div></div><div className="related-carousel">{products.filter((item) => item.id !== product.id).slice(relatedIndex, relatedIndex + 2).map((item) => <article className="related-card" key={item.id}><div className="related-visual"><ProductVisual type={item.image} /></div><span>{item.brand}</span><strong>{item.name}</strong><small>{formatPrice(item.price)}</small></article>)}</div></section>
<button type="button" onClick={() => setSubmitted(true)} className="primary-cta">Pay {formatPrice(monthly)} to buy now <span>→</span></button>{submitted && <div role="status" className="success-message">Selected {variant}. Secure checkout is ready.</div>}
</section></div></div>;
}

function ShopPlaceholder({ activeTab }: { activeTab: "brands" | "nearby" }) {
  const isBrands = activeTab === "brands";
  return <section className="content-panel"><label className="search-field"><Icon name="search" /><span>{isBrands ? "Search online stores..." : "Search stores..."}</span></label><div className="section-heading"><div><p className="eyebrow">1FI SHOP</p><h2>{isBrands ? "Top Brands" : "Nearby Stores"}</h2></div>{!isBrands && <button type="button" className="area-button">Your Area⌄</button>}</div><div className="placeholder-list">{isBrands ? brands.map((brand) => <article className="brand-card" key={brand.name}><div className="brand-logo" style={{ backgroundColor: brand.color }}>{brand.logo}</div><div><h3>{brand.name}</h3><p>No-cost EMIs upto {brand.months} months</p></div><span>→</span></article>) : nearbyStores.map((store) => <article className="store-card" key={store.name}><div className="store-logo">{store.logo}</div><div><div className="store-heading"><h3>{store.name}</h3><span>{store.distance}</span></div><p>{store.address}</p></div></article>)}</div></section>;
}
