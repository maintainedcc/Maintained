
<main>
	<slot />
</main>

<style lang="scss" global>
	:root {
		font-size: 20px;
	}

	main {
		font-family: "Urbanist", sans-serif;
		max-width: 1500px;
		margin: auto;
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
		color: #e73;
		font-weight: bold;
		text-decoration: none;
		text-transform: lowercase;
	}
</style>