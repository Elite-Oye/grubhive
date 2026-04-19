import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Flame, ExternalLink } from 'lucide-react';
import { MENU, CATEGORIES } from '../data/menu';
import { formatNaira, quickOrderLink } from '../data/config';
import { useCart } from '../context/CartContext';
import './Menu.css';

export default function Menu() {
  const [category, setCategory] = useState('all');
  const { addItem } = useCart();

  const filtered = category === 'all'
    ? MENU
    : MENU.filter((item) => item.category === category);

  return (
    <section id="menu" className="menu section-pad">
      <div className="container">
        <motion.div
          className="menu-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow">The Menu</div>
          <h2 className="menu-title">
            Pick your <span className="italic-display menu-title-accent">plate</span>
          </h2>
          <p className="menu-sub">
            Tap any dish to add it to your order. Once you're done, send it straight to
            our kitchen on WhatsApp — no fees, no middlemen.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="menu-tabs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="menu-tabs-inner">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`menu-tab ${category === cat.id ? 'menu-tab-active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <span className="menu-tab-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Menu grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            className="menu-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((item, idx) => (
              <MenuCard
                key={item.id}
                item={item}
                index={idx}
                onAdd={() => addItem(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function MenuCard({ item, index, onAdd }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdding(true);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <motion.article
      className="menu-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      {item.badge && (
        <div className="menu-card-badge">{item.badge}</div>
      )}

      <div className="menu-card-image">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>

      <div className="menu-card-body">
        <div className="menu-card-row">
          <h3 className="menu-card-title">{item.name}</h3>
          {item.spice > 0 && (
            <div className="menu-card-spice" title={`Spice level: ${item.spice}/3`}>
              {Array.from({ length: item.spice }).map((_, i) => (
                <Flame key={i} size={11} fill="currentColor" />
              ))}
            </div>
          )}
        </div>

        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <div className="menu-card-price">{formatNaira(item.price)}</div>
          <div className="menu-card-actions">
            <a
              href={quickOrderLink(item.name, item.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-card-wa"
              title="Quick WhatsApp order"
              aria-label="Quick order on WhatsApp"
            >
              <ExternalLink size={14} />
            </a>
            <button
              className={`menu-card-add ${adding ? 'menu-card-add-done' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${item.name} to cart`}
            >
              <AnimatePresence mode="wait">
                {adding ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="menu-card-add-icon"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
