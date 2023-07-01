<script>
	import { backOut } from "svelte/easing";
	import { scale } from "svelte/transition";

	export let placeholder = "";

	/**
	 * @type {string[] | { text: string; value: any }[]}
	 */
	export let options = [];
	/**
	 * @type {any}
	 */
	export let selected;

	$: selectedIndex = options.findIndex((o) => {
		const v = typeof o === "string" ? o : o.value;
		return v === selected;
	});

	/**
	 * @type {{ x: number; y: number; }=}
	 */
	let mouse;

	/**
	 * @param {MouseEvent | TouchEvent} e
	 */
	const setMouse = (e) => {
		e.preventDefault();

		if (mouse) return (mouse = undefined);

		if (e instanceof TouchEvent) {
			const touch = e.targetTouches.item(0);

			if (!touch) return;

			mouse = {
				x: touch.screenX,
				y: touch.screenY
			};
		} else {
			mouse = {
				x: e.clientX,
				y: e.clientY
			};
		}
	};
</script>

<div class="select" on:touchstart={setMouse} on:mousedown={setMouse}>
	{#if selectedIndex !== -1}
		{@const item = options[selectedIndex]}
		<span>
			{typeof item === "string" ? item : item.text}
		</span>
	{:else if placeholder}
		<span class="placeholder">
			{placeholder}
		</span>
	{/if}
</div>

{#if mouse}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		transition:scale={{ easing: backOut }}
		class="menu"
		style:--x="{mouse.x}px"
		style:--y="{mouse.y}px"
	>
		{#each options as option}
			<div
				class="option"
				class:current={option === selected}
				on:mousedown={(e) => {
					if (!mouse) return;
					e.preventDefault();
					selected = typeof option === "string" ? option : option.value;
					mouse = undefined;
				}}
			>
				{typeof option === "string" ? option : option.text}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.select {
		position: relative;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--color-200);
		border-radius: var(--border-radius, 0.5rem);
		display: flex;
		align-items: center;

		transition-property: opacity;

		&:active {
			opacity: 0.5;
		}

		span {
			&.placeholder {
				font-style: italic;
				opacity: 0.65;
			}
		}
	}

	.menu {
		position: fixed;
		display: flex;
		flex-direction: column;

		top: var(--y);
		left: var(--x);
		border-radius: 0.5rem;

		background-color: white;
		border: 1px solid var(--color-200);
		overflow: hidden;
		transform-origin: bottom right;

		translate: -100% calc(-100% - 1rem);
		outline: 0px solid var(--color-50);
		transition-property: outline-width;

		&:focus {
			outline-width: 3px;
		}

		.option {
			padding: 0.5rem;

			&:hover {
				background-color: var(--color-100);
				color: var(--on-color-100);
			}
		}
	}
</style>
