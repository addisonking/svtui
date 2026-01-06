<script lang="ts">
	import Card from '$lib/components/card.svelte';
</script>

<div class="flex flex-col gap-4">
	<Card title="LEFT ALIGNED">
		<p>Card content with left-aligned title (default).</p>
	</Card>

	<Card title="RIGHT ALIGNED" alignTitle="right">
		<p>Card content with right-aligned title.</p>
	</Card>

	<Card>
		<p>Card without a title.</p>
	</Card>
</div>
