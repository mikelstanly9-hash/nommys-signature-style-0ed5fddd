import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { categories, products } from "@/lib/products";
import { store, waLink, waMessages } from "@/lib/store-config";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nommy’s Signature — Style That Speaks For You" },
      {
        name: "description",
        content:
          "Nommy’s Signature is a Lagos fashion brand offering wholesale and retail dresses, sets, tops and corporate wear. Style that speaks for you.",
      },
      { property: "og:title", content: "Nommy’s Signature — Style That Speaks For You" },
      {
        property: "og:description",
        content: "Wholesale & retail clothing from Balogun, Lagos Island. Nationwide delivery.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8);

  return (
    <div>
      <section className="relative grid gap-8 px-4 pt-10 pb-16 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-10 lg:pt-16">
        <div className="mx-auto w-full max-w-xl">
          <p className="animate-fade-up text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            {store.businessType}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Style That <em className="italic text-accent">Speaks</em> For You.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Elegant, everyday-ready pieces made for the modern Nigerian woman — available in
            wholesale and retail from our Lagos Island stores.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase transition-opacity hover:opacity-85"
            >
              Shop Collection
            </Link>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground px-7 py-3.5 text-[11px] tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src={hero}
            alt="Model wearing a Nommy’s Signature outfit"
            className="animate-fade-up aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="px-4 py-14 lg:px-10">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Shop by category</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.slice(1, 5).map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link
                to="/shop"
                search={{ category: c.slug, q: undefined }}
                className="group block overflow-hidden"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
                <p className="mt-3 text-[11px] tracking-widest uppercase">{c.name}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 lg:px-10">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Featured pieces</h2>
          <Link to="/shop" className="text-[11px] tracking-widest uppercase hover:text-accent">
            View all
          </Link>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-4 my-14 bg-secondary px-6 py-16 text-center lg:mx-10">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            Buying in bulk?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            We supply retailers and resellers across Nigeria. Tell us what you need and we’ll
            put together a quote.
          </p>
          <Link
            to="/wholesale"
            className="mt-7 inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase"
          >
            Wholesale enquiry
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
