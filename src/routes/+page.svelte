<script>
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { generate } from "$lib/xslx/generate";

	const generateXLSX = () => {
		generate($data.values);
	};
</script>

<div class="page">
	<Input label="Code enquêteur" bind:value={$data.values.code} />
	<Input label="Semaine n°" bind:value={$data.values.weekNumber} />
	<Input label="Nom du Cinéma" bind:value={$data.values.cinemaName} />
	<Input label="Ville" bind:value={$data.values.city} />
	<Input label="Circuit" bind:value={$data.values.circuit} />

	<AsyncButton async={data.save} class="success">
		<i class="fa fa-save" />
		Sauvegarder
	</AsyncButton>

	<AsyncButton async={data.sync}>
		<i class="fa fa-sync" />
		Synchroniser
	</AsyncButton>

	<button on:click={generateXLSX}>
		<i class="fa fa-download" />
		Télécharger
	</button>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		padding-bottom: var(--main-padding-bottom);

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
