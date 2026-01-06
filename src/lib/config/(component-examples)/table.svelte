<script lang="ts">
	import * as Table from '$lib/components/table/index.js';
	import Button from '$lib/components/button.svelte';

	let stocks = $state([
		{ symbol: 'AAPL', name: 'Apple Inc.', price: 178.52 },
		{ symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.8 },
		{ symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91 },
		{ symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25 }
	]);

	function randomizePrice(index: number) {
		const change = (Math.random() - 0.5) * 20;
		stocks[index].price = Math.round((stocks[index].price + change) * 100) / 100;
	}

	function randomizeAll() {
		stocks.forEach((_, i) => randomizePrice(i));
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-2">
		<Button onclick={randomizeAll}>Update All Prices</Button>
	</div>

	<Table.Root>
		<Table.Caption
			>Live stock prices — click "Update All Prices" to see the flash effect.</Table.Caption
		>
		<Table.Header>
			<Table.Row>
				<Table.Head>Symbol</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head class="text-right">Price</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each stocks as stock, i (stock.symbol)}
				<Table.Row>
					<Table.Cell class="font-medium">{stock.symbol}</Table.Cell>
					<Table.Cell>{stock.name}</Table.Cell>
					<Table.Cell reactive value={stock.price} class="text-right">
						${stock.price.toFixed(2)}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.Cell colspan={2}>Total Portfolio Value</Table.Cell>
				<Table.Cell class="text-right">
					${stocks.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
				</Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</div>
