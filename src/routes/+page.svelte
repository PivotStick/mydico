<script>
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
</script>

<div class="page">
	<Input label="Code enquêteur" bind:value={$data.values.code} />
	<Input label="Semaine n°" bind:value={$data.values.weekNumber} />
	<Input label="Nom du Cinéma" bind:value={$data.values.cinemaName} />
	<Input label="Ville" bind:value={$data.values.city} />
	<Input label="Circuit" bind:value={$data.values.circuit} />

	<button disabled={$data.syncing} on:click={data.save}>
		<i class="fa fa-save" />
		Sauvegarder
	</button>

	<button disabled={$data.syncing} on:click={data.sync}>
		<i class="fa fa-sync" />
		Synchroniser
	</button>

	<button>
		<i class="fa fa-download" />
		Télécharger
	</button>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
