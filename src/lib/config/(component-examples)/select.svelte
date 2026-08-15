<script lang="ts">
	import Select from '$lib/components/select.svelte';

	let model = $state('gemini-3.7-flash');
	let branch = $state('main');

	const modelOptions = [
		{ value: 'gemini-3.7-flash', label: 'Gemini 3.7 Flash' },
		{ value: 'gemini-3.7-pro', label: 'Gemini 3.7 Pro' },
		{ value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet' },
		{ value: 'legacy-model', label: 'GPT-3.5 (Deprecated)', disabled: true }
	];

	const branchOptions = ['main', 'feat-tui-components', 'hotfix-grid', 'staging'];
</script>

<div class="flex flex-wrap items-center gap-6">
	<div class="flex flex-col gap-1">
		<span class="text-xs opacity-60">AI Model:</span>
		<Select items={modelOptions} bind:value={model} />
	</div>

	<div class="flex flex-col gap-1">
		<span class="text-xs opacity-60">Git Branch:</span>
		<Select items={branchOptions} bind:value={branch} />
	</div>

	<div class="flex flex-col gap-1">
		<span class="text-xs opacity-60">Disabled:</span>
		<Select items={['One', 'Two']} disabled />
	</div>
</div>
