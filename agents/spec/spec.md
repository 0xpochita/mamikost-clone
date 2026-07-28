# Spec: Mamikos Clone

Derived from `agents/prd/README.md`, governed by `agents/rules/rules.template.md`.

## 1. Goal

A frontend clone of the Mamikos home page, close enough to the real product that someone who uses Mamikos recognises it immediately. Two supporting routes exist so the home page links somewhere real instead of into dead anchors.

Non-goal: a working marketplace. There is no backend, no auth, no booking, no payment. Every interactive surface either changes the URL or changes local UI state.

## 2. Reference research

mamikos.com is a Vue single-page app. Its served HTML is an empty shell, so nothing useful can be read from `curl`. The design was recovered instead from the hashed production CSS bundles referenced by that shell, under `https://static-asset.mamikos.com/build/css/`.

This matters for section 6 of the rules: the tokens below are measured from the real product, not invented.

Bundles read: `GlobalNavbar`, `HomeTopSection`, `KostRoomCard`, `RoomCardInfo`, `RoomCardPrice`, `HomeArticle`.

The bundle filenames also revealed the real section order of the home page, which the clone follows.

### Tokens recovered

| Role | Value | Token |
| --- | --- | --- |
| Primary brand | `#1baa56` | `--color-mami` |
| Brand dark | `#008742` | `--color-mami-dark` |
| Brand light | `#6ecf91` | `--color-mami-light` |
| Flash sale | `#ec4a0c` | `--color-flash` |
| Discount | `#da3438` | `--color-sale` |
| Long-term saving | `#583f99` | `--color-longterm` |
| Premium badge | `#ecb14f` | `--color-prime` |
| Text primary | `#303030` | `--color-ink` |
| Text secondary | `#404040` | `--color-ink-2` |
| Heading | `#484848` | `--color-ink-3` |
| Muted | `#757575` | `--color-mute` |
| Muted light | `#949494` | `--color-mute-2` |
| Border | `#e8e8e8` | `--color-line` |
| Surface | `#f6f6f6` | `--color-surface` |

Typeface: **Lato** at 400, 700, 900. Loaded through `next/font/google`.

Container: fixed widths of 750, 970, and 1170 px at the 768, 992, and 1200 px breakpoints, matching the Bootstrap-era grid the real site still uses. Implemented as `.mami-container`.

### Card anatomy, measured

From `KostRoomCard.css` and `RoomCardInfo.css`:

- Card height 345 px, photo 160 px tall, radius 8 px, hairline via `box-shadow: 0 0 0 1px #e8e8e8` rather than a border.
- Facilities line: 12 px / 18 px, muted, single line with ellipsis, dot separator, with highlighted fragments in `#404040` bold.
- Rating star in brand green, the number itself in `#404040`.
- Horizontal variant: 200 px tall, 300 px photo on desktop, 108 by 162 px on mobile.
- Badges sit on the photo: a top-left urgency label, a bottom-left featured label, and small circular icons for promo and premium.

### Hero, measured

From `HomeTopSection.css`: title 32 px / 42 px at weight 900 in `#484848`, subtitle 20 px / 30 px, search field 400 by 48 px, section padding 60 px vertical, illustration anchored right.

## 3. Assumptions

Recorded here so they read as decisions rather than invention.

- **Listing data is fictional.** 24 listings across 8 Indonesian cities, with plausible names, areas, campuses, prices, and facility vocabulary taken from how the real product labels things ("K. Mandi Dalam", "Termasuk listrik", "Kos Andalan").
- **Photography is stock interior photography** from the Unsplash CDN, downloaded into `public/img/` so the demo has no runtime dependency on a third party. Each was visually checked; they are rooms and interiors, not filler.
- **The logo is the supplied `public/img/logo-img/mamikos-logo.svg`**, added 28 July. Intrinsic size 136 by 32, 32 vector paths, no embedded raster. It is used as-is rather than redrawn. Being a trademark, it stays confined to the header and footer and is not used decoratively anywhere else.
- **Copy is Indonesian**, matching the real product.
- Where the real site shows a feature that needs a backend (chat with owner, virtual tour, booking), the clone shows the entry point and stops there.

## 4. Routes

| Route | Rendering | Reason |
| --- | --- | --- |
| `/` | Static | Identical for every visitor. No request-dependent data. |
| `/cari` | Dynamic | Reads `searchParams` for keyword, city, type, price, facilities, and sort. Dynamic here is correct, not accidental. |
| `/room/[slug]` | Static with `generateStaticParams` | All 24 slugs are known at build time. |
| `not-found` | Static | Unknown slug or unknown route. |
| `error` | Client boundary | Route-level recovery. |

## 5. Home page sections

In the order the real product uses.

1. **Header.** Wordmark, primary nav (Cari Kos, Cari Apartemen, Sewa Kilat, Promo), owner entry point, notification and favourite icons, Masuk and Daftar. Sticky. Collapses to a hamburger under `lg`.
2. **Hero.** Heading, subheading, the main search field, and a row of quick category chips. The search field is the only client component in this section and it pushes to `/cari?keyword=`.
3. **Booking shortcuts.** Four tiles: Cari Kos, Sewa Kilat, Cari Apartemen, Kos Andalan. Each links into `/cari` with the matching filter pre-applied.
4. **Promo Ngebut.** Flash sale rail in `--color-flash`, with a countdown and horizontal cards. Countdown is client-side and must not cause a hydration mismatch.
5. **Rekomendasi kos untukmu.** Primary grid, four columns on desktop.
6. **Kos dekat kampus.** Campus chips filter the rail. Chips are links, not buttons, so each state is addressable.
7. **Area populer.** Six city tiles with photography and listing counts.
8. **Special banner.** Full-width brand band promoting the app.
9. **Kos Andalan.** Rail filtered to the `andalan` badge.
10. **Owner CTA.** "Punya kos? Iklankan gratis" with an illustration panel.
11. **Info dan tips.** Four article cards.
12. **Footer.** Four link columns, app store badges, social icons, payment logos.

## 6. Component inventory

Route-group first, per section 4 of the rules. Each group under `src/components/` exposes one `index.ts`, and the matching route file in `src/app/` imports nothing else.

```
src/app/
├── layout.tsx                    server, header and footer live here
├── not-found.tsx
├── error.tsx
└── (landing)/page.tsx            five lines: renders <LandingPage />

src/components/layout/
├── SiteHeader.tsx                client, mobile menu state only
├── SiteFooter.tsx                server
└── MamikosLogo.tsx               server, inline svg wordmark

src/components/(landing)/
├── index.ts                      the only surface app/ may import
├── LandingPage.tsx               server, composes every section in order
├── sections/
│   ├── HeroSection.tsx           server shell
│   ├── HeroSearch.tsx            client, controlled input, submits to /cari
│   ├── BookingShortcuts.tsx      server
│   ├── FlashSaleSection.tsx      server shell, client countdown child
│   ├── RecommendationSection.tsx server
│   ├── CampusSection.tsx         server, chips are links
│   ├── PopularAreaSection.tsx    server
│   ├── PromoBanner.tsx           server
│   ├── AndalanSection.tsx        server
│   ├── OwnerCta.tsx              server
│   └── ArticleSection.tsx        server
├── ui/
│   ├── Badge.tsx                 server, variants from tokens
│   ├── KosCard.tsx               server, vertical and horizontal variants
│   ├── KosCardBadges.tsx         server, the on-photo badge stack
│   ├── SectionHeader.tsx         server, title plus "Lihat semua"
│   └── KosRail.tsx               client, scroll-snap row with arrow controls
├── data/                         seed, repository, filter constants
├── types/                        kos domain types
└── utils/                        currency formatting
```

`'use client'` appears on four leaves and on no page or layout.

The kos domain sits inside `(landing)` while landing is the only consumer. The moment `(search)` needs it, it moves to `components/(shared)/` rather than being imported across groups, which section 4 forbids.

One unproven assumption: `@/components/(landing)` contains parentheses in the module specifier. Path mapping and Turbopack are both expected to handle it, but it is verified with a real build in phase 3 before anything depends on it. Fallback is an unparenthesised folder name.

## 7. Data

Types in `(landing)/types/kos.ts`. Seed in `data/kosSeed.ts`, typed with `satisfies Kos[]` so literal unions stay narrow. Queries in `data/kosRepository.ts`, exposing one `searchKos(query)` surface used by both the home rails and the search page, plus `findKosBySlug` and `findRelatedKos`. Nothing in `data/` imports React.

`parseSearchParams` is the only runtime validator in the project, because the URL is the only untrusted input. It narrows raw strings to `KosType`, `KosSortKey`, a numeric price ceiling, and a facility list, discarding anything unrecognised rather than throwing.

## 8. States to handle

- `/cari` with a filter combination that matches nothing: an illustrated empty state, the active filters echoed back, and a reset action.
- `/room/[slug]` with an unknown slug: `not-found.tsx`.
- Any route-level render failure: `error.tsx` with a retry.
- No loading skeletons on the home page, because nothing there is async. Adding them would be decoration.

## 9. Definition of done

Section 13 of the rules, applied per plan item.
