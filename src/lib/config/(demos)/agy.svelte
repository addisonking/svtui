<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import CodeBlock from '$lib/components/code-block.svelte';
	import BlockLoader from '$lib/components/block-loader.svelte';
	import Accordion from '$lib/components/accordion.svelte';
	import Input from '$lib/components/input.svelte';
	import Divider from '$lib/components/divider.svelte';
	import RadioButtonGroup, { type RadioOption } from '$lib/components/radio-button-group.svelte';
	import * as Dialog from '$lib/components/dialog/index.js';
	import Button from '$lib/components/button.svelte';

	// ── Types ─────────────────────────────────────────────
	type Step = {
		id: string;
		kind: 'user' | 'thinking' | 'tool' | 'response' | 'system' | 'interview';
		text?: string;
		thinkDuration?: number;
		thinkContent?: string;
		toolName?: string;
		toolArgs?: string;
		toolOutput?: string;
		question?: string;
		options?: RadioOption[];
	};

	// ── State ─────────────────────────────────────────────
	let inputVal = $state('');
	let isRunning = $state(false);
	let steps = $state<Step[]>([]);
	let feedEl: HTMLDivElement;
	let promptEl: HTMLDivElement;

	let dialogOpen = $state(false);
	let pendingCmd = $state('');

	const uid = () => Math.random().toString(36).slice(2);

	function scroll() {
		setTimeout(() => promptEl?.scrollIntoView({ block: 'nearest' }), 30);
	}

	function push(...s: Step[]) {
		steps = [...steps, ...s];
		scroll();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			submit();
		}
	}

	function submit() {
		const text = inputVal.trim();
		if (!text || isRunning) return;
		inputVal = '';

		push({ id: uid(), kind: 'user', text });

		if (text === '/clear') {
			steps = [];
			return;
		}

		if (text === '/plan') return doPlan();
		if (text === '/tools') return doTools();
		if (text === '/grill-me') return doInterview();

		if (/\b(rm\s+-rf|delete|deploy|publish)\b/i.test(text)) {
			pendingCmd = text;
			dialogOpen = true;
			return;
		}

		doNaturalTask(text);
	}

	// ── Simulated flows ──────────────────────────────────

	function doPlan() {
		isRunning = true;
		scroll();
		setTimeout(() => {
			push(
				{
					id: uid(),
					kind: 'thinking',
					thinkDuration: 2,
					thinkContent: "The user wants a plan. I'll outline the implementation steps."
				},
				{
					id: uid(),
					kind: 'response',
					text: `Here's my implementation plan:

1. Survey existing component files in \`src/lib/components/\`
2. Validate self-containment with \`flatten.ts\`
3. Run \`bun run check\` and \`bun run build\`
4. Commit changes to feature branch

I'll start with step 1.`
				}
			);
			isRunning = false;
		}, 1200);
	}

	function doTools() {
		isRunning = true;
		scroll();
		setTimeout(() => {
			push(
				{ id: uid(), kind: 'thinking', thinkDuration: 1, thinkContent: 'Simple lookup.' },
				{
					id: uid(),
					kind: 'tool',
					toolName: 'ListDir',
					toolArgs: '~/code/svtui/src/lib/components',
					toolOutput: `accordion.svelte      alert-banner.svelte   ascii-canvas.svelte
badge.svelte          bar-progress.svelte   block-loader.svelte
breadcrumbs.svelte    button.svelte         card.svelte
checkbox.svelte       code-block.svelte     dialog/
divider.svelte        input.svelte          navigation.svelte
radio-button-group.svelte  table/           text-area.svelte

6 directories, 15 files.`
				},
				{
					id: uid(),
					kind: 'response',
					text: 'There are 21 components total — 15 single-file `.svelte` components plus `dialog/` and `table/` multi-file components.'
				}
			);
			isRunning = false;
		}, 1000);
	}

	function doInterview() {
		push({
			id: uid(),
			kind: 'interview',
			question: 'How should privileged shell commands be gated during autonomous execution?',
			options: [
				{ value: 'confirm', label: 'Ask for confirmation each time' },
				{ value: 'session', label: 'Approve all for this session' },
				{ value: 'dryrun', label: 'Dry-run only (no execution)' }
			]
		});
	}

	function doNaturalTask(instruction: string) {
		isRunning = true;
		scroll();

		setTimeout(() => {
			push({
				id: uid(),
				kind: 'thinking',
				thinkDuration: 3,
				thinkContent: `The user wants to "${instruction}". I'll search the codebase first, then make targeted edits.`
			});
			scroll();

			setTimeout(() => {
				push({
					id: uid(),
					kind: 'tool',
					toolName: 'Search',
					toolArgs: `"export default" in src/lib/components`,
					toolOutput: `src/lib/components/button.svelte
src/lib/components/card.svelte
src/lib/components/input.svelte
src/lib/components/code-block.svelte`
				});
				scroll();

				setTimeout(() => {
					push(
						{
							id: uid(),
							kind: 'tool',
							toolName: 'Edit',
							toolArgs: 'src/lib/components/input.svelte',
							toolOutput: `--- a/src/lib/components/input.svelte
+++ b/src/lib/components/input.svelte
@@ -42,2 +42,4 @@
+  const displayStr = $derived(
+    type === 'password' ? '•'.repeat(value.length) : value
+  );`
						},
						{
							id: uid(),
							kind: 'response',
							text: `Done. Applied edit to \`input.svelte\`. All checks pass.`
						}
					);
					isRunning = false;
				}, 600);
			}, 800);
		}, 600);
	}

	function approveDialog() {
		dialogOpen = false;
		const cmd = pendingCmd;
		pendingCmd = '';
		isRunning = true;
		scroll();
		setTimeout(() => {
			push({ id: uid(), kind: 'system', text: `Ran \`${cmd}\` — exited with code 0.` });
			isRunning = false;
		}, 600);
	}

	function rejectDialog() {
		dialogOpen = false;
		pendingCmd = '';
		push({ id: uid(), kind: 'system', text: 'Aborted by user.' });
	}
</script>

<div class="agy-terminal">
	<!-- ── HEADER ────────────────────────────────── -->
	<header class="header">
		<pre class="logo">      <span style="color:rgb(219,177,49)">▄</span><span
				style="color:rgb(242,146,46);background-color:rgb(246,145,46)">▀</span
			><span style="color:rgb(240,114,54);background-color:rgb(243,115,55)">▀</span><span
				style="color:rgb(240,88,59)">▄</span
			>
     <span style="color:rgb(158,195,69);background-color:rgb(134,198,78)">▀</span><span
				style="color:rgb(181,180,62);background-color:rgb(117,180,94)">▀</span
			><span style="color:rgb(226,153,61);background-color:rgb(204,149,77)">▀</span><span
				style="color:rgb(246,122,52);background-color:rgb(239,121,71)">▀</span
			><span style="color:rgb(248,106,53);background-color:rgb(225,102,82)">▀</span><span
				style="color:rgb(239,84,66);background-color:rgb(225,79,89)">▀</span
			>
    <span style="color:rgb(124,194,81);background-color:rgb(128,198,84)">▀</span><span
				style="color:rgb(113,194,92);background-color:rgb(84,184,129)">▀</span
			><span style="color:rgb(92,169,143);background-color:rgb(64,151,222)">▀</span><span
				style="color:rgb(92,145,179)">▀</span
			><span style="color:rgb(131,115,176)">▀</span><span
				style="color:rgb(116,111,195);background-color:rgb(74,126,228)">▀</span
			><span style="color:rgb(153,93,168);background-color:rgb(112,110,206)">▀</span><span
				style="color:rgb(156,91,151);background-color:rgb(143,100,180)">▀</span
			>
   <span style="color:rgb(109,198,148)">▄</span><span
				style="color:rgb(97,195,125);background-color:rgb(98,186,213)">▀</span
			><span style="color:rgb(67,174,171);background-color:rgb(71,168,220)">▀</span>    <span
				style="color:rgb(74,128,234);background-color:rgb(61,137,251)">▀</span
			><span style="color:rgb(108,115,216);background-color:rgb(74,129,240)">▀</span><span
				style="color:rgb(101,121,225)">▄</span
			>
  <span style="color:rgb(103,185,244)">▄</span><span
				style="color:rgb(107,199,163);background-color:rgb(100,182,246)">▀</span
			><span style="color:rgb(100,182,246)">▀</span>      <span style="color:rgb(56,134,251)"
				>▀</span
			><span style="color:rgb(72,129,244);background-color:rgb(56,131,249)">▀</span><span
				style="color:rgb(61,133,252)">▄</span
			></pre>
		<div class="header-meta">
			<span class="meta-line">Antigravity CLI 1.1.13</span>
			<span class="meta-line dim">user@example.com (Google AI Pro)</span>
			<span class="meta-line">Gemini 3.7 Flash · High</span>
			<span class="meta-line dim">~/code/svtui</span>
		</div>
	</header>

	<!-- ── FEED ──────────────────────────────────── -->
	<div class="feed" class:has-items={steps.length > 0 || isRunning} bind:this={feedEl}>
		{#each steps as step (step.id)}
			<!-- USER INPUT -->
			{#if step.kind === 'user'}
				<Divider />
				<div class="user-line">
					<span class="prompt">&gt;</span>
					<span class="user-text">{step.text}</span>
				</div>

				<!-- THINKING -->
			{:else if step.kind === 'thinking'}
				<div class="thinking">
					<Accordion title="Thought for {step.thinkDuration}s">
						<span class="dim">{step.thinkContent}</span>
					</Accordion>
				</div>

				<!-- TOOL CALL -->
			{:else if step.kind === 'tool'}
				<div class="tool-line">
					<Accordion title="{step.toolName}({step.toolArgs})">
						<pre class="tool-output">{step.toolOutput}</pre>
					</Accordion>
				</div>

				<!-- RESPONSE -->
			{:else if step.kind === 'response'}
				<div class="response">
					<pre class="response-text">{step.text}</pre>
				</div>

				<!-- SYSTEM -->
			{:else if step.kind === 'system'}
				<div class="system-msg">
					<span class="dim">{step.text}</span>
				</div>

				<!-- INTERVIEW -->
			{:else if step.kind === 'interview'}
				<div class="interview-box">
					<Card title="Question">
						<p class="q-text">{step.question}</p>
						<RadioButtonGroup defaultValue="confirm" options={step.options ?? []} />
					</Card>
				</div>
			{/if}
		{/each}

		{#if isRunning}
			<div class="loader-line">
				<BlockLoader />
			</div>
		{/if}
	</div>

	<!-- ── BOTTOM PROMPT ─────────────────────────── -->
	<Divider />
	<div class="prompt-row" bind:this={promptEl}>
		<span class="prompt">&gt;</span>
		<div class="input-wrap">
			<Input
				id="agy-input-demo"
				placeholder=""
				autofocus
				bind:value={inputVal}
				onkeydown={handleKey}
				disabled={isRunning}
			/>
		</div>
	</div>
	<Divider />
	<div class="status-bar">
		<span class="dim">? for shortcuts (/plan, /tools, /grill-me)</span>
		<span class="dim">Gemini 3.7 Flash · High</span>
	</div>

	<!-- ── PERMISSION DIALOG ─────────────────────── -->
	<Dialog.Root open={dialogOpen} onOpenChange={(v) => (dialogOpen = v)}>
		<Dialog.Portal>
			<Dialog.Overlay />
			<Dialog.Content>
				<Dialog.Title>Permission required</Dialog.Title>
				<Dialog.Description>Allow this command to run?</Dialog.Description>
				<div class="dialog-cmd">
					<CodeBlock code={`$ ${pendingCmd}`} />
				</div>
				<div class="dialog-actions">
					<Button variant="secondary" onclick={rejectDialog}>Reject</Button>
					<Button variant="primary" onclick={approveDialog}>Allow</Button>
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
</div>

<style>
	.agy-terminal {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-family: var(--font-family-mono);
		font-size: var(--font-size);
		line-height: var(--line);
		color: var(--text-primary);
	}

	.header {
		display: flex;
		gap: 3ch;
		align-items: flex-start;
		margin-bottom: var(--line);
		height: calc(var(--line) * 5);
	}

	.logo {
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line);
		white-space: pre;
		flex-shrink: 0;
		height: calc(var(--line) * 5);
		animation: rgb-breathe 6s ease-in-out infinite;
		will-change: filter, opacity;
	}

	@keyframes rgb-breathe {
		0% {
			filter: hue-rotate(0deg) brightness(0.9);
			opacity: 0.9;
		}
		50% {
			filter: hue-rotate(180deg) brightness(1.25);
			opacity: 1;
		}
		100% {
			filter: hue-rotate(360deg) brightness(0.9);
			opacity: 0.9;
		}
	}

	.header-meta {
		display: flex;
		flex-direction: column;
		height: calc(var(--line) * 5);
	}

	.meta-line {
		height: var(--line);
		line-height: var(--line);
	}

	.dim {
		opacity: 0.5;
	}

	.feed {
		display: flex;
		flex-direction: column;
	}

	.feed.has-items {
		margin-bottom: var(--line);
	}

	.user-line {
		display: flex;
		gap: 1ch;
		height: var(--line);
		line-height: var(--line);
		margin-bottom: var(--line);
	}

	.user-text {
		height: var(--line);
		line-height: var(--line);
	}

	.prompt {
		color: var(--text-primary);
		font-weight: bold;
		user-select: none;
		flex-shrink: 0;
		width: 1ch;
		height: var(--line);
		line-height: var(--line);
	}

	.thinking,
	.tool-line {
		display: flex;
		flex-direction: column;
	}

	.tool-output {
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line);
		white-space: pre-wrap;
		word-break: break-word;
		padding: 0 2ch;
	}

	.response {
		display: flex;
		flex-direction: column;
	}

	.response-text {
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--line);
		white-space: pre-wrap;
		word-break: break-word;
	}

	.system-msg {
		height: var(--line);
		line-height: var(--line);
	}

	.interview-box {
		margin: var(--line) 0;
	}

	.q-text {
		margin: 0 0 var(--line) 0;
		line-height: var(--line);
	}

	.loader-line {
		height: var(--line);
		display: flex;
		align-items: center;
	}

	.prompt-row {
		display: flex;
		gap: 1ch;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
	}

	.input-wrap {
		flex: 1;
		min-width: 0;
		height: var(--line);
	}

	.status-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: var(--line);
		line-height: var(--line);
	}

	.dialog-cmd {
		margin: var(--line) 0;
	}

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 1ch;
	}
</style>
