<script lang="ts">
	import RadioButton from '$lib/components/radio-button.svelte';

	let picked = $state('a');
	const choose = (v: string) => (picked = v);
</script>

<div class="flex flex-col gap-1">
	<RadioButton name="letters" value="a" selected={picked === 'a'} onSelect={choose}>
		Apple
	</RadioButton>
	<RadioButton name="letters" value="b" selected={picked === 'b'} onSelect={choose}>
		Banana
	</RadioButton>
	<RadioButton name="letters" value="c" selected={picked === 'c'} onSelect={choose}>
		Cherry
	</RadioButton>
</div>
