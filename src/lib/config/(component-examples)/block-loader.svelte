<script lang="ts">
	import BlockLoader from '$lib/components/block-loader.svelte';
</script>

<div class="flex flex-row flex-wrap gap-4 items-center">
	<BlockLoader mode={0} />
	<BlockLoader mode={1} />
	<BlockLoader mode={2} />
	<BlockLoader mode={4} />
	<BlockLoader mode={5} />
</div>
