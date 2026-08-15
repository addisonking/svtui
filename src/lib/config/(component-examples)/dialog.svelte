<script lang="ts">
	import * as Dialog from '$lib/components/dialog/index.js';
</script>

<div>
	<Dialog.Root>
		<Dialog.Trigger>Open Dialog</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay />
			<Dialog.Content>
				<Dialog.Title>System Notice</Dialog.Title>
				<Dialog.Description>
					This is a terminal-aesthetic dialog built with bits-ui primitives.
				</Dialog.Description>
				<div class="flex justify-end gap-2">
					<Dialog.Close>Close</Dialog.Close>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>
