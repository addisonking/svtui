<script lang="ts">
	import BlockLoader from '$lib/components/block-loader.svelte';
	import Button from '$lib/components/button.svelte';

	type Message = {
		role: 'user' | 'assistant';
		content: string;
		/** still being typed out by the typewriter */
		typing?: boolean;
	};

	let messages = $state<Message[]>([
		{
			role: 'assistant',
			content:
				"Hi. I'm not really an AI — this is a svtui demo. Type something and I'll pretend to think."
		}
	]);
	let input = $state('');
	let thinking = $state(false);

	let scrollEl = $state<HTMLDivElement>(null!);

	// A small bank of canned replies. Picked by naive keyword match, else random.
	const REPLIES: { match: RegExp; reply: string }[] = [
		{ match: /hello|hi|hey/i, reply: "Hey. I'm a canned response in a demo. But hi to you too." },
		{
			match: /who are you|what are you/i,
			reply: "I'm a fake assistant built from svtui components. No model, no API key, no opinion."
		},
		{
			match: /how are you/i,
			reply: "I'm a static string, so — unchangingly fine. Thanks for asking."
		},
		{
			match: /svelte|svtui/i,
			reply:
				'svtui is a set of Svelte 5 components with a terminal look, shipped as copy-paste files. This whole chat is built from BlockLoader, Button, and a couple of divs.'
		},
		{
			match: /weather/i,
			reply: "I can't check the weather. I'm a local typewriter. Look out a window."
		},
		{
			match: /code|function|example/i,
			reply: '```svelte\n<Button>Run</Button>\n```\nThere. A button. The fanciest thing I can do.'
		}
	];
	const FALLBACK =
		'Interesting. I have no real thoughts about it, but I typed that out slowly so it feels considered.';

	const pickReply = (q: string) => REPLIES.find((r) => r.match.test(q))?.reply ?? FALLBACK;

	// Scroll to the bottom whenever the message list grows.
	$effect(() => {
		// track message count + the last message's typing state
		void messages.length;
		scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
	});

	const send = () => {
		const text = input.trim();
		if (!text || thinking) return;
		input = '';
		messages = [...messages, { role: 'user', content: text }];
		thinking = true;

		// Fake a "thinking" pause, then type the prefab reply out char by char.
		const delay = 700 + Math.random() * 900;
		setTimeout(() => {
			thinking = false;
			typeReply(pickReply(text));
		}, delay);
	};

	const typeReply = (full: string) => {
		messages = [...messages, { role: 'assistant', content: '', typing: true }];
		let i = 0;
		const id = setInterval(() => {
			i++;
			const next = full.slice(0, i);
			messages = messages.map((m, idx) =>
				idx === messages.length - 1 ? { ...m, content: next } : m
			);
			scrollEl?.scrollTo({ top: scrollEl.scrollHeight });
			if (i >= full.length) {
				clearInterval(id);
				messages = messages.map((m, idx) =>
					idx === messages.length - 1 ? { ...m, typing: false } : m
				);
			}
		}, 18);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	};
</script>

<div class="chat">
	<header class="chat-header">
		<span class="dot" aria-hidden="true"></span>
		<span class="label">svtui-mini</span>
		<span class="sub">demo model</span>
	</header>

	<div bind:this={scrollEl} class="messages">
		{#each messages as m, i (i)}
			<div class="msg {m.role}">
				<div class="role">{m.role === 'user' ? 'YOU' : 'ASSISTANT'}</div>
				<div class="body" class:typing={m.typing}>
					{m.content}
					{#if m.typing}
						<span class="cursor" aria-hidden="true"></span>
					{/if}
				</div>
			</div>
		{/each}
		{#if thinking}
			<div class="msg assistant thinking-msg">
				<div class="role">ASSISTANT</div>
				<div class="body thinking">
					<BlockLoader mode={1} /> thinking…
				</div>
			</div>
		{/if}
	</div>

	<div class="composer">
		<textarea
			bind:value={input}
			onkeydown={onKeydown}
			placeholder="Type a message…  (Enter to send, Shift+Enter for newline)"
			rows="2"
		></textarea>
		<Button onclick={send} disabled={!input.trim() || thinking}>Send</Button>
	</div>
</div>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
	}

	.chat-header {
		display: flex;
		align-items: center;
		gap: 0.5ch;
		padding: 0.5rem 1ch;
		border-bottom: 1px solid var(--border-default);
		flex-shrink: 0;
		font-size: 0.875rem;
	}
	.chat-header .dot {
		width: 0.5ch;
		height: 0.5ch;
		background: var(--focus-ring);
		display: inline-block;
	}
	.chat-header .label {
		font-weight: 700;
		letter-spacing: 0.05em;
	}
	.chat-header .sub {
		color: var(--button-muted);
		font-size: 0.75rem;
	}

	.messages {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: 1rem 1ch;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.msg {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		max-width: 80%;
	}
	.msg.user {
		align-self: flex-end;
		align-items: flex-end;
	}
	.msg .role {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		color: var(--button-muted);
		text-transform: uppercase;
	}
	.msg .body {
		background: var(--border-muted);
		padding: 0.5rem 1ch;
		white-space: pre-wrap;
		word-break: break-word;
		line-height: var(--base-line-height);
		box-shadow: inset 0 0 0 1px var(--border-default);
	}
	.msg.user .body {
		background: var(--button-primary-bg);
		color: var(--button-primary-fg);
		box-shadow: none;
	}
	.msg .body.thinking {
		display: flex;
		align-items: center;
		gap: 1ch;
		opacity: 0.8;
	}

	.cursor {
		display: inline-block;
		width: 1ch;
		height: 1em;
		vertical-align: text-bottom;
		background: var(--text-primary);
		animation: blink 1s step-start infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.composer {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1ch;
		border-top: 1px solid var(--border-default);
		flex-shrink: 0;
		align-items: stretch;
	}
	.composer textarea {
		flex: 1;
		resize: none;
		font-family: inherit;
		font-size: inherit;
		line-height: var(--base-line-height);
		background: var(--surface-base);
		color: var(--text-primary);
		border: 0;
		box-shadow: inset 0 0 0 2px var(--border-default);
		padding: 0.5rem 1ch;
		outline: 0;
	}
	.composer textarea:focus {
		box-shadow: inset 0 0 0 2px var(--focus-ring);
	}
	.composer :global(button) {
		width: auto;
		white-space: nowrap;
	}
</style>
