# Sri Lakshmi Gold Works — Premium Jewellery Catalogue Website

A luxury Indian gold jewellery catalogue website designed for **Sri Lakshmi Gold Works**, inspired by high-end Indian jewellery brands like Tanishq and CaratLane. Built with **React + Vite + Tailwind CSS v4 + Framer Motion + Lucide React**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

### Production build
```bash
npm run build
npm run preview
```

---

## 🎨 Luxury Visual Design System

- **Warm Ivory Background**: `#FBF7F0`
- **Champagne Cream**: `#F0E4D0`
- **Antique Gold Accent**: `#B68A3A`
- **Gold Light / Foil Highlight**: `#D4AF6A`
- **Royal Burgundy Accent**: `#521F2B`
- **Dark Charcoal**: `#25211D`
- **Luxury Footer Noir**: `#1A1714`
- **Typography**: Cormorant Garamond & Playfair Display for editorial headings; Inter for body and controls.

---

## 🧭 Navigation & Sidebar

- **Announcement Strip**: Burgundy & gold banner with business consultation notice.
- **Header**: Sticky luxury navigation with brand wordmark, Collections mega-menu, quick search, and WhatsApp enquiry button.
- **Navigation Sidebar**: Slide-over drawer accessible via menu button on both desktop and mobile, with instant search, category image previews, quick links, and WhatsApp direct contact.
- **Collections Mega Menu**: Clean hover menu on desktop displaying category thumbnails without obscuring page content.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky header + Slide-over navigation sidebar + Mega menu
│   ├── Footer.jsx          # Noir gold-trimmed footer with showroom details & social badges
│   ├── CategoryCard.jsx    # Editorial category mosaic tiles
│   ├── ProductCard.jsx     # Portrait jewellery card with hover zoom, long-press, share & WhatsApp
│   ├── ProductGrid.jsx     # Responsive grid (4-col desktop, 2-col mobile) with luxury empty states
│   ├── ProductLightbox.jsx # Full-screen zoom viewer (pinch, wheel, drag, double-tap, thumbnails)
│   ├── SearchBar.jsx       # Rounded gold-accent search input
│   ├── WhatsAppButton.jsx  # Pre-filled WhatsApp enquiry link generator
│   └── Breadcrumb.jsx      # Navigation breadcrumb
├── pages/
│   ├── Home.jsx            # Editorial asymmetric hero, trust strip, category mosaic, featured & new arrivals
│   ├── Collections.jsx     # Compact header, horizontal category filter row, search & sort
│   ├── CategoryPage.jsx    # Dedicated per-category catalogue with backdrop photography
│   ├── ProductDetails.jsx  # Sticky detail overview, specs, zoom viewer & related pieces
│   ├── NewArrivals.jsx     # Fresh workshop creations
│   ├── About.jsx           # Goldsmith atelier story & traditional values
│   ├── Contact.jsx         # Showroom address, map directions & consultation booking
│   └── NotFound.jsx        # 404 Design Not Found page
├── data/
│   ├── products.js         # Verified sample product data with high-res jewellery photography
│   └── categories.js       # Category definitions & descriptions
├── services/
│   └── productService.js   # Centralized data access layer
├── hooks/
│   └── useProducts.js      # React hooks for product filtering, sorting, pagination, and favourites
├── config/
│   └── siteConfig.js       # Central shop branding, WhatsApp, phone, address configuration
├── App.jsx                 # Routes & scroll restoration
├── main.jsx                # React root
└── index.css               # Tailwind CSS v4 design tokens
```

---

## ✨ Features

- **Full-Screen Zoom Viewer**: Smooth zoom (wheel, pinch, double-tap), image panning when magnified, thumbnail switching, keyboard shortcuts (`Esc`, `←`, `→`).
- **Touch Long-Press Menu**: 550ms hold on touch devices opens an action sheet (View, Share, Copy Link, WhatsApp).
- **Web Share API**: Native device sharing with clipboard copy fallback and feedback.
- **Visual Category Quick Filters**: Horizontal scrolling category chips on the Collections page.
- **Graceful Fallbacks**: Image error handling with clean vector placeholder SVG.
- **Direct WhatsApp Inquiries**: Encoded messages including product name and unique Design ID (e.g., `BGL-001`).
