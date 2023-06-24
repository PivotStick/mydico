<script>
	import { page } from "$app/stores";
	import { data } from "$lib/stores/data";
	import { DateTime } from "luxon";
	import { tick } from "svelte";
	import { v4 } from "uuid";

	let query = "";

	// @ts-ignore
	$: faIndex = $data.values.fa.findIndex((fa) => fa.id === $page.params.faId);

	/**
	 * @param {KeyboardEvent} e
	 */
	const keydown = async (e) => {
		const input = e.currentTarget;
		switch (e.key) {
			case "Enter": {
				const name = query.trim();
				query = "";
				if (!name) break;

				$data.values.fa[faIndex].notes.push({
					id: v4(),
					name
				});

				$data.values.fa[faIndex].notes = $data.values.fa[faIndex].notes;

				await tick();

				if (input instanceof HTMLInputElement) {
					input.scrollIntoView({ block: "end", behavior: "smooth" });
				}
				break;
			}

			default:
				break;
		}
	};

	const setStart = () => {
		const now = DateTime.now().startOf("minute");

		$data.values.fa[faIndex].start = now.toISO({
			includeOffset: false,
			suppressSeconds: true,
			suppressMilliseconds: true
		});
	};

	const setEnd = () => {
		const now = DateTime.now().startOf("minute");

		$data.values.fa[faIndex].end = now.toISOTime({
			includeOffset: false,
			suppressSeconds: true,
			suppressMilliseconds: true
		});
	};
</script>

<div class="actions">
	<button on:click={setStart}>
		<i class="fa fa-play" />
		{DateTime.fromISO($data.values.fa[faIndex].start)
			.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)
			.slice(0, -3)}
	</button>
	<button on:click={setEnd}>
		<i class="fa fa-pause" />
		{$data.values.fa[faIndex].end}
	</button>
</div>

<ul class="notes">
	{#each $data.values.fa[faIndex].notes as note (note.id)}
		<li class="notes__note">
			<input type="text" bind:value={note.name} />
			<i
				class="fa fa-trash fa-button danger"
				on:click={() => {
					$data.values.fa[faIndex].notes = $data.values.fa[faIndex].notes.filter(
						// @ts-ignore
						(n) => n.id !== note.id
					);
				}}
			/>
		</li>
	{/each}
	<li class="notes__inputs">
		<input type="text" bind:value={query} on:keydown={keydown} />
	</li>
</ul>

<style lang="scss">
	.actions {
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		button {
			width: 100%;
		}
	}

	.notes {
		display: flex;
		flex-direction: column;

		padding-bottom: env(safe-area-inset-bottom);

		&__note {
			display: flex;
			transition-property: background-color, color;

			input {
				width: 100%;
				border: none;
				padding: 1rem;

				outline: 0px solid var(--color-50);

				transition-property: outline-width;
				background: none;

				&:focus {
					outline-width: 3px;
				}
			}

			i {
				flex-shrink: 0;
				margin: 1rem;
			}

			&:has(i:active) {
				background-color: var(--danger-100);
				color: var(--on-danger-100);
			}
		}

		&__inputs {
			display: flex;

			input {
				border: 1px solid var(--color-200);
				padding: 1rem;
				width: 100%;
				border-radius: 0;

				outline: 0px solid var(--color-50);

				&:focus {
					outline-width: 4px;
				}
			}
		}
	}
</style>
