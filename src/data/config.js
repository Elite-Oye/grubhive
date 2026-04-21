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
export const DELIVERY_ZONES = [
  { id: 'amuwo',     label: 'Amuwo Odofin',                fee: 1000 },
  { id: 'festac',    label: 'Festac',                      fee: 1500 },
  { id: 'mile2',     label: 'Mile 2',                      fee: 1200 },
  { id: 'satellite', label: 'Satellite Town',              fee: 1800 },
  { id: 'ajao',      label: 'Ajao Estate',                 fee: 2000 },
  { id: 'isolo',     label: 'Isolo',                       fee: 2200 },
  { id: 'surulere',  label: 'Surulere',                    fee: 2500 },
  { id: 'other',     label: 'Other — confirm on WhatsApp', fee: null },
];

export const buildWhatsAppOrder = (cartItems, subtotal, customerName = '', customerAddress = '', orderType = 'delivery', zone = null) => {
  const lines = [`*New Order — ${BRAND.name}*`, ''];
  if (customerName) lines.push(`*Name:* ${customerName}`);
  lines.push(`*Order Type:* ${orderType === 'pickup' ? 'Pickup 🥡' : 'Delivery 🛵'}`);
  if (orderType === 'delivery') {
    if (customerAddress) lines.push(`*Delivery Address:* ${customerAddress}`);
    if (zone) lines.push(`*Delivery Zone:* ${zone.label}`);
  }
  lines.push('');
  lines.push('*Order Details:*');
  cartItems.forEach((item) => {
    lines.push(`• ${item.quantity}× ${item.name} — ${formatNaira(item.price * item.quantity)}`);
  });
  lines.push('');
  lines.push(`*Subtotal: ${formatNaira(subtotal)}*`);

  if (orderType === 'pickup') {
    lines.push(`*Total: ${formatNaira(subtotal)}*`);
    lines.push('');
    lines.push(`Please confirm pickup time. Thank you!`);
  } else if (zone && zone.fee !== null) {
    lines.push(`*Delivery (${zone.label}): ${formatNaira(zone.fee)}*`);
    lines.push(`*Total: ${formatNaira(subtotal + zone.fee)}*`);
    lines.push('');
    lines.push('Please confirm availability and delivery time. Thank you!');
  } else {
    lines.push(`*Delivery fee: to be confirmed*`);
    lines.push('');
    lines.push('Please confirm availability, delivery fee, and delivery time. Thank you!');
  }

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
