<script lang="ts">
	import RowSpaceBetween from '$lib/components/row-space-between.svelte';
	import Text from '$lib/components/text.svelte';
	import Badge from '$lib/components/badge.svelte';
	import BlockLoader from '$lib/components/block-loader.svelte';
	import TextArea from '$lib/components/text-area.svelte';

	type ChatMessage = {
		role: 'user' | 'assistant';
		content: string;
		typing?: boolean;
	};

	let messages = $state<ChatMessage[]>([
		{
			role: 'assistant',
			content:
				'Hi. I am not really an AI — this is a svtui demo. Type something and I will pretend to think.'
		}
	]);
	let draft = $state('');
	let thinking = $state(false);
	let scrollEl = $state<HTMLDivElement>(null!);

	const REPLIES: { match: RegExp; reply: string }[] = [
		{ match: /hello|hi|hey/i, reply: 'Hey. I am a canned response in a demo. But hi to you too.' },
		{
			match: /who are you|what are you/i,
			reply: 'I am a fake assistant built from svtui components. No model, no API key, no opinion.'
		},
		{
			match: /how are you/i,
			reply: 'I am a static string, so — unchangingly fine. Thanks for asking.'
		},
		{
			match: /svelte|svtui/i,
			reply:
				'svtui is a set of Svelte 5 components with a terminal look, shipped as copy-paste files. This whole chat is assembled from RowSpaceBetween, Text, BlockLoader, and TextArea.'
		},
		{
			match: /weather/i,
			reply: 'I cannot check the weather. I am a local typewriter. Look out a window.'
		},
		{
			match: /code|function|example/i,
			reply: 'Row, Block, ActionList. Those are the fanciest things I can point at.'
		}
	];
	const FALLBACK =
		'Interesting. I have no real thoughts about it, but I typed that out slowly so it feels considered.';

	const pickReply = (q: string) => REPLIES.find((r) => r.match.test(q))?.reply ?? FALLBACK;

	$effect(() => {
		void messages.length;
		scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
	});

	const send = () => {
		const text = draft.trim();
		if (!text || thinking) return;
		draft = '';
		messages = [...messages, { role: 'user', content: text }];
		thinking = true;
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

	const onComposerKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	};
</script>

<div class="chat">
	<header class="chat-header">
		<RowSpaceBetween>
			<Badge>svtui-mini</Badge>
			<Badge>demo model</Badge>
		</RowSpaceBetween>
	</header>

	<div bind:this={scrollEl} class="messages">
		{#each messages as m, i (i)}
			{#if m.role === 'user'}
				<div class="msg user">
					<div class="bubble bubble-user">
						<Text
							>{m.content}{#if m.typing}<span class="cursor"></span>{/if}</Text
						>
					</div>
					<div class="tail tail-right" aria-hidden="true"></div>
				</div>
			{:else}
				<div class="msg assistant">
					<div class="tail tail-left" aria-hidden="true"></div>
					<div class="bubble bubble-assistant">
						<Text
							>{m.content}{#if m.typing}<span class="cursor"></span>{/if}</Text
						>
					</div>
				</div>
			{/if}
		{/each}
		{#if thinking}
			<div class="msg assistant">
				<div class="tail tail-left" aria-hidden="true"></div>
				<div class="bubble bubble-thinking">
					<span class="thinking-line">
						<BlockLoader mode={1} />
						<span class="thinking-label">thinking</span>
					</span>
				</div>
			</div>
		{/if}
	</div>

	<footer class="composer">
		<TextArea
			bind:value={draft}
			placeholder="Type a message…  (Enter to send, Shift+Enter for newline)"
			onkeydown={onComposerKeydown}
		/>
	</footer>
</div>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: 0;
	}

	.chat-header {
		flex-shrink: 0;
		border-bottom: 1px solid var(--border-default);
		padding: 0.5rem 1ch;
	}

	.messages {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: calc(var(--font-size) * var(--base-line-height));
		padding: calc(var(--font-size) * var(--base-line-height)) 1ch;
	}

	/* Each message row is a flex pair: bubble + tail adjacent (not space-between),
	   the whole row pushed to the sender's side. The tail is a 1ch border-triangle
	   pointing outward — the SRCL message shape. */
	.msg {
		display: flex;
		align-items: flex-end;
		gap: 0;
	}
	.msg.user {
		justify-content: flex-end;
	}
	.msg.assistant {
		justify-content: flex-start;
	}

	.bubble {
		display: inline-block;
		padding: calc(var(--base-line-height) * 8px) 1ch;
		max-width: 80%;
		box-shadow: 1ch 1ch 0 0 var(--border-muted);
	}
	.bubble-user {
		background: var(--border-default);
	}
	.bubble-assistant {
		background: var(--focus-ring);
		color: var(--surface-base);
	}
	.bubble-thinking {
		background: var(--border-muted);
	}

	.thinking-line {
		display: inline-flex;
		align-items: center;
		gap: 1ch;
	}
	.thinking-label {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	.tail {
		flex-shrink: 0;
		width: 0;
		height: 0;
		border-top: calc((var(--font-size) * var(--base-line-height)) / 2) solid transparent;
		border-bottom: calc((var(--font-size) * var(--base-line-height)) / 2) solid transparent;
	}
	.tail-left {
		border-right: 1ch solid var(--focus-ring);
	}
	.tail-right {
		border-left: 1ch solid var(--border-default);
	}

	.cursor {
		display: inline-block;
		width: 1ch;
		height: 1em;
		vertical-align: text-bottom;
		background: currentColor;
		animation: svtui-chat-blink 1s step-start infinite;
	}
	@keyframes svtui-chat-blink {
		50% {
			opacity: 0;
		}
	}

	.composer {
		flex-shrink: 0;
		border-top: 1px solid var(--border-default);
		padding: calc(var(--base-line-height) * 0.5rem) 1ch;
	}
</style>
