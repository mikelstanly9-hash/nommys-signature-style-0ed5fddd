import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { useShop } from "@/lib/shop-context";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Nommy’s Signature" },
      { name: "description", content: "The Nommy’s Signature pieces you saved for later." },
      { property: "og:title", content: "Wishlist — Nommy’s Signature" },
      { property: "og:description", content: "Your saved Nommy’s Signature pieces." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="px-4 py-10 lg:px-10">
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Wishlist</h1>
      {saved.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">You haven’t saved any pieces yet.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
