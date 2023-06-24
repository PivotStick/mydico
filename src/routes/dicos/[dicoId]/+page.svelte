<script>
	import { page } from "$app/stores";
	import { data } from "$lib/stores/data";

	import NotFound from "./NotFound.svelte";
	import DicoItems from "./DicoItems.svelte";

	// @ts-ignore
	$: index = $data.values.dicos?.findIndex((d) => d._id === $page.params.dicoId);
</script>

<div class="page">
	{#if index >= 0}
		<DicoItems {index} />
	{:else}
		<NotFound />
	{/if}
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
	}
</style>
