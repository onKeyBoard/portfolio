# Skills Explorer — Design

Replaces the current Skills section of the v2 portfolio homepage (`src/v2/components/SectionSkills`).

## Intent

The Skills section exists so a hiring manager can quickly confirm Shawn has the skills they're hiring for. Today it's one flat, alphabetical list of 21 tools, which is hard to scan and reads as information overload. The new section groups skills into named categories, adds the design-practice skills that aren't tools (research, prototyping, etc.), and lets visitors explore and search them.

Inspiration: the feature explorer at hanzo.ai/features. Borrow its layout and interaction concepts, but all visual styling, hover effects and transitions must match this project, not Hanzo.

## Goals

- Group skills into five clear categories so a visitor can find "do they know X?" fast.
- Hover (or keyboard focus) on a skill shows a short description in a shared detail panel.
- A search field filters skills across all categories.
- Each category shows how many skills it contains.

## Non-goals

- No proficiency ratings, bars, years-of-experience numbers.
- No per-skill pages or modals.
- Not moving content into Hygraph yet (see Content storage).

## Anti-goals

- Auto-rotating/auto-cycling the detail panel (Hanzo does this; Shawn's call is no — it competes with reading). *(Proposed by Claude, not objected to.)*
- Styling that looks like Hanzo rather than this site.

## Layout (desktop, ≥900px)

Top to bottom, inside the existing section shell:

1. **Detail panel** — full width. Shows the hovered/focused skill: category name · tag, skill title, 1–2 sentence description. When nothing is hovered it shows the section headline "Tools and technologies I’ve worked with." plus a short hint to hover or search. *(Claude's call:)* the headline stays the section's real `<h2>` in all states (visually it is the panel's intro text on desktop); while a skill is previewed, the h2 stays in the DOM (visually hidden) and the preview is a separate `aria-live="polite"` region.
2. **Search field** — filters as you type.
3. **Category cards** — the five categories side by side (wrapping as needed). Each card header: category name, tag chip, and skill count. Below the header, a grid of skill tiles.

The section must keep the existing site conventions: `full-viewport-section` mixin (snap, centered below the fixed header), `useSectionReveal('skills')` mount/exit with cascade reveal and exit fade, and it must fit within one desktop viewport (target 1440×900 and 1280×800) without inner scrolling. *(Claude's call:)* below those sizes (e.g. 1024×768), cards may wrap to two rows and tiles may tighten; if it still doesn't fit, the section's existing internal scroll (`overflow-y: auto` + `safe center` from the mixin) is acceptable.

## Skill tiles

- A new `SkillCard` component (not a `NavCard` variant — the content is different). It shares only the project cards' hover look and spacing: animated gradient ring, the lift and shadow, and the ring/gap/surface layers. Share those via SCSS mixins so `NavCard` and `SkillCard` stay in sync. Shawn explicitly asked for the project-card grid hover here.
- Tiles must be keyboard focusable; focus behaves like hover (updates the panel).
- Tiles show an icon when one exists. Practice skills without a logo (e.g. User research) use a Font Awesome icon (the project already uses `@fortawesome`). Builder picks icons.

## Interactions

- **Hover / focus a tile:** detail panel swaps to that skill with a short crossfade using the site's existing easing tokens (`--ease-gentle`, `--duration-hover`). Leaving the tile grid returns the panel to the intro state. Leaving one tile for another should not flash the intro state in between.
- **Count:** each category header shows the number of skills in it. While searching it shows the number of matches.
- **Search:** case-insensitive, matches skill title, description and category name. Non-matching tiles hide; categories with zero matches dim (stay in place so layout doesn't jump). Empty query shows everything. Include a clear (×) control. No URL syncing.
- **Arrow keys:** the page uses ↑/↓ arrows to move between sections (`ActiveSectionContext`), and already ignores them while focus is in an `INPUT`, so typing in search is safe. Don't add ↑/↓ handling to tiles.
- **Reduced motion:** crossfade and lift become instant, matching how the rest of the site handles `prefers-reduced-motion`.

## Phones / tablets / touch

*(Claude's call:)* hover vs. tap mode is chosen by input, not only width: hover mode when `(hover: hover) and (pointer: fine)` and width ≥900px; tap mode otherwise (so an iPad in landscape gets tap mode). Width <900px still controls the stacked layout.

In tap mode there is no hover. Tapping a tile shows its description inline directly beneath the tapped tile's category grid, or as an expanded tile — builder's choice, as long as only one description is open at a time and tapping again closes it. Categories stack in one column. The detail panel at the top is hidden in tap mode; the h2 headline shows as a plain heading above search instead. Search stays. On mobile the section scrolls internally (sections are fixed, paged panels on mobile), so fitting one viewport is not required there.

## Content

Five categories, 29 skills (21 existing + 8 new). ✚ = new skill not in the current Hygraph list.

| # | Category | Tag | Skills |
|---|---|---|---|
| 1 | UX & Product Design | Design | User research ✚, Usability testing ✚, User flows & journey mapping ✚, Wireframing & prototyping ✚, Design systems ✚, Accessibility ✚, Figma |
| 2 | Front-End Engineering | Code | React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Sass, Less |
| 3 | Interaction & Motion | Craft | GreenSock, Three.js, Motion design ✚ |
| 4 | Data & Back-End | APIs | GraphQL, Apollo, Node.js, Python, Headless CMS (Hygraph) ✚ |
| 5 | Tooling & Platforms | Ship | Git, NPM, Webpack, Linux, Shopify, WordPress |

Category and skill order as listed.

**Descriptions:** Claude drafts a 1–2 sentence description for every skill, written in first person from Shawn's real experience (sources: project descriptions/slides in Hygraph, the Hello section bio). Descriptions must not invent employers, projects, or claims not supported by those sources; when unsure, keep it general. Shawn reviews and edits before shipping.

**Icons:** reuse existing Hygraph `iconUrl` values for the 21 existing tools. They are not in the repo. The Hygraph endpoint is `NEXT_PUBLIC_HYGRAPH_API_URL` (public read). Direct curl from the agent shell was blocked in this session, so read them from the running local dev site (`http://localhost:3000/#skills`, the current section renders each icon's `src`) via the browser, and copy them into the data file. Same for project descriptions used as source material for skill descriptions (visible in the project modal / `/projects?id=…` pages).

## Content storage

No Hygraph write access is available in this session, so content lives in a typed data file in the project: `src/v2/data/skills.ts` (TypeScript, so it's type-checked). Shape it so it maps cleanly to Hygraph models later:

- `SkillCategory`: `id`, `title`, `tag`, `skills: Skill[]` (array order = display order)
- `Skill`: `id`, `title`, `description`, `iconUrl?`, `faIcon?` (Font Awesome icon for skills without a logo)

The `GET_SKILLS` Apollo query is no longer used by the section once this ships.

## Left to the builder

- Exact card widths / how the five cards share a row (Hanzo sizes groups by item count; fine to do the same).
- Tile grid columns inside each card.
- Detail panel height (fixed height recommended so the layout doesn't jump between descriptions).
- Font Awesome icon choices for skills without logos.
- Search field styling, within the site's existing input/border/radius tokens.
- Mobile inline-description pattern (see above).

---

## Revision (2026-11-10, after first build) — supersedes Layout, Skill tiles, Interactions and Phones above

Shawn's feedback: the first build only grouped the list and added more text; it didn't reduce overload or let people drill in. New model, two levels:

- **Top level:** only the five category cards (name, tag, skill count). No individual skills on screen. Hover/focus a card → the top panel shows that category's overview: a 1–2 sentence summary plus the skill names as a short inline list. Click a card → drill in.
- **Drill-in:** the cards are replaced by that category's skills as tiles (icon + name only, same project-card ring/lift hover), plus a "Back to all skills" control. Panel shows the category title and summary. Back returns to the five cards; focus moves to the Back button on drill-in and back to the opened card on return.
- **No per-skill descriptions shown** (data keeps them for later). **No search** (dropped — the groupings should carry exploration).
- **Phones / touch:** same two levels with tap; each category card shows its summary directly since there's no hover.
- Data: `SkillCategory` gains `summary: string`.
