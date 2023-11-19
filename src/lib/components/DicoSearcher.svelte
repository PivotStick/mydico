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
	export let focused = false;
	let listening = false;
	let index = 0;

	const focus = () => (focused = true);
	const blur = () => (focused = false);

	/**
	 * @param {KeyboardEvent} e
	 */
	function keydown(e) {
		const items = searchResults.flatMap((dico) => dico.items);

		switch (e.key) {
			case "ArrowDown":
				index = (index + 1) % items.length;
				break;

			case "ArrowUp": {
				let next = index - 1;
				if (next < 0) {
					next = items.length - 1;
				}
				index = next;
				break;
			}

			case "Tab": {
				const value = getValueFromIndex();
				if (value) {
					name = value.name;
					type = value.type;
				}
				break;
			}
		}
	}

	function getValueFromIndex() {
		for (let i = 0; i < searchResults.length; i++) {
			const dico = searchResults[i];
			const offset = searchResults[i - 1]?.items.length ?? 0;

			for (let j = 0; j < dico.items.length; j++) {
				if (j + offset === index) {
					return dico.items[j];
				}
			}
		}

		return null;
	}

	onDestroy(() => {
		input.removeEventListener("focus", focus);
		input.removeEventListener("blur", blur);
		input.removeEventListener("keydown", keydown);
	});

	$: if (input && !listening) {
		input.addEventListener("focus", focus);
		input.addEventListener("blur", blur);
		input.addEventListener("keydown", keydown);
		listening = true;
	}

	$: if (focused) {
		searchResults = searchDicoItem(name, $data.values.dicos);
		index = 0;
	}

	/**
	 * @param {HTMLElement} node
	 * @param {number} index
	 */
	function scrollTo(node, index) {
		/**
		 * @param {typeof index} index
		 */
		const update = (index) => {
			node.children[index]?.scrollIntoView({});
		};

		update(index);

		return {
			update
		};
	}
</script>

{#if focused}
	<ul class="search-results" transition:scale={{ easing: expoOut }} use:scrollTo={index}>
		{#each searchResults as dico, i}
			{@const offset = searchResults[i - 1]?.items.length ?? 0}
			<li class="dico">{dico.name}</li>
			{#each dico.items as item, i}
				{@const selected = i + offset === index}
				<li
					on:mousedown|preventDefault={() => {
						name = item.name;
						type = item.type;
					}}
					class:selected
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

			&.selected,
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
