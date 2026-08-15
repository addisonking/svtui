<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	export type InputProps = Omit<HTMLInputAttributes, 'type'> & {
		ref?: HTMLInputElement | null;
		caret?: string;
		type?: 'text' | 'password';
		bordered?: boolean;
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		caret = '',
		bordered = false,
		autofocus = false,
		value = $bindable(''),
		type = $bindable('text'),
		placeholder = $bindable(''),
		disabled = $bindable(false),
		onkeydown,
		...restProps
	}: InputProps = $props();

	let selectionStart = $state(0);
	let focused = $state(false);

	const fallbackId = `input-${Math.random().toString(36).substring(2, 15)}`;
	const inputId = $derived(restProps.id ?? fallbackId);

	let inputEl: HTMLInputElement;

	$effect(() => {
		ref = inputEl;
		if (autofocus && inputEl) {
			inputEl.focus();
			focused = true;
		}
	});

	const displayStr = $derived.by(() => {
		const str = String(value ?? '');
		return type === 'password' ? '•'.repeat(str.length) : str;
	});

	const beforeCaret = $derived(displayStr.slice(0, selectionStart));
	const caretChar = $derived(caret || (displayStr[selectionStart] ?? ' '));
	const afterCaret = $derived(
		displayStr.length > selectionStart ? displayStr.slice(selectionStart + 1) : ''
	);

	const syncSelection = () => {
		if (inputEl && inputEl.selectionStart !== null) {
			selectionStart = inputEl.selectionStart;
		}
	};

	const onInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		value = input.value;
		selectionStart = input.selectionStart ?? input.value.length;
	};

	const onFocus = () => {
		focused = true;
		syncSelection();
	};

	const onBlur = () => {
		focused = false;
	};
</script>

<div
	class={`displayed ${className ?? ''}`}
	class:focused
	class:bordered
	role="textbox"
	tabindex="-1"
>
	{#if !focused}
		{#if !value && placeholder}
			<span class="placeholder">{placeholder}</span>
		{:else}
			<span class="text-slice">{displayStr}</span>
		{/if}
	{:else if !value && placeholder}
		{#if !disabled}<span class="caret blink">{caret || ' '}</span>{/if}<span class="placeholder"
			>{placeholder}</span
		>
	{:else}
		<span class="text-slice">{beforeCaret}</span>{#if !disabled}<span class="caret blink"
				>{caretChar}</span
			>{/if}<span class="text-slice">{afterCaret}</span>
	{/if}

	<input
		id={inputId}
		bind:this={inputEl}
		{type}
		bind:value
		class="native-input"
		oninput={onInput}
		onfocus={onFocus}
		onblur={onBlur}
		onselect={syncSelection}
		onselectionchange={syncSelection}
		onkeyup={syncSelection}
		onclick={syncSelection}
		{onkeydown}
		{disabled}
		{...restProps}
	/>
</div>

<style>
	.displayed {
		background: var(--surface-base);
		color: var(--text-primary);
		cursor: text;
		white-space: pre;
		position: relative;
		display: flex;
		align-items: center;
		padding: 0 1ch;
		height: var(--line);
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		box-sizing: border-box;
		overflow: hidden;
	}

	.displayed.bordered {
		box-shadow: inset 0 0 0 1px var(--border-default);
	}

	.displayed.bordered.focused {
		box-shadow: inset 0 0 0 2px var(--focus-ring);
	}

	.placeholder {
		color: var(--button-muted);
		font-style: italic;
		pointer-events: none;
		user-select: none;
	}

	.text-slice {
		pointer-events: none;
		user-select: none;
	}

	.caret {
		display: inline-block;
		min-width: 1ch;
		height: var(--line);
		line-height: var(--line);
		vertical-align: middle;
		pointer-events: none;
		user-select: none;
		background: var(--text-primary);
		color: var(--surface-base);
	}

	.caret.blink {
		animation: blink 1s step-start infinite;
	}

	.native-input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: text;
		margin: 0;
		padding: 0 1ch;
		border: 0;
		outline: 0;
		background: transparent;
		color: transparent;
		caret-color: transparent;
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	@keyframes blink {
		50% {
			background: transparent;
			color: inherit;
		}
	}
</style>
