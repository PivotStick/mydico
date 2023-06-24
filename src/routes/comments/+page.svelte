<script>
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
</script>

<div class="page">
	<h1>Remarques</h1>

	<Input
		textarea
		placeholder="example : 'Un écran qui s'étaignait tout seul' etc..."
		bind:value={$data.values.comments}
	/>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		h1 {
			margin-bottom: 1rem;
		}
	}
</style>
