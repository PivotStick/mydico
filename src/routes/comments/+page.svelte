<script>
	import { api } from "$lib/api";
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";

	const sync = async () => {
		$data.values.comments = await api.get("/data/comments");
	};

	const save = () => api.put("/data/comments", $data.values.comments);
</script>

<div class="page">
	<h1>Remarques d'affichage</h1>

	<Input
		textarea
		placeholder="example : 'Un écran qui s'étaignait tout seul' etc..."
		bind:value={$data.values.comments.display}
	/>

	<h1>Remarques films annonces</h1>

	<Input textarea bind:value={$data.values.comments.fa} />

	<div class="actions">
		<AsyncButton async={sync}>
			<i class="fa fa-sync" />
			Synchroniser
		</AsyncButton>
		<AsyncButton async={save} class="success">
			<i class="fa fa-save" />
			Sauvegarder
		</AsyncButton>
	</div>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		padding-bottom: var(--main-padding-bottom);

		display: grid;
		gap: 1rem;

		.actions {
			display: flex;
			gap: inherit;
		}
	}
</style>
