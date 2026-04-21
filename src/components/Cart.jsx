import { useState } from 'react';
import {  AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatNaira, buildWhatsAppOrder, whatsappLink, DELIVERY_ZONES } from '../data/config';
import './Cart.css';

export default function Cart() {
  const {
    items, total, count,
    isCartOpen, closeCart,
    updateQuantity, removeItem, clearCart,
  } = useCart();

const [customerName, setCustomerName] = useState('');
const [customerAddress, setCustomerAddress] = useState('');
const [orderType, setOrderType] = useState('delivery');
const [zoneId, setZoneId] = useState('');

const selectedZone = DELIVERY_ZONES.find((z) => z.id === zoneId) || null;
const deliveryFee = orderType === 'delivery' && selectedZone && selectedZone.fee !== null
  ? selectedZone.fee
  : 0;
const grandTotal = total + deliveryFee;

// Form is valid if: pickup (just need name) OR delivery (need name + address + zone)
const isFormValid = customerName && (
  orderType === 'pickup' ||
  (orderType === 'delivery' && customerAddress && zoneId)
);

const handleCheckout = (e) => {
  e.preventDefault();
  if (items.length === 0 || !isFormValid) return;
  const message = buildWhatsAppOrder(items, total, customerName, customerAddress, orderType, selectedZone);
  window.open(whatsappLink(message), '_blank');
};

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            role="dialog"
            aria-label="Your order"
          >
            {/* Header */}
            <header className="cart-header">
              <div>
                <div className="eyebrow">Your Order</div>
                <h3 className="cart-title">
                  {count === 0 ? 'Empty basket' : `${count} item${count !== 1 ? 's' : ''}`}
                </h3>
              </div>
              <button className="cart-close" onClick={closeCart} aria-label="Close">
                <X size={22} />
              </button>
            </header>

            {/* Body */}
            <div className="cart-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">
                    <ShoppingBag size={40} strokeWidth={1.5} />
                  </div>
                  <h4>Your basket is empty</h4>
                  <p>Add some dishes from the menu to build your order.</p>
                  <button className="btn btn-primary" onClick={closeCart}>
                    Browse menu
                  </button>
                </div>
              ) : (
                <ul className="cart-items">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      layout
                    >
                      <img src={item.image} alt="" className="cart-item-img" />
                      <div className="cart-item-body">
                        <div className="cart-item-top">
                          <h5 className="cart-item-name">{item.name}</h5>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="cart-item-bottom">
                          <div className="cart-qty">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease"
                            >
                              <Minus size={13} strokeWidth={2.5} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase"
                            >
                              <Plus size={13} strokeWidth={2.5} />
                            </button>
                          </div>
                          <div className="cart-item-price">
                            {formatNaira(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
               <motion.form
                  className="cart-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleCheckout}
                >
                  <div className="cart-form-field">
                    <label htmlFor="cart-name">Your name</label>
                    <input
                      id="cart-name"
                      type="text"
                      placeholder="e.g. Chioma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="cart-form-field">
                    <label>Order type</label>
                    <div className="cart-order-type">
                      <button
                        type="button"
                        className={`cart-order-btn ${orderType === 'delivery' ? 'active' : ''}`}
                        onClick={() => setOrderType('delivery')}
                      >
                        <span className="cart-order-emoji">🛵</span>
                        <span className="cart-order-label">Delivery</span>
                      </button>
                      <button
                        type="button"
                        className={`cart-order-btn ${orderType === 'pickup' ? 'active' : ''}`}
                        onClick={() => setOrderType('pickup')}
                      >
                        <span className="cart-order-emoji">🥡</span>
                        <span className="cart-order-label">Pickup</span>
                      </button>
                    </div>
                  </div>

                  {orderType === 'delivery' && (
                    <>
                      <div className="cart-form-field">
                        <label htmlFor="cart-address">Delivery address</label>
                        <textarea
                          id="cart-address"
                          placeholder="Street, area, landmark…"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          rows={2}
                          required
                        />
                      </div>
                      <div className="cart-form-field">
                        <label htmlFor="cart-zone">Delivery zone</label>
                        <select
                          id="cart-zone"
                          value={zoneId}
                          onChange={(e) => setZoneId(e.target.value)}
                          required
                        >
                          <option value="">Select your zone…</option>
                          {DELIVERY_ZONES.map((z) => (
                            <option key={z.id} value={z.id}>
                              {z.label}{z.fee !== null && z.fee > 0 ? ` — ${formatNaira(z.fee)}` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {orderType === 'pickup' && (
                    <div className="cart-pickup-note">
                      <span className="cart-pickup-emoji">📍</span>
                      <div>
                        <strong>Pickup location</strong>
                        <p>Ilasamaja, Amuwo Odofin 2, Lagos. We'll confirm your pickup time on WhatsApp.</p>
                      </div>
                    </div>
                  )}
                </motion.form>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="cart-footer">
                  <div className="cart-breakdown">
                    <div className="cart-breakdown-row">
                      <span>Subtotal</span>
                      <span>{formatNaira(total)}</span>
                    </div>
                    {orderType === 'delivery' && selectedZone && (
                      <div className="cart-breakdown-row">
                        <span>Delivery</span>
                        <span>
                          {selectedZone.fee === null
                            ? 'Confirm on WhatsApp'
                            : formatNaira(selectedZone.fee)}
                        </span>
                      </div>
                    )}
                    {orderType === 'pickup' && (
                      <div className="cart-breakdown-row">
                        <span>Delivery</span>
                        <span>Pickup — free</span>
                      </div>
                    )}
                  </div>
                  <div className="cart-summary">
                    <span className="cart-summary-lbl">Total</span>
                    <span className="cart-summary-val">
                      {orderType === 'delivery' && selectedZone && selectedZone.fee === null
                        ? `${formatNaira(total)}+`
                        : formatNaira(grandTotal)}
                    </span>
                  </div>
                  <button
                    className="cart-checkout"
                    onClick={handleCheckout}
                    disabled={!isFormValid}
                  >
                    <MessageCircle size={18} />
                    <span>Send order via WhatsApp</span>
                  </button>
                  <button className="cart-clear" onClick={clearCart}>
                    Clear basket
                  </button>
                  <p className="cart-disclaimer">
                    {orderType === 'pickup'
                      ? 'Pickup time will be confirmed on WhatsApp after you send your order.'
                      : 'Delivery fee shown above. Your driver will confirm exact fee and time on WhatsApp.'}
                  </p>
                </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
