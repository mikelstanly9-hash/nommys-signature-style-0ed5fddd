import { createFileRoute, Link } from "@tanstack/react-router";
import catDresses from "@/assets/cat-dresses.jpg";
import { mapsLink, store } from "@/lib/store-config";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nommy’s Signature" },
      {
        name: "description",
        content:
          "Nommy’s Signature is a clothing brand by Augustina Nneoma Marycynthia, trading wholesale and retail from Balogun, Lagos Island.",
      },
      { property: "og:title", content: "About Us — Nommy’s Signature" },
      { property: "og:description", content: "A Lagos Island clothing brand — wholesale and retail." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="px-4 py-12 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">About us</p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
            {store.name}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">{store.legalName}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {store.businessType}. {store.policies.history}
          </p>
          <a
            href={store.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[11px] tracking-widest uppercase underline underline-offset-4"
          >
            {store.instagram.handle}
          </a>
        </Reveal>
        <Reveal delay={100}>
          <img src={catDresses} alt="Nommy’s Signature pieces" className="aspect-[4/5] w-full object-cover" />
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {store.locations.map((loc) => (
          <Reveal key={loc.label} className="border border-border p-6">
            <h2 className="text-[10px] font-bold tracking-widest uppercase">{loc.label}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {loc.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <a
              href={mapsLink(loc.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-[11px] tracking-widest uppercase underline underline-offset-4"
            >
              View on map
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          to="/shop"
          className="inline-block bg-foreground px-7 py-3.5 text-[11px] tracking-widest text-background uppercase"
        >
          Shop the collection
        </Link>
      </div>
    </div>
  );
}
