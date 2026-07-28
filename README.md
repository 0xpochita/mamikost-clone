# Mamikos Clone

A frontend clone of [mamikos.com](https://mamikos.com), Indonesia's largest boarding house (kos) marketplace. Built for the Frontend Engineer technical test in `agents/prd/README.md`.

**Live demo:** https://mamikost-clone-bima-jadiva.vercel.app

**Author:** Oktavianus Bima Jadiva
**Programme:** Maganghub participant at PT Git Gow Ayo (Mamikos)

**Total time: 3 hours 45 minutes** of active development, from 20:12 to 23:57 WIB on 28 July 2026. The PRD budget was 3 to 5 hours.

---

## Submission checklist

| PRD deliverable | Status |
| --- | --- |
| Source code repository | This repository. 40 commits, Conventional Commits throughout, CI green. |
| Working demo link | [mamikost-clone-bima-jadiva.vercel.app](https://mamikost-clone-bima-jadiva.vercel.app), deployed on Vercel. |
| Full screen recording | Recorded separately, covering the entire session end to end. |
| Short readme | This file. |

---

## What was built

| Route | Rendering | Notes |
| --- | --- | --- |
| `/` | Static | The graded minimum. Nine sections, desktop and mobile. |
| `/room/[slug]` | SSG, 24 pages | Optional scope. Every listing card on the home page resolves to a real detail page. |

Home page: header with a scroll-collapsing search bar, hero, looping promo banner rail, three service cards, three kos rails (Promo Ngebut with a live countdown, Rekomendasi, Kos Promo), popular city grid, campus grid, SEO band with a native disclosure, footer.

Detail page: breadcrumb, gallery, listing header, owner summary, room specification, room and bathroom facilities, room rules with deposit, owner story, public and parking facilities, house rules, location, rental terms, reviews with a six category breakdown and owner replies, owner card, related listings rail, and a sticky booking panel.

There is no backend. All 24 listings are typed seed data, and the map on the detail page is a labelled placeholder rather than a real embed, since that needs an API key.

## Stack

Next.js 16.2 (App Router), React 19.2, TypeScript strict, Tailwind CSS v4, Biome, React Compiler.

Runtime dependencies total five: `next`, `react`, `react-dom`, `lucide-react`, `react-icons`. No state management library, no data fetching library, no UI kit, no carousel library. Each was considered and rejected in writing.

---

## Approach: a written contract before any code

The most important decision was made in the first hour, before a single component existed. Instead of prompting an AI to "build a Mamikos clone", the work was routed through four artefacts that live in the repository and were committed as they were written:

```
agents/prd/     the brief we were given
agents/rules/   how we are allowed to build it
agents/spec/    what exactly gets built, and every assumption behind it
agents/plan/    the ordered task list, with checkboxes and commit messages
```

**`agents/rules/`** started as a generic production ruleset and was scoped down to this PRD. Section 14, "Explicitly Out of Scope", lists nine practices cut on purpose with a reason for each. A silent omission reads as an oversight; a stated one is a decision.

**`agents/spec/`** records every assumption the PRD left open, so invented details read as decisions rather than hallucinations. Section 9 holds the reasoning that the no-comment rule pushed out of the code.

**`agents/plan/`** grew to roughly 500 lines across nine phases. Every phase carries its own commit message. Mistakes are recorded where they happened rather than tidied afterwards, because the PRD explicitly asks to see recovery.

The rules bound the agent for the rest of the session, and they bit repeatedly. Comments were stripped from nineteen files because section 5 forbids them. A research note about a colour derivation had to move into the spec rather than be deleted.

---

## AI usage

### The model

**Claude Opus 5**, driven through Claude Code, was the single coding agent for the entire session. No other model wrote application code.

### Token efficiency layer

Three helpers kept the context window usable across a session of this length:

- **rtk** proxies common shell commands and strips noise from their output, cutting token cost on routine git and build operations.
- **caveman** compresses conversational output while leaving all technical substance, code, and error text untouched.
- **ponytail** enforces a "laziest solution that works" discipline: check whether the platform, the framework, or ten lines already solve a problem before adding anything. It is why the promo rail is native CSS scroll snap rather than a carousel package, and why the SEO disclosure is a native `<details>` element with zero JavaScript.

### ChatGPT

Used only to source the real Mamikos brand assets: logo, partner marks, store badges, promo banners, city and campus imagery, badge icons. Those files land in `public/img/` and are consumed as supplied. ChatGPT wrote no code.

### How the agent was directed

Four patterns did most of the work:

1. **Ground truth over recollection.** A remembered API is a guess. The agent was pointed at the production CSS of the site being cloned and at the Next.js docs shipped inside `node_modules`, never at its own memory of either.
2. **One task per prompt.** A prompt asking for a page, a data layer, and a deploy at once produces three mediocre things.
3. **Plan first, then build.** Several prompts were explicitly "write the plan, do not code yet". Sections were specified in `agents/plan/` before implementation, which made the implementation prompts short and unambiguous.
4. **Reject and redirect rather than patch.** When output was structurally wrong, it was regenerated from a better instruction. Patching bad structure compounds it.

### How AI output was validated

Nothing landed on a claim that it worked. Every change ran `biome check`, `tsc --noEmit`, and a full `next build` before being committed.

Beyond that, three verification habits caught things the toolchain could not:

- **Icon names were checked against `.d.ts` before use.** This began after `lucide-react` v1 turned out to ship no brand icons at all, which broke the build. Every icon name since was grepped from the type definitions first.
- **Visual assets were rendered and inspected, not assumed.** Twenty eight candidate photographs were built into a labelled contact sheet and looked at before any were used. Hand built social SVGs were rendered to PNG and inspected before shipping, which caught that the first render was wrong.
- **Reference screenshots were measured pixel by pixel** rather than eyeballed, using ImageMagick to sample colours and bounding boxes.

### Errors and how they were recovered

The PRD asks to see real workflow including mistakes, so these are listed rather than hidden.

| What went wrong | How it was caught | Fix |
| --- | --- | --- |
| `lucide-react` v1 ships no brand icons; the build failed | `next build` | Hand built inline SVGs, later replaced with `react-icons` when the reference showed solid brand marks |
| The top bar was 53px against a real 40px | Pixel measurement | The production CSS had said 40px all along. The misreading was mine, not the data's |
| A ribbon colour sampled as `#50A85F` | Cross-checking a known green in both screenshots | The crop was a 0.34x downscale blending a 3px bar into white. Real value is the brand green |
| Feature list text sampled as a purple tinted dark | Blue channel elevated identically in all three samples | Subpixel antialiasing artefact, not a colour. Used the neutral ink token |
| A `public/` folder rename silently broke image paths, three times | Manual check, then a purpose built hook | Added a pre-commit guard that reads its folder map from `src/config/assets.ts` |
| The hero illustration overlapped the next section | Screenshot from the reviewer | A negative offset had pushed it outside its section. Fixed with `bottom-0` plus `overflow-hidden` as a permanent fence |
| My own hex guard blocked documented values in comments | The guard fired on a legitimate commit | Fixed the guard, not the documentation. A guard that forces accurate docs to be deleted is worse than no guard |
| Two screenshots said to differ measured pixel identical | Measurement | Reported that instead of inventing a change |

### Time management

| Phase | Approximate spend |
| --- | --- |
| Research, design token extraction, asset sourcing | 45 min |
| Rules, spec, plan | 35 min |
| Husky, commitlint, GitHub Actions | 25 min |
| Home page, all nine sections | 75 min |
| Detail page, 24 SSG routes | 30 min |
| Pixel-accuracy passes against reference screenshots | 25 min |
| This readme | 10 min |

When the budget ran out, the plan's own "Cut if time runs short" list was followed rather than shipping something half finished.

---

## Automated enforcement

The rules in this repository are unusually mechanical, so they are held by a machine rather than by a tiring human at hour four:

| Layer | Checks |
| --- | --- |
| `pre-commit` | Biome on staged files, em-dash scan, hex-literal scan outside `globals.css`, public asset path existence |
| `commit-msg` | Conventional Commits via commitlint, em-dash scan |
| `pre-push` | `tsc --noEmit` and a full production build |
| GitHub Actions | Format, lint, type-check, and build on every push and pull request |

Local hooks and CI deliberately overlap. Hooks are bypassable with `--no-verify`; CI is the copy that cannot be skipped.

These gates blocked their own author several times, which is the point.

---

## Key decisions

### Design tokens were measured, not guessed

mamikos.com is a Vue single page app whose served HTML is an empty shell, so nothing useful can be read from it directly. The design was recovered instead from their **hashed production CSS bundles** under `static-asset.mamikos.com/build/css/`.

That yielded the exact palette (`#1baa56` brand green, `#ec4a0c` flash, `#da3438` discount, `#583f99` long-term, `#ecb14f` premium, the full text ramp), the typeface (Lato), the Bootstrap-era container widths of 750 / 970 / 1170, and the card anatomy: 345px tall, 160px photo, 8px radius, hairline drawn with `box-shadow: 0 0 0 1px` rather than a border.

The bundle **filenames** also revealed the real section order of the home page, so the layout follows the product rather than a guess.

Every token lives once in the `@theme` block of `src/app/globals.css`. A hex literal outside that file fails the pre-commit hook.

### Rendering is deliberate

Server Components are the default. `'use client'` appears on six interactive leaves and on no page or layout. The home page stays fully static: the city filter on the kos rails uses local state rather than `searchParams`, because reading search params would opt the entire page out of static rendering for what is only a browsing convenience.

### Detail pages are derived, not duplicated

`buildKosDetail(kos)` generates a full detail record from any listing, so all 24 cards resolve without hand authoring 24 records. It is seeded deterministically from the slug: `Math.random()` would differ between the server render and hydration, and between builds, which would break SSG.

### Performance

Source images arrived at 21 MB. Downscaling to roughly twice their render size and re-encoding brought that to 5.2 MB, a 75% reduction, before any of it entered git history. `img-kota` alone went from 14 MB to 532 KB.

Next.js 16 deprecated the `priority` prop in favour of `preload`, and its own docs recommend `loading="eager"` or `fetchPriority` over `preload` in most cases. Found by reading the version specific docs shipped in `node_modules`, exactly as `AGENTS.md` instructs.

### Accessibility

Semantic HTML throughout, every input labelled, keyboard reachable controls, visible focus rings, `alt=""` reserved for genuinely decorative images. Two cases needed real thought: white labels on uncontrolled city photography carry a scrim so contrast clears AA against actual pixels, and the looping banner rail marks its duplicate copies `aria-hidden` with `tabIndex={-1}`, otherwise a screen reader would announce thirteen promos three times and Tab would walk thirty nine links.

---

## Tradeoffs

| Decision | What was gained | What was given up |
| --- | --- | --- |
| Spend the first hour on rules, spec, and plan | Short unambiguous build prompts, and a written record of every assumption | Roughly an hour that could have gone into a third route |
| No state management library | Zero dependency weight, no cache machinery around an in-memory array | Would need revisiting the moment genuinely shared client state appears |
| Native scroll snap over a carousel package | No dependency, works without JavaScript, respects `prefers-reduced-motion` | The reference scales its neighbouring slides slightly; ours does not |
| Local state for the city filter, not the URL | The home page stays fully static | The filter is not shareable or bookmarkable |
| Detail data derived from a builder | One function covers 24 pages, no duplication | Detail copy is patterned rather than individually authored |
| Guards in `pre-commit` for em-dash, hex, and asset paths | Three classes of bug became impossible to commit | Roughly 25 minutes of setup, and two false positives that needed the guard fixed |
| Fidelity by measurement over fidelity by eye | Caught four errors that looked correct on screen | Measurement passes cost about 25 minutes total |
| Build `/room/[slug]` before `/cari` | The optional scope shows dynamic routes, SSG, and metadata generation | Links to `/cari` are dead |

---

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm lint         # Biome
pnpm type-check   # tsc --noEmit
pnpm build        # production build
```

## Repository map

```
agents/            prd, rules, spec, plan
public/img/        supplied brand assets and photography
src/app/           routes only, thin composition
  (landing)/       /
  (room)/          /room/[slug]
src/components/
  (landing)/       home page sections, ui, data
  (room)/          detail page sections, ui
  (shared)/        kos domain shared by both route groups
  layout/          header, footer, logo
src/config/        navigation, asset paths
```

Not affiliated with Mamikos. Built as an interface clone for a technical assessment.
