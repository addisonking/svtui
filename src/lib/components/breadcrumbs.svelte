<script lang="ts" module>
	export type BreadcrumbItem = {
		name: string;
		url?: string;
	};

	export type BreadCrumbsProps = {
		items: BreadcrumbItem[];
	};
</script>

<script lang="ts">
	let { items }: BreadCrumbsProps = $props();
</script>

<nav aria-label="breadcrumb" class="root">
	{#each items as item, i (i)}
		<span class="line">
			{#if i === items.length - 1}
				<span class="current">{item.name}</span>
			{:else if item.url}
				<a class="link" href={item.url}>{item.name}</a>
			{:else}
				<span class="link">{item.name}</span>
			{/if}
			{#if i < items.length - 1}
				<span class="symbol" aria-hidden="true">❯</span>
			{/if}
		</span>
	{/each}
</nav>

<style>
	.root {
		display: inline-block;
	}

	.line {
		display: inline-block;
		line-height: calc(var(--base-line-height) * 1rem);
	}

	.link {
		display: inline-block;
		color: var(--text-primary);
		outline: 0;
		border: 0;
		text-decoration: none;
		background: var(--border-default);
	}

	a.link:hover,
	a.link:focus-visible {
		background: var(--focus-ring);
	}

	a.link:focus-visible {
		outline: none;
	}

	.current {
		display: inline-block;
		color: var(--text-primary);
	}

	.symbol {
		min-width: 1ch;
		display: inline-block;
		margin: 0 1ch;
	}
</style>
