<script lang="ts">
	import Accordion from '$lib/components/accordion.svelte';
	import Text from '$lib/components/text.svelte';
</script>

<div class="flex flex-col gap-2">
	<Accordion title="README.md">
		<Text>The self-contained file you can copy into any project.</Text>
	</Accordion>
	<Accordion title="package.json" defaultOpen>
		<Text>Dependencies live here.</Text>
	</Accordion>
</div>
