<script lang="ts">
	import Divider from '$lib/components/divider.svelte';
</script>

<div class="flex flex-col gap-2">
	<p>DEFAULT</p>
	<Divider />
	<p>DOUBLE</p>
	<Divider type="DOUBLE" />
	<p>GRADIENT</p>
	<Divider type="GRADIENT" />
</div>
