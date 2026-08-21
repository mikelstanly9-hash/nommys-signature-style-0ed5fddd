import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { getProduct } from "@/lib/products";
import { naira } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Nommy’s Signature" },
      { name: "description", content: "Review the pieces in your Nommy’s Signature cart before checkout." },
      { property: "og:title", content: "Your Cart — Nommy’s Signature" },
      { property: "og:description", content: "Review your selected pieces before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQty, removeLine, subtotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-tight">Your cart is empty</h1>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 lg:px-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <ul className="divide-y divide-border border-y border-border">
          {cart.map((line) => {
            const p = getProduct(line.productId);
            if (!p) return null;
            return (
              <li key={line.id} className="flex gap-4 py-5">
                <img src={p.images[0]} alt={p.name} className="h-32 w-24 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-3">
                    <Link to="/product/$id" params={{ id: p.id }} className="text-sm hover:text-accent">
                      {p.name}
                    </Link>
                    <span className="font-mono text-xs">{naira(p.price * line.qty)}</span>
                  </div>
                  <p className="mt-1 text-[10px] tracking-widest text-muted-foreground uppercase">
                    {line.size} · {line.color}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center border border-border">
                      <button onClick={() => setQty(line.id, line.qty - 1)} className="px-3 py-1">
                        −
                      </button>
                      <span className="w-8 text-center font-mono text-xs">{line.qty}</span>
                      <button onClick={() => setQty(line.id, line.qty + 1)} className="px-3 py-1">
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(line.id)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="size-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit bg-secondary p-6">
          <h2 className="text-[10px] font-bold tracking-widest uppercase">Summary</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-mono">{naira(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Delivery is confirmed at checkout.
          </p>
          <Link
            to="/checkout"
            className="mt-6 block bg-foreground py-3.5 text-center text-[11px] tracking-widest text-background uppercase"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
