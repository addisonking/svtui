<script lang="ts">
	import BarProgress from '$lib/components/bar-progress.svelte';
</script>

<div class="flex flex-col gap-2 w-full">
	<BarProgress progress={60} />
	<BarProgress intervalRate={100} fillChar="█" />
</div>
