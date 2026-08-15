<script lang="ts" module>
	import type { DialogRootProps as BitsDialogRootProps } from 'bits-ui';

	export type DialogRootProps = BitsDialogRootProps;
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { children, ...restProps }: DialogRootProps = $props();
</script>

<Dialog.Root {...restProps}>
	{@render children?.()}
</Dialog.Root>
