import { motion } from 'framer-motion';
import './Gallery.css';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1200&auto=format&fit=crop', label: 'Signature Platter', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?q=80&w=1200&auto=format&fit=crop', label: 'Smoky Jollof', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1200&auto=format&fit=crop', label: 'Coconut Rice', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop', label: 'Creamy Pasta', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?q=80&w=1200&auto=format&fit=crop', label: 'Hot Starter', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1200&auto=format&fit=crop', label: 'Swallow & Soup', size: 'tall' },
];

export default function Gallery() {
  return (
    <section className="gallery section-pad">
      <div className="container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">The Feed</div>
          <h2 className="gallery-title">
            Made fresh. <span className="italic-display gallery-title-accent">Every day.</span>
          </h2>
        </motion.div>

        <div className="gallery-grid">
          {PHOTOS.map((photo, i) => (
            <motion.figure
              key={i}
              className={`gallery-item gallery-item-${photo.size}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={photo.src} alt={photo.label} loading="lazy" />
              <figcaption>{photo.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
