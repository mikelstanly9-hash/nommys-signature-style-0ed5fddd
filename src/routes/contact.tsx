import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, MapPin, Phone } from "lucide-react";
import { mapsLink, store, waLink } from "@/lib/store-config";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Nommy’s Signature" },
      {
        name: "description",
        content:
          "Call or WhatsApp Nommy’s Signature on 07046454621 or 09063657659, or visit our stores in Balogun, Lagos Island.",
      },
      { property: "og:title", content: "Contact — Nommy’s Signature" },
      { property: "og:description", content: "Reach us by phone, WhatsApp or in store in Lagos Island." },
    ],
  }),
  component: Contact,
});

const FIELD =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground";

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const msg = `Hello ${store.name},
Name: ${form.name}
Phone: ${form.phone}
${form.message}`;

  return (
    <div className="px-4 py-12 lg:px-10">
      <Reveal>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Contact us</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          We’re happy to help with sizing, availability, wholesale and delivery.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">Phone & WhatsApp</h2>
            <div className="flex flex-col gap-2">
              {store.phones.map((p) => (
                <a key={p} href={`tel:${p}`} className="flex items-center gap-2 font-mono text-sm hover:text-accent">
                  <Phone className="size-4" strokeWidth={1.5} /> {p}
                </a>
              ))}
              <a
                href={waLink(`Hello ${store.name}, I have a question.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-fit bg-accent px-5 py-2.5 text-[11px] tracking-widest text-accent-foreground uppercase"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-[10px] font-bold tracking-widest uppercase">Visit us</h2>
            {store.locations.map((loc) => (
              <div key={loc.label} className="mb-5">
                <p className="text-xs tracking-widest uppercase">{loc.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{loc.lines.join(", ")}</p>
                <a
                  href={mapsLink(loc.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] tracking-widest uppercase underline underline-offset-4"
                >
                  <MapPin className="size-3.5" strokeWidth={1.5} /> Directions
                </a>
              </div>
            ))}
          </div>

          <a
            href={store.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:text-accent"
          >
            <Instagram className="size-4" strokeWidth={1.5} /> {store.instagram.handle}
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(msg), "_blank", "noopener");
          }}
          className="h-fit bg-secondary p-6"
        >
          <h2 className="text-[10px] font-bold tracking-widest uppercase">Send a message</h2>
          <div className="mt-4 space-y-3">
            <input required placeholder="Your name" value={form.name} onChange={set("name")} className={FIELD} />
            <input required type="tel" placeholder="Phone number" value={form.phone} onChange={set("phone")} className={FIELD} />
            <textarea required rows={4} placeholder="How can we help?" value={form.message} onChange={set("message")} className={FIELD} />
            <button type="submit" className="w-full bg-foreground py-3.5 text-[11px] tracking-widest text-background uppercase">
              Send via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
