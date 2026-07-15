# design-sync notes — Portfolio Edyta

## Repo shape

This repo is a private Vite app (`"private": true`, no `main`/`module`/`exports`), NOT a publishable component-library package. There is no `dist/index.es.js` and never will be. The converter runs in **synth-entry mode**, scanning `cfg.srcDir` (`src/components/ui`) directly.

**Invocation used** (no real dist entry — `--entry` is passed pointing at a path that does NOT exist, on purpose):

```sh
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.es.js --out ./ds-bundle
node .ds-sync/package-validate.mjs ./ds-bundle
node .ds-sync/package-capture.mjs --out ./ds-bundle
```

Passing `--entry ./dist/index.es.js` (nonexistent) is required, not optional: without any `--entry`, the script falls back to `node_modules/<pkg>` for `PKG_DIR`, which doesn't exist either (this isn't an installed package) and crashes. Pointing `--entry` at a plausible-but-absent dist path lets `resolveDistEntry` walk up from it to find the real root `package.json` (name "portfolio"), then soft-fail on the file itself and trigger synth-entry from `srcDir`. Do NOT pass `--entry` at a real file in `src/` — that gets treated as the entire bundled entry and component discovery returns 0 (already hit this once).

## Scope — deliberately narrow

Only `src/components/ui/` (Button, Badge, Card family, Input, Label — 10 components from 5 files) is synced. The richer case-study-specific patterns (FeatureCard, StatCard, lessons grid, callout box) live inline inside individual page files (`RaportyCaseStudy.tsx`, `LocaloCaseStudy.tsx`, etc.), not as importable components — see `docs/DESIGN_SYSTEM.md` for those. User explicitly decided NOT to extract them into shared components (twice, across two sessions) — don't do it unprompted just to widen this sync's scope.

## cssEntry — hash caveat

`cfg.cssEntry` points at `dist/assets/index-nP6J0rRG.css` — a Vite-hashed filename from a real `npm run build`. **This hash changes every build.** Before any re-sync: run `npm run build`, `ls dist/assets/*.css` to find the new filename, and update `cfg.cssEntry` in `.design-sync/config.json` to match — the converter will not find the old path otherwise.

## Tokens

`src/design-tokens.css` (imported from `src/index.css`) is a new, purely-declarative file added specifically to give this sync real CSS custom properties to scrape — it mirrors `docs/DESIGN_SYSTEM.md`'s values (colors, spacing, radius) 1:1. **Nothing in the existing app actually reads these variables yet** — the 6 case study pages still use inline hex/Tailwind arbitrary values. If a future change starts wiring real components to `var(--color-accent-localo)` etc., that's a bigger, separate refactor — don't assume it already happened just because the tokens file exists.

## Fonts

`Manrope` is loaded at runtime via a Google Fonts `<link>` in `index.html` (not shipped as `@font-face`). `Cambria` is just Tailwind's default `font-serif` fallback stack, not a real brand font. Both are in `cfg.runtimeFontPrefixes` — correct, don't try to source/ship font files for either.

## Known render warns

None currently — all 10 components render clean, no triaged warns to track.

## Re-sync risks

- **`cssEntry`'s hash WILL be stale** on the next sync unless `npm run build` is re-run and the config path updated first (see above) — this is the single most likely re-sync failure.
- The 10 previews in `.design-sync/previews/*.tsx` are hand-authored composition examples (invented realistic content — case-study-flavored copy like "Client Acquisition", "Discovery sprint" — not pulled from any real docs/tests, since this repo has neither for its UI primitives). If `src/components/ui/*.tsx` gains new props or components, previews won't auto-update — re-check them against the current `.d.ts` output.
- `componentSrcMap` is NOT set — discovery is 100% automatic from `srcDir` content scan. If a new file is added to `src/components/ui/` with a non-PascalCase or lowercase-only export, it silently won't sync; if a file is added that exports something PascalCase but NOT meant as a design-system component, it WILL get picked up and need excluding via `componentSrcMap: {"Name": null}`.
- This was a from-scratch first sync — no prior anchor, so this note set is the only carry-forward context.
