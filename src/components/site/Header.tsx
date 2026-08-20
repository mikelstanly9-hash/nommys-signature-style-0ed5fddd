import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { store } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [bump, setBump] = useState(false);
  const navigate = useNavigate();
  const { count, wishlist } = useShop();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 350);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: term.trim() || undefined, category: undefined } });
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full bg-foreground px-4 py-2 text-center text-[10px] font-medium tracking-[0.2em] uppercase text-background">
        {store.announcement}
      </div>

      <nav className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="flex items-center lg:hidden">
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="-ml-1 p-1"
            >
              <span className="mb-1.5 block h-px w-6 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </button>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="text-[11px] font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="truncate text-center font-display text-xl font-semibold tracking-tight italic lg:text-2xl"
          >
            {store.name}
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen((v) => !v)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Search className="size-[18px]" strokeWidth={1.5} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative hidden p-1 transition-transform hover:scale-110 sm:block"
            >
              <Heart className="size-[18px]" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-accent font-mono text-[9px] text-accent-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className={cn(
                "relative p-1 transition-transform hover:scale-110",
                bump && "scale-125",
              )}
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-foreground font-mono text-[9px] text-background">
                {count}
              </span>
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden p-1 transition-transform hover:scale-110 sm:block"
            >
              <User className="size-[18px]" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {searchOpen && (
          <form
            onSubmit={submitSearch}
            className="animate-fade-up border-t border-border bg-background px-4 py-3"
          >
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search dresses, tops, sets…"
                className="w-full min-w-0 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="shrink-0 bg-foreground px-4 py-2 text-[10px] font-medium tracking-widest text-background uppercase"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-foreground/40 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-background transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-5">
            <span className="font-display text-lg font-semibold italic">{store.name}</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-5 py-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="border-b border-border py-3 font-display text-2xl data-[status=active]:italic"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-3 px-5 pb-8 text-[11px] tracking-widest uppercase">
            <Link to="/wishlist" className="flex items-center gap-2">
              <Heart className="size-4" strokeWidth={1.5} /> Wishlist
            </Link>
            <Link to="/account" className="flex items-center gap-2">
              <User className="size-4" strokeWidth={1.5} /> Account
            </Link>
            <Link to="/customer-care" className="flex items-center gap-2">
              <Menu className="size-4" strokeWidth={1.5} /> Customer Care
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
