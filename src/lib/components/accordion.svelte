<script lang="ts" module>
	export type AccordionProps = {
		ref?: HTMLElement | null;
		defaultOpen?: boolean;
		title: string;
		children?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	let { ref = $bindable(null), defaultOpen = false, title, children }: AccordionProps = $props();

	let open = $state(defaultOpen);

	const toggle = () => (open = !open);

	const onkeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	};
</script>

<section
	bind:this={ref}
	class="head"
	tabindex="0"
	role="button"
	aria-expanded={open}
	onclick={toggle}
	{onkeydown}
>
	<div class="row {open ? 'active' : ''}">
		<span class="icon" aria-hidden="true">{open ? '▾' : '▸'}</span>
		<span class="content">{title}</span>
	</div>
</section>
{#if open}
	<section class="body">
		{@render children?.()}
	</section>
{/if}

<style>
	.head {
		display: block;
		outline: 0;
		border: 0;
		transition: 200ms ease background;
	}
	.head:hover,
	.head:focus-visible {
		background: var(--focus-ring);
	}
	.head:focus-visible {
		outline: none;
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.row:hover {
		background: var(--focus-ring);
	}

	.icon {
		flex-shrink: 0;
		user-select: none;
		cursor: pointer;
	}

	.content {
		min-width: 10%;
		width: 100%;
		user-select: none;
		cursor: pointer;
		transition: padding 200ms ease;
		padding-left: 0;
	}

	.active .content {
		padding-left: 1ch;
	}

	.body {
		display: block;
		padding-left: 1ch;
	}
</style>
