<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type RadioOption = {
		value: string;
		label?: string;
	};

	/** A group of radio options that manages its own selection state. */
	export type RadioButtonGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		ref?: HTMLDivElement | null;
		options: RadioOption[];
		defaultValue?: string;
		/** Set to control selection externally; omit for uncontrolled. */
		value?: string;
		children?: Snippet<[RadioOption]>;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		options,
		defaultValue = '',
		value,
		children,
		...restProps
	}: RadioButtonGroupProps = $props();

	let internal = $state(defaultValue);
	let focusedValue = $state<string | null>(null);

	const current = $derived(value !== undefined ? value : internal);

	const select = (v: string) => {
		if (value === undefined) internal = v;
	};
</script>

<div class={`radio-group ${className ?? ''}`} bind:this={ref} {...restProps}>
	{#each options as option, i (option.value)}
		{@const selected = current === option.value}
		<div
			class="radio {selected ? 'selected' : ''} {focusedValue === option.value ? 'focused' : ''}"
		>
			<input
				type="radio"
				name="radio-group"
				value={option.value}
				checked={selected}
				class="input"
				id={`radio-group-${i}`}
				onchange={() => select(option.value)}
				onfocus={() => (focusedValue = option.value)}
				onblur={() => (focusedValue = null)}
			/>
			<div class="relative">
				<label class="figure" for={`radio-group-${i}`}>
					{#if selected}
						<span class="dot" aria-hidden="true"></span>
					{/if}
				</label>
			</div>
			<div class="right">
				&nbsp;&nbsp;
				{#if children}
					{@render children(option)}
				{:else}
					{option.label ?? option.value}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.radio-group {
		display: block;
	}

	.radio {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
	}

	.relative {
		flex-shrink: 0;
		display: inline-block;
		vertical-align: baseline;
	}

	.figure {
		display: inline-flex;
		height: calc(var(--font-size) * var(--base-line-height));
		cursor: pointer;
		color: var(--text-primary);
		background: var(--border-muted);
		width: 3ch;
		align-items: center;
		justify-content: center;
	}

	.selected .figure {
		background: var(--text-primary);
	}

	.focused .figure {
		background: var(--focus-ring);
	}

	.dot {
		display: inline-block;
		width: 1ch;
		height: 1ch;
		background: var(--surface-base);
		transform: rotate(45deg);
		vertical-align: middle;
	}

	.right {
		background: var(--surface-base);
		min-width: 10%;
		width: 100%;
		align-self: stretch;
		box-shadow: inset 0 1px 0 0 var(--border-muted);
		padding-bottom: calc(var(--base-line-height) * 8px);
	}

	.radio:last-child .right {
		padding-bottom: 0;
		box-shadow: none;
	}

	.input {
		position: absolute;
		height: 1px;
		width: 1px;
		opacity: 0;
		background: transparent;
		border: 0;
		outline: 0;
		margin: 0;
		padding: 0;
	}
</style>
