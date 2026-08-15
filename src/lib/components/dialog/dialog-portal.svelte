<script lang="ts" module>
	import type { DialogPortalProps as BitsDialogPortalProps } from 'bits-ui';

	export type DialogPortalProps = BitsDialogPortalProps;
</script>

<script lang="ts">
	import { Dialog } from 'bits-ui';

	let { children, ...restProps }: DialogPortalProps = $props();
</script>

<Dialog.Portal {...restProps}>
	{@render children?.()}
</Dialog.Portal>
