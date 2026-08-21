import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/products";
import { naira, store, waLink, waMessages } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Nommy’s Signature" },
      {
        name: "description",
        content: "View your most recent Nommy’s Signature order and saved pieces on this device.",
      },
      { property: "og:title", content: "Your Account — Nommy’s Signature" },
      { property: "og:description", content: "Your recent order and saved pieces." },
    ],
  }),
  component: Account,
});

function Account() {
  const { lastOrder, wishlist } = useShop();

  return (
    <div className="px-4 py-12 lg:px-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Your account</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Your cart, wishlist and latest order are saved on this device.
      </p>

      <section className="mt-10">
        <h2 className="text-[10px] font-bold tracking-widest uppercase">Latest order</h2>
        {lastOrder ? (
          <div className="mt-4 border border-border p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-sm">{lastOrder.ref}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(lastOrder.createdAt).toLocaleDateString("en-NG")}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              {lastOrder.lines.map((l) => {
                const p = getProduct(l.productId);
                return (
                  <li key={l.id} className="flex justify-between gap-3">
                    <span>
                      {p?.name ?? l.productId} × {l.qty}
                    </span>
                    <span className="font-mono">{p ? naira(p.price * l.qty) : "—"}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-3 text-sm">
              <span>Subtotal</span>
              <span className="font-mono">{naira(lastOrder.subtotal)}</span>
            </div>
            <a
              href={waLink(waMessages.order(lastOrder.ref))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block bg-foreground px-6 py-3 text-[11px] tracking-widest text-background uppercase"
            >
              Follow up on WhatsApp
            </a>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">No orders placed on this device yet.</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-[10px] font-bold tracking-widest uppercase">Saved pieces</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {wishlist.length} saved.{" "}
          <Link to="/wishlist" className="underline underline-offset-4">
            View wishlist
          </Link>
        </p>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        Need help with an order? Call {store.phones.join(" or ")}.
      </p>
    </div>
  );
}
