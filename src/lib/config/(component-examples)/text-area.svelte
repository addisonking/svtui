<script lang="ts">
	import TextArea from '$lib/components/text-area.svelte';
</script>

<div class="flex flex-col gap-2 w-full">
	<TextArea placeholder="Type something…" />
	<TextArea autoPlay="#!/bin/sh\necho hello, world\n" autoPlaySpeedMS={60} />
</div>
