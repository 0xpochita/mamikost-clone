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

### Correction logged 28 July, 21:10

A first pass at the header was built from the component names in the production CSS bundles. Reference screenshots supplied afterwards show that guess was wrong in almost every visible detail. The bundle names told us which components exist, not what they say. Reading the CSS gave real measurements; it did not give real copy, and the difference was filled in with invention.

The correction below is driven by the screenshots, which outrank both the bundle names and any memory of the product.

| What the first pass assumed | What the screenshot shows |
| --- | --- |
| Nav: Cari Kos, Cari Apartemen, Sewa Kilat, Kos Andalan | Nav: `Cari Apa?` with a dropdown caret, `Pusat Bantuan`, `Syarat dan Ketentuan` |
| Nav sits left, next to the logo | Nav sits right, hard against the auth button |
| `Masuk` outline plus a filled green `Daftar` | `Masuk` only, green outline pill, no `Daftar` |
| Heart and bell icon buttons in the bar | Neither is present |
| Top bar: one sentence left, three plain links right | Top bar: `Download App` and `Sewa Kos` left, each with a leading icon; `Promosikan Iklan Anda` right, also with an icon |
| Hero heading "Cari kos jadi lebih mudah" | "Mau cari kos?" |
| Hero subheading invented | "Dapatkan infonya dan langsung sewa di Mamikos." |
| Search field is a full pill with the button inside the pill | Search field is a rounded rectangle, roughly 8px radius, with a separately rounded green `Cari` button seated inside on the right |
| Hero sits on a green tinted gradient | Hero sits on plain white |

### 4.1 Blocking issue found and resolved

- [x] `lucide-react@1.27` ships **no brand icons at all**. `Youtube`, `Instagram`, `Facebook`, and `Linkedin` were removed from lucide v1 for trademark reasons, and the build fails on the first one it reaches. Every other icon in use was then verified against `lucide-react.d.ts` rather than assumed: `Search`, `Bell`, `Heart`, `Menu`, `X`, `Link`, `TriangleAlert`, `RotateCcw`, `Star`, `MapPin`, `ChevronLeft`, `ChevronRight`, `Share2`, `Globe`, `Send`, `MessageCircle` all exist. `AlertTriangle` does not; it is `TriangleAlert` in this version.
- [ ] Decide the footer social treatment given the constraint. Preferred option: drop the brand row entirely, since the screenshots being cloned do not show it and inventing brand marks is both risky and off-reference. Fallback if it is wanted: hand-drawn inline SVG built from primitives, never a guessed path string.

### 4.2 Header, rebuilt to the screenshot

- [x] `MamikosLogo` rendering `public/img/logo-img/mamikos-logo.svg`. Intrinsic 136 by 32, pure vector, 32 paths, no raster payload. Served through `next/image` with `unoptimized`, because vector art needs no raster pipeline and this avoids opting the whole app into SVG handling in the optimizer.
- [ ] Rewrite `TOP_BAR_LINKS`: `Download App` and `Sewa Kos` on the left, each with a leading icon; `Promosikan Iklan Anda` on the right with its own icon. Band sits on a light surface, divided from the main bar by a hairline.
- [ ] Rewrite `MAIN_NAV_LINKS` to `Cari Apa?`, `Pusat Bantuan`, `Syarat dan Ketentuan`, and move the group to the right of the bar.
- [ ] `Cari Apa?` carries a caret and opens a dropdown. It is the only interactive leaf in the header besides the mobile toggle. Keyboard reachable, closes on `Escape` and on outside click.
- [ ] Replace the auth cluster with a single green outline `Masuk` pill. Remove `Daftar`, the heart, and the bell.
- [ ] Keep the measured geometry already recovered from `GlobalNavbar.css`, which the screenshot agrees with: top bar 40px, main bar 64px at desktop and 56px below 992px, logo 30px tall dropping to 20px, hover underline 3px with a `2px 2px 0 0` radius.
- [ ] Re-verify the mobile menu after the nav set changes.

### 4.3 Footer, rebuilt to the screenshot

The first pass invented a four column footer with a payment row. The reference shows something different enough that this is a rewrite, not an edit. Assets verified on disk: `icon-playstore.svg` at 135 by 40, `icon-appstore.svg` at 120 by 40, `icon-iso-certificate-v2.svg` at 300 by 292.

- [ ] Column 1, wider than the rest: the Mamikos mark, then the copy `Dapatkan "info kost murah" hanya di MamiKos App. Mau "Sewa Kost Murah"?` including its straight quotes, then the two store badges side by side. Badges are vector, so `next/image` with `unoptimized`, same reasoning as the header mark. Each badge is a link with a real `alt` naming its store, because they are content and not decoration
- [ ] Column 2 titled `MAMIKOS`, uppercase, bold, small, slightly tracked. Its links split into **two** sub columns: `Tentang Kami`, `Job Mamikos`, `Promosikan Kost Anda`, `Pusat Bantuan` on the left; `Blog Mamikos`, `Singgahsini` on the right. It is one nav with a two column list, not two navs
- [ ] Column 3 titled `KEBIJAKAN`: `Kebijakan Privasi`, `Syarat dan Ketentuan Umum`
- [ ] Column 4 titled `HUBUNGI KAMI`: mail glyph with `cs@mamikos.com`, WhatsApp glyph with `+6281325111171`, then the social row
- [ ] Bottom bar below a hairline: the SGS certificate mark on the left, `© 2026 Mamikos.com. All rights reserved` on the right
- [ ] Drop the invented payment row entirely. Keep the not-affiliated disclaimer, since this is a clone and saying so is honest

#### Social icons, closing the 4.1 question

4.1 left the social treatment open and preferred dropping it. The reference settles it: Facebook, X, and Instagram are present, so they are needed.

- [ ] `lucide-react@1.27` has no brand icons and `logo-brands/` contains none either, so they must be hand built as inline SVG. Construct them from primitives wherever the mark allows it. X is two crossing strokes, Instagram is a rounded square with a circle and a dot. Facebook is a letterform and needs a real path
- [ ] Never paste a guessed path string. A wrong path renders as visible garbage, and unlike a wrong import it fails silently rather than at build time

#### Contact details

- [ ] Render the email and phone number as displayed text rather than live `mailto:` and `wa.me` links. They are reproduced for visual fidelity, but a clone that routes real support traffic to the company being cloned is a harm the exercise does not need. The pixels match; the links do not fire. Recorded so it reads as a decision rather than an oversight

#### Copy fidelity, continued

- [ ] The footer copy writes `kost` with a `t` while the rest of the product writes `kos`. Reproduce both spellings exactly where each appears, for the same reason given in 6.3

### 4.4 Shell wiring

- [x] `SiteHeader` and `SiteFooter` mounted in the root layout, since they are site-wide rather than landing-only
- [x] `not-found.tsx` and `error.tsx`
- [x] Central route and nav config in `src/config`
- [ ] Sync `agents/spec/spec.md` section 5 to the corrected header and hero copy, so the spec stops describing the invented version

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

### 6.1 Hero, rebuilt to the screenshot

Asset: `public/img/img-hero/hero-img.png`, supplied 28 July. Measured 1761 by 893, 736 KB, aspect ratio close to 1.97 to 1. It is a pale line-art city skyline.

- [ ] Two-column layout above `lg`, single column below. Text left, illustration right.
- [ ] Background is plain white. Remove the green tinted gradient the first pass invented.
- [ ] Heading exactly `Mau cari kos?`. Weight 900, colour `ink-3`, on the measured 32px/42px hero scale already tokenised as `text-hero`.
- [ ] Subheading exactly `Dapatkan infonya dan langsung sewa di Mamikos.` on the 20px/30px `text-lead` scale.
- [ ] Search field: rounded rectangle rather than a pill, hairline border, leading magnifier icon in `mute-2`, placeholder exactly `Masukan nama lokasi/area/alamat`. Note the reference spells it `Masukan`, not `Masukkan`; copy the reference rather than correcting it, and say so in the spec so it does not read as a typo.
- [ ] Green `Cari` button seated inside the field on the right, with its own smaller radius.
- [ ] Keep the native `<form action="/cari" method="get">`. It stays a Server Component, works without JavaScript, and puts the query in a shareable URL, which section 9 of the rules asks for.
- [ ] Illustration handling:
  - `alt=""` and `aria-hidden`, because it is decorative and carries no information a screen reader needs
  - Not marked `priority`. The LCP element here is the heading, not the artwork, and preloading three quarters of a megabyte to sit behind text is the wrong trade
  - Explicit `sizes` so no oversized candidate is fetched on mobile. Below `lg` the illustration is hidden outright rather than downloaded and squashed
  - Rely on `next/image` to re-encode to AVIF or WebP. A 736 KB PNG of flat line art is the wrong format at source, and this is exactly what the optimizer exists to fix. Record the delivered size afterwards to confirm the saving is real rather than assumed

### 6.2 Promo banner rail

Assets: `public/img/img-banner/banner-1` through `banner-13`, supplied 28 July. Every one is exactly 817 by 346, aspect ratio 2.36 to 1, which makes a single fixed aspect box correct for all of them. Formats are mixed: seven `.webp`, four `.png`, two `.jpg`.

- [ ] Model the data as a typed banner list in `(landing)/data/`, with a `src`, an `alt`, and a `href` per entry. Filenames alone are not a data model, and an `alt` per banner is required by section 7 of the rules.
- [ ] Since the file extensions differ per banner, the list stores the full path. Never reconstruct a path by string-concatenating an index with an assumed extension.
- [ ] Centre-anchored horizontal rail. The active banner is fully visible, its neighbours are clipped at both edges, matching the reference.
- [ ] Native CSS scroll-snap with `scroll-snap-align: center`. No carousel dependency, per section 10 of the rules.
- [ ] Fixed aspect box at 817 by 346 so nothing shifts while images decode. Section 10 forbids layout shift from media.
- [ ] Control row underneath: a left chevron, the label `Lihat semua promo`, a right chevron. This is the only reason the rail needs to be a client component; the arrows scroll the container.
- [ ] Arrows are real `<button>` elements with accessible labels, never clickable divs. They are keyboard reachable and the rail itself stays scrollable by keyboard and by touch, so the arrows are an enhancement rather than the only route.
- [ ] `banner-10.png` is 566 KB, `banner-6.png` 266 KB, `banner-8.png` 240 KB. These are photographic content stored as PNG. Serve them through `next/image` and confirm the re-encoded payload afterwards.
- [ ] Only the first banner is eager. Everything else lazy loads, which is the `next/image` default.

### 6.3 Service highlight band

Three stacked cards that read as one band on the page. Assets verified on disk before planning: `public/img/img-hero/images-card.webp` at 800 by 800 and 55.6 KB, `public/img/logo-brands/logo-singgahsini.svg` at 94 by 32, `public/img/logo-brands/logo-apik.svg` at 90 by 48.

#### Regression found while verifying those assets

- [ ] `public/img/logo-img/` no longer exists. Its contents moved to `public/img/logo-brands/`, but `MamikosLogo.tsx` still points at `/img/logo-img/mamikos-logo.svg`, which is now a 404 in the browser. Repoint it to `/img/logo-brands/mamikos-logo.svg`. This is exactly the class of break a type checker cannot catch, because a public asset path is just a string. Note it in the spec as a known hazard of referring to `public/` by literal path.

#### The abstraction

Three cards share one shell and differ only in what sits on the right. Section 3 of the rules sets the refactor threshold at three occurrences, so this qualifies on the rule's own terms rather than on taste. Anything below three would stay duplicated.

`(landing)/ui/PromoCard.tsx` owns the shared chrome and nothing else:

```
type PromoCardAction = {
  label: string
  href: string
  variant: "outline" | "link"
}

type PromoCardProps = {
  title: string
  description: string
  action?: PromoCardAction
  media?: ReactNode
  className?: string
}
```

- The shell owns the card chrome, the heading and description stack, and both action variants. It is `relative` and `overflow-hidden` so a caller can bleed or absolutely position its own visual without fighting the shell.
- The shell does **not** own the visual. Each of the three needs different placement: one bleeds to the card edge, one is a background decoration behind the text, one is inline content. Pushing all three behaviours into a `variant` prop would put three unrelated layouts behind one flag, which section 3 of the rules calls out as over-abstraction. The caller passes a positioned node instead.
- `action` is optional because the third card has none. `variant` covers the outline button and the underlined text link, which is the entire observed set. No third variant is added speculatively.

One section file, `sections/ServiceHighlights.tsx`, renders all three. It is one visual band with one vertical rhythm, so it is one section, not three.

#### Card 1: owner CTA

- Title `Daftarkan Kos Anda di Mamikos`, description `Berbagai fitur dan layanan untuk meningkatkan bisnis kos Anda`
- Action: outline variant, label `Pelajari Lebih Lanjut`, green border and green label, small radius rather than a full pill
- Full container width. Text block left aligned with generous top padding, roughly 40px
- Photo occupies about the right 27 percent of the card at full card height, bleeding to the right edge, with a large convex radius on its left edge only
- Source is 800 by 800 square but the slot is roughly 1.87 to 1. Use `fill` with `object-cover` and a tuned `object-position` so the two faces survive the crop. Never stretch a square into a wide box
- `alt=""` and `aria-hidden`. The photo illustrates, the message is entirely in the text, so announcing it adds noise
- Decorative pale green curve sweeping from mid-card toward the photo, plus the small circle to the photo's left. Inline SVG stroke in `mami-light`, `aria-hidden`, no extra asset
- Below `md` the photo is hidden and the text takes the full card. `ponytail:` deliberate simplification, the richer treatment is a 16 by 9 strip above the text; add it if the responsive pass has time

#### Card 2: survey

- Title `Survei Kos Idaman Kamu Sekarang!`
- Description `Untungnya ada fitur Survei Kos di Mamikos. Cari, pilih, survei, hingga sewa kos idaman dijamin aman dan GRATIS.`
- Action: link variant, label `Baca selengkapnya`, underlined
- Narrower than its neighbours, roughly 70 percent of the container, left aligned. Implemented as a `className` max-width passed to the shell, which is exactly what that prop is for
- Dot matrix decoration in the bottom right, roughly 12 columns by 6 rows, denser toward the corner
- Build it as a CSS `radial-gradient` tile with a `mask-image` fade, not 72 elements and not an image file. No asset, no DOM cost, and the fade is one line
- `aria-hidden`, since it carries no meaning

#### Card 3: managed kos

- Title `Kos Dikelola Mamikos, Terjamin Nyaman`
- Description `Disurvey langsung oleh Mamikos. Lokasi terverifikasi, bangunan kos lolos seleksi.`
- No action
- Full container width, shorter than card 1 because there is no CTA row
- Right side holds the two partner marks, horizontally in a row, vertically centred, with generous spacing
- Both are vector, so both go through `next/image` with `unoptimized`, the same reasoning as the header mark
- Their intrinsic heights differ, 32 against 48. Do not render both at one CSS height or `apik` will look undersized. Match optical weight instead and check against the reference
- These are third-party brands, so each gets a real `alt` naming the brand. They are content, not decoration

#### Copy fidelity

The reference spells the third card `Disurvey` while the second says `Survei`. It also writes `Masukan` in the hero field. All three are copied exactly as they appear. Consistency is not ours to impose on someone else's product copy, and silently correcting it would make the clone less faithful, not more. Recorded here so it does not read as carelessness.

### 6.4 Kos rails

Three rails share one component and differ only in title, data query, and whether they carry a city selector. Assets verified: `public/img/img-kost/p01.jpg` through `p28.jpg`, each 800 by 534.

Icon names verified against `lucide-react.d.ts` before planning, after the brand-icon failure in 4.1: `Gift`, `Ticket`, `TicketPercent`, `ShieldCheck`, `Award`, `ChevronDown`, `BadgeCheck`, `Sparkles` all exist.

#### The same regression again, now worth a structural fix

- [ ] All 28 kos photos moved from `public/img/` into `public/img/img-kost/`. Every `coverPhoto` and `gallery` entry in `kosSeed.ts`, roughly 90 string literals, now points at a 404. Repoint them.
- [ ] This is the second time in one session a `public/` asset move silently broke a reference, after the logo in 6.3. Two occurrences is a pattern, so fix the class rather than the instance:
  - Introduce a single base-path constant per asset folder in `src/config`, so a future move is one edit instead of ninety.
  - Add an asset-existence guard to `.husky/pre-commit`: extract every `"/img/..."` literal from staged files and fail the commit if the file is not on disk. Roughly eight lines of shell, no new dependency, and it catches the entire class that the type checker structurally cannot. A public asset path is just a string, and `tsc` will never know it lies.
  - Mirror the same check in CI, since hooks are bypassable.

#### Section header

Reading left to right, exactly as the reference lays it out:

- Heading in bold dark on the section scale, built from two parts: fixed text such as `Kos yang lagi promo di`, followed by an inline city selector rendered in brand green, bold, with a green underline under the label and a dark caret to its right. The selector sits inside the heading line, not beside it.
- Right cluster, in order: a `Lihat semua` button on white with a hairline border and a small radius, then a thin vertical divider, then two circular arrow buttons on white with hairline borders.
- Arrows are real buttons with accessible labels and they scroll the rail. The rail stays scrollable by touch and keyboard without them.

#### Card anatomy

Measurements come from the production CSS already recovered in the spec, cross-checked against the screenshot.

- Photo box: 8px radius, hairline drawn with `box-shadow: 0 0 0 1px` in `line` rather than a border, so it does not eat into the box
- **Blurred backdrop.** The real product fills the box with a blurred copy of the photo and lays the sharp photo over it, centred, at `height: 105%` with `width: auto`. That is what produces the soft vertical bars visible on several cards in the reference. Source photos are 800 by 534, roughly 1.5 to 1, into a slot nearer 1.68 to 1, so the bars will appear naturally. Replicate it rather than cropping, because cropping is what the real design deliberately avoids
- Top left: the andalan marker as a small amber tile, radius `6px 0`, matching `.rc-photo__controlled-room-badge`
- Bottom left: promo glyph, 16 by 16, 8px radius, on a translucent black wash, matching `.rc-photo__icon--promo`
- Content stack below the photo, 8px gap:
  1. Chip row: bordered type chip reading `Putra`, `Putri`, or `Campur`, followed by `Sisa N kamar` in the discount red. Show the vacancy label only when stock is genuinely low, at three rooms or fewer, otherwise it stops meaning anything
  2. Kos name, regular weight in `ink`, one line with ellipsis. Note the reference deliberately renders the name at weight 400, not bold
  3. Area, **bold**, in `ink-2`. The location outweighs the name visually, which is the opposite of the usual instinct and is why it is called out here
  4. Facilities, 12px on 18px in `mute-2`, dot separated, one line with ellipsis
  5. Promo line: green gift glyph followed by the promo label in bold green
  6. Price: amount bold in `ink`, with `/bulan` in regular weight
- This rail variant shows **no rating and no struck price**. Rather than adding a display flag, the card renders the promo line when a promo label exists and the rating line when it does not, which is the same slot and matches the reference. One rule, no boolean prop

#### Data change

- [ ] Add an optional `promoLabel` to the `Kos` type. The reference shows owner-written promo copy such as `promo soft opening`, `PROMO 2026`, `promo,anak kos baru !!!`. Seed it with the same informal register, including the ragged punctuation, since real listings are written by owners and not by a copy desk. Polishing it would make the clone read as fake

#### The three rails

- [ ] `Promo Ngebut`, fed by the `flash` badge. No city selector
- [ ] `Rekomendasi kos di <city>`, with the city selector
- [ ] `Kos yang lagi promo di <city>`, defaulting to `Semua Kota`, with the city selector
- [ ] All three query through the single `searchKos` surface already in `(landing)/data/`. No rail gets its own bespoke filter

#### City selector and the static-rendering trade

The selector filters a list the server already passed as props, using local client state. It is deliberately **not** URL state, and section 11 of the rules deserves an explicit answer on that:

- Reading `searchParams` on `/` would opt the entire home page out of static rendering, which section 8 calls a performance bug when it is not needed. The spec commits `/` to static
- The selector is a browsing convenience on a marketing page, not a search. The shareable, bookmarkable filter is `/cari`, which does live in the URL
- To keep the state promotable, `Lihat semua` carries the selected city through to `/cari?city=...`, so one click turns a local preview into a real shareable URL
- The dropdown is the only client leaf in the section. It closes on `Escape` and on outside click, and every option is keyboard reachable

### 6.5 Area Kos Terpopuler

Photo tiles with the city name burned over the image. Assets verified: `public/img/img-kota/` holds six files, `kos-bandung`, `kos-jakarta`, `kos-malang`, `kos-medan`, `kos-surabaya`, `kos-yogyakarta`, all PNG at roughly 1450 by 1082.

#### Asset shortfall, decide before building

- [ ] The reference shows **seven** city tiles plus the call to action. The folder has **six**. `kos-semarang` does not exist, and Semarang is visible in the reference. Options in order of preference:
  1. Supply `kos-semarang.png` and build the reference layout exactly
  2. Ship six tiles plus the call to action. Four across, so the second row carries two tiles and the call to action, and the trailing cell is empty. Nothing looks broken because the tiles share no background
  3. Reuse another city's photograph under the Semarang label. **Rejected.** Labelling Tugu Jogja as Semarang is a lie in the artefact, and a reviewer who knows Indonesia will spot it instantly
- [ ] Default to option 2 so the build is never blocked, and switch to option 1 the moment the asset appears

#### Layout

- [ ] Section heading `Area Kos Terpopuler`, bold, aligned to the container start
- [ ] Four column grid, two rows, with the call to action as the final cell
- [ ] Tile: fixed aspect box near 4 to 3, 8px radius, photo `object-cover`
- [ ] City label centred both ways, white, bold, sitting directly on the photograph
- [ ] **Legibility is the risk here.** White text on an uncontrolled photograph fails contrast the moment the sky is bright, and several of these have pale skies behind the label. Lay a dark scrim over the photo, strongest behind the text, so the label clears WCAG AA against the actual pixels rather than against a hopeful average. Section 7 of the rules requires 4.5 to 1 for body text and this is the one place in the build where it is genuinely at risk
- [ ] Final cell: white card, hairline border, matching height, centred bold `Lihat semua` followed by a right arrow
- [ ] Every tile is a link to `/cari?city=...`, so the section feeds the real search rather than dead ending
- [ ] Photos are roughly 1450 wide but render near 280. Set `sizes` so no device pulls the full resolution, and let `next/image` re-encode. These are PNGs of photographic content, which is the wrong source format, exactly as in 6.2

> The reference screenshot shows no label on the first tile while the other six are labelled. Treated as a rendering artefact of the capture rather than a design intent. Every tile gets its label.

### 6.6 Kos Sekitar Kampus

Campus cards. Assets verified: `public/img/img-kampus/` holds exactly the seven in the reference, `ugm-jogja`, `undip-semarang`, `ui-depok`, `unpad-jatinangor`, `stan-jakarta`, `ub-malang`, `unair-surabaya`. Seven cards plus the call to action fills a four by two grid exactly, with no shortfall and no empty cell.

#### The constraint that shapes this section

These logos are wildly inconsistent: `ub-malang` is 240 by 243, `undip-semarang` is 1440 by 1440, `ui-depok` is 937 by 1024, `unpad-jatinangor` is 1171 by 1013 and is the only WebP. Three of the seven are **not square**.

- [ ] Render every mark into one fixed square box with `object-contain`, never `object-cover`. Cover would crop a university crest, which is both ugly and disrespectful of the mark
- [ ] The box is transparent with the logo centred, so differing aspect ratios letterbox harmlessly instead of stretching
- [ ] `ub-malang` at 240px is the smallest source. Keep the rendered box at or below 56px so even the smallest asset stays above 2x density

#### Layout

- [ ] Section heading `Kos Sekitar Kampus`
- [ ] Four column grid, two rows
- [ ] Card: white, hairline border, 8px radius, horizontal. Logo box on the left, text block on the right
- [ ] Text block: abbreviation bold on the first line, city in regular weight on the second. `UGM` over `Jogja`, `UNDIP` over `Semarang`, `UI` over `Depok`, `UNPAD` over `Jatinangor`, `STAN` over `Jakarta`, `UB` over `Malang`, `UNAIR` over `Surabaya`
- [ ] Final cell: same card chrome, centred bold `Lihat semua` with a right arrow, matching 6.5 so the two sections read as a pair
- [ ] Each card links to `/cari?campus=...`
- [ ] `alt` names the university, since a crest identifies an institution and is content rather than decoration

#### Shared abstraction across 6.5 and 6.6

Both sections are a titled four by two grid whose last cell is a `Lihat semua` link. That is two occurrences, and section 3 of the rules sets the threshold at three, so **no shared grid abstraction is extracted yet**. What is shared is the final cell, which is identical in both: extract only `ui/SeeAllTile.tsx`. Pulling out a generic `TileGrid` for two callers would be the speculative abstraction the rules explicitly forbid.

### 6.7 About band

The light grey band above the footer, present on the home page.

- [ ] Centred heading `Mamikos - Aplikasi Anak Kos No. 1 di Indonesia`
- [ ] One long body paragraph at a comfortable reading measure, roughly 15px on 1.75 line height, reproduced verbatim from the reference including the claims about two million rooms and 140 cities
- [ ] Below it, a centred disclosure labelled `Fitur yang dapat dimanfaatkan di Mamikos` with a caret
- [ ] Build the disclosure with native `<details>` and `<summary>`. It is keyboard accessible, screen reader friendly, and works with zero JavaScript, so it stays a Server Component. Section 10 of the rules asks for the platform feature before the dependency, and this is the clearest case of it in the build
- [ ] Rotate the caret with a CSS sibling selector on `[open]`, not with state

### 6.8 Remaining sections

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
