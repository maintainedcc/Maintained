<script lang="ts" context="module">
	export async function load({ url }) {
		const base = import.meta.env.VITE_MAINTAINED_API_BASE;
		const path = `${base}/${url.searchParams.get("b")}/json`;
		const badge = await fetch(path).then((r) => r.json());

		if (badge?.redirect) return { props: {
			redirect: badge.redirect,
			source: url.searchParams.get("b").split("/")[0]
		}};
		else return { error: "Could not load badge", status: 404 };
	}
</script>

<script lang="ts">
	export let redirect: string;
	export let source: string;
</script>

<div class="bg">
	<span /><span /><span /><span /><span /><span />
</div>
<div class="redirect">
	<div class="card">
		<h1><b>{source}</b> is redirecting you:</h1>
		<a class="link" href={redirect}>{redirect}</a>
		<p class="caption" />
		<p class="caption">
			<img src="/favicon.png" alt="Maintained" />
			<br /><span>&bull;</span><br />
			<span><a href="/">&copy; 2022 Maintained</a></span>
			<br /><span>&bull;</span><br />
			<span>Link Direct</span>
			<br /><span>&bull;</span><br />
			<span>Beware of suspicious URLs.</span>
		</p>
	</div>
</div>

<style lang="scss">
	@import "../lib/scss/mixins.scss";

	.bg {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		overflow: hidden;

		span {
			@include dash-card;
			background-color: var(--brand-primary-light);
			border: 6px solid var(--brand-primary);
			border-radius: 10%;
			display: block;
			margin: auto;
			height: 30vmax;
			width: 30vmax;

			position: absolute;
			top: -100vmax;
			bottom: -100vmax;
			left: -100vmax;
			right: -50vmax;
			z-index: -1;
		}
		span:nth-child(1) {
			border-color: var(--brand-a);
			height: 55vmax;
			width: 55vmax;
			z-index: -2;
		}
		span:nth-child(2) {
			border-color: var(--brand-b);
			height: 85vmax;
			width: 85vmax;
			z-index: -3;
		}
		span:nth-child(3) {
			border-color: var(--brand-c);
			height: 120vmax;
			width: 120vmax;
			z-index: -4;
		}
		span:nth-child(4) {
			border: none;
			height: 155vmax;
			width: 155vmax;
			z-index: -5;
		}
		span:nth-child(5) {
			height: 200vmax;
			width: 200vmax;
			z-index: -6;
		}
	}

	.redirect {
		display: flex;
		flex-direction: column;
		justify-content: center;

		height: 100vh;
	}

	.card {
		@include dash-card;
		border-radius: 20px;
		max-width: 600px;
		padding-bottom: 25px;

		h1 {
			font-size: 1.1rem;
			margin: 0;
		}

		p {
			font-size: 0.8rem;
			margin-bottom: 0;
		}

		a {
			color: var(--brand-primary);
		}

		.link {
			background-color: #000;
			border-radius: 5px;
			box-sizing: border-box;
			color: #fff;
			display: block;
			font-size: 0.8rem;
			font-weight: bold;
			margin-top: 10px;
			margin-bottom: 25px;
			padding: 10px 20px;
			width: 100%;
			text-decoration: underline;
			text-transform: lowercase;
		}

		.caption {
			display: flex;
			align-items: center;
			column-gap: 5px;
			row-gap: 5px;
			font-size: 0.65rem;
			opacity: 0.5;
			flex-wrap: wrap;

			img {
				height: 15px;
				width: 15px;
			}

			span {
				white-space: nowrap;
			}
		}
	}
</style>
