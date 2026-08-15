<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type CommandItem = {
		id: string;
		label: string;
		category?: string;
		shortcut?: string;
		onselect?: () => void;
	};

	export type CommandPaletteProps = Omit<HTMLAttributes<HTMLElement>, 'onselect'> & {
		ref?: HTMLElement | null;
		open?: boolean;
		items?: CommandItem[];
		placeholder?: string;
		onselect?: (item: CommandItem) => void;
		onclose?: () => void;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		open = $bindable(false),
		items = [],
		placeholder = 'Type a command or search...',
		onselect,
		onclose,
		class: className = '',
		...restProps
	}: CommandPaletteProps = $props();

	let query = $state('');
	let selectedIndex = $state(0);
	let inputEl = $state<HTMLInputElement>();

	const filteredItems = $derived(
		items.filter(
			(item) =>
				item.label.toLowerCase().includes(query.toLowerCase()) ||
				(item.category && item.category.toLowerCase().includes(query.toLowerCase()))
		)
	);

	$effect(() => {
		if (open) {
			query = '';
			selectedIndex = 0;
			setTimeout(() => inputEl?.focus(), 30);
		}
	});

	$effect(() => {
		if (selectedIndex >= filteredItems.length) {
			selectedIndex = Math.max(0, filteredItems.length - 1);
		}
	});

	function select(item: CommandItem) {
		open = false;
		item.onselect?.();
		onselect?.(item);
		onclose?.();
	}

	function handleInputKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (filteredItems.length > 0) {
				selectedIndex = (selectedIndex + 1) % filteredItems.length;
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (filteredItems.length > 0) {
				selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (filteredItems[selectedIndex]) {
				select(filteredItems[selectedIndex]);
			}
		} else if (e.key === 'Escape') {
			e.preventDefault();
			open = false;
			onclose?.();
		}
	}
</script>

{#if open}
	<div
		class="palette-overlay"
		onclick={() => {
			open = false;
			onclose?.();
		}}
		role="presentation"
	>
		<div
			bind:this={ref}
			class="palette-box {className}"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label="Command Palette"
			{...restProps}
		>
			<div class="search-row">
				<span class="prompt-glyph">&gt;</span>
				<input
					bind:this={inputEl}
					type="text"
					class="search-input"
					{placeholder}
					bind:value={query}
					onkeydown={handleInputKey}
				/>
				<span class="esc-badge">[ESC]</span>
			</div>

			<div class="results-list" role="listbox">
				{#if filteredItems.length === 0}
					<div class="empty-state">No matching commands.</div>
				{:else}
					{#each filteredItems as item, idx (item.id)}
						{@const isSelected = idx === selectedIndex}
						<button
							type="button"
							role="option"
							aria-selected={isSelected}
							class="item-row"
							class:selected={isSelected}
							onclick={() => select(item)}
						>
							<span class="item-icon">{isSelected ? '●' : ' '}</span>
							<span class="item-label">{item.label}</span>
							{#if item.category}
								<span class="item-cat">{item.category}</span>
							{/if}
							{#if item.shortcut}
								<span class="item-shortcut">[{item.shortcut}]</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>

			<div class="palette-footer">
				<span class="footer-tip">↑↓ navigate</span>
				<span class="footer-tip">↵ select</span>
				<span class="footer-tip">esc dismiss</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.palette-overlay {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: color-mix(in srgb, var(--surface-base) 60%, transparent);
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: calc(var(--line) * 4);
		box-sizing: border-box;
	}

	.palette-box {
		width: 100%;
		max-width: 64ch;
		background: var(--surface-base);
		color: var(--text-primary);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		box-shadow:
			inset 0 0 0 1px var(--border-default),
			0.5ch 0.5ch 0 0 var(--border-muted);
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.search-row {
		display: flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		box-shadow: inset 0 -1px 0 0 var(--border-default);
	}

	.prompt-glyph {
		color: var(--focus-ring);
		font-weight: bold;
		padding-right: 1ch;
	}

	.search-input {
		flex: 1;
		height: var(--line);
		line-height: var(--line);
		background: transparent;
		color: inherit;
		border: 0;
		outline: 0;
		font-family: inherit;
		font-size: inherit;
	}

	.esc-badge {
		opacity: 0.5;
		font-size: 0.85em;
	}

	.results-list {
		display: flex;
		flex-direction: column;
		max-height: calc(var(--line) * 8);
		overflow-y: auto;
	}

	.item-row {
		display: flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		background: transparent;
		color: inherit;
		border: 0;
		outline: 0;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}

	.item-row.selected {
		background: color-mix(in srgb, var(--focus-ring) 25%, transparent);
		color: var(--text-primary);
		font-weight: bold;
	}

	.item-icon {
		width: 2ch;
		color: var(--focus-ring);
		flex-shrink: 0;
	}

	.item-label {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-cat {
		opacity: 0.5;
		margin-right: 1ch;
		font-size: 0.9em;
	}

	.item-shortcut {
		color: var(--button-muted);
		font-size: 0.9em;
	}

	.empty-state {
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		opacity: 0.5;
		font-style: italic;
	}

	.palette-footer {
		display: flex;
		gap: 2ch;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		box-shadow: inset 0 1px 0 0 var(--border-default);
		background: color-mix(in srgb, var(--surface-base) 90%, var(--border-default) 10%);
		opacity: 0.7;
		font-size: 0.85em;
	}

	.footer-tip {
		white-space: nowrap;
	}
</style>
