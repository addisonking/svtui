<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type SelectItem =
		| string
		| {
				value: string;
				label?: string;
				disabled?: boolean;
		  };

	export type SelectProps = Omit<HTMLAttributes<HTMLElement>, 'onchange'> & {
		ref?: HTMLElement | null;
		items?: SelectItem[];
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		name?: string;
		onchange?: (value: string) => void;
	};
</script>

<script lang="ts">
	import { Select } from 'bits-ui';

	let {
		ref = $bindable(null),
		items = [],
		value = $bindable(''),
		placeholder = 'Select an option...',
		disabled = false,
		name,
		class: className = '',
		onchange,
		...restProps
	}: SelectProps = $props();

	const normalizedItems = $derived(
		items.map((item) => (typeof item === 'string' ? { value: item, label: item } : item))
	);

	const selectedLabel = $derived(
		normalizedItems.find((i) => i.value === value)?.label ?? value ?? placeholder
	);

	function handleValueChange(newVal: string | undefined) {
		if (newVal !== undefined) {
			value = newVal;
			onchange?.(newVal);
		}
	}
</script>

<div bind:this={ref} class="select-root {className}" {...restProps}>
	<Select.Root type="single" {value} {disabled} {name} onValueChange={handleValueChange}>
		<Select.Trigger class="select-trigger">
			<span class="trigger-label" class:placeholder={!value}>{selectedLabel}</span>
			<span class="trigger-arrow">▼</span>
		</Select.Trigger>
		<Select.Portal>
			<Select.Content class="select-content" sideOffset={2}>
				{#each normalizedItems as item (item.value)}
					{@const isSelected = item.value === value}
					<Select.Item
						value={item.value}
						label={item.label ?? item.value}
						disabled={item.disabled}
						class="select-item"
					>
						<span class="item-glyph">{isSelected ? '●' : ' '}</span>
						<span class="item-text">{item.label ?? item.value}</span>
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>

<style>
	.select-root {
		display: inline-flex;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		box-sizing: border-box;
		position: relative;
	}

	:global(.select-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5ch;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		background: var(--surface-base);
		color: var(--text-primary);
		font-family: inherit;
		font-size: inherit;
		border: 0;
		box-shadow: inset 0 0 0 1px var(--border-default);
		cursor: pointer;
		outline: 0;
		user-select: none;
		min-width: 18ch;
		box-sizing: border-box;
	}

	:global(.select-trigger:hover:not(:disabled)) {
		box-shadow: inset 0 0 0 1px var(--text-primary);
	}

	:global(.select-trigger:focus-visible) {
		box-shadow: inset 0 0 0 1px var(--focus-ring);
	}

	:global(.select-trigger:disabled) {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.trigger-label {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
	}

	.trigger-label.placeholder {
		color: var(--button-muted);
	}

	.trigger-arrow {
		color: var(--button-muted);
		font-size: 0.7em;
	}

	:global(.select-content) {
		background: var(--surface-base);
		color: var(--text-primary);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		box-shadow:
			inset 0 0 0 1px var(--border-default),
			0.5ch 0.5ch 0 0 var(--border-muted);
		padding: 0;
		min-width: 18ch;
		z-index: 1000;
		outline: 0;
		box-sizing: border-box;
	}

	:global(.select-item) {
		display: flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		padding: 0 1ch;
		gap: 1ch;
		cursor: pointer;
		outline: 0;
		user-select: none;
	}

	:global(.select-item[data-highlighted]) {
		background: color-mix(in srgb, var(--focus-ring) 25%, transparent);
		color: var(--text-primary);
	}

	:global(.select-item[data-disabled]) {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.item-glyph {
		color: var(--focus-ring);
		width: 1ch;
		flex-shrink: 0;
	}

	.item-text {
		flex: 1;
		white-space: nowrap;
	}
</style>
