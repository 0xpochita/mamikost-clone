# Project Rules: Mamikos Clone (AI-Assisted Frontend Test)

These rules are mandatory for every contributor in this repository, human or AI agent.

They are deliberately scoped to `agents/prd/README.md`. The PRD asks for one thing: a frontend clone of the Mamikos website, minimum scope the home page, built with an AI-assisted workflow, in roughly 3 to 5 hours of active coding. It does not ask for a backend, an auth system, a payment flow, or a production on-call rotation.

So these rules keep the discipline that makes frontend work good (readability, tokens, accessibility, deliberate rendering, honest states) and drop the ceremony that only pays off in a long-lived product with a real API behind it. Section 14 lists what was cut and why, because a silent omission looks like an oversight while a stated one is a decision.

### Non-Negotiables

1. **AI usage is visible and directed.** Every non-trivial AI output is reviewed before it lands (section 1).
2. **No-comment policy.** Code is self-documenting (section 5).
3. **Design tokens, never hex literals in components** (section 6).
4. **No em-dash character anywhere** (section 3).
5. **Type-safe by default.** No `any`, no `as` assertions, no `@ts-ignore` (section 3).
6. **Definition of Done is runnable**: lint, type-check, and build all pass (section 13).

---

## 1. AI Workflow Rules

The PRD grades *how* the work was produced, not only the artifact. These rules exist so the process leaves evidence.

### The artefact chain

Work flows through `agents/` in order, and each step is committed:

```
agents/prd/     what we were asked to build (given)
agents/rules/   how we are allowed to build it (this file)
agents/spec/    what exactly gets built: pages, sections, components, data shape
agents/plan/    the ordered task list, with checkboxes
```

Do not start a build task that is not in `agents/plan/`. If something new comes up mid-build, add it to the plan first, then do it. A plan edited during the session is honest; an undocumented detour is not.

### Directing the agent

- **Give the agent ground truth, not vibes.** Prefer a real reference (the production CSS of the site being cloned, the framework docs shipped in `node_modules`) over the model's recollection. A remembered API is a guess.
- **Read the version-specific docs before writing framework code.** This repo pins Next.js 16, and `AGENTS.md` requires reading `node_modules/next/dist/docs/` first. Training data lags releases.
- **One task per prompt.** A prompt that asks for a page, a data layer, and a deploy at once produces three mediocre things.
- **Reject and redirect rather than patch.** If generated output is structurally wrong, regenerate with a better instruction. Patching bad structure compounds it.

### Verifying the agent

- **Nothing lands unread.** Generated code is reviewed the same way a colleague's PR would be.
- **Run the checks, do not trust the claim.** "It should work" is not evidence. `type-check`, `lint`, `build`, and the actual page in a browser are.
- **State assumptions out loud.** When the agent fills a gap the PRD left open (copy, pricing, a layout detail), that assumption is recorded in `agents/spec/` so it is a decision rather than a hallucination.
- **Mistakes stay in the history.** The PRD explicitly says weak output and recovery are interesting. Do not rewrite history to look clean.

---

## 2. Commit & Push Rules

Every commit follows [Conventional Commits](https://www.conventionalcommits.org/).

| Prefix      | Purpose                                                      |
| ----------- | ------------------------------------------------------------ |
| `feat:`     | A new user-facing feature                                    |
| `fix:`      | A bug fix                                                    |
| `docs:`     | Documentation changes                                        |
| `style:`    | Formatting only, no logic change                             |
| `refactor:` | Restructuring without behavior change                        |
| `perf:`     | Performance improvements                                     |
| `test:`     | Adding or fixing tests                                       |
| `build:`    | Build system, dependencies, or lockfile changes              |
| `chore:`    | Maintenance that fits nothing else                           |

Format:

```
<type>(<scope>): <subject>

<body>
```

- Subject in English, lowercase, imperative, no trailing period, max 72 characters.
- Body is optional and explains the **why**, never the **what**.
- Forbidden subjects: `update`, `fix bug`, `wip`, `asdf`.
- Commit at each completed plan item, not once at the end. The history is part of the submission.
- Branch naming: `feat/<name>`, `fix/<name>`, `chore/<name>`.
- Never force-push to `main`. Never use `--no-verify`.

### Secrets

- Never commit `.env`, `.env.local`, `*.pem`, `*.key`, credential JSON, API tokens, or connection strings. All must be in `.gitignore` before work starts.
- Stage files explicitly by name. Avoid `git add .` and `git add -A`, which sweep in untracked files by accident.
- Run `git diff --cached` before pushing and confirm no secret file is staged.
- If a secret is committed, treat it as compromised, rotate it immediately, then purge it from history.

---

## 3. Clean Code Rules

### Naming

- Descriptive and self-explanatory. No `usr`, `tmp`, `data2`.
- `camelCase` for variables and functions, `PascalCase` for components and types, `SCREAMING_SNAKE_CASE` for module-level constants.
- Booleans start with `is`, `has`, `should`, or `can`.
- Component files `PascalCase.tsx`. Everything else `camelCase.ts`.

### Functions

- One function, one responsibility.
- Max 30 lines. Beyond that, split it.
- Max 3 parameters. Beyond that, take an object.
- No nested ternaries, no nesting deeper than 3 levels. Use early returns.

### Readability

- **Never use the em-dash character.** Forbidden in code, strings, UI copy, comments, docs, and commit messages. Use a hyphen, a colon, parentheses, or rewrite the sentence. A single one fails review.
- No comments (section 5).
- No magic numbers or magic strings. Extract them into named constants.
- Import order: external packages, then `@/` aliases, then relative paths, then styles.
- Respect the Biome config. Formatting is not a matter of taste here.

### Maintainability

- DRY, but three occurrences is the refactor threshold, not two.
- KISS. The simplest thing that solves the problem wins.
- YAGNI. No code for hypothetical requirements. This is a 3 to 5 hour build.

### Type Safety

Fix the type. Never silence the checker.

1. **No escape hatches.** `as any`, `as unknown as`, `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error` are forbidden.
2. **Declare the shape.** Unclear data gets an explicit `type` or `interface`.
3. **Narrow at runtime** with `typeof`, `in`, discriminated unions, or a `value is T` predicate. Never assert a shape you have not verified.
4. **Prefer `satisfies` over `as`.** `as` suppresses missing-property checks; `satisfies` enforces them while keeping the narrow inferred type.
5. **Untrusted input is parsed, not assumed.** In this project the only untrusted input is the URL: `searchParams` and route `params`. They are `string | string[] | undefined` and must be narrowed to the domain type through a validator before use. Everything else is bundled seed data, typed at compile time with `satisfies`.

---

## 4. Project Structure

Route-group first. Every screen area owns exactly one folder under `src/components/`, named after the route group in `src/app/` that renders it, and exposes exactly one `index.ts`. Route files stay thin.

```
src/
├── app/
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── error.tsx
│   └── (landing)/
│       └── page.tsx         composes the barrel and nothing else
├── components/
│   ├── (landing)/
│   │   ├── index.ts         the only import surface for app/
│   │   ├── sections/        one file per page section
│   │   ├── ui/              pieces reused across sections of this group
│   │   ├── data/            seed data and query functions
│   │   ├── types/           types and interfaces
│   │   └── utils/           pure helpers
│   ├── (shared)/            used by two or more route groups
│   └── layout/              site header, footer, logo
└── config/                  routes, navigation, site metadata
```

Parentheses under `app/` are the Next.js route-group convention: the segment is excluded from the URL, so `app/(landing)/page.tsx` still serves `/`. Under `components/` they carry no framework meaning. The name is mirrored on purpose so the two trees line up and a reader can jump between them without guessing.

### Route files are thin

A `page.tsx` composes and declares metadata. It does not lay out, and it does not query. Roughly five lines of body:

```tsx
import { LandingPage } from "@/components/(landing)";

export default function Page() {
  return <LandingPage />;
}
```

If a route file grows conditionals or JSX beyond composition, that logic belongs in the route group's folder.

### The barrel is the boundary

- `app/` imports **only** from `@/components/<group>`, never from a file inside it. The barrel is the public API; everything else is private.
- One route group never reaches into another. Anything two groups need moves to `components/(shared)/` and is imported from there.
- No circular dependencies. A `sections/` file may import from `ui/`, `data/`, `types/`, and `utils/`. Nothing in those four ever imports from `sections/`.

### Inside a group

- `sections/` and `ui/` present. Anything past presentation moves down a layer.
- `data/` owns filtering, sorting, and lookup. It must not import React. It is plain TypeScript that a test can call directly.
- `utils/` holds pure functions with no side effects.
- Growth rule: a new page section is a new file in `sections/` and a new line in `index.ts`. It is never appended to an existing section file.

### File hygiene

- No unused files, no `*.old.tsx`, no commented-out code.
- No `console.log` or `debugger` in a commit.
- One responsibility per file. Over 300 lines, evaluate a split. A flat data table is the accepted exception: splitting it only to satisfy a line count makes it harder to read, not easier.

---

## 5. No Comment Rule

Code must explain itself through naming and structure.

**Allowed:**

- TSDoc on exported functions and components consumed by other modules.
- A comment explaining the **why** behind a non-obvious decision (a browser quirk, a value copied from an external source, a deliberate deviation).
- `TODO` with an owner: `// TODO(@owner): handle empty gallery`.

**Forbidden:**

- Comments explaining the **what**.
- Comments referencing a task, sprint, or PR.
- Commented-out code. That is what version control is for.
- Decorative banners such as `// ===== UTILS =====`.

---

## 6. Design Tokens

The visual identity is applied through tokens, never hardcoded values.

- The palette is defined **once**, in the `@theme` block of `src/app/globals.css`, and consumed everywhere through utility classes.
- **No hex literals in JSX or in component files.** A hex value outside `globals.css` is a review blocker.
- Tokens carry roles, not just colors: primary action, surface, border, primary text, secondary text, and the semantic accents (discount, promo, premium).
- Brand values are taken from the real product, not invented. Where they came from is recorded in `agents/spec/`.
- Body text contrast must meet WCAG AA at 4.5:1. Muted greys are for secondary text only, never for the smallest type on a colored background.
- Spacing follows a 4px scale. Border radius comes from a token.

---

## 7. UI/UX, Accessibility, Responsive

The PRD asks for "a clean, usable interface that reasonably reflects the intended clone". Fidelity to the reference wins over personal taste.

### Visual

- Clear hierarchy. The user knows where to look first.
- One font family. Max 5 font sizes per screen.
- One icon set (Lucide), consistent sizes.
- Soft shadows, max 3 elevation levels.
- Animation is subtle: 150ms to 250ms, `ease-out`, and it respects `prefers-reduced-motion` through the `motion-reduce` variant.

### Accessibility

- Semantic HTML. `<button>` for actions, `<a>` for navigation. Never a clickable `<div>`.
- Every input has a label, visible or `sr-only`.
- Focus states are visible. Do not remove the outline without replacing it.
- Everything reachable by keyboard.
- Meaningful `alt` on content images, `alt=""` on decorative ones.
- ARIA only where semantic HTML is not enough.

### Responsive

- Mobile-first. Build the small screen, then scale up.
- Tailwind default breakpoints.
- Touch targets at least 44 by 44 px.
- Verified at mobile, tablet, and desktop widths before a section is called done.

---

## 8. Rendering Strategy

Next.js App Router. Every route makes a deliberate choice, and the choice is recorded in `agents/spec/`.

| Strategy | Use when |
| --- | --- |
| **Static** | Content is identical for everyone. The default for this project. |
| **Dynamic** | The route genuinely depends on the request, for example reading `searchParams`. |
| **Streaming** | A slow region should not block the shell. |

- **Server Components are the default.** `'use client'` is an opt-in for a specific interactive leaf, never for a page or a layout.
- A page marked `'use client'` at the top ships its whole subtree to the browser. Forbidden without a written reason.
- Reading `searchParams` makes a route dynamic. That is correct on a search page and a performance bug anywhere else.
- Data is fetched on the server and passed down as props. The client does not re-fetch what it already has.

---

## 9. Data & State

- **Seed data lives in a feature service** and is typed with `satisfies`. There is no API in this project, and inventing one is out of scope.
- **All filtering, sorting, and formatting lives in the domain layer**, not in components. One query surface is shared by every screen that lists kos.
- **URL state for anything shareable.** Filters, sort, pagination, and the active tab belong in `searchParams`, not in React state. They must survive a refresh and be linkable.
- **Local state for UI only:** an open dropdown, a mobile menu, an active gallery image.
- **No global store.** Nothing in this project justifies one.
- Prop drilling past three levels means composition is wrong, not that a store is needed.

---

## 10. Performance & Assets

- **Images through `next/image`.** Explicit dimensions or `fill` with a sized parent, correct `sizes`, lazy by default, `priority` on the LCP image only.
- **Fonts through `next/font`.** Self-hosted, `display: swap`, only the weights actually used.
- **No layout shift from media.** Every image reserves its space.
- **Justify every dependency.** Before adding one, check whether the platform, the framework, or ten lines of code already solve it. Import the member, not the barrel.
- Debounce high-frequency handlers such as search input.
- Targets on the home page: LCP under 2.5s, CLS under 0.1, INP under 200ms.

---

## 11. Resilience

The question is not "does it render", it is "what does the user see when it does not".

- Every list surface handles **empty** explicitly, with a human message and a way out. A filter combination that matches nothing is the most likely empty state here.
- `not-found.tsx` for a slug that does not exist.
- `error.tsx` at the route level so one broken section cannot white-screen the app.
- Loading states use skeletons, not spinners, and only where something can actually be slow.
- Error copy is plain language and actionable. Never a raw stack trace.
- No silent `catch {}`.

---

## 12. SEO & Metadata

- `metadata` or `generateMetadata` on every route: title, description, Open Graph, canonical. Dynamic routes derive it from their data.
- One `<h1>` per page, meaningful heading order.
- `sitemap.ts` and `robots.ts` maintained.
- `lang="id"` on `<html>`, since the content is Indonesian.

---

## 13. Definition of Done

Before a section is called finished:

- [ ] `pnpm lint` passes with no errors and no warnings.
- [ ] `pnpm type-check` passes.
- [ ] `pnpm build` succeeds.
- [ ] No `console.log`, no `debugger`, no unowned `TODO`.
- [ ] No em-dash anywhere in the diff.
- [ ] No hex literal outside `globals.css`.
- [ ] No comments outside the section 5 exceptions.
- [ ] Checked at mobile, tablet, and desktop widths in a real browser.
- [ ] Keyboard reachable, focus visible, images have `alt`.
- [ ] Empty and error states handled where the surface can hit them.
- [ ] Rendering strategy is deliberate and recorded.
- [ ] The matching item in `agents/plan/` is ticked, and the work is committed.

---

## 14. Explicitly Out of Scope

Cut deliberately, because the PRD does not ask for them and a 3 to 5 hour budget does not fund them. Each would be the right call in a production product.

| Cut | Why it does not apply here |
| --- | --- |
| Error tracking (Sentry) and RUM | Needs an account, a DSN, and a real user base. Nothing to observe in a static demo. |
| TanStack Query or SWR | These manage *server* state. This project has no server and no client-side fetching. Adding one would be cache machinery around an in-memory array. |
| Full test pyramid, Playwright E2E, MSW | There is no network to mock and no money path to protect. Non-trivial pure logic (the filter and sort layer) still gets a test; UI snapshot suites do not. |
| Zod at every boundary | Kept only where an untrusted boundary actually exists: URL `searchParams`. Bundled seed data is validated by the compiler through `satisfies`, and wrapping it in a runtime schema would be theatre. |
| CSP, security headers, auth token storage | No authentication, no user input persisted, no third-party embeds. Revisit the moment a login form appears. |
| ISR, revalidation, cache tags, the four cache layers | Every route is static or trivially dynamic off `searchParams`. There is no origin to protect and no data that goes stale. |
| Bundle budget as a hard CI failure | CI exists, but a numeric per-route budget needs a baseline this project has not accumulated. The rule survives as review judgment in section 10. |
| List virtualization | The dataset is 24 listings. Virtualizing it would add a dependency and remove nothing. |

If the project outgrows the PRD, promote items off this table one at a time, with a commit that says why.

### Promoted back into scope

| Promoted | When | Why the original cut was wrong |
| --- | --- | --- |
| Husky, commitlint, GitHub Actions | 28 July 2026 | The cut assumed that automating enforcement costs more setup time than it saves over one session. That reasoning fails against the rules in this very file, which are unusually mechanical: no em-dash, no hex outside `globals.css`, Conventional Commits, formatter output. Mechanical rules should be held by a machine, not by a tired human at hour four of a timed build. Implemented in phase 2 of `agents/plan/plan.md`. |

---

## 15. Enforcement

Three layers, deliberately overlapping:

1. **Editor and local commands.** Biome for format and lint, TypeScript in strict mode.
2. **Git hooks (Husky).** `pre-commit` runs Biome on staged files plus the em-dash and hex-literal scans. `commit-msg` runs commitlint. `pre-push` runs type-check and build.
3. **GitHub Actions.** Format, lint, type-check, and build on every push to `main` and every pull request.

Layer 2 is bypassable with `--no-verify`, which section 2 forbids but cannot physically prevent. Layer 3 is the copy that cannot be skipped, which is why it repeats the same checks rather than trusting the hooks.

Rules exist to help. If one blocks progress without delivering value, change it in this file and say why in the commit, rather than quietly ignoring it.
