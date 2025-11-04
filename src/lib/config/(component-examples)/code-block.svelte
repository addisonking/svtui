<script lang="ts">
	import CodeBlock from '$lib/components/code-block/code-block.svelte';

	const code: string = `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`;
</script>

<CodeBlock {code} />
