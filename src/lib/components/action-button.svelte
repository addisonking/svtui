<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { PressedKeys } from 'runed';

	export type ActionButtonProps = HTMLButtonAttributes &
		HTMLAnchorAttributes & {
			ref?: HTMLElement | null;
			hotkey?: string[];
		};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		hotkey = [],
		children,
		...restProps
	}: ActionButtonProps = $props();

	const modifiers: Record<string, string> = {
		control: '⌃',
		alt: '⌥',
		shift: '⇧',
		meta: '⌘'
	};

	const keys = new PressedKeys();
	if (hotkey.length) {
		keys.onKeys(hotkey, () => {
			if (restProps.onclick) {
				restProps.onclick();
			} else if (restProps.href) {
				if (restProps.target === '_blank') {
					window.open(restProps.href, '_blank');
					return;
				}
				window.location.href = restProps.href;
			}
		});
	}
</script>

{#if restProps.href}
	<a bind:this={ref} class={`action-button ${className ?? ''}`} {...restProps}>
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
	<button bind:this={ref} class={`action-button ${className ?? ''}`} {...restProps}>
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
		font-family: monospace;
	}

	.button-content {
		margin: 0.125rem 0;
		background-color: var(--button-secondary-bg);
		padding: 0 1ch;
		line-height: 1;
	}
</style>
