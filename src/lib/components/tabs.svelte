<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type TabItem =
		| string
		| {
				value: string;
				label?: string;
				count?: number | string;
				disabled?: boolean;
		  };

	export type TabsProps = Omit<HTMLAttributes<HTMLElement>, 'onchange'> & {
		ref?: HTMLElement | null;
		items?: TabItem[];
		value?: string;
		variant?: 'line' | 'block' | 'bracket';
		onchange?: (value: string) => void;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		items = [],
		value = $bindable(''),
		variant = 'line',
		class: className = '',
		onchange,
		...restProps
	}: TabsProps = $props();

	const normalizedItems = $derived(
		items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item))
	);

	$effect(() => {
		if (!value && normalizedItems.length > 0) {
			const first = normalizedItems.find((i) => !i.disabled);
			if (first) value = first.value;
		}
	});

	function selectTab(val: string) {
		value = val;
		onchange?.(val);
	}

	function handleKeydown(e: KeyboardEvent) {
		const enabled = normalizedItems.filter((i) => !i.disabled);
		if (enabled.length === 0) return;

		const currentIdx = enabled.findIndex((i) => i.value === value);

		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			const nextIdx = (currentIdx + 1) % enabled.length;
			selectTab(enabled[nextIdx].value);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			const prevIdx = (currentIdx - 1 + enabled.length) % enabled.length;
			selectTab(enabled[prevIdx].value);
		}
	}
</script>

<nav
	bind:this={ref}
	class="tabs-container {variant} {className}"
	role="tablist"
	onkeydown={handleKeydown}
	{...restProps}
>
	{#each normalizedItems as item, idx (item.value)}
		{@const active = item.value === value}
		<button
			type="button"
			role="tab"
			aria-selected={active}
			disabled={item.disabled}
			tabindex={active ? 0 : -1}
			class="tab-btn"
			class:active
			onclick={() => selectTab(item.value)}
		>
			{#if variant === 'bracket'}[{/if}
			<span class="tab-idx">{idx + 1}</span>
			<span class="tab-label">{item.label ?? item.value}</span>
			{#if item.count !== undefined}
				<span class="tab-count">({item.count})</span>
			{/if}
			{#if variant === 'bracket'}]{/if}
		</button>
	{/each}
</nav>

<style>
	.tabs-container {
		display: flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		box-sizing: border-box;
		user-select: none;
	}

	.tabs-container.line {
		box-shadow: inset 0 -1px 0 0 var(--border-default);
	}

	.tab-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5ch;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1.5ch;
		font-family: inherit;
		font-size: inherit;
		background: transparent;
		color: var(--button-muted);
		border: 0;
		cursor: pointer;
		outline: 0;
		box-sizing: border-box;
	}

	.tab-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.tab-btn:not(:disabled):hover {
		color: var(--text-primary);
	}

	.tab-btn:focus-visible {
		background: color-mix(in srgb, var(--focus-ring) 20%, transparent);
	}

	/* LINE VARIANT */
	.tabs-container.line .tab-btn {
		box-shadow: inset -1px 0 0 0 var(--border-default);
	}

	.tabs-container.line .tab-btn.active {
		color: var(--text-primary);
		font-weight: bold;
		background: var(--surface-base);
		box-shadow:
			inset 0 2px 0 0 var(--focus-ring),
			inset -1px 0 0 0 var(--border-default);
	}

	/* BLOCK VARIANT */
	.tabs-container.block {
		gap: 1ch;
	}

	.tabs-container.block .tab-btn.active {
		background: var(--text-primary);
		color: var(--surface-base);
		font-weight: bold;
	}

	/* BRACKET VARIANT */
	.tabs-container.bracket {
		gap: 1ch;
	}

	.tabs-container.bracket .tab-btn {
		padding: 0 0.5ch;
	}

	.tabs-container.bracket .tab-btn.active {
		color: var(--focus-ring);
		font-weight: bold;
	}

	.tab-idx {
		opacity: 0.45;
		font-size: 0.9em;
	}

	.tab-count {
		opacity: 0.6;
	}
</style>
