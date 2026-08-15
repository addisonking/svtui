<script lang="ts">
	import Input from '$lib/components/input.svelte';

	// ── Buffer Files ───────────────────────────────────────
	type FileBuffer = {
		name: string;
		filetype: string;
		lines: string[];
		modified: boolean;
	};

	const files: FileBuffer[] = [
		{
			name: 'src/lib/components/input.svelte',
			filetype: 'svelte',
			modified: false,
			lines: [
				'<script lang="ts" module>',
				"  import type { HTMLInputAttributes } from 'svelte/elements';",
				'',
				"  export type InputProps = Omit<HTMLInputAttributes, 'type'> & {",
				'    ref?: HTMLInputElement | null;',
				'    caret?: string;',
				"    type?: 'text' | 'password';",
				'    bordered?: boolean;',
				'  };',
				'<' + '/script>',
				'',
				'<script lang="ts">',
				'  let {',
				'    ref = $bindable(null),',
				'    bordered = false,',
				"    value = $bindable(''),",
				'    autofocus = false,',
				'    ...restProps',
				'  }: InputProps = $props();',
				'<' + '/script>',
				'',
				'<div class="displayed" class:bordered>',
				'  <span class="text">{value}</span>',
				'</div>'
			]
		},
		{
			name: 'src/app.css',
			filetype: 'css',
			modified: false,
			lines: [
				':root {',
				'  --cell: 1ch;',
				'  --line: calc(var(--font-size) * var(--base-line-height));',
				'  --surface-base: rgb(0, 0, 0);',
				'  --text-primary: rgb(235, 235, 235);',
				'  --focus-ring: rgb(239, 99, 0);',
				'}',
				'',
				'body {',
				'  font-family: var(--font-family-mono);',
				'  line-height: var(--line);',
				'}'
			]
		},
		{
			name: 'src/lib/config/docs.ts',
			filetype: 'typescript',
			modified: false,
			lines: [
				"export const version = '1.1.13';",
				'',
				'export const components = [',
				"  'input',",
				"  'button',",
				"  'card',",
				"  'accordion',",
				"  'divider'",
				'];'
			]
		}
	];

	// ── State ─────────────────────────────────────────────
	let activeFileIndex = $state(0);
	let activeFile = $derived(files[activeFileIndex]);

	type Mode = 'NORMAL' | 'INSERT' | 'VISUAL' | 'COMMAND';
	let mode = $state<Mode>('NORMAL');

	let cursorRow = $state(4);
	let cursorCol = $state(9);

	let commandInput = $state('');
	let statusMessage = $state('Press i for INSERT, : for commands (:w, :q), h/j/k/l to move');
	let isFocused = $state(false);

	let containerEl: HTMLDivElement;

	const visibleRows = Array.from({ length: 14 }, (_, i) => i);

	function clamp(val: number, min: number, max: number) {
		return Math.max(min, Math.min(max, val));
	}

	function handleContainerKey(e: KeyboardEvent) {
		if (mode === 'COMMAND') return; // Handled by Input

		if (mode === 'NORMAL') {
			if (e.key === 'i') {
				e.preventDefault();
				mode = 'INSERT';
				statusMessage = '-- INSERT --';
				return;
			}
			if (e.key === 'v') {
				e.preventDefault();
				mode = 'VISUAL';
				statusMessage = '-- VISUAL --';
				return;
			}
			if (e.key === ':') {
				e.preventDefault();
				mode = 'COMMAND';
				commandInput = ':';
				statusMessage = '';
				return;
			}
			if (e.key === 'h' || e.key === 'ArrowLeft') {
				e.preventDefault();
				cursorCol = clamp(cursorCol - 1, 0, (activeFile.lines[cursorRow]?.length ?? 1) - 1);
				return;
			}
			if (e.key === 'l' || e.key === 'ArrowRight') {
				e.preventDefault();
				cursorCol = clamp(cursorCol + 1, 0, (activeFile.lines[cursorRow]?.length ?? 1) - 1);
				return;
			}
			if (e.key === 'k' || e.key === 'ArrowUp') {
				e.preventDefault();
				cursorRow = clamp(cursorRow - 1, 0, activeFile.lines.length - 1);
				cursorCol = clamp(
					cursorCol,
					0,
					Math.max(0, (activeFile.lines[cursorRow]?.length ?? 1) - 1)
				);
				return;
			}
			if (e.key === 'j' || e.key === 'ArrowDown') {
				e.preventDefault();
				cursorRow = clamp(cursorRow + 1, 0, activeFile.lines.length - 1);
				cursorCol = clamp(
					cursorCol,
					0,
					Math.max(0, (activeFile.lines[cursorRow]?.length ?? 1) - 1)
				);
				return;
			}
			if (e.key === 'x') {
				e.preventDefault();
				const line = activeFile.lines[cursorRow];
				if (line && cursorCol < line.length) {
					activeFile.lines[cursorRow] = line.slice(0, cursorCol) + line.slice(cursorCol + 1);
					activeFile.modified = true;
				}
				return;
			}
		} else if (mode === 'INSERT') {
			if (e.key === 'Escape') {
				e.preventDefault();
				mode = 'NORMAL';
				statusMessage = '';
				return;
			}
			if (e.key === 'Enter') {
				e.preventDefault();
				const line = activeFile.lines[cursorRow];
				const before = line.slice(0, cursorCol);
				const after = line.slice(cursorCol);
				activeFile.lines.splice(cursorRow, 1, before, after);
				cursorRow++;
				cursorCol = 0;
				activeFile.modified = true;
				return;
			}
			if (e.key === 'Backspace') {
				e.preventDefault();
				const line = activeFile.lines[cursorRow];
				if (cursorCol > 0) {
					activeFile.lines[cursorRow] = line.slice(0, cursorCol - 1) + line.slice(cursorCol);
					cursorCol--;
					activeFile.modified = true;
				} else if (cursorRow > 0) {
					const prevLine = activeFile.lines[cursorRow - 1];
					cursorCol = prevLine.length;
					activeFile.lines[cursorRow - 1] = prevLine + line;
					activeFile.lines.splice(cursorRow, 1);
					cursorRow--;
					activeFile.modified = true;
				}
				return;
			}
			if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
				e.preventDefault();
				const line = activeFile.lines[cursorRow] ?? '';
				activeFile.lines[cursorRow] = line.slice(0, cursorCol) + e.key + line.slice(cursorCol);
				cursorCol++;
				activeFile.modified = true;
			}
		} else if (mode === 'VISUAL') {
			if (e.key === 'Escape') {
				e.preventDefault();
				mode = 'NORMAL';
				statusMessage = '';
				return;
			}
		}
	}

	function handleCommandKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			mode = 'NORMAL';
			commandInput = '';
			statusMessage = '';
			containerEl?.focus();
			return;
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			executeCommand(commandInput.trim());
		}
	}

	function executeCommand(cmd: string) {
		mode = 'NORMAL';
		commandInput = '';

		if (cmd === ':w') {
			activeFile.modified = false;
			statusMessage = `"${activeFile.name}" ${activeFile.lines.length}L written`;
		} else if (cmd === ':q' || cmd === ':q!') {
			statusMessage = 'Quit buffer.';
		} else if (cmd === ':wq') {
			activeFile.modified = false;
			statusMessage = `"${activeFile.name}" saved & quit`;
		} else if (cmd.startsWith(':e ')) {
			const target = cmd.slice(3).trim();
			const idx = files.findIndex((f) => f.name.includes(target));
			if (idx !== -1) {
				activeFileIndex = idx;
				cursorRow = 0;
				cursorCol = 0;
				statusMessage = `Switched to "${files[idx].name}"`;
			} else {
				statusMessage = `E484: Can't open file "${target}"`;
			}
		} else if (cmd === ':help') {
			statusMessage = 'svtui Neovim Mock — :w (write), :e <file>, i (insert), v (visual), h/j/k/l';
		} else {
			statusMessage = `E492: Not an editor command: ${cmd.slice(1)}`;
		}
		containerEl?.focus();
	}

	function switchTab(index: number) {
		activeFileIndex = index;
		cursorRow = 0;
		cursorCol = 0;
		containerEl?.focus();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="nvim-window"
	bind:this={containerEl}
	tabindex="0"
	onkeydown={handleContainerKey}
	onfocus={() => (isFocused = true)}
	onblur={() => (isFocused = false)}
	role="region"
	aria-label="Neovim editor interactive demo"
>
	<!-- ── BUFFERLINE (TABLINE) ───────────────────── -->
	<header class="tabline">
		<div class="tabs">
			{#each files as file, i (file.name)}
				<button
					class="tab"
					class:active={i === activeFileIndex}
					onclick={() => switchTab(i)}
					tabindex="-1"
				>
					<span class="tab-idx">{i + 1}</span>
					<span class="tab-name">{file.name.split('/').pop()}</span>
					{#if file.modified}<span class="tab-mod">●</span>{/if}
				</button>
			{/each}
		</div>
		<div class="tabline-right">
			<span class="dim">NVIM v0.10</span>
		</div>
	</header>

	<!-- ── MAIN EDITOR VIEWPORT ──────────────────── -->
	<div class="editor-body">
		<!-- LINE NUMBER GUTTER -->
		<div class="gutter">
			{#each visibleRows as r (r)}
				{@const lineNum = r + 1}
				{@const hasLine = r < activeFile.lines.length}
				<div class="gutter-line" class:active-gutter={r === cursorRow}>
					{#if hasLine}
						<span class="num">{lineNum}</span>
					{:else}
						<span class="tilde">~</span>
					{/if}
				</div>
			{/each}
		</div>

		<!-- CODE BUFFER CONTENT -->
		<div class="code-viewport">
			{#each visibleRows as r (r)}
				{@const line = activeFile.lines[r]}
				{@const isCurrentLine = r === cursorRow}
				<div class="code-line" class:current-line={isCurrentLine && isFocused}>
					{#if line !== undefined}
						{#if isCurrentLine && isFocused}
							<!-- RENDER LINE WITH CURSOR -->
							{@const before = line.slice(0, cursorCol)}
							{@const charUnder = line[cursorCol] || ' '}
							{@const after = line.slice(cursorCol + 1)}
							<span class="text-seg">{before}</span><span
								class="nvim-cursor"
								class:insert-mode={mode === 'INSERT'}
								class:visual-mode={mode === 'VISUAL'}>{charUnder}</span
							><span class="text-seg">{after}</span>
						{:else}
							<span class="text-seg">{line}</span>
						{/if}
					{:else}
						<span class="empty-line"></span>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<!-- ── STATUSLINE ────────────────────────────── -->
	<footer class="statusline">
		<div class="status-left">
			<span class="mode-pill mode-{mode.toLowerCase()}">{mode}</span>
			<span class="status-branch">main</span>
			<span class="status-file">
				{activeFile.name.split('/').pop()}
				{#if activeFile.modified}<span class="mod-flag">[+]</span>{/if}
			</span>
		</div>
		<div class="status-right">
			<span class="status-ft">{activeFile.filetype}</span>
			<span class="status-pos">
				{cursorRow + 1}:{cursorCol + 1}
			</span>
			<span class="status-pct">
				{Math.round(((cursorRow + 1) / Math.max(1, activeFile.lines.length)) * 100)}%
			</span>
		</div>
	</footer>

	<!-- ── COMMAND / MESSAGE LINE ────────────────── -->
	<div class="cmdline">
		{#if mode === 'COMMAND'}
			<div class="cmd-input-row">
				<Input
					id="nvim-cmd"
					autofocus
					bind:value={commandInput}
					onkeydown={handleCommandKey}
					class="cmd-field"
				/>
			</div>
		{:else}
			<span class="status-msg">{statusMessage}</span>
		{/if}
	</div>
</div>

<style>
	.nvim-window {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		background: var(--surface-base);
		color: var(--text-primary);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		outline: 0;
		box-shadow: inset 0 0 0 1px var(--border-default);
		user-select: none;
	}

	.nvim-window:focus-visible {
		box-shadow: inset 0 0 0 1px var(--focus-ring);
	}

	/* ── TABLINE ──────────────────────────────────── */
	.tabline {
		height: var(--line);
		line-height: var(--line);
		display: flex;
		justify-content: space-between;
		background: color-mix(in srgb, var(--surface-base) 80%, var(--border-default) 20%);
		box-shadow: inset 0 -1px 0 0 var(--border-default);
	}

	.tabs {
		display: flex;
	}

	.tab {
		display: flex;
		align-items: center;
		gap: 1ch;
		padding: 0 1.5ch;
		height: var(--line);
		line-height: var(--line);
		background: transparent;
		color: var(--button-muted);
		border: 0;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		box-shadow: inset -1px 0 0 0 var(--border-default);
	}

	.tab:hover {
		color: var(--text-primary);
	}

	.tab.active {
		background: var(--surface-base);
		color: var(--text-primary);
		font-weight: bold;
		box-shadow:
			inset 0 2px 0 0 var(--focus-ring),
			inset -1px 0 0 0 var(--border-default);
	}

	.tab-idx {
		opacity: 0.5;
	}

	.tab-mod {
		color: var(--focus-ring);
		font-size: 0.8em;
	}

	.tabline-right {
		padding: 0 1ch;
		height: var(--line);
		line-height: var(--line);
	}

	.dim {
		opacity: 0.5;
	}

	/* ── MAIN BODY ────────────────────────────────── */
	.editor-body {
		display: flex;
		height: calc(var(--line) * 14);
		overflow: hidden;
	}

	.gutter {
		width: 5ch;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		background: color-mix(in srgb, var(--surface-base) 92%, var(--border-default) 8%);
		box-shadow: inset -1px 0 0 0 var(--border-default);
		text-align: right;
	}

	.gutter-line {
		height: var(--line);
		line-height: var(--line);
		padding-right: 1ch;
		color: var(--button-muted);
	}

	.gutter-line.active-gutter {
		color: var(--text-primary);
		font-weight: bold;
	}

	.tilde {
		color: color-mix(in srgb, var(--focus-ring) 60%, transparent);
	}

	.code-viewport {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		padding-left: 1ch;
		overflow: hidden;
	}

	.code-line {
		height: var(--line);
		line-height: var(--line);
		white-space: pre;
	}

	.code-line.current-line {
		background: color-mix(in srgb, var(--text-primary) 5%, transparent);
	}

	.text-seg {
		display: inline;
	}

	/* ── CURSORS ──────────────────────────────────── */
	.nvim-cursor {
		display: inline-block;
		min-width: 1ch;
		height: var(--line);
		line-height: var(--line);
		vertical-align: top;
		background: var(--text-primary);
		color: var(--surface-base);
	}

	.nvim-cursor.insert-mode {
		box-shadow: inset 2px 0 0 0 var(--text-primary);
		background: transparent;
		color: inherit;
	}

	.nvim-cursor.visual-mode {
		background: var(--focus-ring);
		color: var(--surface-base);
	}

	/* ── STATUSLINE ───────────────────────────────── */
	.statusline {
		height: var(--line);
		line-height: var(--line);
		display: flex;
		justify-content: space-between;
		background: color-mix(in srgb, var(--surface-base) 80%, var(--border-default) 20%);
		box-shadow: inset 0 1px 0 0 var(--border-default);
		font-size: var(--font-size);
		white-space: nowrap;
		overflow: hidden;
	}

	.status-left,
	.status-right {
		display: flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		overflow: hidden;
	}

	.mode-pill {
		padding: 0 1ch;
		height: var(--line);
		line-height: var(--line);
		font-weight: bold;
	}

	.mode-normal {
		background: var(--focus-ring);
		color: var(--surface-base);
	}

	.mode-insert {
		background: rgb(34, 197, 94);
		color: rgb(0, 0, 0);
	}

	.mode-visual {
		background: rgb(168, 85, 247);
		color: rgb(0, 0, 0);
	}

	.mode-command {
		background: rgb(234, 179, 8);
		color: rgb(0, 0, 0);
	}

	.status-branch {
		padding: 0 1.5ch;
		color: var(--button-muted);
		box-shadow: inset -1px 0 0 0 var(--border-default);
	}

	.status-file {
		padding: 0 1.5ch;
	}

	.mod-flag {
		color: var(--focus-ring);
	}

	.status-ft {
		padding: 0 1.5ch;
		opacity: 0.6;
		box-shadow: inset 1px 0 0 0 var(--border-default);
	}

	.status-pos {
		padding: 0 1.5ch;
		box-shadow: inset 1px 0 0 0 var(--border-default);
	}

	.status-pct {
		padding: 0 1.5ch;
		background: color-mix(in srgb, var(--text-primary) 10%, transparent);
		box-shadow: inset 1px 0 0 0 var(--border-default);
	}

	/* ── COMMAND LINE ─────────────────────────────── */
	.cmdline {
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		display: flex;
		align-items: center;
		background: var(--surface-base);
	}

	.cmd-input-row {
		flex: 1;
		height: var(--line);
		line-height: var(--line);
	}

	.status-msg {
		opacity: 0.6;
		font-style: italic;
	}
</style>
