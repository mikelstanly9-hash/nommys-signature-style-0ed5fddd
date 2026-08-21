import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import catWholesale from "@/assets/cat-wholesale.jpg";
import { products } from "@/lib/products";
import { store, waLink, waMessages } from "@/lib/store-config";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale — Nommy’s Signature" },
      {
        name: "description",
        content:
          "Buy Nommy’s Signature clothing in bulk for your store. Send us your enquiry and we’ll respond on WhatsApp.",
      },
      { property: "og:title", content: "Wholesale — Nommy’s Signature" },
      { property: "og:description", content: "Bulk supply for retailers and resellers across Nigeria." },
    ],
  }),
  component: Wholesale,
});

const FIELD =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground";

function Wholesale() {
  const [form, setForm] = useState({ name: "", business: "", phone: "", items: "", qty: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = `Hello ${store.name}, I’d like a wholesale quote.
Name: ${form.name}
Business: ${form.business}
Phone: ${form.phone}
Items: ${form.items}
Quantity: ${form.qty}`;

  const bulk = products.filter((p) => p.wholesale);

  return (
    <div>
      <section className="grid gap-8 px-4 py-12 lg:grid-cols-2 lg:items-center lg:px-10">
        <Reveal>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Wholesale</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            Stock your store with Nommy’s Signature
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            We supply retailers and resellers from our Balogun, Lagos Island stores.
            {" "}
            {store.policies.wholesaleMinimum}
          </p>
          <a
            href={waLink(waMessages.wholesale)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase"
          >
            Chat with us
          </a>
        </Reveal>
        <Reveal delay={100}>
          <img src={catWholesale} alt="Wholesale clothing rails" className="aspect-[4/3] w-full object-cover" />
        </Reveal>
      </section>

      <section className="bg-secondary px-4 py-14 lg:px-10">
        <Reveal className="mx-auto max-w-xl">
          <h2 className="font-display text-3xl tracking-tight">Request a quote</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(message), "_blank", "noopener");
            }}
            className="mt-6 space-y-3"
          >
            <input required placeholder="Your name" value={form.name} onChange={set("name")} className={FIELD} />
            <input placeholder="Business name (optional)" value={form.business} onChange={set("business")} className={FIELD} />
            <input required type="tel" placeholder="Phone number" value={form.phone} onChange={set("phone")} className={FIELD} />
            <textarea
              required
              rows={3}
              placeholder="Which items are you interested in?"
              value={form.items}
              onChange={set("items")}
              className={FIELD}
            />
            <input required placeholder="Estimated quantity" value={form.qty} onChange={set("qty")} className={FIELD} />
            <button
              type="submit"
              className="w-full bg-foreground py-3.5 text-[11px] tracking-widest text-background uppercase"
            >
              Send via WhatsApp
            </button>
          </form>
        </Reveal>
      </section>

      <section className="px-4 py-14 lg:px-10">
        <h2 className="font-display text-3xl tracking-tight">Available for bulk</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {bulk.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
