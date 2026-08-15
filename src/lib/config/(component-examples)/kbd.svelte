<script lang="ts">
	import Kbd from '$lib/components/kbd.svelte';
</script>

<div class="flex flex-wrap items-center gap-4">
	<div class="flex items-center gap-2">
		<span class="opacity-70">Default:</span>
		<Kbd>⌘</Kbd>
		<Kbd>K</Kbd>
		<Kbd>Ctrl</Kbd>
		<Kbd>Shift</Kbd>
		<Kbd>P</Kbd>
	</div>

	<div class="flex items-center gap-2">
		<span class="opacity-70">Bracket:</span>
		<Kbd variant="bracket">Enter</Kbd>
		<Kbd variant="bracket">Esc</Kbd>
		<Kbd variant="bracket">:w</Kbd>
	</div>

	<div class="flex items-center gap-2">
		<span class="opacity-70">Subtle:</span>
		<Kbd variant="subtle">Tab</Kbd>
		<Kbd variant="subtle">Space</Kbd>
	</div>
</div>
