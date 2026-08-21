import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ALL_SIZES, categories, categoryName, products } from "@/lib/products";
import { naira } from "@/lib/store-config";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? (search["q"] as string) : undefined,
    category:
      typeof search["category"] === "string" && search["category"]
        ? (search["category"] as string)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — Nommy’s Signature" },
      {
        name: "description",
        content:
          "Browse dresses, tops, sets, jumpsuits and corporate wear from Nommy’s Signature. Filter by category, size and price.",
      },
      { property: "og:title", content: "Shop All — Nommy’s Signature" },
      {
        property: "og:description",
        content: "Browse the full Nommy’s Signature collection — wholesale and retail.",
      },
    ],
  }),
  component: Shop,
});

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
] as const;

function Shop() {
  const { q, category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [size, setSize] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");

  const results = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (category === "new-arrivals") list = list.filter((p) => p.isNew);
    else if (category === "wholesale") list = list.filter((p) => p.wholesale);
    else if (category) list = list.filter((p) => p.category === category);
    if (size) list = list.filter((p) => p.sizes.includes(size));
    if (q) {
      const t = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t) ||
          p.description.toLowerCase().includes(t),
      );
    }
    const sorted = [...list];
    if (sort === "new") sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "featured") sorted.sort((a, b) => b.popularity - a.popularity);
    return sorted;
  }, [q, category, size, maxPrice, sort]);

  const setCategory = (slug?: string) =>
    navigate({ to: ".", search: (prev) => ({ ...prev, category: slug }) });

  return (
    <div className="px-4 py-10 lg:px-10">
      <Reveal>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          {category ? categoryName(category) : "Shop All"}
        </h1>
        <p className="mt-2 text-xs tracking-widest text-muted-foreground uppercase">
          {results.length} {results.length === 1 ? "piece" : "pieces"}
          {q ? ` matching “${q}”` : ""}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="space-y-8">
          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">Category</h2>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <button
                onClick={() => setCategory(undefined)}
                className={cn(
                  "text-xs text-muted-foreground hover:text-foreground",
                  !category && "text-foreground underline underline-offset-4",
                )}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  className={cn(
                    "text-left text-xs text-muted-foreground hover:text-foreground",
                    category === c.slug && "text-foreground underline underline-offset-4",
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">Size</h2>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize((v) => (v === s ? null : s))}
                  className={cn(
                    "border border-border px-2.5 py-1 text-[10px] tracking-widest uppercase",
                    size === s && "bg-foreground text-background",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">
              Max price — {naira(maxPrice)}
            </h2>
            <input
              type="range"
              min={5000}
              max={50000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
            />
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">Sort</h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="w-full border border-border bg-background px-3 py-2 text-xs"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <div>
          {results.length === 0 ? (
            <p className="py-20 text-center text-sm text-muted-foreground">
              No pieces match these filters yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
