// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves the site from a subpath (https://<user>.github.io/<repo>/),
// so assets must be built with that base. Set GITHUB_PAGES=true in CI only —
// Lovable hosting / custom domains keep serving from "/".
const base = process.env.GITHUB_PAGES
  ? process.env.GITHUB_PAGES_BASE || "/nommys-signature-style-0ed5fddd/"
  : "/";

export default defineConfig({
  // Static HTML for hosts that only serve files (Netlify, Vercel static, GitHub Pages).
  // Without prerender, `dist/client` has no index.html and paths 404.
  tanstackStart: {
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
    },
  },
  vite: {
    base,
  },
});

