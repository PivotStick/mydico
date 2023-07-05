<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import QuickSelect from "$lib/components/QuickSelect.svelte";
	import { data } from "$lib/stores/data";
	import { DateTime } from "luxon";
	import { tick } from "svelte";
	import { v4 } from "uuid";

	const types = ["pub", "fa", "jingle"];
	/**
	 * @type {DataValues["fa"][number]["notes"][number]["mode"][]}
	 */
	const modes = [
		undefined,
		{ name: "jingle", color: "jingle", value: "pub" },
		{ name: "noir", color: "noir", value: "noir" }
	];

	/**
	 * @type {Omit<DataValues["fa"][number]["notes"][number], "id">}
	 */
	let payload = {
		name: "",
		mode: modes[0],
		type: types[0]
	};

	$: faIndex = $data.values.fa.findIndex((fa) => fa.id === $page.params.faId);

	/**
	 * @param {KeyboardEvent} e
	 */
	const keydown = async (e) => {
		const input = e.currentTarget;
		switch (e.key) {
			case "Enter": {
				const name = payload.name.trim();
				payload.name = "";
				if (!name) break;

				$data.values.fa[faIndex].notes.push({
					id: v4(),
					...payload,
					name
				});

				$data.values.fa[faIndex].notes = $data.values.fa[faIndex].notes;

				await tick();

				if (input instanceof HTMLInputElement) {
					input.scrollIntoView({ block: "center", behavior: "smooth" });
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

<ul class="notes">
	{#each $data.values.fa[faIndex].notes as note (note.id)}
		<li class="notes__note" class:mode={note.mode}>
			<input type="text" bind:value={note.name} />
			<div class="type">
				{note.type}
				{#if note.mode && note.mode.value !== note.type}
					{note.mode.value}
				{/if}
			</div>
			<i
				class="fa fa-trash fa-button danger"
				on:click={() => {
					$data.values.fa[faIndex].notes = $data.values.fa[faIndex].notes.filter(
						(n) => n.id !== note.id
					);
				}}
			/>
		</li>
	{/each}
	<li class="notes__inputs">
		<input type="text" bind:value={payload.name} on:keydown={keydown} />
		<select bind:value={payload.type}>
			{#each types as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
		<select bind:value={payload.mode}>
			{#each modes as mode}
				{#if mode}
					<option value={mode}>{mode.name}</option>
				{:else}
					<option value={undefined}>normal</option>
				{/if}
			{/each}
		</select>
	</li>
</ul>

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
	<button style="grid-column: 1 / -1;" on:click={() => goto("/fa")}>
		<i class="fa fa-arrow-left" />
		Revenir
	</button>
</div>

<style lang="scss">
	.actions {
		padding: 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
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
			align-items: center;
			transition-property: background-color, color;

			input {
				width: 100%;
				border: none;
				padding: 1rem;
				font-size: 1.5rem;

				outline: 0px solid var(--color-50);

				transition-property: outline-width;
				background: none;

				&:focus {
					outline-width: 3px;
				}
			}

			.type {
				width: max-content;
				font-style: italic;
				opacity: 0.7;
				padding-left: 1rem;
				flex-shrink: 0;
			}

			i {
				flex-shrink: 0;
				margin: 1rem;
			}

			&:has(i:active) {
				background-color: var(--danger-100);
				color: var(--on-danger-100);
			}

			&.mode {
				background-color: var(--color-200);
				color: var(--on-color-200);
			}
		}

		&__inputs {
			display: flex;
			border: 1px solid var(--color-200);

			select,
			input {
				border: 1px solid var(--color-200);
				padding: 1rem;
				border-radius: 0;

				outline: 0px solid var(--color-50);
				background-color: transparent;

				&:focus {
					outline-width: 4px;
				}
			}

			input {
				width: 200%;
			}
		}
	}
</style>
