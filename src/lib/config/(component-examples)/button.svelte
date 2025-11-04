<script lang="ts" module>
	import Button from '$lib/components/button/button.svelte';
</script>

<div class="flex flex-col">
	<Button onclick={() => console.log('primary button action')}>PRIMARY BUTTON</Button>
	<Button variant="secondary" onclick={() => console.log('secondary button action')}
		>SECONDARY BUTTON
	</Button>
	<Button onclick={() => console.log('disabled button action')} disabled={true}
		>DISABLED BUTTON
	</Button>
	<Button variant="primary" href="https://svelte.dev" target="_blank" rel="noopener noreferrer"
		>LINK BUTTON
	</Button>
</div>
