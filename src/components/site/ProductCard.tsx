import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { naira } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useShop();
  const liked = wishlist.includes(product.id);

  return (
    <article className="group relative">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
        />
      </Link>

      <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-foreground px-2 py-1 text-[9px] tracking-widest text-background uppercase">
            New
          </span>
        )}
        {!product.inStock && (
          <span className="bg-background px-2 py-1 text-[9px] tracking-widest uppercase">
            Sold out
          </span>
        )}
      </div>

      <button
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/85 backdrop-blur transition-transform hover:scale-110"
      >
        <Heart
          className={cn("size-4", liked && "fill-accent text-accent")}
          strokeWidth={1.5}
        />
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="block truncate text-sm hover:text-accent"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-[10px] tracking-widest text-muted-foreground uppercase">
            {product.category.replace(/-/g, " ")}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs">{naira(product.price)}</span>
      </div>
    </article>
  );
}
