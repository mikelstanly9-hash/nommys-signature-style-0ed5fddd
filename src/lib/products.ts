import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";
import catSets from "@/assets/cat-sets.jpg";
import catDresses from "@/assets/cat-dresses.jpg";
import catTops from "@/assets/cat-tops.jpg";
import catWholesale from "@/assets/cat-wholesale.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  description: string;
  isNew: boolean;
  wholesale: boolean;
  inStock: boolean;
  popularity: number;
  addedAt: string;
};

/** Editable category list — easy to extend later. */
export const categories = [
  { slug: "new-arrivals", name: "New Arrivals", image: p3 },
  { slug: "dresses", name: "Dresses", image: catDresses },
  { slug: "tops", name: "Tops", image: catTops },
  { slug: "trousers", name: "Trousers", image: p2 },
  { slug: "two-piece-sets", name: "Two-Piece Sets", image: catSets },
  { slug: "jumpsuits", name: "Jumpsuits", image: p4 },
  { slug: "skirts", name: "Skirts", image: p5 },
  { slug: "casual-wear", name: "Casual Wear", image: p6 },
  { slug: "corporate-wear", name: "Corporate Wear", image: p7 },
  { slug: "accessories", name: "Accessories", image: p8 },
  { slug: "wholesale", name: "Wholesale", image: catWholesale },
];

export const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

const C = {
  black: { name: "Black", hex: "#1A1716" },
  cream: { name: "Cream", hex: "#EFE7D7" },
  burgundy: { name: "Burgundy", hex: "#7B1F32" },
  terracotta: { name: "Terracotta", hex: "#B45309" },
  emerald: { name: "Emerald", hex: "#0F6B4B" },
  navy: { name: "Navy", hex: "#1C2B4A" },
  gold: { name: "Gold", hex: "#C9A227" },
  charcoal: { name: "Charcoal", hex: "#3A3735" },
};

export const products: Product[] = [
  {
    id: "signature-midi-dress",
    name: "Signature Midi Dress",
    price: 24500,
    category: "dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: [C.burgundy, C.black, C.emerald],
    images: [p1, p6],
    description:
      "A softly draped midi dress cut for movement, with a flattering wrap bodice and a full flowing skirt. Finished for both everyday elegance and occasion wear.",
    isNew: true,
    wholesale: false,
    inStock: true,
    popularity: 96,
    addedAt: "2026-08-10",
  },
  {
    id: "tailored-palazzo-set",
    name: "Tailored Palazzo Set",
    price: 18000,
    category: "trousers",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [C.charcoal, C.cream, C.navy],
    images: [p2, p7],
    description:
      "High-waist wide-leg palazzo trousers paired with a relaxed silk-touch blouse. A clean, confident silhouette for work and beyond.",
    isNew: true,
    wholesale: true,
    inStock: true,
    popularity: 88,
    addedAt: "2026-08-08",
  },
  {
    id: "ankara-two-piece",
    name: "Ankara Two-Piece Set",
    price: 32000,
    category: "two-piece-sets",
    sizes: ["S", "M", "L", "XL"],
    colors: [C.gold, C.emerald],
    images: [p3, p5],
    description:
      "A boldly printed two-piece set in rich gold and green, belted at the waist for definition. Made to be noticed.",
    isNew: true,
    wholesale: true,
    inStock: true,
    popularity: 99,
    addedAt: "2026-08-14",
  },
  {
    id: "executive-jumpsuit",
    name: "Executive Jumpsuit",
    price: 27500,
    category: "jumpsuits",
    sizes: ["S", "M", "L", "XL"],
    colors: [C.black, C.navy],
    images: [p4, p7],
    description:
      "A sharply tailored sleeveless jumpsuit with a lapel neckline and defined waist. Effortless from the office to evening.",
    isNew: false,
    wholesale: false,
    inStock: true,
    popularity: 81,
    addedAt: "2026-07-22",
  },
  {
    id: "pleated-satin-skirt",
    name: "Pleated Satin Skirt",
    price: 15500,
    category: "skirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [C.emerald, C.burgundy, C.black],
    images: [p5, p3],
    description:
      "A fluid pleated satin midi skirt that catches the light with every step. Pairs beautifully with a simple top or blouse.",
    isNew: false,
    wholesale: true,
    inStock: true,
    popularity: 74,
    addedAt: "2026-07-05",
  },
  {
    id: "linen-shirt-dress",
    name: "Linen Shirt Dress",
    price: 19500,
    category: "casual-wear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [C.terracotta, C.cream],
    images: [p6, p1],
    description:
      "A breathable oversized linen shirt dress with side pockets — easy, cool and made for Lagos weather.",
    isNew: false,
    wholesale: true,
    inStock: true,
    popularity: 69,
    addedAt: "2026-06-18",
  },
  {
    id: "corporate-suit-set",
    name: "Corporate Suit Set",
    price: 46000,
    category: "corporate-wear",
    sizes: ["S", "M", "L", "XL"],
    colors: [C.navy, C.black],
    images: [p7, p2],
    description:
      "A structured blazer with a matching pencil skirt, cut in a firm suiting fabric that holds its shape all day.",
    isNew: false,
    wholesale: false,
    inStock: false,
    popularity: 63,
    addedAt: "2026-05-30",
  },
  {
    id: "accessory-edit",
    name: "The Accessory Edit",
    price: 12000,
    category: "accessories",
    sizes: ["One Size"],
    colors: [C.gold, C.terracotta],
    images: [p8, p5],
    description:
      "A curated set of finishing pieces — woven bag, gold hoops and a silk scarf — to complete any look.",
    isNew: true,
    wholesale: true,
    inStock: true,
    popularity: 58,
    addedAt: "2026-08-02",
  },
  {
    id: "soft-blouse-classic",
    name: "Soft Classic Blouse",
    price: 11500,
    category: "tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [C.cream, C.black],
    images: [catTops, p2],
    description:
      "A lightweight button-through blouse with gentle blouson sleeves. A quiet staple that works with everything.",
    isNew: false,
    wholesale: true,
    inStock: true,
    popularity: 77,
    addedAt: "2026-06-02",
  },
];

export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const relatedTo = (product: Product) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const s = (p: Product) => (p.category === product.category ? 0 : 1);
      return s(a) - s(b) || b.popularity - a.popularity;
    })
    .slice(0, 4);
