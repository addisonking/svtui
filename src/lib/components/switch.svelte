<script lang="ts" module>
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export type SwitchVariant = 'text' | 'box' | 'track';

	export type SwitchProps = Omit<HTMLButtonAttributes, 'onchange'> & {
		ref?: HTMLButtonElement | null;
		checked?: boolean;
		variant?: SwitchVariant;
		label?: string;
		onchange?: (checked: boolean) => void;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		checked = $bindable(false),
		variant = 'text',
		label,
		disabled = false,
		class: className = '',
		onchange,
		...restProps
	}: SwitchProps = $props();

	function toggle() {
		if (disabled) return;
		checked = !checked;
		onchange?.(checked);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			toggle();
		}
	}
</script>

<button
	type="button"
	bind:this={ref}
	role="switch"
	aria-checked={checked}
	{disabled}
	class="switch-wrap {variant} {className}"
	onclick={toggle}
	onkeydown={handleKeydown}
	{...restProps}
>
	{#if variant === 'text'}
		<span class="switch-box">
			[<span class="state-on" class:active={checked}>ON</span><span class="sep">│</span><span
				class="state-off"
				class:active={!checked}>OFF</span
			>]
		</span>
	{:else if variant === 'box'}
		<span class="switch-box">
			[{checked ? 'X' : ' '}]
		</span>
	{:else if variant === 'track'}
		<span class="switch-box">
			[{checked ? '===●' : '●==='}]
		</span>
	{/if}

	{#if label}
		<span class="switch-label">{label}</span>
	{/if}
</button>

<style>
	.switch-wrap {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
		height: var(--line);
		line-height: var(--line);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		background: transparent;
		color: var(--text-primary);
		border: 0;
		padding: 0;
		cursor: pointer;
		outline: 0;
		user-select: none;
		vertical-align: baseline;
		box-sizing: border-box;
	}

	.switch-wrap:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.switch-wrap:focus-visible .switch-box {
		box-shadow: inset 0 0 0 1px var(--focus-ring);
		background: color-mix(in srgb, var(--focus-ring) 15%, transparent);
	}

	.switch-box {
		display: inline-flex;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
		color: var(--button-muted);
		padding: 0 0.5ch;
	}

	.state-on.active {
		color: rgb(34, 197, 94);
		font-weight: bold;
	}

	.state-off.active {
		color: var(--text-primary);
		font-weight: bold;
	}

	.state-on:not(.active),
	.state-off:not(.active) {
		opacity: 0.35;
	}

	.sep {
		opacity: 0.4;
		padding: 0 0.25ch;
	}

	.switch-wrap.track .switch-box {
		color: var(--focus-ring);
	}

	.switch-label {
		color: var(--text-primary);
	}
</style>
