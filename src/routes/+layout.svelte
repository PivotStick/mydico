<script>
	import { page } from "$app/stores";
	import Snacks from "$lib/components/Snacks.svelte";

	import "../app.scss";
	import "@fortawesome/fontawesome-free/css/all.min.css";

	const links = [
		{
			icon: "fa-book",
			href: "/dicos"
		},
		{
			icon: "fa-bookmark",
			href: "/posters"
		},
		{
			icon: "fa-film",
			href: "/fa"
		},
		{
			icon: "fa-tv",
			href: "/leds"
		},
		{
			icon: "fa-comment",
			href: "/comments"
		},
		{
			icon: "fa-cog",
			href: "/"
		}
	];
</script>

<svelte:head>
	<title>My Dico</title>
</svelte:head>

<Snacks />

<div class="layout">
	<nav>
		<ul>
			{#each links as { icon, href } (href)}
				{@const current = $page.url.pathname === href ? "page" : undefined}
				<li>
					<a {href} aria-current={current}>
						<i class="fa {icon}" />
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div />
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.layout {
		display: grid;
		grid-template-rows: calc(72px + env(safe-area-inset-top)) 1fr;
		height: 100vh;

		@media only screen and (hover: none) and (pointer: coarse) {
			height: -moz-available;
			height: -webkit-fill-available;
			height: fill-available;
		}

		@media all and (display-mode: standalone) {
			height: 100vh;
		}
	}

	nav {
		overflow: auto;
		scrollbar-width: none;
		position: fixed;

		top: 0;
		left: 0;
		right: 0;

		z-index: var(--z-index-nav);

		background-color: var(--color-950);
		color: var(--on-color-950);
		padding-top: env(safe-area-inset-top);

		&::-webkit-scrollbar {
			display: none;
		}

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 0.5rem 1rem;
			padding: 1rem;

			li {
				&:not(:last-child) {
					padding-right: 0;
				}
			}

			a {
				cursor: pointer;

				$size: 2.5rem;
				border-radius: 0.5rem;
				font-size: 1.25rem;

				width: $size;
				height: $size;

				display: flex;
				justify-content: center;
				align-items: center;

				opacity: 0.8;
				background-color: var(--color-900);
				color: var(--on-color-900);

				transition-property: opacity, scale;

				&:hover {
					opacity: 1;
				}

				&:active {
					scale: 0.98;
					opacity: 0.5;
				}

				&[aria-current="page"] {
					pointer-events: none;
					background-color: var(--color-700);
					color: var(--on-color-700);
					opacity: 1;
				}
			}
		}
	}

	main {
		position: relative;
		overflow: auto;

		--main-padding: 1.5rem;
		--main-padding-bottom: calc(var(--main-padding) + env(safe-area-inset-bottom));
	}
</style>
