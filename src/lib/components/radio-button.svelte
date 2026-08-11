<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	/** A single terminal-style radio option. Belongs in a group sharing `name`. */
	export type RadioButtonProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
		ref?: HTMLInputElement | null;
		style?: string;
		name: string;
		value: string;
		selected?: boolean;
		onSelect?: (value: string) => void;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		style,
		name,
		value,
		selected = false,
		onSelect,
		children,
		...restProps
	}: RadioButtonProps = $props();

	let focused = $state(false);
	const radioId = $derived(`${name}-${value}-radio`);

	const isFocusable = (el: Element): el is HTMLElement =>
		el.matches(
			'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'
		);

	const moveFocus = (dir: 'next' | 'prev') => {
		const els = Array.from(document.querySelectorAll('*')).filter(isFocusable);
		const i = els.indexOf(document.activeElement as HTMLElement);
		if (i === -1) return;
		const target = dir === 'next' ? els[i + 1] : els[i - 1];
		target?.focus();
	};

	const onkeydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				onSelect?.(value);
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				e.preventDefault();
				moveFocus('prev');
				break;
			case 'ArrowDown':
			case 'ArrowRight':
			case 'Tab':
				e.preventDefault();
				moveFocus('next');
				break;
		}
	};
</script>

<div class={`radio ${className ?? ''}`} class:focused class:selected {style} {...restProps}>
	<input
		bind:this={ref}
		id={radioId}
		type="radio"
		{name}
		{value}
		checked={selected}
		class="input"
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
		{onkeydown}
		onchange={() => onSelect?.(value)}
	/>
	<div class="relative">
		<label class="figure" for={radioId}>
			{#if selected}
				<span class="dot" aria-hidden="true"></span>
			{/if}
		</label>
	</div>
	<div class="right">
		&nbsp;&nbsp;{@render children?.()}
	</div>
</div>

<style>
	.radio {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
	}

	.relative {
		flex-shrink: 0;
		display: flex;
	}

	.figure {
		display: inline-flex;
		height: var(--line);
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
		align-self: flex-start;
		box-shadow: inset 0 1px 0 0 var(--border-muted);
		padding-bottom: var(--line);
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
