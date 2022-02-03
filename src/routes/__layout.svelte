
<main>
	<slot />
</main>

<style lang="scss" global>
	:root {
		--brand-primary: #c21;
		--brand-secondary: #f98;
		--brand-a: #f7951e;
		--brand-b: #fbb03b;
		--brand-c: #fc7;

		--background-primary: #fff;

		--text-brand: var(--brand-a);

		--green: #a5b800;
		--blue: #00b8a5;

		--max-width: 1200px;

		font-size: 20px;
	}

	@media (min-width: 1600px) {
		:root {
			--max-width: 1500px;
		}
	}

	html {
		background-color: var(--brand-primary);
		overflow-x: hidden;
	}

	body {
		margin: 0;
	}

	main {
		font-family: "Urbanist", sans-serif;
		max-width: var(--max-width);
		margin: auto;
		padding: 0 15px;
	}

	h1, h2, h3, h4, h5, h6 {
		font-family: "Poppins", sans-serif;
		font-weight: 500;
	}

	code, pre {
		background-color: #0001;
		border-radius: 5px;
		color: #555;
		font-family: "Fira Mono", monospace;
		font-size: 0.85em;
		padding: 1px 6px;
	}

	a {
		color: var(--green);
		font-weight: bold;
		text-decoration: none;
		text-transform: lowercase;
		transition-duration: 0.2s;

		&:hover {
			color: var(--blue);
		}
	}
</style>