import {  MessageCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import { BRAND, whatsappLink } from '../data/config';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-marquee">
        <div className="footer-marquee-inner">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="footer-marquee-text">
              FRESH FOOD · FAST FLAVOR · MADE WITH LOVE · ORDER DIRECT · 
            </span>
          ))}
        </div>
      </div>

      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <svg viewBox="0 0 100 100" className="footer-logo">
              <defs>
                <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--honey-300)" />
                  <stop offset="100%" stopColor="var(--honey-600)" />
                </linearGradient>
              </defs>
              <path
                d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                fill="url(#footerGrad)"
                stroke="var(--char-900)"
                strokeWidth="3"
              />
              <text x="50" y="68" fontSize="52" fontFamily="Fraunces, serif" fontWeight="800" textAnchor="middle" fill="var(--char-900)">G</text>
            </svg>
            <div>
              <div className="footer-brand-name">{BRAND.name}</div>
              <div className="footer-brand-tagline">{BRAND.tagline}</div>
            </div>
          </div>

          <div className="footer-contact">
            <a href={whatsappLink('Hello!')} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </a>
            <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="footer-contact-item">
              <Phone size={16} />
              <span>{BRAND.phone}</span>
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
              {/* <Instagram size={16} /> */}
              <span>@thegrubhive</span>
            </a>
            <a href={`mailto:${BRAND.email}`} className="footer-contact-item">
              <Mail size={16} />
              <span>{BRAND.email}</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {year} {BRAND.name}. All rights reserved.
          </div>
          <div className="footer-credit">
            <span>Crafted by</span>
            <a href="https://elytearc.com" target="_blank" rel="noopener noreferrer">
              Elyte <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
