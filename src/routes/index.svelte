
<section class="hero">
	<h1 data-shadow="MNTMNT">Maintained</h1>
	<h2>Overengineered repository management</h2>
	<a class="cta" href="http://localhost:8999/oauth/login"><b>Get Started</b> With <b>GitHub</b></a>
</section>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		min-height: 70vh;
	}

	h1 {
		background-image: linear-gradient(-45deg, #ffa631 0%, #f5576c 100%);
		background-clip: text;
		color: transparent;
		line-height: 1;
		font-size: 8rem;
		margin: 0;
		
		transition-duration: 0.6s;

		width: max-content;
		position: relative;

		&::before {
			background-color: #ffe;
			content: attr(data-shadow);
			position: absolute;
			top: 40%;
			right: 30%;
			color: #fb31;
			filter: blur(2px);
			transform: scale(5);
			text-transform: uppercase;
			z-index: -1;
		}
	}

	h2 {
		color: #668;
		font-size: 2rem;
		font-weight: 700;
		margin-top: 0;
		text-transform: uppercase;
	}

	.cta {
		background-color: #000;
		border-radius: 0.4rem;
		color: #fff;
		letter-spacing: 0.5px;
		font-family: "Poppins";
		font-size: 1.1rem;
		font-weight: 500;
		text-decoration: none;
		text-transform: uppercase;
		padding: 15px 50px;
		width: max-content;
	}

	b {
		font-weight: 900;
	}
</style>