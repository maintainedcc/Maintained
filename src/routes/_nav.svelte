<script lang="ts">
	const loginURL = import.meta.env.VITE_MAINTAINED_LOGIN_URL as string;
</script>

<nav>
	<span>
		<a href="/">
			<h1>
				<img src="/favicon.png" alt="icon" />
				<span>maintained</span>
			</h1>
		</a>
		<span class="spacer" />
		<a href="/">docs</a>
		<a href="/products">products</a>
		<a href="/pricing">pricing</a>
		<a class="login" href={loginURL}>get started</a>
	</span>
</nav>

<style lang="scss">
	nav {
		background-color: var(--brand-primary);
		color: var(--background-primary);
		padding: 15px 0;

		span {
			display: flex;
			align-items: center;
			column-gap: 30px;
			max-width: var(--max-width);
			margin: auto;
		}
	}

	h1 {
		display: flex;
		align-items: center;
		column-gap: 10px;
		margin: 0;

		img {
			border: 3px solid var(--brand-primary-light);
			border-radius: 50%;
			height: 22px;
			width: 22px;
		}
	}

	.spacer {
		flex: 1 1;
	}

	a {
		color: inherit;
		font-family: inherit;
		font-size: 0.9rem;
	}

	.login {
		border: 2px solid;
		border-color: var(--background-primary);
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
		padding: 8px 20px;
	}
</style>
