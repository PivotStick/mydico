<script>
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { v4 } from "uuid";

	/**
	 * @type {number}
	 */
	export let index;

	let query = "";
	let limit = 25;

	const addItem = () => {
		const name = query.trim();

		if (!name) return;

		$data.values.dicos[index].items.push({
			_id: v4(),
			name,
			type: "pub"
		});

		$data.values.dicos[index].items = $data.values.dicos[index].items;

		query = "";
	};

	// @ts-ignore
	$: filtered = $data.values.dicos[index].items.filter((item) =>
		item.name.toLowerCase().includes(query.toLowerCase())
	);
</script>

<div class="container">
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
		{#each filtered.slice(0, limit) as item (item._id)}
			<li>
				<Input bind:value={item.name} />
				<Input bind:value={item.type} />
				<i
					class="fa fa-trash fa-button danger"
					on:click={() => {
						$data.values.dicos[index].items = $data.values.dicos[index].items.filter(
							// @ts-ignore
							(i) => i._id !== item._id
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
