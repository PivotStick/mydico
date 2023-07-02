<script>
	import { DateTime } from "luxon";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { v4 } from "uuid";
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import { api } from "$lib/api";
	import { slide } from "svelte/transition";

	const types = ["2D"];
	const rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	const add = () => {
		const fa = $data.values.fa || [];

		const start = DateTime.now().startOf("minute");
		const conf = {
			includeOffset: false,
			suppressSeconds: true,
			suppressMilliseconds: true
		};

		fa.unshift({
			id: v4(),
			name: "",
			start: start.toISO(conf),
			end: start.plus({ minutes: 25 }).toISOTime(conf),
			type: types[0],
			room: rooms[0],
			notes: []
		});

		$data.values.fa = fa;
	};

	/**
	 * @param {DataValues["fa"][number]} fa
	 */
	const save = (fa) => api.put(`/data/fa/${fa.id}`, fa);

	const getMissingFilms = async () => {
		/**
		 * @type {DataValues["fa"]}
		 */
		const fas = await api.get("/data/fa");
		const missingFilms = fas.filter((f) => !$data.values.fa.find((b) => b.id === f.id));

		$data.values.fa.push(...missingFilms);
		$data.values.fa = $data.values.fa;
	};

	/**
	 * @param {DataValues["fa"][number]["id"]} filmId
	 */
	const sync = async (filmId) => {
		const fa = await api.get(`/data/fa/${filmId}`);
		const index = $data.values.fa.findIndex((f) => f.id === filmId);

		$data.values.fa[index] = fa;
	};
</script>

<div class="page">
	<div class="actions">
		<button on:click={add}>
			<i class="fa fa-plus" />
			Ajouter un film
		</button>
		<AsyncButton async={getMissingFilms}>
			<i class="fa fa-sync" />
			Récupérer les films manquant
		</AsyncButton>
	</div>

	<ul class="films">
		{#each $data.values.fa || [] as fa (fa.id)}
			<li class="films__film" transition:slide|local>
				<!-- <pre style="grid-column: 1 / -1;">{JSON.stringify(fa, null, 2)}</pre> -->
				<div style="grid-column: 1 / -1;">
					<Input label="Nom du film" bind:value={fa.name} />
				</div>
				<Input label="Type" select={types} bind:value={fa.type} />
				<Input label="N° de salle" select={rooms} bind:value={fa.room} />
				<Input label="Commence à" bind:value={fa.start} type="datetime-local" />
				<Input label="Sorti à" bind:value={fa.end} type="time" />
				<button on:click={() => goto(`/fa/${fa.id}`)}>
					<i class="fa fa-{fa.notes.length ? 'eye' : 'pen'}" />
				</button>
				<button
					on:click={() => {
						if (confirm(`Supprimer ${fa.name} ?`)) {
							$data.values.fa = $data.values.fa.filter((f) => f !== fa);
						}
					}}
					class="danger"
				>
					<i class="fa fa-trash" />
				</button>
				<AsyncButton async={() => save(fa)} class="success" style="grid-column: 1 / -1;">
					<i class="fa fa-save" />
					Sauvegarder
				</AsyncButton>
				<AsyncButton async={() => sync(fa.id)} style="grid-column: 1 / -1;">
					<i class="fa fa-sync" />
					Synchroniser
				</AsyncButton>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		padding-bottom: var(--main-padding-bottom);
	}

	.actions {
		display: grid;
		gap: 1rem;
	}

	.films {
		display: flex;
		flex-direction: column;

		&__film {
			display: grid;
			gap: 0.5rem;
			grid-template-columns: 1fr 1fr;

			border-top: 1px solid var(--color-100);
			box-shadow: 0 -0.5rem 1rem -1.25rem var(--color-600);
			padding-top: 2rem;
			margin-top: 2rem;
		}
	}
</style>
