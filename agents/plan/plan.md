# Plan: Mamikos Clone

Governed by `agents/rules/rules.template.md`, built to `agents/spec/spec.md`.

Session started 28 July 2026 at 20:12 WIB. PRD budget is 3 to 5 hours of active coding.

Rule from section 1 of the rules: nothing gets built that is not an item here. If scope appears mid-session, it lands in this file first.

Each phase ends in one commit. The commit message is given so the history reads as a narrative rather than a dump.

---

## Phase 0: Research and foundation

- [x] Read the PRD and confirm what is actually being graded
- [x] Read the Next.js 16 docs shipped in `node_modules`, per `AGENTS.md`
- [x] Recover real Mamikos tokens from their production CSS bundles
- [x] Source and visually verify 28 interior photographs into `public/img/`
- [x] Define design tokens in `globals.css`, load Lato through `next/font`
- [x] Build the kos domain layer: types, seed, repository, formatters
- [x] Refactor the first pass to comply with the rules once they existed
- [x] Verify `type-check` and `lint` both pass

`chore: scaffold project foundation and kos domain layer`

## Phase 1: Governance artefacts

- [x] Scope `agents/rules/rules.template.md` down to the PRD
- [x] Write `agents/spec/spec.md`
- [x] Write `agents/plan/plan.md`

`docs: add scoped project rules, spec, and build plan`

---

## Phase 2: Engineering guardrails

Promoted into scope by an explicit decision on 28 July. The out-of-scope table in section 14 of the rules previously cut this, on the argument that automating enforcement costs more than it saves over a single session. That argument loses here for one reason: the rules in this repo are unusually mechanical. No em-dash, no hex outside `globals.css`, Conventional Commits, formatter output. Mechanical rules are exactly what a machine should hold, not a tiring human at hour four.

Guardrails go in **before** the bulk of the UI. A gate added at the end guards nothing that was already written.

Budget: 30 to 40 minutes. If it overruns, 2.5 and 2.6 ship and 2.4 is reduced to type-check only.

### 2.1 Prerequisites

- [x] Install `husky`, `@commitlint/cli`, `@commitlint/config-conventional`
- [ ] Add `packageManager: "pnpm@10.9.0"` to `package.json` so CI resolves the same pnpm
- [ ] Add scripts: `ci` (`biome ci`), `prepare` (`husky`)
- [ ] Confirm `pnpm build` passes locally before wiring any gate around it

> Known local hazard: `pnpm lint` and `npx biome` both die in this shell with `Linter process terminated abnormally (possibly out of memory)`. The binary at `./node_modules/.bin/biome` runs fine, so something is intercepting the package-runner path. Git hooks must call the binary directly rather than through `pnpm` or `npx`, otherwise every commit fails for a reason that has nothing to do with the code.

### 2.2 Husky

- [ ] `husky init`
- [ ] Set `prepare` to `husky || true` so a CI checkout without git metadata cannot fail install
- [ ] Confirm `.husky/` is committed and the hook files are executable

### 2.3 Commitlint

- [ ] `commitlint.config.mjs` extending `@commitlint/config-conventional`, tightened to match section 2 of the rules:
  - `type-enum` restricted to the nine allowed types
  - `header-max-length` 72, not the default 100
  - `subject-case` lower-case
  - `subject-full-stop` never
  - `subject-empty` and `type-empty` both errors
- [ ] Reject the forbidden em-dash in the commit message from the same hook, using an `if grep -q` block rather than `grep && exit`, since the latter leaks grep's exit code and fails every clean commit

### 2.4 Hook layering

Fast checks block the commit. Slow checks block the push. This keeps the inner loop tight while still satisfying the actual requirement, which is that broken code cannot reach the remote.

- [ ] `.husky/pre-commit`
  - `biome check --staged --no-errors-on-unmatched` via the direct binary path
  - em-dash scan across staged `.ts`, `.tsx`, `.css`, and `.md` files
  - hex-literal scan across staged component files, excluding `globals.css`, enforcing section 6
- [ ] `.husky/commit-msg`
  - commitlint
  - em-dash scan on the message
- [ ] `.husky/pre-push`
  - `tsc --noEmit`
  - `next build`

### 2.5 GitHub Actions

- [ ] `.github/workflows/ci.yml`, triggered on push to `main` and on every pull request
- [ ] Single `quality` job on `ubuntu-latest`:
  - `actions/checkout@v4`
  - `pnpm/action-setup@v4`
  - `actions/setup-node@v4` on Node 22 with `cache: pnpm`
  - `pnpm install --frozen-lockfile`
  - `pnpm ci` for format and lint, using `biome ci` rather than `biome check` so it never writes and fails on any diff
  - `pnpm type-check`
  - `pnpm build`
- [ ] Cache `.next/cache` between runs so the build step does not start cold every time

Local hooks and CI intentionally overlap. Hooks are bypassable with `--no-verify`, which section 2 forbids but cannot prevent. CI is the copy that cannot be skipped.

### 2.6 Prove the gates actually fire

A guardrail nobody tested is a guardrail nobody has. Each of these is deliberately broken, the block is observed, then it is reverted:

- [ ] A commit message reading `update stuff` is rejected by commitlint
- [ ] A commit message containing an em-dash is rejected
- [ ] A badly formatted file is rejected at pre-commit
- [ ] A hex literal in a component is rejected at pre-commit
- [ ] A type error is rejected at pre-push

`build: add husky, commitlint, and github actions quality gates`

---

## Phase 3: Architecture migration

Adopts the route-group structure defined in section 4 of the rules. Done now, while the only thing to move is the domain layer. The same migration after twenty components exist would be an afternoon.

Target: `src/features/` disappears, every landing concern lives under `src/components/(landing)/`, and the route file is a five-line composition.

- [ ] Create `src/components/(landing)/` with `sections/`, `ui/`, `data/`, `types/`, `utils/`
- [ ] Move `features/kos/types/kos.ts` to `(landing)/types/`
- [ ] Move `features/kos/services/kosSeed.ts` and `kosRepository.ts` to `(landing)/data/`
- [ ] Move `features/kos/constants/kosFilters.ts` to `(landing)/data/`
- [ ] Move `features/kos/utils/formatCurrency.ts` to `(landing)/utils/`
- [ ] Delete `src/features/` entirely, per section 4 of the rules on unused files
- [ ] Write `(landing)/index.ts` as the single barrel
- [ ] Create `src/app/(landing)/page.tsx` and delete `src/app/page.tsx`, since both resolve to `/` and cannot coexist
- [ ] **Verify the import specifier resolves.** `@/components/(landing)` contains parentheses. TypeScript path mapping and Turbopack should both handle it, but this is unusual enough that it gets proven with a real build before twenty files depend on it. If it fails, the fallback is an unparenthesised `landing/` folder name and a note in the spec explaining why the mirror could not be exact.
- [ ] `type-check`, `lint`, and `build` all green after the move

`refactor: adopt route-group component architecture`

---

## Phase 4: Shell

- [ ] `MamikosLogo` rendering `public/img/logo-img/mamikos-logo.svg`, supplied 28 July. Intrinsic size 136 by 32, pure vector, 32 paths, no raster payload. Prefer a static import so Next derives the dimensions itself and no layout shift is possible. If the loader rejects an SVG static import, fall back to an explicit `width` and `height` on `next/image` and record why in the spec.
- [ ] `SiteHeader`: sticky, full desktop nav, hamburger under `lg`, keyboard reachable
- [ ] `SiteFooter`: four link columns, store badges, socials, payment row
- [ ] Wire both into the root layout, since they are site-wide rather than landing-only
- [ ] `not-found.tsx` and `error.tsx`
- [ ] Central route and nav config in `src/config`

`feat(layout): add site header, footer, and route shell`

## Phase 5: Card and section primitives

The highest-leverage components. They appear in most sections, so they are built and verified before anything consumes them. All under `(landing)/ui/`.

- [ ] `Badge` driven by tokens
- [ ] `KosCardBadges`: on-photo urgency, featured, promo, and premium marks
- [ ] `KosCard` vertical variant, matching the measured 345 by 160 px anatomy
- [ ] `KosCard` horizontal variant for rails and search results
- [ ] Facilities line: single line, ellipsis, dot separators, highlighted fragments
- [ ] Price block: current price, struck original, discount colour
- [ ] `SectionHeader`: title plus "Lihat semua"
- [ ] `KosRail`: native scroll-snap row with arrow controls
- [ ] Verify no hex literal escaped into any of them

`feat(landing): add kos card and section primitives`

## Phase 6: Landing sections

One file per section in `(landing)/sections/`, one export line each in the barrel.

- [ ] `HeroSearch` client leaf, submits to `/cari`
- [ ] `HeroSection` at the measured type scale
- [ ] `BookingShortcuts`, four tiles
- [ ] `FlashSaleSection` with a hydration-safe countdown
- [ ] `RecommendationSection` grid
- [ ] `CampusSection`, chips as links
- [ ] `PopularAreaSection`, six tiles
- [ ] `PromoBanner`
- [ ] `AndalanSection`
- [ ] `OwnerCta`
- [ ] `ArticleSection`
- [ ] `LandingPage` composing all of the above, exported from the barrel
- [ ] Home metadata and Open Graph on the route file

`feat(landing): build mamikos home page sections`

## Phase 7: Search

New route group `(search)`, following the same shape.

- [ ] Promote the shared kos domain to `components/(shared)/` the moment a second group needs it, per section 4
- [ ] `parseSearchParams` narrowing untrusted URL input
- [ ] One unit test for the filter, sort, and parse logic
- [ ] `src/app/(search)/cari/page.tsx`, server rendered from `searchKos`
- [ ] `SearchFilters` client leaf writing to the URL, never to local state
- [ ] Sort toolbar and result count
- [ ] Empty state with active filters echoed and a reset action
- [ ] Search metadata

`feat(search): add search results page with url-driven filters`

## Phase 8: Detail

- [ ] `src/app/(room)/room/[slug]/page.tsx` with `generateStaticParams`
- [ ] Gallery, facilities, room specification, price panel
- [ ] Related listings through `findRelatedKos`
- [ ] `generateMetadata` from the listing
- [ ] `notFound()` on an unknown slug

`feat(room): add kos detail page`

## Phase 9: Finish

- [ ] `sitemap.ts` and `robots.ts`
- [ ] Responsive pass at 375, 768, and 1440 px
- [ ] Accessibility pass: keyboard path, focus visibility, alt text, contrast
- [ ] Full run of section 13 of the rules
- [ ] Rewrite `README.md`: approach, tools, key decisions, as the PRD asks
- [ ] Deploy and capture the demo link

`docs: document approach and decisions for submission`

---

## Cut if time runs short

Dropped in this order, because the PRD rewards a polished home page over a broad unfinished one:

1. Phase 8, the detail route
2. Phase 2.4 pre-push build, leaving type-check as the push gate and letting CI own the build
3. The countdown in Phase 6, replaced by a static label
4. Phase 7 filters reduced to city and type only

The home page is never cut. It is the graded minimum.
