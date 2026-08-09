# svtui

![hero image](./static/hero.png)

Terminal-aesthetic Svelte 5 components. Self-contained source files you copy
into your own project — minimal deps, monospace-first, inspired by
[srcl](https://sacred.computer).

## Use it

svtui ships as a CLI (shadcn/ui-style). Add components straight into your repo:

```sh
npx svtui init            # write the token preset (src/app.css) + font
npx svtui list            # list available components
npx svtui add button      # copy a component into src/lib/components
npx svtui add table       # multi-file components get their own subfolder
```

Run `svtui init` first — components read the CSS variables it defines.

When a component needs an npm dependency (e.g. `action-button`, `input` use
`runed`), `add` prints the install command for your detected package manager.

### Flags

```
--cwd <dir>   run in <dir> instead of the current directory
--out <dir>   write components to <dir> instead of <cwd>/src/lib/components
--force       overwrite existing files
```

## Components

Button, Action Button, Action List, Badge, Card, Code Block, Input, Label,
Checkbox, Table.

## Theming

All components read CSS variables from `src/app.css` (written by `svtui init`).
Override them to theme. Light/dark is toggled with `mode-watcher` on the docs
site; the variables are the same shape either way.

## This repo

- `src/lib/components` — canonical component source (also the docs site's source of truth).
- `src/routes` — the docs site (SvelteKit, prerendered to static HTML).
- `registry.json` — component manifest (name → files, npm deps).
- `scripts/flatten.ts` — builds the registry into `cli/registry/` for the CLI to ship.
- `cli/` — the `svtui` npm package (the CLI).

## License

Unlicense (public domain). See [LICENSE](./LICENSE).
