<script>
	export let label = "";
	export let value = "";
	export let placeholder = " ";

	export let textarea = false;
</script>

<label>
	{#if label}
		<span>{label}</span>
	{/if}
	{#if textarea}
		<textarea cols="30" rows="10" bind:value {placeholder} />
	{:else}
		<input type="text" bind:value {placeholder} />
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

		outline: 0px solid var(--color-100);

		transition-property: outline-width;

		span {
			display: block;
			padding: 0.5rem;
			padding-bottom: 0;

			font-size: 0.8em;
			opacity: 0.7;
		}

		textarea,
		input {
			font: inherit;
			border: none;
			padding: 0.5rem;
			background: none;
			width: 100%;
			outline: none;

			&::placeholder {
				color: inherit;
				opacity: 0.5;
			}
		}

		&:focus-within {
			outline-width: 3px;
		}
	}
</style>
