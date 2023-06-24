<script>
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
</script>

{#if $data.values.leds}
	<ul>
		{#each $data.values.leds as led (led._id)}
			<li>
				<input class="name" bind:value={led.name} />
				<div class="numbers">
					<Input label="Nombre dans le hall" bind:value={led.countInHall} />
					<Input label="Nombre dans les couloirs" bind:value={led.countInHallaway} />
					<Input label="Nombre en extérieur" bind:value={led.countOutside} />
				</div>
				<button style="position: relative;">
					<a href="/led/{led._id}" data-cover>
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
{:else}
	<p>Tu n'as pas de leds...</p>
	<button on:click={data.sync}><i class="fa fa-sync" /> Synchroniser</button>
{/if}

<style lang="scss">
	ul {
		padding: var(--main-padding);

		display: flex;
		flex-direction: column;

		li {
			display: grid;
			gap: 1rem;

			&:not(:last-child) {
				border-bottom: 1px solid var(--color-200);
				padding-bottom: 3rem;
				margin-bottom: 3rem;
			}

			.name {
				font-size: 2rem;
				font-weight: 700;
				width: 100%;
				border: none;
			}

			.numbers {
				display: flex;
				gap: 0.5rem;
			}
		}
	}
</style>
