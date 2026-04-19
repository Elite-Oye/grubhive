import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatNaira, buildWhatsAppOrder, whatsappLink } from '../data/config';
import './Cart.css';

export default function Cart() {
  const {
    items, total, count,
    isCartOpen, closeCart,
    updateQuantity, removeItem, clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const handleCheckout = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const message = buildWhatsAppOrder(items, total, customerName, customerAddress);
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
                </motion.form>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="cart-footer">
                <div className="cart-summary">
                  <span className="cart-summary-lbl">Total</span>
                  <span className="cart-summary-val">{formatNaira(total)}</span>
                </div>
                <button
                  className="cart-checkout"
                  onClick={handleCheckout}
                  disabled={!customerName || !customerAddress}
                >
                  <MessageCircle size={18} />
                  <span>Send order via WhatsApp</span>
                </button>
                <button className="cart-clear" onClick={clearCart}>
                  Clear basket
                </button>
                <p className="cart-disclaimer">
                  Delivery fee calculated based on your location and confirmed on WhatsApp.
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
