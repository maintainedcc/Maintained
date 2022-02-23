
<script lang="ts">
	import IconButton from "$lib/IconButton.svelte";
	import { user } from "$lib/util/data";

	$: username = $user.name;
</script>

<header>
	<span>
		<img src="/favicon.png" alt="logo">
		<h1>maintained <b>workspace</b></h1>
		<code>v0.1.0</code>
	</span>
	<nav>
		<IconButton icon="bell" />
		<IconButton icon="help" />
		<button class="account">
			<img src="https://github.com/{username}.png" alt="Account">
		</button>
	</nav>
</header>

<style lang="scss">
  @import "./scss/mixins.scss";

	header {
		@include dash-card;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25px 35px;
		padding-left: 30px;

		nav, span {
			display: flex;
			align-items: center;
			column-gap: 10px;
		}
		span {
			column-gap: 15px;

			img {
				height: 35px;
				width: 35px;
			}
		}

		h1 {
			font-size: 1.5rem;
			margin: 0;
		}

		.account {
			background-color: transparent;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			display: grid;
			place-items: center;
			margin-left: 10px;
			padding: 5px;
			transition-duration: 0.2s;

			img {
				width: 35px;
				height: 35px;
				border-radius: 50%;
			}

			&:hover {
				background-color: var(--background-secondary);
			}
		}
	}
</style>