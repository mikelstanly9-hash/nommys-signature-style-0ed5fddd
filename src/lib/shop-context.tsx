import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export type CartLine = {
  id: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type Order = {
  ref: string;
  createdAt: string;
  lines: CartLine[];
  subtotal: number;
  customer: Record<string, string>;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  lastOrder: Order | null;
  addToCart: (p: Product, size: string, color: string, qty?: number) => void;
  setQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (customer: Record<string, string>) => Order;
  count: number;
  subtotal: number;
  hydrated: boolean;
};

const ShopContext = createContext<ShopState | null>(null);
const KEY = "nommys-shop-v1";

function read<T>(fallback: T, pick: (v: any) => T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return fallback;
    return pick(JSON.parse(raw)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>([], (v) => v.cart));
    setWishlist(read<string[]>([], (v) => v.wishlist));
    setLastOrder(read<Order | null>(null, (v) => v.lastOrder));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, lastOrder }));
    } catch {
      /* storage unavailable — keep session state only */
    }
  }, [cart, wishlist, lastOrder, hydrated]);

  const addToCart = useCallback(
    (p: Product, size: string, color: string, qty = 1) => {
      const id = `${p.id}__${size}__${color}`;
      setCart((prev) => {
        const found = prev.find((l) => l.id === id);
        if (found) {
          return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
        }
        return [...prev, { id, productId: p.id, size, color, qty }];
      });
    },
    [],
  );

  const setQty = useCallback((lineId: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.id === lineId ? { ...l, qty: Math.max(0, qty) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeLine = useCallback(
    (lineId: string) => setCart((prev) => prev.filter((l) => l.id !== lineId)),
    [],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((i) => i !== productId) : [...prev, productId],
    );
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const p = products.find((pr) => pr.id === line.productId);
        return sum + (p ? p.price * line.qty : 0);
      }, 0),
    [cart],
  );

  const count = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);

  const placeOrder = useCallback(
    (customer: Record<string, string>) => {
      const order: Order = {
        ref: `NS-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        lines: cart,
        subtotal,
        customer,
      };
      setLastOrder(order);
      setCart([]);
      return order;
    },
    [cart, subtotal],
  );

  const value: ShopState = {
    cart,
    wishlist,
    lastOrder,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    toggleWishlist,
    placeOrder,
    count,
    subtotal,
    hydrated,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
