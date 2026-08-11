<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';

	export type DividerProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		type?: 'DEFAULT' | 'DOUBLE' | 'GRADIENT';
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		type = 'DEFAULT',
		...restProps
	}: DividerProps = $props();
</script>

{#if type === 'GRADIENT'}
	<div class="gradient {className ?? ''}" bind:this={ref} {...restProps}></div>
{:else if type === 'DOUBLE'}
	<div class="divider {className ?? ''}" bind:this={ref} {...restProps}>
		<div class="line" style="margin-bottom: 2px"></div>
		<div class="line"></div>
	</div>
{:else}
	<div class="divider {className ?? ''}" bind:this={ref} {...restProps}>
		<div class="line"></div>
	</div>
{/if}

<style>
	.gradient {
		background: linear-gradient(to right, transparent, var(--border-default), transparent);
		height: var(--line);
		width: 100%;
	}

	.divider {
		align-items: center;
		border: 0;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		height: var(--line);
		justify-content: center;
		outline: 0;
		width: 100%;
	}

	.line {
		background: var(--text-primary);
		display: block;
		flex-shrink: 0;
		height: 2px;
		width: 100%;
	}
</style>
