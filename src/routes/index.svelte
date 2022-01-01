
<section>
	<h1 data-badge="Dev">Maintained</h1>
	<h2>Overengineered repository management</h2>
	<a class="cta" href="http://localhost:8999/oauth/login">Get Started With GitHub</a>
</section>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 70vh;
	}

	h1 {
		background-image: linear-gradient(-45deg, #ffa631 0%, #f5576c 100%);
		background-clip: text;
		color: transparent;
		line-height: 1;
		font-size: 8rem;
		margin-bottom: 0;
		
		transition-duration: 0.6s;

		width: max-content;
		position: relative;

		&::after {
			background: #000;
			border-radius: 0.4rem;
			box-shadow: 0 0 0.5rem #eb3;
			content: attr(data-badge);
			color: #eb3;
			font-size: 1.5rem;
			font-weight: bold;
			text-transform: uppercase;
			padding: 0.5rem 1rem;
			position: absolute;
			top: 0;
			left: calc(100% + 1rem);
		}
	}

	h2 {
		color: #779;
		font-size: 2rem;
		font-weight: 700;
		margin-top: 0;
		text-transform: uppercase;
	}

	.cta {
		background-color: #000;
		border-radius: 0.4rem;
		color: #fff;
		font-family: "Poppins";
		font-size: 1rem;
		font-weight: bold;
		text-decoration: none;
		text-transform: uppercase;
		padding: 15px 50px;
		width: max-content;
	}
</style>