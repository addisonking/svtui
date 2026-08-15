<script lang="ts">
	import Input from '$lib/components/input.svelte';
</script>

<div class="flex flex-col gap-2">
	<label for="input-empty">EMPTY CASE</label>
	<Input id="input-empty" bordered />

	<label for="input-placeholder">PLACEHOLDER</label>
	<Input id="input-placeholder" bordered placeholder="Enter your text here..." />

	<label for="input-value">VALUE</label>
	<Input id="input-value" bordered value="Sample Text" />

	<label for="input-password">PASSWORD</label>
	<Input id="input-password" bordered type="password" />

	<label for="input-caret">CUSTOM CARET</label>
	<Input id="input-caret" bordered caret="$" />

	<label for="input-bare">BORDERLESS (DEFAULT)</label>
	<Input id="input-bare" value="No border" />
</div>
