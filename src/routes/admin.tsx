import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { naira } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Nommy’s Signature" },
      { name: "description", content: "Internal overview of inventory, orders and customer feedback." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Nommy’s Signature" },
      { property: "og:description", content: "Internal inventory and order overview." },
    ],
  }),
  component: Admin,
});

const TABS = ["Inventory", "Orders", "Feedback"] as const;

function Admin() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Inventory");
  const { lastOrder } = useShop();

  return (
    <div className="px-4 py-12 lg:px-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Admin dashboard</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        A working preview of the catalogue and order data held on this device.
      </p>

      <div className="mt-8 flex gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-[11px] tracking-widest uppercase",
              tab === t ? "border-foreground" : "border-transparent text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Inventory" && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-border text-[10px] tracking-widest uppercase">
              <tr>
                <th className="py-3">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sizes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border">
                  <td className="py-3">{p.name}</td>
                  <td className="text-muted-foreground">{p.category.replace(/-/g, " ")}</td>
                  <td className="font-mono">{naira(p.price)}</td>
                  <td className="text-muted-foreground">{p.sizes.join(", ")}</td>
                  <td>{p.inStock ? "In stock" : "Sold out"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "Orders" && (
        <div className="mt-8 text-sm">
          {lastOrder ? (
            <div className="border border-border p-6">
              <p className="font-mono">{lastOrder.ref}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {lastOrder.customer["name"]} · {lastOrder.customer["phone"]} ·{" "}
                {lastOrder.customer["deliveryZone"] === "lagos" ? "Lagos delivery" : "Nationwide delivery"}
              </p>
              <ul className="mt-4 space-y-1 text-xs">
                {lastOrder.lines.map((l) => (
                  <li key={l.id}>
                    {getProduct(l.productId)?.name ?? l.productId} × {l.qty} ({l.size}, {l.color})
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-sm">{naira(lastOrder.subtotal)}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No orders recorded on this device yet.</p>
          )}
        </div>
      )}

      {tab === "Feedback" && (
        <p className="mt-8 text-sm text-muted-foreground">
          Customer feedback will appear here once messages are collected.
        </p>
      )}
    </div>
  );
}
