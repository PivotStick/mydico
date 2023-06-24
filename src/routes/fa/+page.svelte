<script>
	import { DateTime } from "luxon";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { v4 } from "uuid";

	const add = () => {
		const fa = $data.values.fa || [];

		const start = DateTime.now().startOf("minute");
		const conf = {
			includeOffset: false,
			suppressSeconds: true,
			suppressMilliseconds: true
		};

		fa.push({
			id: v4(),
			name: "",
			start: start.toISO(conf),
			end: start.plus({ minutes: 25 }).toISOTime(conf),
			room: 0,
			notes: []
		});

		$data.values.fa = fa;
	};
</script>

<div class="page">
	<ul class="films">
		{#each $data.values.fa || [] as fa (fa.id)}
			<li class="films__film">
				<!-- <pre style="grid-column: 1 / -1;">{JSON.stringify(fa, null, 2)}</pre> -->
				<Input label="Nom du film" bind:value={fa.name} />
				<Input label="N° de salle" bind:value={fa.room} type="number" inputmode="numeric" />
				<Input label="Commence à" bind:value={fa.start} type="datetime-local" />
				<Input label="Sorti à" bind:value={fa.end} type="time" />
				<button on:click={() => goto(`/fa/${fa.id}`)}>
					<i class="fa fa-pen" />
				</button>
				<button
					on:click={() => {
						// @ts-ignore
						$data.values.fa = $data.values.fa.filter((f) => f !== fa);
					}}
					class="danger"
				>
					<i class="fa fa-trash" />
				</button>
			</li>
		{/each}
		<li>
			<button on:click={add} class="fa fa-plus fa-button" />
		</li>
	</ul>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
	}

	.films {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		&__film {
			padding: 0.5rem;
			background-color: var(--color-50);
			border-radius: 0.75rem;

			display: grid;
			gap: 0.5rem;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
