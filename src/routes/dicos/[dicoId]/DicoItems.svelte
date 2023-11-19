<script>
	import { api } from "$lib/api";
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { readFromFile } from "$lib/xslx/readFromFile";
	import { v4 } from "uuid";

	/**
	 * @type {number}
	 */
	export let index;

	let query = "";
	let limit = 25;
	/**
	 * @type {HTMLInputElement}
	 */
	let inputFile;

	const addItem = () => {
		const name = query.trim();

		if (!name) return;

		$data.values.dicos[index].items.unshift({
			id: v4(),
			name,
			type: "pub"
		});

		$data.values.dicos[index].items = $data.values.dicos[index].items;

		query = "";
	};

	async function uploadFile() {
		const file = inputFile.files?.item(0);
		if (file) {
			const films = await readFromFile(file);
			$data.values.dicos[index].items = films;
		}
		inputFile.value = "";
	}

	async function save() {
		const dico = $data.values.dicos[index];
		const results = await api.put(`/data/dicos/${dico.id}`, dico);

		return `Le dico "${dico.name}" à bien été sauvegardé !\n\nTu peux maintenant le récupérer sur tes autres machines ! 😎`;
	}

	$: filtered = $data.values.dicos[index].items.filter((item) =>
		item.name.toLowerCase().includes(query.toLowerCase())
	);
</script>

<input
	bind:this={inputFile}
	on:change={uploadFile}
	type="file"
	accept=".xls,.xlsx"
	style="display: none;"
/>

<div class="container">
	<div class="actions">
		<AsyncButton class="success" async={save}>
			<i class="fa fa-save" />
		</AsyncButton>
		<button on:click={() => inputFile.click()}>
			<i class="fa fa-upload" />
		</button>
	</div>

	<Input label="Changer le nom" bind:value={$data.values.dicos[index].name} />

	<form class="search" on:submit|preventDefault={addItem}>
		<Input bind:value={query} placeholder="Rechercher ou ajouter..." />
		<button type="submit" class="fa fa-plus" />
	</form>

	<ul>
		<li>
			<div style="width: 100%">Nom</div>
			<div style="width: 100%">Type</div>
			<i class="fa fa-button" data-disabled />
		</li>
		{#each filtered.slice(0, limit) as item (item.id)}
			<li>
				<Input bind:value={item.name} />
				<Input bind:value={item.type} />
				<i
					class="fa fa-trash fa-button danger"
					on:click={() => {
						$data.values.dicos[index].items = $data.values.dicos[index].items.filter(
							(i) => i.id !== item.id
						);
					}}
				/>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		.search {
			display: flex;
			gap: inherit;
		}

		.actions {
			display: flex;
			gap: inherit;
		}

		ul {
			display: grid;
			flex-direction: column;
			margin-top: 2rem;

			li {
				display: flex;
				align-items: center;
				margin-bottom: 0.5rem;
				gap: 0.5rem;

				i {
					flex-shrink: 0;
				}
			}
		}
	}
</style>
