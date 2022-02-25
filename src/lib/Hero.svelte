<script lang="ts">
	import BadgeButton from "$lib/BadgeButton.svelte";
	const loginURL = import.meta.env.VITE_MAINTAINED_LOGIN_URL as string;
</script>

<section class="hero">
	<div class="left-deco a" />
	<div class="left-deco b" />
	<div class="left-deco c" />
	<div class="right-deco" />
	<h1>maintained</h1>
	<h2>Overengineered repository management</h2>
	<BadgeButton href={loginURL} left="Get Started" right="With GitHub" />
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		height: 65vh;
		min-height: 350px;

		.left-deco {
			-webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
			clip-path: polygon(0 0, 100% 100%, 0% 100%);
			position: fixed;
			left: -5vmax;
			bottom: -5vmax;

			&.a {
				background-color: var(--brand-a);
				height: 40vmax;
				width: 60vmax;
				z-index: -2;
			}
			&.b {
				background-color: var(--brand-b);
				height: 50vmax;
				width: 75vmax;
				z-index: -3;
			}
			&.c {
				background-color: var(--brand-c);
				height: 60vmax;
				width: 90vmax;
				z-index: -4;
			}
		}

		.right-deco {
			background-color: var(--background-primary);
			-webkit-clip-path: polygon(100% 0, 100% 100%, 0% 100%);
			clip-path: polygon(100% 0, 100% 100%, 0% 100%);
			height: 5vh;
			width: 100vw;
			position: absolute;
			right: 0;
			top: calc(60vh + 1px);
			z-index: 3;
		}
	}

	h1 {
		background-color: var(--brand-primary);
		border-radius: 2px;
		color: #fff;
		line-height: 1;
		font-size: 2.5rem;
		margin: 0;
		padding-left: 2px;

		width: max-content;
		position: relative;
	}

	h2 {
		color: var(--brand-secondary);
		font-size: 0.9rem;
		font-weight: 700;
		margin-top: 0;
		max-width: 300px;

		text-align: right;
		text-shadow: 1px 1px 0 var(--brand-primary);
		text-transform: uppercase;
		z-index: 2;
	}

	@media (min-width: 512px) {
		h1 {
			font-size: 3.5rem;
		}
		h2 {
			max-width: unset;
		}
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 5rem;
			margin-top: 3vh;
		}
		h2 {
			font-size: 1.3rem;
		}
	}

	@media (min-width: 1600px) {
		h1 {
			font-size: 7rem;
			margin-top: 5vh;
		}
		h2 {
			font-size: 1.8rem;
		}
	}
</style>
