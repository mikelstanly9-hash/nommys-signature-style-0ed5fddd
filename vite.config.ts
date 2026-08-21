// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves this project from a subpath
// (https://<user>.github.io/nommys-signature-style-0ed5fddd/), so the static build
// must be generated with that base and without the server deploy plugin.
// GITHUB_PAGES=true is only set in the GitHub Actions workflow — Lovable hosting,
// Netlify and Vercel keep building from "/" as before.
const isGithubPages = !!process.env["GITHUB_PAGES"];
const base = isGithubPages
  ? process.env["GITHUB_PAGES_BASE"] || "/nommys-signature-style-0ed5fddd/"
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
  // GitHub Pages is static-only: skip the server/deploy bundler so the build
  // emits plain prerendered HTML + assets into dist/client.
  ...(isGithubPages ? { nitro: false as const } : {}),
  vite: {
    base,
  },
});


