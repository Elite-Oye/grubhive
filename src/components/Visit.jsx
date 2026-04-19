import { motion } from 'framer-motion';
import { MapPin, Phone, Instagram, Clock, MessageCircle } from 'lucide-react';
import { BRAND, whatsappLink } from '../data/config';
import './Visit.css';

export default function Visit() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="visit" className="visit section-pad">
      <div className="honeycomb-bg" />
      <div className="container">
        <motion.div
          className="visit-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Come through</div>
          <h2 className="visit-title">
            Find us in <span className="italic-display visit-title-accent">Amuwo</span>
          </h2>
        </motion.div>

        <div className="visit-grid">
          {/* Map */}
          <motion.div
            className="visit-map"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.289%2C6.466%2C3.319%2C6.486&layer=mapnik&marker=6.476%2C3.304"
              title="Our location"
              loading="lazy"
              allowFullScreen
            />
            <div className="visit-map-pin">
              <MapPin size={20} fill="var(--ember)" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="visit-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div className="visit-card" variants={fadeUp}>
              <div className="visit-card-icon"><MapPin size={20} /></div>
              <div className="visit-card-body">
                <div className="visit-card-label">Address</div>
                <div className="visit-card-val">{BRAND.address}</div>
                <div className="visit-card-sub">{BRAND.deliveryRadius}</div>
              </div>
            </motion.div>

            <motion.div className="visit-card" variants={fadeUp}>
              <div className="visit-card-icon"><Clock size={20} /></div>
              <div className="visit-card-body">
                <div className="visit-card-label">Opening Hours</div>
                <ul className="visit-hours">
                  {BRAND.hours.map((h) => (
                    <li key={h.day} className={h.day === today ? 'visit-hours-today' : ''}>
                      <span>{h.day}</span>
                      <span>{h.open} — {h.close}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div className="visit-card visit-card-cta" variants={fadeUp}>
              <div className="visit-card-body">
                <div className="visit-card-label">Have a question?</div>
                <div className="visit-card-val visit-card-cta-title">
                  Chat with us on WhatsApp
                </div>
                <div className="visit-cta-buttons">
                  <a
                    href={whatsappLink(`Hi ${BRAND.name}, I have a question.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
                    className="btn btn-ghost"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
