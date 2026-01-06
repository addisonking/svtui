<script lang="ts">
	import Checkbox from '$lib/components/checkbox.svelte';

	let agreed = $state(false);
	let newsletter = $state(true);
</script>

<div class="flex flex-col">
	<Checkbox bind:checked={agreed}>I agree to the terms and conditions</Checkbox>
	<Checkbox bind:checked={newsletter}>Subscribe to newsletter</Checkbox>
	<Checkbox checked={true} disabled>This option is locked (disabled)</Checkbox>
	<Checkbox>Unchecked by default</Checkbox>
</div>
