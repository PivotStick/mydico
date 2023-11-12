<script>
	import { searchDicoItem } from "$lib/functions/searchDicoItem";
	import { data } from "$lib/stores/data";
	import { onDestroy } from "svelte";
	import { expoOut } from "svelte/easing";
	import { scale } from "svelte/transition";

	export let name = "";
	export let type = "";

	/**
	 * @type {HTMLInputElement}
	 */
	export let input;

	/**
	 * @type {ReturnType<typeof searchDicoItem>}
	 */
	let searchResults = [];
	let focused = false;
	let listening = false;

	const focus = () => (focused = true);
	const blur = () => (focused = false);

	onDestroy(() => {
		input.removeEventListener("focus", focus);
		input.removeEventListener("blur", blur);
	});

	$: if (input && !listening) {
		input.addEventListener("focus", focus);
		input.addEventListener("blur", blur);
		listening = true;
	}

	$: if (focused) searchResults = searchDicoItem(name, $data.values.dicos);
</script>

{#if focused}
	<ul class="search-results" transition:scale={{ easing: expoOut }}>
		{#each searchResults as dico}
			<li class="dico">{dico.name}</li>
			{#each dico.items as item}
				<li
					on:mousedown|preventDefault={() => {
						name = item.name;
						type = item.type;
					}}
					class="item"
				>
					{item.name} <span>{item.type}</span>
				</li>
			{/each}
		{:else}
			<li class="placeholder">No results found <i class="fa fa-search" /></li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.search-results {
		position: absolute;
		bottom: calc(100% + 1rem);
		left: 1rem;

		background-color: white;
		border: 1px solid var(--color-100);
		border-radius: 0.25rem;
		padding: 0.25rem 0;

		max-height: 15rem;
		max-width: calc(100vw - 2rem);
		width: max-content;
		overflow: auto;

		transform-origin: bottom;

		.dico {
			display: flex;
			gap: 0.75rem;
			align-items: center;
			font-style: italic;
			font-size: 0.75rem;
			color: var(--color-400);

			&::after {
				content: "";
				display: block;
				width: 100%;
				height: 1px;
				background-color: var(--color-200);
			}
		}

		.placeholder,
		.dico,
		.item {
			padding: 0.5rem 0.75rem;
		}

		.item {
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			gap: 0.75rem;

			&:focus,
			&:hover {
				background-color: var(--color-900);
				color: var(--on-color-900);
			}

			span {
				font-style: italic;
			}
		}

		.placeholder {
			font-style: italic;
			opacity: 0.5;
			display: flex;
			gap: 0.75rem;
			align-items: baseline;
		}
	}
</style>
