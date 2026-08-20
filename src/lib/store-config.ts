/**
 * Central, editable business information for Nommy's Signature.
 * Everything the owner may want to change lives here — no business
 * facts are hardcoded inside components.
 */

export const store = {
  name: "Nommy’s Signature",
  legalName: "Augustina Nneoma Marycynthia (Nommy’s Signature)",
  tagline: "Style That Speaks For You.",
  businessType: "Clothing Brand — Wholesale & Retail",
  announcement: "Wholesale & Retail • Nationwide Delivery Available",
  instagram: {
    handle: "@nommysfashionworld_balogun",
    url: "https://instagram.com/nommysfashionworld_balogun",
  },
  phones: ["07046454621", "09063657659"],
  whatsapp: {
    local: "07046454621",
    international: "2347046454621",
  },
  locations: [
    {
      label: "Head Office",
      lines: [
        "Shop BF54/56, Breadfruit Plaza",
        "10 Davies Street",
        "Balogun, Lagos Island, Lagos",
      ],
      mapsQuery: "Breadfruit Plaza, 10 Davies Street, Balogun, Lagos Island, Lagos",
    },
    {
      label: "Second Store",
      lines: [
        "Shop FF10, Ajao Plaza",
        "11 Martins Street",
        "Balogun, Lagos Island, Eko, Lagos",
        "Nigeria 101223",
      ],
      mapsQuery: "Ajao Plaza, 11 Martins Street, Balogun, Lagos Island, Lagos 101223",
    },
  ],
  /** Editable placeholders — replace with real policy copy when available. */
  policies: {
    delivery: "Contact us for delivery rates.",
    returns: "Return policy coming soon — contact us for assistance.",
    wholesaleMinimum: "Contact us for wholesale details.",
    payment: "Payment options are confirmed when we contact you about your order.",
    history: "Brand story coming soon.",
  },
} as const;

export function waLink(message: string) {
  return `https://wa.me/${store.whatsapp.international}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: `Hello ${store.name}, I would like to make an enquiry. Please can you assist me?`,
  wholesale: `Hello ${store.name}, I’m interested in buying wholesale. Please can you assist me?`,
  product: (name: string) =>
    `Hello ${store.name}, I’m interested in ${name}. Please can you provide more information?`,
  order: (ref: string) =>
    `Hello ${store.name}, I just placed order ${ref}. Please can you confirm it?`,
};

export function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];
