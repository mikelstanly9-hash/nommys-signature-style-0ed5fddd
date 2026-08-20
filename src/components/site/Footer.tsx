import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { store, waLink, waMessages } from "@/lib/store-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 pt-16 pb-8">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h5 className="mb-4 text-[10px] font-bold tracking-widest uppercase">Head Office</h5>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {store.locations[0].lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-[10px] font-bold tracking-widest uppercase">Second Store</h5>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {store.locations[1].lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </div>

        <div>
          <h5 className="mb-4 text-[10px] font-bold tracking-widest uppercase">Explore</h5>
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <Link to="/shop" className="w-fit hover:text-foreground">
              Shop All
            </Link>
            <Link to="/new-arrivals" className="w-fit hover:text-foreground">
              New Arrivals
            </Link>
            <Link to="/wholesale" className="w-fit hover:text-foreground">
              Wholesale
            </Link>
            <Link to="/customer-care" className="w-fit hover:text-foreground">
              Customer Care
            </Link>
            <Link to="/about" className="w-fit hover:text-foreground">
              About Us
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-[10px] font-bold tracking-widest uppercase">Contact Us</h5>
          <div className="flex flex-col gap-2 font-mono text-[11px]">
            {store.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="w-fit hover:text-accent">
                {p}
              </a>
            ))}
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-accent"
            >
              <span className="size-1.5 animate-soft-pulse rounded-full bg-accent" />
              Chat on WhatsApp
            </a>
            <a
              href={store.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-fit items-center gap-2 hover:text-accent"
            >
              <Instagram className="size-3.5" strokeWidth={1.5} />
              {store.instagram.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border pt-8 text-[9px] tracking-widest uppercase opacity-50">
        <span>© {store.name}</span>
        <span>{store.businessType}</span>
      </div>
    </footer>
  );
}
