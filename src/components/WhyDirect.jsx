import { motion } from 'framer-motion';
import { TrendingDown, Zap, Heart, ShieldCheck } from 'lucide-react';
import './WhyDirect.css';

const BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Better prices',
    desc: 'No delivery app fees means we pass real savings straight back to you.',
  },
  {
    icon: Zap,
    title: 'Faster service',
    desc: 'Your order lands in our kitchen WhatsApp instantly — no middle step.',
  },
  {
    icon: Heart,
    title: 'We know you',
    desc: 'Order direct once and we remember your favorites for next time.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality control',
    desc: 'Packed with care by the same team that cooked it. No handoff delays.',
  },
];

export default function WhyDirect() {
  return (
    <section id="why-direct" className="why section-pad">
      <div className="container">
        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">Order Direct</div>
          <h2 className="why-title">
            Skip the apps. <span className="italic-display why-title-accent">Save more.</span>
          </h2>
          <p className="why-sub">
            Ordering directly through WhatsApp means better prices, faster service,
            and a team that actually knows your preferences.
          </p>
        </motion.div>

        <div className="why-grid">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className="why-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
            >
              <div className="why-card-icon">
                <b.icon size={22} strokeWidth={2} />
              </div>
              <h3 className="why-card-title">{b.title}</h3>
              <p className="why-card-desc">{b.desc}</p>
              <div className="why-card-number">0{i + 1}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
