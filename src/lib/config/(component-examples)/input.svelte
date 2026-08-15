<script lang="ts">
	import Input from '$lib/components/input.svelte';
</script>

<div class="flex flex-col gap-2">
	<label for="input-empty">EMPTY CASE</label>
	<Input id="input-empty" />

	<label for="input-placeholder">PLACEHOLDER</label>
	<Input id="input-placeholder" placeholder="Enter your text here..." />

	<label for="input-value">VALUE</label>
	<Input id="input-value" value="Sample Text" />

	<label for="input-password">PASSWORD</label>
	<Input id="input-password" type="password" />

	<label for="input-caret">CUSTOM CARET</label>
	<Input id="input-caret" caret="$" />
</div>
