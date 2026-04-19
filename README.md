# The Grub Hive — Restaurant Website

A premium, fully-responsive React website for The Grub Hive. Built by **Elyte**.

No backend required — orders are sent directly to the restaurant's WhatsApp via a pre-filled message.

---

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Then open `http://localhost:3000`.

---

## 🏗️ Project structure

```
grubhive/
├── public/              # Static assets (favicon)
├── src/
│   ├── components/      # All React components + their CSS
│   │   ├── Navbar.jsx/css
│   │   ├── Hero.jsx/css
│   │   ├── About.jsx/css
│   │   ├── Menu.jsx/css
│   │   ├── Cart.jsx/css
│   │   ├── WhyDirect.jsx/css
│   │   ├── Gallery.jsx/css
│   │   ├── Visit.jsx/css
│   │   └── Footer.jsx/css
│   ├── context/         # React contexts (theme, cart)
│   │   ├── ThemeContext.jsx
│   │   └── CartContext.jsx
│   ├── data/            # Menu data + brand config
│   │   ├── menu.js
│   │   └── config.js
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles + design tokens
├── index.html
├── package.json
└── vite.config.js
```

---

## ✏️ How to customize

### Change menu items, prices, descriptions
Edit `src/data/menu.js`. Each item has:
```js
{
  id: 'unique-id',
  name: 'Jollof Rice & Chicken',
  description: 'Short description...',
  price: 4500,
  category: 'rice',  // signature / rice / swallow / pasta / snacks / drinks
  image: 'https://url-to-image.jpg',
  badge: 'Bestseller', // optional
  spice: 2,            // 0–3
}
```

### Change business info (WhatsApp number, hours, address)
Edit `src/data/config.js` — **especially the `whatsapp` field**. Format: country code + number, no `+` (e.g., `2348012345678`).

### Change colors / theme
Edit `src/index.css` — the `:root`, `[data-theme='light']`, and `[data-theme='dark']` blocks at the top.

### Replace food photos
Menu items: edit the `image` field in `src/data/menu.js`.
Hero + Gallery: edit the image URLs in `Hero.jsx` and `Gallery.jsx`.
Best practice: use images 1200–1600px wide, compressed, `.jpg` or `.webp`.

---

## 🌐 Deploying

### Vercel (easiest — recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), connect your GitHub
3. Import the repo → Vercel auto-detects Vite → hit Deploy
4. Done. You'll get a URL like `grubhive.vercel.app`

### Netlify
Drag the `dist/` folder (after `npm run build`) to [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 💡 Features shipped

- ✅ Light + Dark themes (auto-detects system preference, toggleable)
- ✅ Fully mobile-responsive — designed phone-first
- ✅ WhatsApp cart checkout — add items, adjust quantities, send whole order via WhatsApp
- ✅ Per-item quick-order links (WhatsApp deep-links)
- ✅ Category filtering on menu
- ✅ Map embed (OpenStreetMap — no API key needed)
- ✅ Live opening hours with "today" highlight
- ✅ Framer Motion animations — hero reveal, scroll-triggered, cart drawer
- ✅ SEO-ready meta tags
- ✅ Custom fonts (Fraunces + Manrope via Google Fonts)
- ✅ Honeycomb brand motif throughout

---

## 🧑‍💻 Credits

Design & development: **Elyte** (elytearc.com)
Fonts: Fraunces (serif) + Manrope (sans) — Google Fonts
Icons: Lucide React
Photos: Unsplash (replace with real Grub Hive photos when available)
