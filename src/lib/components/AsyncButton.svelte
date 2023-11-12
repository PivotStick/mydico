<script>
	import { scale } from "svelte/transition";
	import { backIn, backOut } from "svelte/easing";
	import { snacks } from "./Snacks.svelte";

	/**
	 * @type {() => Promise<any>}
	 */
	export let async;

	let loading = false;

	const handle = async () => {
		try {
			loading = true;
			const successMessage = await async();
			if (typeof successMessage === "string") {
				snacks.success(successMessage);
			}
		} catch (e) {
			console.error(e);
			snacks.error(e);
		} finally {
			loading = false;
		}
	};
</script>

<button {...$$restProps} disabled={loading} class:loading on:click={handle}>
	<div class="container">
		<slot />
	</div>

	{#if loading}
		<div class="loader">
			<i
				in:scale={{ easing: backOut }}
				out:scale={{ easing: backIn }}
				class="fa fa-spinner fa-load"
			/>
		</div>
	{/if}
</button>

<style lang="scss">
	button {
		position: relative;

		.container {
			display: inherit;
			align-items: inherit;
			justify-content: inherit;
			gap: inherit;

			opacity: 1;
			transition-property: opacity, scale;
			transition-delay: 300ms;
		}

		&.loading {
			.container {
				opacity: 0;
				scale: 0.75;
				transition-delay: 0ms;
			}
		}

		.loader {
			position: absolute;
			inset: 0;

			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
