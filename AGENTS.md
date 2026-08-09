# svtui — agent notes

Stacks on the top-level `AGENTS.md` global rules. Where they conflict, this file wins.

## What this is

svtui is a terminal-aesthetic Svelte 5 component library, distributed two ways:

1. **CLI / copy-paste (primary).** The `svtui` npm package (`cli/`) is a shadcn-style CLI. `svtui init` writes the token preset + font; `svtui add <name>` copies a self-contained `.svelte` file into a user's `src/lib/components`. Users own the source.
2. **Docs site (`src/routes`).** A SvelteKit app, prerendered to static HTML by `adapter-static`, hosted for browsing and as LLM-ingestible documentation.

This repo is the **canonical source** for both — `src/lib/components` is the source of truth, `scripts/flatten.ts` copies it into `cli/registry/` for the CLI to ship.

## Hard rules

- **Components are single, self-contained `.svelte` files.** No runtime npm dependencies. The only exception is `bits-ui` as an **optional peer dep** for interactive components (Dialog/Popover/Select/etc.). Plain primitives (Button, Card, Row, …) must not import any package other than `svelte`/`svelte/elements`.
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

## Don't

- Don't add runtime deps to plain components. If a component "needs" a dep, inline the logic (a focus trap, a key handler, a watcher is ~20–40 lines), or gate the dep behind the bits-ui optional-peer rule for interactive components.
- Don't use Tailwind classes inside component `<style>` or component markup in a way that leaks utility-class reliance into the shipped file — the docs site uses Tailwind, but a copied `button.svelte` into someone's plain project must stand alone. It's fine to use Tailwind in the docs `routes/` and in the example files.
- Don't publish from `cli/` without first running `flatten.ts` (it's wired into `prepublishOnly`, but check).

## LLM-ingestible outputs (in progress)

- `src/routes/llms.txt/+server.ts` — short markdown index.
- `src/routes/llms-full.txt/+server.ts` — all component sources concatenated.
- `src/routes/registry.json/+server.ts` — the manifest as JSON.

When editing these, regenerate from `docs.ts` / `registry.json` so they stay in sync — never hand-maintain a second copy.
