<script lang="ts">
	import Accordion from '$lib/components/accordion.svelte';
</script>

<div class="flex flex-col gap-2">
	<Accordion title="README.md">
		<p>The self-contained file you can copy into any project.</p>
	</Accordion>
	<Accordion title="package.json" defaultOpen>
		<p>Dependencies live here.</p>
	</Accordion>
</div>
