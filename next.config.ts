import type { NextConfig } from "next";

/**
 * GitHub Pages deployment.
 *
 * The site is published as a project page at
 * https://rayenbenabdelhafidh.github.io/German-Jobkonnektor/, so every asset
 * and route must be served from under the `/German-Jobkonnektor` subpath.
 * `basePath`/`assetPrefix` are gated behind GITHUB_PAGES so local dev and any
 * future non-GitHub-Pages build keep working at the site root, unprefixed,
 * exactly as before. The GitHub Actions workflow (.github/workflows/deploy.yml)
 * sets GITHUB_PAGES=true for the production build only.
 */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/German-Jobkonnektor" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // GitHub Pages serves plain static files with no Next.js server, so the
  // app must be fully pre-rendered to HTML/CSS/JS at build time.
  output: "export",

  basePath,
  assetPrefix: basePath,

  // GitHub Pages is a plain static file server: a request for
  // /de/branchen only resolves if that maps to a real directory containing
  // an index.html (or to a de/branchen.html file it happens to append the
  // extension for). Emitting de/branchen/index.html for every route, via
  // trailingSlash, is the form every static host (GitHub Pages included)
  // reliably resolves both with and without a trailing slash in the
  // request URL. Next.js applies this automatically to every internal
  // <Link>, so no route/link code needed to change.
  trailingSlash: true,

  // Exposes the same value to client components (e.g. the root redirect
  // page's meta-refresh tag), so the literal string lives in one place.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    // The static export has no server to run the on-demand Image
    // Optimization API against, so `next/image` must serve the original
    // files as-is. Sizing, lazy-loading and the blur-up placeholder (which
    // is generated at build time, not by the optimizer) are unaffected;
    // only the automatic AVIF/WebP re-encoding and resizing is lost.
    unoptimized: true,
  },

  // `redirects()` and `headers()` are not supported by `output: "export"` —
  // there is no server or edge runtime on GitHub Pages to evaluate them, so
  // Next.js would silently ignore them (with a build warning) even if left
  // in place. The root "/" → "/de" redirect they used to provide is now a
  // real static page instead: see app/(root)/page.tsx. The security headers
  // have no static-hosting equivalent on GitHub Pages (no server-level
  // header injection is available there) and have been removed rather than
  // left in as dead, misleading configuration — see README.md for details.
};

export default nextConfig;
