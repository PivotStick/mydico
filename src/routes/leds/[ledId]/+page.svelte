<script>
	import { page } from "$app/stores";
	import DicoSearcher from "$lib/components/DicoSearcher.svelte";
	import Input from "$lib/components/Input.svelte";
	import { data } from "$lib/stores/data";
	import { tick } from "svelte";
	import { v4 } from "uuid";

	$: index = $data.values.leds.findIndex((l) => l.id === $page.params.ledId);

	let query = "";

	/**
	 * @param {KeyboardEvent} e
	 */
	const keydown = async (e) => {
		const el = e.currentTarget;

		switch (e.key) {
			case "Tab": {
				e.preventDefault();
				break;
			}
			case "Enter": {
				const name = query.trim();

				if (!name) break;

				$data.values.leds[index].items.push({
					id: v4(),
					name
				});

				$data.values.leds[index] = $data.values.leds[index];
				query = "";
				await tick();
				if (el instanceof HTMLInputElement) {
					el.scrollIntoView({ behavior: "smooth", block: "center" });
				}
				break;
			}

			default:
				break;
		}
	};

	/**
	 * @type {HTMLInputElement}
	 */
	let input;
	let focused = false;
</script>

<ul class="items" class:focused>
	{#each $data.values.leds[index].items as item (item.id)}
		<li class="items__item">
			<Input bind:value={item.name} />
			<button
				class="fa fa-trash fa-button danger"
				on:click={() => {
					$data.values.leds[index].items = $data.values.leds[index].items.filter((v) => v !== item);
				}}
			/>
		</li>
	{/each}
	<li class="items__inputs">
		<DicoSearcher bind:focused bind:name={query} bind:input />
		<input
			type="text"
			bind:this={input}
			bind:value={query}
			on:keydown={keydown}
			placeholder="Écrit ici..."
		/>
	</li>
</ul>

<style lang="scss">
	.items {
		display: flex;
		flex-direction: column;

		padding-bottom: calc(1rem + env(safe-area-inset-bottom));
		min-height: 45vh;

		&__item {
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 1rem;

			transition-property: background-color, color;

			&:has(button:active) {
				background-color: var(--danger-50);
				color: var(--on-danger-50);
			}
		}

		&.focused {
			.items__inputs {
				margin-top: 15rem;
			}
		}

		&__inputs {
			display: flex;
			position: relative;

			input {
				padding: 0.5rem;
				width: 100%;
				border: 1px solid var(--color-200);

				outline: 0px solid var(--color-50);
				transition-property: outline-width;

				&:focus {
					outline-width: 3px;
				}
			}
		}
	}
</style>
