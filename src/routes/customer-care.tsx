import { createFileRoute, Link } from "@tanstack/react-router";
import { store, waLink, waMessages } from "@/lib/store-config";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/customer-care")({
  head: () => ({
    meta: [
      { title: "Customer Care — Nommy’s Signature" },
      {
        name: "description",
        content:
          "Answers on ordering, delivery, returns, sizing and wholesale at Nommy’s Signature, plus how to reach our team.",
      },
      { property: "og:title", content: "Customer Care — Nommy’s Signature" },
      { property: "og:description", content: "Ordering, delivery, returns and wholesale support." },
    ],
  }),
  component: CustomerCare,
});

const FAQS = [
  {
    q: "How do I place an order?",
    a: "Add pieces to your cart and check out, or message us directly on WhatsApp and we’ll take your order there.",
  },
  { q: "How is delivery handled?", a: store.policies.delivery },
  { q: "What is your returns policy?", a: store.policies.returns },
  { q: "How do payments work?", a: store.policies.payment },
  { q: "Do you sell wholesale?", a: store.policies.wholesaleMinimum },
  {
    q: "Can I visit your stores?",
    a: `Yes — we have two stores: ${store.locations.map((l) => l.lines.join(", ")).join(" and ")}.`,
  },
];

function CustomerCare() {
  return (
    <div className="px-4 py-12 lg:px-10">
      <Reveal>
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Customer care</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Everything you need to know about shopping with {store.name}.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <aside className="h-fit bg-secondary p-6">
          <h2 className="text-[10px] font-bold tracking-widest uppercase">Still need help?</h2>
          <div className="mt-4 flex flex-col gap-2 font-mono text-sm">
            {store.phones.map((p) => (
              <a key={p} href={`tel:${p}`} className="hover:text-accent">
                {p}
              </a>
            ))}
          </div>
          <a
            href={waLink(waMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block bg-foreground py-3 text-center text-[11px] tracking-widest text-background uppercase"
          >
            Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="mt-3 block border border-foreground py-3 text-center text-[11px] tracking-widest uppercase"
          >
            Contact page
          </Link>
        </aside>
      </div>
    </div>
  );
}
