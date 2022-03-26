<div class="bg">
	<span /><span /><span /><span /><span /><span />
</div>
<div class="splash">
	<div class="card">
		<h1><slot name="heading" /></h1>
		<slot name="description" />
		<p class="caption">
			<img src="/favicon.png" alt="Maintained" />
			<span><a href="/">Maintained</a></span>
			<slot name="footer" />
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

	.splash {
		display: flex;
		flex-direction: column;
		justify-content: center;

		max-width: var(--max-width);
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}

	:global .card {
		@include dash-card;
		border-radius: 20px;
		max-width: 580px;
		width: 100%;
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
			text-transform: lowercase;
		}

		.caption,
		> span {
			display: flex;
			align-items: center;
			column-gap: 5px;
			row-gap: 5px;
			font-size: 0.65rem;
			flex-wrap: wrap;

			img {
				height: 15px;
				width: 15px;
			}

			> span {
				display: flex;
				align-items: center;
				column-gap: 8px;
				white-space: nowrap;
			}
		}
		.caption {
			opacity: 0.5;
		}
	}
</style>
