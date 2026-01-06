<script lang="ts">
	import Label from '$lib/components/label.svelte';
	import Input from '$lib/components/input.svelte';
</script>

<div class="flex flex-col">
	<Label for="input-empty">EMPTY CASE</Label>
	<Input id="input-empty" />

	<Label for="input-placeholder">PLACEHOLDER</Label>
	<Input id="input-placeholder" placeholder="Enter your text here..." />

	<Label for="input-value">VALUE</Label>
	<Input id="input-value" value="Sample Text" />

	<Label for="input-password">PASSWORD</Label>
	<Input id="input-password" type="password" />

	<Label for="input-caret">CUSTOM CARET</Label>
	<Input id="input-caret" caret="$" />
</div>
