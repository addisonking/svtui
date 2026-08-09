<script lang="ts">
	import Navigation from '$lib/components/navigation.svelte';
	import ActionButton from '$lib/components/action-button.svelte';
</script>

<Navigation logoHref="#">
	{#snippet logo()}svtui{/snippet}
	{#snippet left()}
		<ActionButton>files</ActionButton>
	{/snippet}
	{#snippet right()}
		<ActionButton>settings</ActionButton>
	{/snippet}
</Navigation>
