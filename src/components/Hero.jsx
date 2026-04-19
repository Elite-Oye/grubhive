import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { BRAND } from '../data/config';
import './Hero.css';

export default function Hero() {
  return (
    <section id="top" className="hero">
      {/* Decorative honeycombs */}
      <Honeycomb className="hero-comb hero-comb-1" delay={0} />
      <Honeycomb className="hero-comb hero-comb-2" delay={0.3} />
      <Honeycomb className="hero-comb hero-comb-3" delay={0.6} />
      <Honeycomb className="hero-comb hero-comb-4" delay={0.9} />

      {/* Radial glow */}
      <div className="hero-glow" />

      <div className="container hero-inner">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.div
            className="hero-badge"
            variants={fadeUp}
          >
            <span className="hero-badge-dot" />
            <span>Amuwo · Lagos</span>
            <span className="hero-badge-sep">·</span>
            <span>{BRAND.deliveryTime} delivery</span>
          </motion.div>

          <motion.h1 variants={fadeUp}>
            Fresh food.<br />
            <span className="hero-accent italic-display">Fast flavor.</span>
          </motion.h1>

          <motion.p className="hero-sub" variants={fadeUp}>
            Smoky jollof, golden plantain, and the kind of comfort
            meals that make an ordinary day feel like home.
            Order direct from our kitchen.
          </motion.p>

          <motion.div className="hero-stats" variants={fadeUp}>
            <div className="hero-stat">
              <div className="hero-stat-icon"><Star size={16} fill="currentColor" /></div>
              <div>
                <div className="hero-stat-val">{BRAND.rating}/5</div>
                <div className="hero-stat-lbl">{BRAND.reviews}+ reviews</div>
              </div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-icon"><Clock size={16} /></div>
              <div>
                <div className="hero-stat-val">{BRAND.deliveryTime}</div>
                <div className="hero-stat-lbl">avg. delivery</div>
              </div>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <div className="hero-stat-icon"><MapPin size={16} /></div>
              <div>
                <div className="hero-stat-val">Amuwo</div>
                <div className="hero-stat-lbl">& surrounding</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="hero-cta" variants={fadeUp}>
            <a href="#menu" className="btn btn-primary btn-lg">
              Order Now
              <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn btn-ghost btn-lg">
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Visual — stacked food showcase with 3D tilt */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-plate-stack">
            <motion.div
              className="hero-plate hero-plate-back"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=1200&auto=format&fit=crop"
                alt="Fried rice"
                loading="eager"
              />
            </motion.div>
            <motion.div
              className="hero-plate hero-plate-mid"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <img
                src="https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1600&auto=format&fit=crop"
                alt="Jollof rice"
                loading="eager"
              />
            </motion.div>
            <motion.div
              className="hero-plate hero-plate-front"
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1600&auto=format&fit=crop"
                alt="Signature plate"
                loading="eager"
              />
            </motion.div>

            {/* Floating info bubbles */}
            <motion.div
              className="hero-bubble hero-bubble-1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="hero-bubble-emoji">🔥</span>
              <div>
                <div className="hero-bubble-title">Smoky Jollof</div>
                <div className="hero-bubble-sub">Party style</div>
              </div>
            </motion.div>

            <motion.div
              className="hero-bubble hero-bubble-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="hero-bubble-emoji">⚡</span>
              <div>
                <div className="hero-bubble-title">Fast delivery</div>
                <div className="hero-bubble-sub">{BRAND.deliveryTime}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span>Scroll to explore</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Honeycomb({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`combGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--honey-300)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--honey-600)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          d="M50 0 L100 28.75 L100 86.25 L50 115 L0 86.25 L0 28.75 Z"
          fill={`url(#combGrad-${delay})`}
        />
      </svg>
    </motion.div>
  );
}
