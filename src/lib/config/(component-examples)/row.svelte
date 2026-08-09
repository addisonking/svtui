<script lang="ts">
	import Row from '$lib/components/row.svelte';
	import Badge from '$lib/components/badge.svelte';
</script>

<div class="flex flex-col gap-2">
	<Row tabindex={0}>A row — focus to highlight</Row>
	<Row tabindex={0}><Badge>with a badge</Badge></Row>
</div>
