<script lang="ts" module>
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	/** A themed, auto-growing textarea with a fake-caret display mirror and an
	 *  optional `autoPlay` string that types itself out letter by letter. */
	export type TextAreaProps = HTMLTextareaAttributes & {
		ref?: HTMLTextAreaElement | null;
		autoPlay?: string;
		autoPlaySpeedMS?: number;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		autoPlay,
		autoPlaySpeedMS = 40,
		value = $bindable(undefined),
		defaultValue,
		placeholder,
		onchange,
		...restProps
	}: TextAreaProps = $props();

	let textAreaEl = $state<HTMLTextAreaElement>(null!);
	let measureEl = $state<HTMLDivElement>(null!);

	let text = $state(String(defaultValue ?? value ?? ''));
	let isFocused = $state(false);
	let selectionStart = $state(0);
	let currentLineIndex = $state(0);
	let totalLines = $state(0);

	// Keep `ref` in sync with the actual textarea.
	$effect(() => {
		ref = textAreaEl;
	});

	// Restore caret when refocusing / when selection moves while focused.
	$effect(() => {
		if (textAreaEl && isFocused) {
			textAreaEl.setSelectionRange(selectionStart, selectionStart);
		}
	});

	// Controlled value sync.
	$effect(() => {
		if (value !== undefined) {
			const v = String(value);
			text = v;
			selectionStart = v.length;
		}
	});

	// Auto-type the `autoPlay` string out letter by letter.
	$effect(() => {
		if (!autoPlay || value !== undefined || defaultValue !== undefined) return;
		let i = 0;
		text = '';
		const id = setInterval(() => {
			i++;
			if (i > autoPlay.length) {
				clearInterval(id);
				return;
			}
			const next = autoPlay.slice(0, i);
			text = next;
			selectionStart = next.length;
		}, autoPlaySpeedMS);
		return () => clearInterval(id);
	});

	// Auto-size the textarea to its content. Re-runs whenever `text` changes
	// (reactive read) and on window resize.
	$effect(() => {
		// reactive dep: re-run when text changes
		void text;
		if (!textAreaEl) return;
		textAreaEl.style.height = 'auto';
		textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
	});

	$effect(() => {
		const onResize = () => {
			if (!textAreaEl) return;
			textAreaEl.style.height = 'auto';
			textAreaEl.style.height = `${textAreaEl.scrollHeight}px`;
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	// Count rendered lines so arrow-up/down can jump out of the field at the edges.
	$effect(() => {
		if (!measureEl) return;
		const computed = window.getComputedStyle(measureEl);
		const lh = parseFloat(computed.lineHeight) || 20;
		const countLines = (content: string) => {
			// eslint-disable-next-line svelte/no-dom-manipulating -- measurement only, never read by the view
			measureEl.textContent = content || '\u00A0';
			return Math.round(measureEl.offsetHeight / lh);
		};
		const display = text || placeholder || '';
		const before = text.substring(0, selectionStart);
		const total = countLines(display);
		totalLines = total > 0 ? total - 1 : 0;
		const cur = countLines(before);
		currentLineIndex = cur > 0 ? cur - 1 : 0;
	});

	const isFocusable = (el: Element): el is HTMLElement =>
		el.matches(
			'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'
		);
	const moveFocus = (dir: 'next' | 'prev') => {
		const els = Array.from(document.querySelectorAll('*')).filter(isFocusable);
		const i = els.indexOf(document.activeElement as HTMLElement);
		if (i === -1) return;
		const target = dir === 'next' ? els[i + 1] : els[i - 1];
		target?.focus();
	};

	const onInput = (e: Event) => {
		const ta = e.currentTarget as HTMLTextAreaElement;
		text = ta.value;
		value = ta.value;
		selectionStart = ta.selectionStart ?? 0;
	};

	const onSelect = (e: Event) => {
		selectionStart = (e.currentTarget as HTMLTextAreaElement).selectionStart;
	};
	const onFocus = () => {
		isFocused = true;
		if (textAreaEl) selectionStart = textAreaEl.selectionStart;
	};
	const onBlur = () => (isFocused = false);
	const onClick = (e: MouseEvent) => {
		const ta = e.currentTarget as HTMLTextAreaElement;
		ta.focus();
		selectionStart = ta.selectionStart;
	};
	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp' && currentLineIndex === 0) {
			e.preventDefault();
			moveFocus('prev');
		} else if (e.key === 'ArrowDown' && currentLineIndex === totalLines) {
			e.preventDefault();
			moveFocus('next');
		}
	};

	const isPlaceholderVisible = $derived(!text && !!placeholder);
	const beforeCaret = $derived(text.substring(0, selectionStart));
	const afterCaret = $derived(text.substring(selectionStart));
</script>

<div class={`root ${className ?? ''}`} class:focused={isFocused}>
	<div class="displayed {isPlaceholderVisible ? 'placeholder' : ''}">
		{#if isPlaceholderVisible}
			{placeholder}<span class="block {isFocused ? 'blink' : ''}"></span>
		{:else}
			{beforeCaret}<span class="block {isFocused ? 'blink' : ''}"></span>{afterCaret}
		{/if}
	</div>
	<div bind:this={measureEl} class="hidden"></div>
	<textarea
		bind:this={textAreaEl}
		class="hidden-element"
		value={text}
		{placeholder}
		oninput={onInput}
		onselect={onSelect}
		onfocus={onFocus}
		onblur={onBlur}
		onclick={onClick}
		onkeydown={onKeyDown}
		{onchange}
		{...restProps}
	></textarea>
</div>

<style>
	.root {
		display: block;
		position: relative;
	}

	.displayed {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-wrap: anywhere;
		pointer-events: none;
		min-height: calc(var(--font-size) * var(--base-line-height));
	}

	.displayed.placeholder {
		opacity: 0.7;
		font-style: italic;
	}

	.block {
		display: inline-block;
		min-width: 1ch;
		height: calc(var(--font-size) * var(--base-line-height));
		vertical-align: bottom;
		background: var(--text-primary);
	}

	.block.blink {
		animation: svtui-blink 1s step-start 0s infinite;
	}

	.focused .block {
		background: var(--focus-ring);
	}

	.hidden {
		white-space: pre-wrap;
		word-wrap: break-word;
		overflow-wrap: anywhere;
		pointer-events: none;
		position: absolute;
		visibility: hidden;
		width: 100%;
		overflow: auto;
	}

	.hidden-element {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		color: transparent;
		caret-color: transparent;
		border: none;
		outline: none;
		margin: 0;
		padding: 0;
		resize: none;
		overflow: hidden;
		line-height: var(--base-line-height);
		font-size: var(--font-size);
		font-family: inherit;
	}

	@keyframes svtui-blink {
		50% {
			opacity: 0;
		}
	}
</style>
