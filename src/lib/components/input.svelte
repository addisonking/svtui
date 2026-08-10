<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';

	// `type` is narrowed: the caret overlay only renders sensibly for text-like input.
	export type InputProps = Omit<HTMLInputAttributes, 'type'> & {
		ref?: HTMLInputElement | null;
		caret?: string;
		type?: 'text' | 'password';
	};
</script>

<script lang="ts">
	let {
		class: className,
		ref = $bindable(null),
		caret = '',
		value = $bindable(''),
		type = $bindable('text'),
		placeholder = $bindable(''),
		disabled = $bindable(false),
		...restProps
	}: InputProps = $props();

	let selectionStart = $state(0);
	let focused = $state(false);

	const fallbackId = `input-${Math.random().toString(36).substring(2, 15)}`;
	const inputId = $derived(restProps.id ?? fallbackId);

	let beforeCaret = $state('');
	let afterCaret = $state('');

	let inputEl: HTMLInputElement;

	const updateCaret = () => {
		const displayValue = type === 'password' ? '•'.repeat(value?.length ?? 0) : (value ?? '');
		beforeCaret = displayValue.slice(0, selectionStart);
		afterCaret = displayValue.slice(selectionStart);
	};

	const onInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		value = input.value;
		selectionStart = input.selectionStart ?? 0;
		updateCaret();
	};

	const onSelectionChange = () => {
		if (inputEl.selectionStart === inputEl.selectionEnd) {
			selectionStart = inputEl.selectionStart ?? 0;
			updateCaret();
		}
	};

	const onFocus = () => {
		focused = true;
		inputEl?.focus();
	};

	const onBlur = () => {
		focused = false;
	};

	// Repaint the caret overlay whenever the value or selection moves.
	$effect(updateCaret);
</script>

<div
	class={`displayed ${className ?? ''}`}
	onfocus={onFocus}
	onblur={onBlur}
	onclick={() => inputEl?.focus()}
	onkeydown={(e) => e.key === 'Enter' && inputEl?.focus()}
	role="textbox"
	tabindex="0"
>
	{#if !value && !focused && placeholder}
		<span class="placeholder">{placeholder}</span>
	{:else}
		{beforeCaret}
		{#if !disabled}
			<span
				class="caret {focused ? 'blink' : ''}"
				style="background-color: {focused
					? 'color-mix(in srgb, var(--text-primary) 90%, var(--surface-base) 10%)'
					: 'var(--text-primary)'}">{caret || ' '}</span
			>
		{/if}
		{afterCaret}
	{/if}

	<input
		id={inputId}
		bind:this={inputEl}
		{type}
		bind:value
		style="position: absolute; opacity: 0; height: 0; width: 0"
		oninput={onInput}
		onfocus={onFocus}
		onblur={onBlur}
		onselectionchange={onSelectionChange}
		{disabled}
		{...restProps}
	/>
</div>

<style>
	.label {
		background: var(--border-default);
		display: block;
	}

	.displayed {
		box-shadow: inset 0 0 0 2px var(--border-default);
		background: var(--border-muted);
		color: var(--text-primary);
		cursor: text;
		white-space: pre;
		position: relative;
		display: block;
	}

	.placeholder {
		color: var(--button-muted);
		font-style: italic;
		pointer-events: none;
		user-select: none;
	}

	.caret {
		display: inline-block;
		background: var(--text-primary);
		color: var(--surface-base);
		min-width: 1ch;
		margin-left: -1ch;
		margin-right: -1ch;
		vertical-align: bottom;
	}

	.caret.blink {
		animation: blink 1s step-start infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
