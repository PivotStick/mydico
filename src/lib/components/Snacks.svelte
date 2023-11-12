<script context="module">
	import { backOut, expoOut } from "svelte/easing";
	import { writable } from "svelte/store";
	import { slide } from "svelte/transition";
	import { v4 } from "uuid";

	/**
	 * @typedef {{
	 *  id: string;
	 *  type: "success" | "danger" | "normal";
	 *  title: string;
	 *  message: string;
	 * }} Snack
	 */
	export const snacks = (() => {
		const { subscribe, update } = writable(/** @type {Snack[]} */ ([]));

		/**
		 * @type {ReturnType<typeof setInterval>=}
		 */
		let interval;

		/**
		 * @param {Pick<Snack, "type" | "title" | "message">} snack
		 */
		function push(snack) {
			update((snacks) => {
				snacks.push({
					id: v4(),
					...snack
				});
				return snacks;
			});

			if (interval) return;

			interval = setInterval(() => {
				update((snacks) => {
					snacks.shift();

					if (!snacks.length) {
						clearInterval(interval);
						interval = undefined;
					}

					return snacks;
				});
			}, 8000);
		}

		return {
			subscribe,

			/**
			 * @param {Snack} snack
			 */
			remove(snack) {
				update((snacks) => {
					snacks.splice(snacks.indexOf(snack), 1);

					if (!snacks.length) {
						clearInterval(interval);
						interval = undefined;
					}

					return snacks;
				});
			},

			normal(message = "", title = "Message") {
				return push({ type: "normal", title, message });
			},
			success(message = "", title = "Succès") {
				return push({ type: "success", title, message });
			},
			danger(message = "", title = "Oops !") {
				return push({ type: "danger", title, message });
			},

			/**
			 * @param {*} e
			 */
			error(e) {
				let message = "Une erreur inconnue est survenue, faut peut-être appeler Maxime 🤷";

				if (e instanceof Error) {
					message = `Montre ça à Maxime:\n\n${e.message}`;
				}

				return push({ type: "danger", title: "Erreur !", message });
			}
		};
	})();

	/**
	 * @type {Record<Snack["type"], string>}
	 */
	const icons = {
		danger: "fa-exclamation-circle",
		normal: "fa-comment",
		success: "fa-check-circle"
	};
</script>

<ul>
	{#each $snacks as snack (snack.id)}
		<li class={snack.type} in:slide={{ easing: backOut }} out:slide={{ easing: expoOut }}>
			<button class="fa fa-ban fa-button" on:click={() => snacks.remove(snack)} />
			<div class="title"><i class="fa {icons[snack.type]}" /> {snack.title}</div>
			<div class="message">{snack.message}</div>
		</li>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 30;

		li {
			position: relative;

			max-width: 25rem;
			width: max-content;
			z-index: 0;

			background-color: white;
			box-shadow: 0 0.5rem 2rem -0.75rem var(--color-800);

			margin: 1rem;
			margin-top: 0;

			padding: 1rem;
			padding-right: 2rem;

			border-radius: 1rem;
			color: var(--on-color-50);

			button {
				position: absolute;
				top: 0;
				right: 0;
				z-index: 1;

				translate: 35% -35%;
			}

			.title {
				font-size: 1.25rem;
				font-weight: 900;
				margin-bottom: 1rem;
				display: flex;
				gap: 0.75rem;
				align-items: baseline;
			}

			.message {
				white-space: pre-wrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
