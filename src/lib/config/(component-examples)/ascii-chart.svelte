<script lang="ts">
	import AsciiChart from '$lib/components/ascii-chart.svelte';

	const sparkData = [12, 18, 30, 45, 22, 58, 80, 95, 65, 42, 70, 85, 90, 60, 40, 75, 99];
	const waveData = [
		10, 20, 35, 50, 70, 85, 95, 100, 95, 80, 60, 40, 25, 15, 10, 15, 30, 55, 75, 90, 98, 92, 78, 55,
		30, 15, 10, 20, 40, 65, 85, 95
	];
</script>

<div class="space-y-6">
	<div>
		<AsciiChart data={sparkData} label="CPU Load" showValues height={1} />
	</div>

	<div>
		<AsciiChart data={waveData} label="Network Traffic (4-line graph)" showValues height={4} />
	</div>
</div>
