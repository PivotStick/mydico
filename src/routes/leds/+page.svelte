<script>
	import { api } from "$lib/api";
	import AsyncButton from "$lib/components/AsyncButton.svelte";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";

	const sync = async () => {
		$data.values.leds = await api.get("/data/leds");
	};

	const save = () => api.put("/data/leds", $data.values.leds);
</script>

<div class="page">
	<div class="actions">
		<AsyncButton async={sync}>
			<i class="fa fa-sync" /> Synchroniser
		</AsyncButton>
		<AsyncButton async={save} class="success">
			<i class="fa fa-save" /> Sauvegarder
		</AsyncButton>
	</div>

	<ul>
		{#each $data.values.leds as led (led.id)}
			<li>
				<input class="name" bind:value={led.name} />
				<input class="subtitle" bind:value={led.subtitle} />
				<div class="numbers">
					<Input
						bind:value={led.countInHall}
						label="Nombre dans le hall"
						type="number"
						inputmode="numeric"
					/>
					<Input
						bind:value={led.countInHallaway}
						label="Nombre dans les couloirs"
						type="number"
						inputmode="numeric"
					/>
					<Input
						bind:value={led.countOutside}
						label="Nombre en extérieur"
						type="number"
						inputmode="numeric"
					/>
				</div>
				<button style="position: relative;">
					<a href="/leds/{led.id}" data-cover>
						{#if led.items.length}
							{led.items.length} film{led.items.length > 1 ? "s" : ""}
							<i class="fa fa-film" />
						{:else}
							Renseigner des films <i class="fa fa-plus" />
						{/if}
					</a>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.page {
		padding: var(--main-padding);
		padding-bottom: calc(var(--main-padding) + env(safe-area-inset-bottom));

		display: grid;

		.actions {
			display: flex;
			gap: 1rem;
		}
	}

	ul {
		display: flex;
		flex-direction: column;

		li {
			display: grid;
			gap: 1rem;

			border-top: 1px solid var(--color-200);
			padding-top: 3rem;
			margin-top: 3rem;

			&:first-child {
				margin-top: var(--main-padding);
			}

			.name {
				font-size: 2rem;
				font-weight: 700;
				width: 100%;
				border: none;
			}

			.subtitle {
				width: 100%;
				font-style: italic;
				border: none;
			}

			.numbers {
				display: flex;
				gap: 0.5rem;
			}
		}
	}
</style>
