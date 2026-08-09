# svtui — agent notes

Stacks on the top-level `AGENTS.md` global rules. Where they conflict, this file wins.

## What this is

svtui is a terminal-aesthetic Svelte 5 component library, distributed two ways:

1. **CLI / copy-paste (primary).** The `svtui` npm package (`cli/`) is a shadcn-style CLI. `svtui init` writes the token preset + font; `svtui add <name>` copies a self-contained `.svelte` file into a user's `src/lib/components`. Users own the source.
2. **Docs site (`src/routes`).** A SvelteKit app, prerendered to static HTML by `adapter-static`, hosted for browsing and as LLM-ingestible documentation.

This repo is the **canonical source** for both — `src/lib/components` is the source of truth, `scripts/flatten.ts` copies it into `cli/registry/` for the CLI to ship.

## Hard rules

- **Components are single, self-contained `.svelte` files.** No runtime npm dependencies, and **no imports outside `svelte/*`** — not even `$lib/...` or relative imports across components. A copied file (the thing `svtui add` writes, and the thing `llms-full.txt` documents) must stand alone in any project. The only exception is `bits-ui` as an **optional peer dep** for interactive components (Dialog/Popover/Select/etc.). Plain primitives (Button, Card, Row, …) import only `svelte`/`svelte/elements`/`svelte/events`.
- **Styling uses the CSS custom properties defined in `src/app.css`.** Don't hardcode colors in components. The token set lives below under _Token system_. Add a token to `src/app.css` (both light and `.dark`) if you genuinely need one not already there.
- **Svelte 5 runes only.** `$props`, `$bindable`, `$state`, `$derived`, `$effect`, `{@render}`, snippets. No Svelte 4 `export let` / `createEventDispatcher` / `<svelte:component>` / slots.
- **One `<style>` block per component, scoped.** Do not reach for global styles. Use the tokens.

## Token system (`src/app.css`)

Written into a user's project by `svtui init`. Components read these — never invent raw colors.

- Surfaces: `--surface-base`
- Text: `--text-primary`
- Borders: `--border-default`, `--border-muted`
- Buttons: `--button-primary-bg`, `--button-primary-fg`, `--button-secondary-bg`, `--button-secondary-fg`, `--button-muted`
- Focus: `--focus-ring`
- Typography: `--font-family-mono`, `--font-size`, `--base-line-height`

Dark variants live under `.dark`. Keep both in sync when adding tokens.

## Commands

```sh
bun install
bun run dev            # docs site dev server
bun run build          # static build to build/ (prerendered)
bun run check          # svelte-check (type errors)
bun run lint           # prettier --check + eslint
bun run format         # prettier --write
bun run scripts/flatten.ts   # rebuild cli/registry/ from src + validate self-containment
```

`bun run lint`, `bun run check`, and `bun run build` must all be green before a commit. **Run all three** — the dev server and the static build enforce different rules (see the `vite.config.ts` `define`/fs.allow history for a past footgun).

## How to add a component

A new component touches **five** places. Do all of them, then `flatten.ts` validates:

1. **`src/lib/components/<name>.svelte`** — the component. Self-contained, runes, `<style>`, exported `*Props` type in a `module` script.
2. **`src/lib/config/(component-examples)/<name>.svelte`** — a small example showing the component in use.
3. **`src/lib/config/(component-examples)/index.ts`** — `export { default as FooExample } from './<name>.svelte'`.
4. **`src/lib/config/docs.ts`** — import the example, import the raw source (`?raw`), and add a `Doc` entry with `name`, `slug`, `description`, `componentExample`, `source`, `sourceName`.
5. **`src/lib/index.ts`** — barrel: `export { default as Foo } from './components/<name>.svelte'` and `export type { FooProps } from …`.

Then:

6. **`registry.json`** — add an entry under `items` with `name`, `type: "component"`, `files` (path(s) under `src/lib/components`), `npmDependencies` ([] for plain, `["bits-ui"]` for interactive).
7. `bun run scripts/flatten.ts` — fails if you declared no deps but imported an npm package, or vice versa.
8. `bun run format && bun run lint && bun run check && bun run build` — all green.

For a **multi-file** component (like `table/`), put the files in a subfolder, set `files` to the list, and the CLI/cli-registry lay them out flat under `components/<name>/`.

## Props conventions

Every component's props follow the same shape so any single file is readable in isolation:

- **Extend the relevant HTML attributes type** — `HTMLButtonAttributes`, `HTMLInputAttributes`, `HTMLAttributes<HTMLDivElement>`, etc. Only declare props that aren't already on that base type.
- **`ref` is declared inline** as `ref?: HTMLXElement | null` (tightened to the actual rendered element — `HTMLSpanElement` for `<span>`, `HTMLDivElement` for `<div>`, …). Do **not** import it from a shared helper: a shared `WithRef` type would couple every shipped component to an extra file and break self-containment.
- **Polymorphic button/anchor components** (`Button`, `ActionButton`, `ActionList`) use a **discriminated union on `href`** — one member for `<button>` (`href?: undefined`), one for `<a>` (`href: string`). TS narrows the allowed attributes per variant, so `target`/`rel` are only accepted on the anchor form. Internally, branch on the destructured `href` and cast the rest-spread per branch (`{...(restProps as HTMLAnchorAttributes)}`) since Svelte's spread doesn't narrow a union from `{#if}`.
- **Only genuinely custom props are declared** beyond the base: `variant` (Button), `hotkey` (ActionButton), `icon` (ActionList, a short string like `>` or `=`), `code` (CodeBlock), `type` (Divider/Checkbox/Input, narrowed), `title`+`alignTitle` (Card), `caret` (Input). Do not re-declare `class`, `name`, `children`, `placeholder`, `type` (the broad one) — they're already on the HTML type.

## Don't

- Don't add runtime deps to plain components. If a component "needs" a dep, inline the logic (a focus trap, a key handler, a watcher is ~20–40 lines), or gate the dep behind the bits-ui optional-peer rule for interactive components.
- Don't use Tailwind classes inside component `<style>` or component markup in a way that leaks utility-class reliance into the shipped file — the docs site uses Tailwind, but a copied `button.svelte` into someone's plain project must stand alone. It's fine to use Tailwind in the docs `routes/` and in the example files.
- Don't publish from `cli/` without first running `flatten.ts` (it's wired into `prepublishOnly`, but check).

## LLM-ingestible outputs

All generated from `docs.ts` / `registry.json` — never hand-maintain a second copy.

- `/llms.txt` — short markdown index (what exists + where to read it).
- `/llms-full.txt` — all component sources concatenated into one fetchable file.
- `/registry.json` — the manifest as JSON (same shape the CLI ships).
- `/cheatsheet` — every component's live example + props + source on one page (kitchen sink, good for one-shot ingest).
- Each `/components/<slug>` page shows the live example, the extracted `*Props` type block (regex-pulled from raw source in `docs.ts` `extractPropsType`), and the full source with a copy button.
- `AGENTS.md` (this file) — the working manual for any agent dropped into the repo.

`extractPropsType` in `docs.ts` pulls `export type *Props = …};` from the raw source. If a future component uses a props shape the regex misses, tighten the regex — don't hand-add the props block.
