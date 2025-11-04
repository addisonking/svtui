<script lang="ts">
	import ActionButton from '$lib/components/action-button/action-button.svelte';
</script>

<div class="flex flex-col">
	<ActionButton hotkey={['control', 's']} onclick={() => console.log('Save action triggered')}>
		SAVE
	</ActionButton>
	<ActionButton onclick={() => console.log('No hotkey action triggered')}>NO HOTKEY</ActionButton>
	<ActionButton
		href="https://svelte.dev"
		hotkey={['control', 'e']}
		target="_blank"
		rel="noopener noreferrer"
	>
		GO TO SVELTE.DEV
	</ActionButton>
</div>
