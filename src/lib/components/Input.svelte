<script>
	export let label = "";
	/**
	 * @type {any}
	 */
	export let value = "";
	export let placeholder = " ";

	export let textarea = false;
	/**
	 * @type {string[]=}
	 */
	export let select = undefined;
</script>

<label>
	{#if label}
		<span>{label}</span>
	{/if}
	{#if textarea}
		<textarea cols="30" rows="10" bind:value {placeholder} />
	{:else if select}
		<select bind:value>
			{#if placeholder.trim()}
				<option disabled selected>{placeholder}</option>
			{/if}
			{#each select as option}
				<option>{option}</option>
			{/each}
		</select>
	{:else}
		<input type="text" bind:value {...$$restProps} {placeholder} />
	{/if}
</label>

<style lang="scss">
	label {
		display: block;
		border: 1px solid var(--color-200);
		width: 100%;

		display: grid;
		border-radius: 0.5rem;
		background-color: white;
		color: var(--on-color-50);

		outline: 0px solid var(--color-100);

		transition-property: outline-width;

		span {
			display: block;
			padding: 0.5rem;
			padding-bottom: 0;

			font-size: 0.8em;
			opacity: 0.7;
		}

		select,
		textarea,
		input {
			font: inherit;
			color: inherit;
			border: none;
			padding: 0.5rem;
			background: none;
			width: 100%;
			outline: none;

			&::placeholder {
				color: inherit;
				opacity: 0.5;
				font-style: italic;
			}
		}

		textarea {
			resize: vertical;
		}

		&:focus-within {
			outline-width: 3px;
		}
	}
</style>
