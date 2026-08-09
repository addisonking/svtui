<script lang="ts">
	import Indent from '$lib/components/indent.svelte';
	import Text from '$lib/components/text.svelte';
</script>

<Text>level 0</Text>
<Indent>
	<Text>level 1</Text>
	<Indent>
		<Text>level 2</Text>
	</Indent>
</Indent>
