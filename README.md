# svtui

![hero image](./static/hero.png)

Terminal-styled Svelte 5 components. Each one is a single self-contained
`.svelte` file you copy into your own project. No runtime deps, monospace-first.
The look borrows from [srcl](https://sacred.computer).

## Use it

svtui is a CLI in the shadcn/ui style. You add components straight into your
own repo:

```sh
npx svtui init            # writes the token preset (src/app.css) + a font
npx svtui list            # lists available components
npx svtui add button      # copies a component into src/lib/components
npx svtui add table       # multi-file components land in their own subfolder
```

Run `init` first. The components read the CSS variables it defines.

If a component ever needs an npm dependency, `add` prints the install command
for whichever package manager it finds in your project. None of the current
components do.

### Flags

```
--cwd <dir>   run in <dir> instead of the current directory
--out <dir>   write components to <dir> instead of <cwd>/src/lib/components
--force       overwrite existing files
```

## License

Unlicense (public domain). See [LICENSE](./LICENSE).
