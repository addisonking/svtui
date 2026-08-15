# svtui

Terminal-aesthetic Svelte components, delivered as self-contained source files
you copy into your own project (shadcn/ui-style). Minimal deps, monospace-first.

## Usage

```sh
npx svtui init            # write the token preset (src/app.css) + font
npx svtui list            # list available components
npx svtui add button      # copy a component into src/lib/components
npx svtui add table       # multi-file components get their own subfolder
```

Run `svtui init` first — components read CSS variables it defines.

### Flags

```
--cwd <dir>   run in <dir> instead of the current directory
--out <dir>   write components to <dir> instead of <cwd>/src/lib/components
--force       overwrite existing files
```

When a component needs an npm dependency (e.g. `dialog`, `select` use
`bits-ui`), `add` prints the install command for your detected package manager.

## Philosophy

Components are plain `.svelte` files you own. No runtime dependency on `svtui`,
no black box. Tweak freely. The token preset (`src/app.css`) is the only shared
bit — install it once with `init`.

See <https://github.com/addisonking/svtui>.

## License

Unlicense (public domain). See [LICENSE](./LICENSE).
