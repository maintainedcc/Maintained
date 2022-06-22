<script lang="ts">
	import BadgeButton from "$lib/BadgeButton.svelte";

	const loginURL = import.meta.env.VITE_MAINTAINED_LOGIN_URL as string;
</script>

<section class="hero">
	<div class="left-deco" />
	<div class="left-deco a" />
	<div class="left-deco b" />
	<div class="left-deco c" />
	<h1>maintain<br />everything<br />effortlessly.</h1>
	<div class="cta">
		<BadgeButton left="Get Started" right="With GitHub" href={loginURL} />
	</div>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		height: 60vh;
		min-height: 350px;

		.left-deco {
			-webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
			clip-path: polygon(0 0, 100% 100%, 0% 100%);
			position: fixed;
			left: -5vmax;
			bottom: -5vmax;

			background-color: var(--brand-primary);
			height: 30vmax;
			width: 37.5vmax;
			z-index: -1;

			&.a {
				background-color: var(--brand-a);
				height: 40vmax;
				width: 50vmax;
				z-index: -2;
			}
			&.b {
				background-color: var(--brand-b);
				height: 50vmax;
				width: 62.5vmax;
				z-index: -3;
			}
			&.c {
				background-color: var(--brand-c);
				height: 60vmax;
				width: 75vmax;
				z-index: -4;
			}
		}
	}

	.cta {
		display: flex;
		column-gap: 16px;
		margin-top: 30px;
	}

	h1 {
		background-color: var(--brand-primary);
		border-right: 15px solid var(--brand-primary-light);
		color: var(--background-primary);
		letter-spacing: -2px;
		line-height: 1;
		font-family: "Urbanist";
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0;
		padding-left: 2px;
		padding-right: 30px;
		text-align: right;
		text-transform: uppercase;

		width: max-content;
		position: relative;
	}

	@media (min-width: 512px) {
		h1 {
			font-size: 3.5rem;
		}
	}

	@media (min-width: 768px) {
		.cta {
			margin-bottom: 3vh;
		}
		h1 {
			font-size: 5rem;
		}
	}

	@media (min-width: 1600px) {
		h1 {
			font-size: 7rem;
		}
	}
</style>
