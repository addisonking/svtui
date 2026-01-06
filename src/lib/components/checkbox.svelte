<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type CheckboxProps = Omit<HTMLInputAttributes, 'type'> & {
		class?: string;
		ref?: HTMLInputElement | null;
		checked?: boolean;
		name?: string;
		children?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	let {
		class: className = '',
		ref = $bindable(null),
		checked = $bindable(false),
		name,
		disabled = false,
		children,
		...restProps
	}: CheckboxProps = $props();

	let focused = $state(false);

	const checkboxId = restProps.id ?? `checkbox-${Math.random().toString(36).substring(2, 11)}`;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (!disabled) {
				checked = !checked;
			}
		}
	};
</script>

<div
	class="checkbox-wrapper {className}"
	class:checked
	class:focused
	class:disabled
>
	<div class="checkbox-control">
		<input
			bind:this={ref}
			type="checkbox"
			id={checkboxId}
			{name}
			bind:checked
			{disabled}
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			onkeydown={handleKeyDown}
			class="checkbox-input"
			{...restProps}
		/>
		<label class="checkbox-figure" for={checkboxId}>
			{checked ? '╳' : '\u00A0'}
		</label>
	</div>
	{#if children}
		<label class="checkbox-label" for={checkboxId}>
			{@render children()}
		</label>
	{/if}
</div>

<style lang="postcss">
	.checkbox-wrapper {
		display: flex;
		align-items: flex-start;
		cursor: pointer;

		&.disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}

	.checkbox-control {
		position: relative;
		flex-shrink: 0;
		display: inline-block;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
		margin: 0;
		padding: 0;
	}

	.checkbox-figure {
		display: inline-block;
		padding: 0 1ch;
		cursor: pointer;
		color: var(--text-primary);
		background: var(--border-muted);
		user-select: none;
	}

	.checkbox-wrapper.focused .checkbox-figure {
		background: var(--focus-ring);
		color: var(--surface-base);
	}

	.checkbox-wrapper.disabled .checkbox-figure {
		cursor: not-allowed;
	}

	.checkbox-label {
		flex: 1;
		cursor: pointer;
		user-select: none;
	}

	.checkbox-wrapper.disabled .checkbox-label {
		cursor: not-allowed;
	}
</style>
