<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	/** A keyboard combo: modifier names plus a key, e.g. `['control', 't']`. */
	export type Hotkey = ('control' | 'alt' | 'shift' | 'meta' | string)[];

	/**
	 * Polymorphic: renders `<a>` when `href` is set, `<button>` otherwise. `href`
	 * discriminates the allowed attributes.
	 */
	export type ActionButtonProps =
		| (HTMLButtonAttributes & { ref?: HTMLElement | null; hotkey?: Hotkey; href?: undefined })
		| (HTMLAnchorAttributes & { ref?: HTMLElement | null; hotkey?: Hotkey; href: string });
</script>

<script lang="ts">
	import { on } from 'svelte/events';

	let {
		class: className,
		ref = $bindable(null),
		hotkey = [],
		href,
		children,
		...restProps
	}: ActionButtonProps = $props();

	const modifiers: Record<string, string> = {
		control: '⌃',
		alt: '⌥',
		shift: '⇧',
		meta: '⌘'
	};

	// Fire the button's action when its hotkey combo is pressed. Matches against
	// the keydown's modifier flags (ctrlKey/altKey/shiftKey/metaKey) plus e.key,
	// so it works whether the OS fires separate modifier keydowns or a single
	// keydown with modifier flags set. Re-entrant guard: one combo press → one fire.
	$effect(() => {
		if (!hotkey.length) return;
		const target = new Set(hotkey.map((k) => k.toLowerCase()));
		const modFlags: Record<string, 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'> = {
			control: 'ctrlKey',
			alt: 'altKey',
			shift: 'shiftKey',
			meta: 'metaKey'
		};
		let fired = false;

		const held = (e: KeyboardEvent) => {
			// eslint-disable-next-line svelte/prefer-svelte-reactivity -- transient, never read by the view
			const s = new Set<string>([e.key.toLowerCase()]);
			for (const [k, flag] of Object.entries(modFlags)) if (e[flag]) s.add(k);
			return s;
		};
		const match = (e: KeyboardEvent) => [...target].every((k) => held(e).has(k));

		const fire = () => ref?.click();

		const onKeydown = (e: KeyboardEvent) => {
			if (!fired && match(e)) {
				fired = true;
				fire();
			}
		};
		const onKeyup = (e: KeyboardEvent) => {
			if (target.has(e.key.toLowerCase())) fired = false;
		};

		const cleanups = [on(window, 'keydown', onKeydown), on(window, 'keyup', onKeyup)];
		return () => cleanups.forEach((fn) => fn());
	});
</script>

{#if href}
	<a
		bind:this={ref}
		class={`action-button ${className ?? ''}`}
		{href}
		{...restProps as HTMLAnchorAttributes}
	>
		{#if hotkey.length}
			<kbd class="hotkey">
				{hotkey.map((key) => modifiers[key] || key).join('+')}
			</kbd>
		{/if}
		<span class="button-content">
			{@render children?.()}
		</span>
	</a>
{:else}
	<button
		bind:this={ref}
		class={`action-button ${className ?? ''}`}
		{...restProps as HTMLButtonAttributes}
	>
		{#if hotkey.length}
			<kbd class="hotkey">
				{hotkey.map((key) => modifiers[key] || key).join('+')}
			</kbd>
		{/if}
		<span class="button-content">
			{@render children?.()}
		</span>
	</button>
{/if}

<style>
	.action-button {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
		color: inherit;
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		max-width: fit-content;
		border: 0;
		background-color: var(--button-secondary-fg);
		padding: 0 0.125rem; /* px-0.5 */
		user-select: none;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.action-button:hover {
		background-color: var(--focus-ring);
	}

	.action-button:focus {
		outline: none;
		background-color: var(--focus-ring);
	}

	.action-button:disabled,
	.action-button[aria-disabled='true'] {
		pointer-events: none;
		opacity: 0.5;
	}

	.hotkey {
		padding: 0 0.5ch;
		text-transform: uppercase;
		font-family: var(--font-family-mono);
	}

	.button-content {
		margin: 0.125rem 0;
		background-color: var(--button-secondary-bg);
		padding: 0 1ch;
		line-height: 1;
	}
</style>
