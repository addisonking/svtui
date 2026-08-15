<script lang="ts">
	import Tabs from '$lib/components/tabs.svelte';

	let active1 = $state('editor');
	let active2 = $state('logs');
	let active3 = $state('preview');

	const items = [
		{ value: 'editor', label: 'input.svelte', count: 3 },
		{ value: 'logs', label: 'build.log' },
		{ value: 'preview', label: 'Preview' },
		{ value: 'disabled', label: 'Archived', disabled: true }
	];
</script>

<div class="space-y-6">
	<div>
		<div class="text-xs opacity-50">LINE (DEFAULT / BUFFERLINE):</div>
		<Tabs {items} bind:value={active1} variant="line" />
	</div>

	<div>
		<div class="text-xs opacity-50">BLOCK:</div>
		<Tabs {items} bind:value={active2} variant="block" />
	</div>

	<div>
		<div class="text-xs opacity-50">BRACKET:</div>
		<Tabs {items} bind:value={active3} variant="bracket" />
	</div>
</div>
