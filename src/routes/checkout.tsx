import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import { NIGERIAN_STATES, naira, store, waLink, waMessages } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Nommy’s Signature" },
      {
        name: "description",
        content: "Complete your Nommy’s Signature order with Lagos or nationwide delivery.",
      },
      { property: "og:title", content: "Checkout — Nommy’s Signature" },
      { property: "og:description", content: "Lagos and nationwide delivery options available." },
    ],
  }),
  component: Checkout,
});

const FIELD =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground";

function Checkout() {
  const { cart, subtotal, placeOrder, lastOrder } = useShop();
  const [zone, setZone] = useState<"lagos" | "nationwide">("lagos");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "Lagos",
    note: "",
  });
  const [placed, setPlaced] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const order = placeOrder({ ...form, deliveryZone: zone });
    setPlaced(order.ref);
  }

  if (placed || (cart.length === 0 && lastOrder)) {
    const ref = placed ?? lastOrder!.ref;
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-tight">Order received</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your reference is <span className="font-mono">{ref}</span>. Send it to us on WhatsApp so
          we can confirm delivery and payment.
        </p>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">
          {store.policies.payment}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink(waMessages.order(ref))}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent px-7 py-3.5 text-[11px] tracking-widest text-accent-foreground uppercase"
          >
            Confirm on WhatsApp
          </a>
          <Link to="/shop" className="border border-foreground px-7 py-3.5 text-[11px] tracking-widest uppercase">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-4 py-24 text-center">
        <h1 className="font-display text-4xl tracking-tight">Nothing to check out</h1>
        <Link to="/shop" className="mt-8 inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase">
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 lg:px-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Checkout</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-8">
          <fieldset className="space-y-3">
            <legend className="mb-3 text-[10px] font-bold tracking-widest uppercase">
              Your details
            </legend>
            <input required placeholder="Full name" value={form.name} onChange={set("name")} className={FIELD} />
            <input
              required
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={set("phone")}
              className={FIELD}
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={set("email")}
              className={FIELD}
            />
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-[10px] font-bold tracking-widest uppercase">
              Delivery
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "lagos", title: "Lagos delivery", copy: "Within Lagos State." },
                  { id: "nationwide", title: "Nationwide delivery", copy: "Outside Lagos, via courier." },
                ] as const
              ).map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => {
                    setZone(o.id);
                    setForm((f) => ({ ...f, state: o.id === "lagos" ? "Lagos" : f.state }));
                  }}
                  className={cn(
                    "border p-4 text-left",
                    zone === o.id ? "border-foreground bg-secondary" : "border-border",
                  )}
                >
                  <span className="block text-[11px] tracking-widest uppercase">{o.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{o.copy}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{store.policies.delivery}</p>

            <div className="mt-4 space-y-3">
              <input required placeholder="Street address" value={form.address} onChange={set("address")} className={FIELD} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="City / Area" value={form.city} onChange={set("city")} className={FIELD} />
                {zone === "lagos" ? (
                  <input readOnly value="Lagos" className={cn(FIELD, "text-muted-foreground")} />
                ) : (
                  <select value={form.state} onChange={set("state")} className={FIELD}>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                )}
              </div>
              <textarea
                rows={3}
                placeholder="Delivery note (optional)"
                value={form.note}
                onChange={set("note")}
                className={FIELD}
              />
            </div>
          </fieldset>
        </div>

        <aside className="h-fit bg-secondary p-6">
          <h2 className="text-[10px] font-bold tracking-widest uppercase">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cart.map((l) => {
              const p = getProduct(l.productId);
              if (!p) return null;
              return (
                <li key={l.id} className="flex justify-between gap-3 text-xs">
                  <span className="min-w-0">
                    {p.name} × {l.qty}
                    <span className="block text-muted-foreground">
                      {l.size} · {l.color}
                    </span>
                  </span>
                  <span className="font-mono">{naira(p.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex justify-between border-t border-border pt-4 text-sm">
            <span>Subtotal</span>
            <span className="font-mono">{naira(subtotal)}</span>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-foreground py-3.5 text-[11px] tracking-widest text-background uppercase"
          >
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
