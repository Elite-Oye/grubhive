// Global brand config — update these details to match the real business
export const BRAND = {
  name: 'The Grub Hive',
  tagline: 'Fresh Food. Fast Flavor.',
  about: 'A fast food kitchen in the heart of Amuwo that turns everyday meals into something worth craving. Smoky jollof, crispy plantain, and comfort done right.',
  location: 'Ilasamaja, Amuwo Odofin, Lagos',
  address: 'Ilasamaja, Amuwo Odofin 2, Lagos, Nigeria',
  deliveryRadius: 'We deliver across Amuwo Odofin, Mile 2, Festac, Satellite Town, and surrounding areas.',
  whatsapp: '2348107982490', // update with real number — format: country code + number, no +
  phone: '+2348107982490',
  instagram: 'https://instagram.com/thegrubhive',
  chowdeck: 'https://chowdeck.com/store/amuwo-odofin-2/restaurants/the-grub-hiveilasamajakqsr1g',
  email: 'hello@thegrubhive.com',
  rating: 4.5,
  reviews: 24,
  deliveryTime: '23–33 mins',
  hours: [
    { day: 'Monday', open: '10:00', close: '22:00' },
    { day: 'Tuesday', open: '10:00', close: '22:00' },
    { day: 'Wednesday', open: '10:00', close: '22:00' },
    { day: 'Thursday', open: '10:00', close: '22:00' },
    { day: 'Friday', open: '10:00', close: '23:00' },
    { day: 'Saturday', open: '10:00', close: '23:00' },
    { day: 'Sunday', open: '12:00', close: '21:00' },
  ],
};

// Format price in Naira
export const formatNaira = (n) =>
  `₦${n.toLocaleString('en-NG', { minimumFractionDigits: 0 })}`;

// Build the WhatsApp message from cart items
export const buildWhatsAppOrder = (cartItems, total, customerName = '', customerAddress = '') => {
  const lines = [
    `*New Order — ${BRAND.name}*`,
    '',
  ];

  if (customerName) lines.push(`*Name:* ${customerName}`);
  if (customerAddress) lines.push(`*Delivery Address:* ${customerAddress}`);
  if (customerName || customerAddress) lines.push('');

  lines.push('*Order Details:*');
  cartItems.forEach((item) => {
    lines.push(`• ${item.quantity}× ${item.name} — ${formatNaira(item.price * item.quantity)}`);
  });

  lines.push('');
  lines.push(`*Total: ${formatNaira(total)}*`);
  lines.push('');
  lines.push('Please confirm availability and delivery time. Thank you!');

  return lines.join('\n');
};

// Build the WhatsApp URL
export const whatsappLink = (message) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

// Quick-order single item link
export const quickOrderLink = (itemName, price) => {
  const msg = `Hi ${BRAND.name}, I'd like to order *${itemName}* (${formatNaira(price)}). Is it available?`;
  return whatsappLink(msg);
};
