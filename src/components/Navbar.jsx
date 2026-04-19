import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { BRAND } from '../data/config';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'Our Story' },
  { href: '#why-direct', label: 'Why Direct' },
  { href: '#visit', label: 'Visit' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            <HoneycombLogo />
            <span className="nav-logo-text">
              {BRAND.name.split(' ').map((w, i) => (
                <span key={i} className={i === 1 ? 'nav-logo-accent' : ''}>{w} </span>
              ))}
            </span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="nav-icon-btn"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </button>

            <button
              onClick={openCart}
              className="nav-icon-btn nav-cart-btn"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <motion.span
                  className="nav-cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={count}
                >
                  {count}
                </motion.span>
              )}
            </button>

            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          className="mobile-drawer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mobile-drawer-header">
            <HoneycombLogo />
            <button onClick={() => setMobileOpen(false)} className="nav-icon-btn">
              <X size={22} />
            </button>
          </div>
          <motion.ul
            className="mobile-drawer-links"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.href}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <a href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </>
  );
}

function HoneycombLogo() {
  return (
    <svg className="nav-logo-mark" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--honey-300)" />
          <stop offset="100%" stopColor="var(--honey-600)" />
        </linearGradient>
      </defs>
      <path
        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
        fill="url(#logoGrad)"
        stroke="var(--char-800)"
        strokeWidth="3"
      />
      <text
        x="50" y="68"
        fontSize="52"
        fontFamily="Fraunces, serif"
        fontWeight="800"
        textAnchor="middle"
        fill="var(--char-900)"
      >
        G
      </text>
    </svg>
  );
}
