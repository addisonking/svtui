<script lang="ts">
	import RadioButtonGroup from '$lib/components/radio-button-group.svelte';
</script>

<RadioButtonGroup
	defaultValue="terminal"
	options={[
		{ value: 'terminal', label: 'Terminal' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'browser', label: 'Browser' }
	]}
/>
