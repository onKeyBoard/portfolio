# Skills Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat Skills list with a categorized, searchable skills explorer (hover/tap a skill to see its description).

**Architecture:** Skill content lives in a typed data file. A pure `filterSkills` function handles search. `SectionSkills` renders a detail panel, search field, and five category cards of `SkillCard` tiles; it switches between hover mode and tap mode via a media-query hook.

**Tech Stack:** Next.js 13.4 (pages router), React 18, TypeScript 5.3, SCSS modules, Font Awesome. Tests: Node 24 built-in runner (`node --test`) with native TS type stripping — no new dependencies.

**Spec:** `docs/superpowers/specs/2026-11-10-skills-explorer-design.md`

## Global Constraints

- No new npm dependencies.
- Do not `git commit`. Shawn commits himself; leave changes in the working tree. (Overrides the default "commit" steps.)
- Work on branch `dev`.
- Styling must use existing tokens (`--ease-gentle`, `--duration-hover`, `--bg-elevated`, `--border-subtle`, `--radius-*`, `--accent-a/b`, etc.) and match the site, not hanzo.ai.
- Keep code comments to a minimum (Shawn's preference): only for things the code can't say.
- Headline copy, exact: `Tools and technologies I’ve worked with.` (curly apostrophe — lint rule `react/no-unescaped-entities`).
- Desktop fit targets: 1440×900 and 1280×800 with no inner scroll.
- Hover mode media query, exact: `(hover: hover) and (pointer: fine) and (min-width: 900px)`. Otherwise tap mode.
- Never use the browser `resize_window` tool. For other viewport sizes, inject an iframe of `http://localhost:3000/#skills` at the target size into a page.
- `npx tsc --noEmit -p .` (run from repo root, unfiltered) must exit 0 after every task.

## Review Focus

1. Search text with regex characters (`c++`, `next.js`, `(`) — must match literally, never throw. → test in Task 2.
2. Leading/trailing/only whitespace in search — treated as trimmed; whitespace-only = show all. → test in Task 2.
3. Previewed (hover) or open (tap) skill gets hidden by a search — panel returns to intro / open description closes, never shows a hidden skill. → browser check in Task 4.
4. Leaving the section mid-hover, then returning — panel shows intro, search keeps or clears consistently (clear it on exit). → browser check in Task 4.
5. Moving the pointer directly from one tile to another — panel never flashes back to the intro in between. → browser check in Task 4.

---

### Task 1: Skills data file

**Files:**
- Create: `src/v2/data/skills.ts`
- Test: `src/v2/data/skills.test.mjs`

**Interfaces:**
- Produces:
  ```ts
  import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
  export interface Skill { id: string; title: string; description: string; iconUrl?: string; faIcon?: IconDefinition }
  export interface SkillCategory { id: string; title: string; tag: string; skills: Skill[] }
  export const skillCategories: SkillCategory[]
  ```

- [ ] **Step 1: Write the failing test** `src/v2/data/skills.test.mjs` (imports `./skills.ts`):
  - `categories in order` — titles equal `['UX & Product Design','Front-End Engineering','Interaction & Motion','Data & Back-End','Tooling & Platforms']`, tags `['Design','Code','Craft','APIs','Ship']`.
  - `skill counts` — per category `[7, 8, 3, 5, 6]`, total 29.
  - `skill order` — titles per category exactly as the spec's Content table, in order.
  - `ids unique` — all category ids and skill ids unique.
  - `every skill has an icon` — `iconUrl` or `faIcon` set.
  - `descriptions` — every description non-empty, ≤ 240 chars.
- [ ] **Step 2: Run** `node --test src/v2/data/skills.test.mjs` → FAIL (module not found).
- [ ] **Step 3: Collect icon URLs.** Open `http://localhost:3000/#skills` in a new browser tab (take a screenshot to wake the tab before reading the DOM), and read each `img[src]` + adjacent title in `#skills`. Map the 21 existing tools to their URLs.
- [ ] **Step 4: Collect source text for descriptions.** In the same tab, read project titles/descriptions/slide text (open each project card's `/projects?id=…` page) and the Hello section bio.
- [ ] **Step 5: Implement `skills.ts`.** Ids are kebab-case titles (`user-research`, `nextjs`, …). The 8 new skills use solid Font Awesome icons (builder's pick). Descriptions: first person, 1–2 sentences, only claims supported by Step 4 sources; when unsure keep it general ("I use X to…"). The `import type` keeps the file runnable by Node.
- [ ] **Step 6: Run** `node --test src/v2/data/skills.test.mjs` → all pass. Run `npx tsc --noEmit -p .` → exit 0.

### Task 2: Search filter

**Files:**
- Create: `src/v2/components/SectionSkills/filterSkills.ts`
- Test: `src/v2/components/SectionSkills/filterSkills.test.mjs`

**Interfaces:**
- Consumes: `Skill`, `SkillCategory` (Task 1, type-only import).
- Produces:
  ```ts
  export interface FilteredCategory { category: SkillCategory; matches: Skill[] }
  export function filterSkills(categories: SkillCategory[], query: string): FilteredCategory[]
  ```
  Always returns one entry per input category, same order; `matches` keeps the skills' original order.

- [ ] **Step 1: Write failing tests** using a small inline fixture (2 categories, ~3 skills each, one description containing `c++`):
  - `empty query returns all` — `''` → every category's `matches` equals its `skills`.
  - `whitespace-only returns all` — `'   '` same as above.
  - `trims query` — `'  react '` matches `React`.
  - `case-insensitive title match` — `'REACT'` matches `React`.
  - `matches description` — word only in a description finds that skill.
  - `category title match returns whole category` — query equal to a category title → that category's `matches` = all its skills.
  - `regex characters are literal` — `'c++'` finds the fixture skill; `'('` does not throw and returns zero matches everywhere.
  - `no match keeps categories with empty matches` — length equals input length, all `matches` empty.
- [ ] **Step 2: Run** `node --test src/v2/components/SectionSkills/filterSkills.test.mjs` → FAIL.
- [ ] **Step 3: Implement** with `String.prototype.toLowerCase().includes()` (no RegExp).
- [ ] **Step 4: Run** the test → pass; `npx tsc --noEmit -p .` → 0.

### Task 3: SkillCard component + shared card-ring styles

`SkillCard` is a new component, not a NavCard variant. Only the ring hover look and spacing layers are shared, via SCSS mixins. NavCard's rendered output and look must not change.

**Files:**
- Modify: `src/v2/styles/tokens.scss` (add mixins), `src/v2/components/NavCard/NavCard.module.scss` (use the mixins; no visual change)
- Create: `src/v2/components/SkillCard/SkillCard.tsx`, `src/v2/components/SkillCard/SkillCard.module.scss`

**Interfaces:**
- Produces (SCSS, in `tokens.scss`) — extracted verbatim from NavCard's current `.ringWrap`, `.gapLayer`, `.card` rules, including their 640px breakpoints and reduced-motion handling:
  ```scss
  @mixin card-ring($lift: false)   // outer ring: border-width padding, animated gradient on :hover/:focus-within; $lift adds translateY(-4px) + shadow (today's .interactive rules)
  @mixin card-gap-layer            // 8px (5px ≤640) spacer layer on var(--surface, var(--bg))
  @mixin card-surface              // inner surface: --bg-elevated, --radius-md
  ```
- Produces (React):
  ```ts
  interface SkillCardProps {
    skill: Skill                       // from Task 1
    expanded?: boolean                 // tap mode only → aria-expanded; omit in hover mode
    onPreview?: (id: string) => void   // mouseenter + focus
    onSelect?: (id: string) => void    // click (tap mode toggle)
  }
  export default function SkillCard(props: SkillCardProps): JSX.Element
  ```
  Renders ring → gap layer → a `<button type="button">` surface (native focus and Enter/Space) containing the icon (`<img>` for `iconUrl`, `<FontAwesomeIcon>` for `faIcon`, ~26px) and the title. Ring uses `card-ring($lift: true)`. No pointer-cursor requirement in hover mode; `cursor: pointer` in tap mode is fine.

- [ ] **Step 1: Extract mixins** and switch NavCard's SCSS to them.
- [ ] **Step 2: Verify NavCard unchanged.** In the browser at `/#work`, compare a card's computed `padding`, `border-radius`, `transform` on hover and `background-image` on hover before/after (record before values first). Must match.
- [ ] **Step 3: Implement SkillCard.** Tile padding/spacing comparable to NavCard's old `compact` variant (12px padding, 6px gap, centered).
- [ ] **Step 4: Verify.** `npx tsc --noEmit -p .` → 0.

### Task 4: SectionSkills explorer

**Files:**
- Modify: `src/v2/components/SectionSkills/SectionSkills.tsx` (full rewrite), `src/v2/components/SectionSkills/SectionSkills.module.scss` (full rewrite, keep `.section` block)
- Create: `src/v2/hooks/useMediaQuery.ts`

**Interfaces:**
- Consumes: `skillCategories` (Task 1), `filterSkills`, `FilteredCategory` (Task 2), `SkillCard` (Task 3), `useSectionReveal('skills')`.
- Produces: `useMediaQuery(query: string): boolean` — `false` during SSR/first render, then live via `matchMedia` change listener.

Behavior to implement (from spec):
- State: `query`, `activeSkillId: string | null` (hover-mode preview), `openSkillId: string | null` (tap-mode).
- Hover mode: tile `onMouseEnter`/`onFocus` set `activeSkillId`. Clear it on the **category-grid container's** `onMouseLeave` and on blur leaving the grid (`onBlur` where `relatedTarget` is outside the container) — not on tile leave (Review Focus 5).
- Panel: fixed height; shows category title · tag, skill title, description for the active skill, else the intro (h2 headline + hint "Hover a skill for details, or search."). h2 always in the DOM; when a skill is shown the h2 is visually hidden (`visually-hidden` mixin) and the preview sits in an `aria-live="polite"` region. Crossfade on change (key the content on skill id; fade-in with `--duration-hover`, `--ease-gentle`).
- Search: `<input type="search">` with label (visually hidden) and a × button shown when `query` is non-empty (clears and refocuses input). Filtering via `filterSkills`. Hidden tiles are not rendered; a category with zero matches stays with `opacity` ~0.35 and its count shows `0`. Count shows `matches.length`.
- If the active or open skill is no longer in the matches, reset it to `null` (Review Focus 3).
- On `isExiting` becoming true: reset `query`, `activeSkillId`, `openSkillId` (Review Focus 4).
- Tap mode (`!useMediaQuery(HOVER_QUERY)`): panel hidden; h2 shown above search; tiles toggle `openSkillId` via `onSelect` (`SkillCard` sets `aria-expanded`); open description renders below that category's tile grid, one at a time.
- Layout: categories in a flex-wrap row (desktop), card width proportional to skill count (e.g. `flex: <count> 1 0`), tile grid `repeat(auto-fill, minmax(…))`; < 900px one column. Cascade reveal + exit fade via existing mixins on the panel/search/cards wrapper. Tiles are `<SkillCard … />`; in hover mode pass `onPreview`, in tap mode pass `expanded` + `onSelect`.

- [ ] **Step 1: Implement `useMediaQuery`.**
- [ ] **Step 2: Implement SectionSkills + styles.** Remove the `GET_SKILLS` query usage and `placeholderSkills` import from this component.
- [ ] **Step 3: Static checks.** `npx tsc --noEmit -p .` → 0; `npx next lint --file src/v2/components/SectionSkills/SectionSkills.tsx` → no errors.
- [ ] **Step 4: Browser — desktop (real window).** At `/#skills`: five cards with counts 7/8/3/5/6; hovering tiles updates the panel; moving tile→tile never shows the intro (Review Focus 5); leaving the grid restores the intro; Tab through tiles updates the panel; ring+lift hover matches project cards; typing `react` leaves only React with other counts 0 and dimmed; hovering a tile then typing a query that hides it resets the panel (Review Focus 3); × clears; ↑/↓ while typing does not change sections; navigate away mid-hover and back → intro, empty search (Review Focus 4). Section does not scroll internally at the real window size.
- [ ] **Step 5: Browser — sizes via iframe.** Inject iframes at 1440×900 and 1280×800: content fits, no inner scroll (`#skills` `scrollHeight <= clientHeight`). Inject 390×844: tap mode — panel hidden, h2 above search, tapping a tile opens its description, tapping again closes, tapping another switches.
- [ ] **Step 6: Reduced motion.** With `prefers-reduced-motion: reduce` emulated or by inspecting computed styles, crossfade/lift durations are ~1ms or none.

### Task 5: Cleanup

**Files:**
- Modify: `src/v2/data/placeholder.ts` (remove `placeholderSkills` if no remaining imports)
- Modify/Delete: `src/queries/skills.js` only if nothing else imports `GET_SKILLS` (check v1 `src/components` first — v1 still uses it; then keep it).

- [ ] **Step 1:** `grep -rn "placeholderSkills\|GET_SKILLS" src` and remove only now-unused exports.
- [ ] **Step 2:** `npx tsc --noEmit -p .` → 0; `node --test src/v2` → all pass; `npm run build` → succeeds.
