<script lang="ts" module>
	import type { HTMLAnchorAttributes, HTMLAttributes } from 'svelte/elements';

	/**
	 * A square avatar tile. Renders a background image when `src` is set, else a
	 * placeholder block. Renders `<a>` when `href` is set, `<figure>` otherwise —
	 * `href` discriminates the allowed attributes. When `children` is provided,
	 * the avatar is wrapped in a flex row with the children beside it.
	 */
	export type AvatarProps =
		| (HTMLAttributes<HTMLDivElement> & {
				ref?: HTMLElement | null;
				src?: string;
				href?: undefined;
				target?: string;
		  })
		| (HTMLAnchorAttributes & {
				ref?: HTMLElement | null;
				src?: string;
				href: string;
				target?: string;
		  });
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		src,
		href,
		target,
		style,
		children,
		...restProps
	}: AvatarProps = $props();

	const backgroundStyle = $derived(src ? `background-image: url(${src})` : '');
	const tileStyle = $derived(
		`${backgroundStyle}${backgroundStyle && style ? ';' : ''}${style ?? ''}`
	);
	const tileClass = $derived(`tile ${src ? '' : 'placeholder'} ${className ?? ''}`.trim());
</script>

{#if children}
	<div class="parent" {...restProps as HTMLAttributes<HTMLDivElement>}>
		{#if href}
			<a bind:this={ref} class="tile" style={tileStyle} {href} {target} aria-label="avatar"></a>
		{:else}
			<figure bind:this={ref} class="tile" style={tileStyle}></figure>
		{/if}
		<span class="right">
			{@render children?.()}
		</span>
	</div>
{:else if href}
	<a
		bind:this={ref}
		class={tileClass}
		style={tileStyle}
		{href}
		{target}
		aria-label="avatar"
		{...restProps as HTMLAnchorAttributes}
	></a>
{:else}
	<figure
		bind:this={ref}
		class={tileClass}
		style={tileStyle}
		{...restProps as HTMLAttributes<HTMLElement>}
	></figure>
{/if}

<style>
	.parent {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.right {
		min-width: 10%;
		width: 100%;
	}

	.tile,
	a.tile {
		display: inline-block;
		width: 4ch;
		height: calc(var(--line) * 2);
		vertical-align: bottom;
		flex-shrink: 0;
		position: relative;
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
	}

	.tile.placeholder {
		background: var(--border-muted);
	}

	.tile::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		opacity: 0;
		background: var(--focus-ring);
		transition: opacity 0.2s ease-in-out;
	}

	.tile:hover::before,
	.tile:active::before,
	.tile:focus-visible::before {
		opacity: 0.5;
	}

	.tile:focus-visible {
		outline: none;
	}
</style>
