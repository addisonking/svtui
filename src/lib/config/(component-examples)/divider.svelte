<script lang="ts">
	import Divider from '$lib/components/divider.svelte';
	import Text from '$lib/components/text.svelte';
</script>

<div class="flex flex-col gap-2">
	<Text>DEFAULT</Text>
	<Divider />
	<Text>DOUBLE</Text>
	<Divider type="DOUBLE" />
	<Text>GRADIENT</Text>
	<Divider type="GRADIENT" />
</div>
