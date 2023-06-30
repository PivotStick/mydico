<script>
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { v4 } from "uuid";

	let newName = "";

	const addDicoItem = () => {
		const dicos = $data.values.dicos || [];
		const name = newName.trim();

		if (!name) return;

		dicos.push({
			id: v4(),
			name,
			items: []
		});

		$data.values.dicos = dicos;

		newName = "";
	};
</script>

<div class="page">
	<form on:submit|preventDefault={addDicoItem}>
		<Input
			label="Ajouter un dico"
			placeholder="example: 'Dico de juin 2023...'"
			bind:value={newName}
		/>
		<button class="fa fa-plus fa-button" type="submit" />
	</form>

	{#if $data.values.dicos}
		<ul class="dicos">
			{#each $data.values.dicos as dico (dico.id)}
				<li>
					<i
						class="fa fa-trash fa-button"
						on:click={() => {
							$data.values.dicos = $data.values.dicos.filter((d) => d.id !== dico.id);
						}}
					/>
					<a href="/dicos/{dico.id}" data-cover>{dico.name}</a>
					<div class="items-count"><i class="fa fa-tv" /> {dico.items.length}</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);

		form {
			display: flex;
			align-items: center;
			gap: var(--main-padding);
		}

		.dicos {
			margin-top: 2rem;

			display: flex;
			flex-direction: column;
			gap: 1rem;

			li {
				position: relative;

				border-radius: 0.5rem;
				padding: 1rem;

				border: 1px solid var(--color-200);

				transition-property: background-color, color;

				i.fa-button {
					position: absolute;

					top: 0;
					right: 0;

					translate: 35% -35%;
				}

				a {
					display: block;
					font-size: 2rem;
					font-weight: 700;

					margin-bottom: 0.5rem;
				}

				&:hover {
					background-color: var(--color-200);
					color: var(--on-color-200);
				}
			}
		}
	}
</style>
