<script>
	import { api } from "$lib/api";
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import DicoSearcher from "$lib/components/DicoSearcher.svelte";
	import { snacks } from "$lib/components/Snacks.svelte";
	import { searchDicoItem } from "$lib/functions/searchDicoItem";
	import { data } from "$lib/stores/data";
	import { tick } from "svelte";
	import { v4 } from "uuid";

	const formats = ["120x160", "plv classique", "plv speciale", "operation speciale"];
	const locations = ["int hall", "int coul", "ext"];

	/**
	 * @type {Omit<DataValues["posters"][number], "id">}
	 */
	let payload = {
		format: formats[0],
		location: locations[0],
		name: ""
	};

	/**
	 * @param {KeyboardEvent} e
	 */
	const keydown = async (e) => {
		switch (e.key) {
			case "Enter": {
				$data.values.posters.push({
					id: v4(),
					...payload
				});

				$data.values.posters = $data.values.posters;
				const el = e.currentTarget;
				payload.name = "";

				if (el instanceof HTMLInputElement) {
					await tick();

					el.scrollIntoView({ behavior: "smooth", block: "center" });
				}
				break;
			}

			default:
				break;
		}
	};

	const sync = async () => {
		$data.values.posters = await api.get("/data/posters");
	};

	const save = () => api.put("/data/posters", $data.values.posters);

	/**
	 * @type {HTMLInputElement}
	 */
	let nameInput;

	$: searchResults = searchDicoItem(payload.name, $data.values.dicos);
</script>

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

<ul class="posters">
	{#each $data.values.posters as poster (poster.id)}
		<li class="posters__poster">
			<input type="text" bind:value={poster.name} />
			<select bind:value={poster.location}>
				{#each locations as value}
					<option>{value}</option>
				{/each}
			</select>
			<select bind:value={poster.format}>
				{#each formats as value}
					<option>{value}</option>
				{/each}
			</select>
			<button
				class="fa fa-trash fa-button danger"
				on:click|preventDefault={() => {
					$data.values.posters = $data.values.posters.filter((p) => p !== poster);
				}}
			/>
		</li>
	{/each}
	<li class="posters__inputs">
		<DicoSearcher bind:name={payload.name} input={nameInput} />

		<input type="text" bind:this={nameInput} bind:value={payload.name} on:keydown={keydown} />
		<select bind:value={payload.location}>
			{#each locations as value}
				<option>{value}</option>
			{/each}
		</select>
		<select bind:value={payload.format}>
			{#each formats as value}
				<option>{value}</option>
			{/each}
		</select>
	</li>
</ul>

<style lang="scss">
	.posters {
		min-height: 50vh;
		display: flex;
		flex-direction: column;

		&__poster {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 1rem;

			transition-property: background-color, color;

			input,
			select {
				font: inherit;
				padding: 0.5rem;
				width: 100%;
				border: none;
				background-color: transparent;
				border-radius: 0;
			}

			&:has(button:active) {
				background-color: var(--danger-50);
				color: var(--on-danger-50);
			}
		}

		&__inputs {
			display: flex;
			position: relative;
			margin-top: auto;

			input,
			select {
				font: inherit;

				width: 100%;
				border: 1px solid var(--color-200);
				border-radius: 0;
				background-color: transparent;

				padding: 0.5rem;

				border-left: none;
				outline: 0px solid var(--color-50);

				transition-property: outline-width;

				&:last-child {
					border-right: none;
				}

				&:focus {
					outline-width: 3px;
				}
			}
		}
	}

	.actions {
		display: flex;
		gap: 1rem;
		padding: 1rem;
	}
</style>
