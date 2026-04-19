import { motion } from 'framer-motion';
import { BRAND } from '../data/config';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="honeycomb-bg" />

      <div className="container about-inner">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-image-frame">
            <img
              src="https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=1600&auto=format&fit=crop"
              alt="Our kitchen"
            />
          </div>
          <motion.div
            className="about-image-accent"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1200&auto=format&fit=crop"
              alt="Signature dish"
            />
          </motion.div>

          {/* Floating sticker */}
          <motion.div
            className="about-sticker"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <path id="circle-text" d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
              </defs>
              <circle cx="60" cy="60" r="56" fill="var(--honey-400)" stroke="var(--char-900)" strokeWidth="2" />
              <text fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" letterSpacing="2" fill="var(--char-900)">
                <textPath href="#circle-text">
                  FRESH · LOCAL · MADE WITH LOVE · FRESH · LOCAL · MADE WITH LOVE ·
                </textPath>
              </text>
              <text x="60" y="67" textAnchor="middle" fontSize="26" fontWeight="800" fill="var(--char-900)">🐝</text>
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow">Our Story</div>

          <h2 className="about-heading">
            Every plate starts <span className="italic-display about-heading-accent">with care.</span>
          </h2>

          <p className="about-para">
            {BRAND.about}
          </p>

          <p className="about-para">
            We started The Grub Hive because Amuwo deserved fast food that doesn't taste
            fast — meals you can trust, made with proper spice, fresh ingredients, and
            the kind of attention your grandma would approve of.
          </p>

          <div className="about-values">
            <Value icon="🔥" title="Smoky party-style jollof" desc="Real firewood flavor, every time." />
            <Value icon="🌿" title="Fresh local ingredients" desc="Sourced from Lagos markets daily." />
            <Value icon="⚡" title="Built for delivery" desc="Packaged hot so it arrives hot." />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Value({ icon, title, desc }) {
  return (
    <div className="about-value">
      <div className="about-value-icon">{icon}</div>
      <div>
        <div className="about-value-title">{title}</div>
        <div className="about-value-desc">{desc}</div>
      </div>
    </div>
  );
}
