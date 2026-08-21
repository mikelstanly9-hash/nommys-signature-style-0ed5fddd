import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Nommy’s Signature" },
      {
        name: "description",
        content: "The newest dresses, sets and separates just added at Nommy’s Signature, Lagos.",
      },
      { property: "og:title", content: "New Arrivals — Nommy’s Signature" },
      { property: "og:description", content: "Freshly added pieces from our Lagos Island stores." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const list = products
    .filter((p) => p.isNew)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));

  return (
    <div className="px-4 py-10 lg:px-10">
      <Reveal>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">New Arrivals</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Just landed in store and online — the latest additions to the collection.
        </p>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
