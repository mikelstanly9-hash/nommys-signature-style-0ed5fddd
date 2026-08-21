import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import { NIGERIAN_STATES, naira, store, waLink, waMessages } from "@/lib/store-config";
import { useShop } from "@/lib/shop-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Nommy’s Signature" },
      {
        name: "description",
        content: "Complete your Nommy’s Signature order with Lagos or nationwide delivery.",
      },
      { property: "og:title", content: "Checkout — Nommy’s Signature" },
      { property: "og:description", content: "Lagos and nationwide delivery options available." },
    ],
  }),
  component: Checkout;
});

function Checkout() {
  return null;
}
