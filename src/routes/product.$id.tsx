import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { getProduct, relatedTo } from "@/lib/products";
import { naira, store, waLink, waMessages } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { ProductCard } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — Nommy’s Signature" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Nommy’s Signature` },
        { name: "description", content: product.description.slice(0, 155) },
        { property: "og:title", content: `${product.name} — Nommy’s Signature` },
        { property: "og:description", content: product.description.slice(0, 155) },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: ProductMissing,
});

function ProductMissing() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="font-display text-3xl">This piece isn’t available</h1>
      <Link to="/shop" className="mt-6 inline-block text-[11px] tracking-widest uppercase underline">
        Back to shop
      </Link>
    </div>
  );
}

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [image, setImage] = useState(product.images[0]);
  const [added, setAdded] = useState(false);
  const liked = wishlist.includes(product.id);

  function add() {
    addToCart(product, size, color, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="px-4 py-8 lg:px-10">
      <nav className="mb-6 text-[10px] tracking-widest text-muted-foreground uppercase">
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>{" "}
        / {product.name}
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={image}
            alt={product.name}
            className="aspect-[3/4] w-full object-cover"
          />
          <div className="mt-3 flex gap-3">
            {product.images.map((img) => (
              <button
                key={img}
                onClick={() => setImage(img)}
                className={cn(
                  "w-20 border",
                  img === image ? "border-foreground" : "border-transparent",
                )}
              >
                <img src={img} alt="" className="aspect-[3/4] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1 className="font-display text-4xl tracking-tight">{product.name}</h1>
          <p className="mt-2 font-mono text-lg">{naira(product.price)}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <h2 className="mb-2 text-[10px] font-bold tracking-widest uppercase">Size</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "border border-border px-3 py-2 text-[11px] tracking-widest uppercase",
                    s === size && "bg-foreground text-background",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-[10px] font-bold tracking-widest uppercase">
              Colour — {color}
            </h2>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => setColor(c.name)}
                  style={{ backgroundColor: c.hex }}
                  className={cn(
                    "size-7 rounded-full ring-offset-2 ring-offset-background",
                    c.name === color && "ring-1 ring-foreground",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={add}
              disabled={!product.inStock}
              className="bg-foreground px-8 py-3.5 text-[11px] tracking-widest text-background uppercase disabled:opacity-40"
            >
              {!product.inStock ? "Sold out" : added ? "Added ✓" : "Add to cart"}
            </button>
            <a
              href={waLink(waMessages.product(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground px-8 py-3.5 text-[11px] tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Order on WhatsApp
            </a>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Save to wishlist"
              className="grid size-12 place-items-center border border-border"
            >
              <Heart className={cn("size-4", liked && "fill-accent text-accent")} strokeWidth={1.5} />
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">{store.policies.delivery}</p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl tracking-tight">You may also like</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {relatedTo(product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
