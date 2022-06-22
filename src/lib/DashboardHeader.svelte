<script lang="ts">
	import IconButton from "$lib/IconButton.svelte";
	import Popover from "./Popover.svelte";
	import { user } from "$lib/util/data";

	$: username = $user.name;
	let accountPopover = false;
	const toggleAccountPopover = () => {
		accountPopover = !accountPopover;
	};
</script>

<header>
	<span>
		<img src="/favicon.png" alt="logo" />
		<h1>maintained <b>workspace</b></h1>
		<code>{import.meta.env.VITE_VERSION}</code>
	</span>
	<nav>
		<IconButton icon="help" />
		<div class="account">
			<button on:click={toggleAccountPopover}>
				<img src="https://github.com/{username}.png" alt="Account" />
			</button>
			<Popover bind:shown={accountPopover} />
		</div>
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

		nav,
		span {
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
			margin-left: 10px;

			position: relative;
			transition-duration: 0.2s;

			button {
				background-color: transparent;
				border: none;
				border-radius: 50%;
				box-sizing: border-box;
				cursor: pointer;
				display: grid;
				place-items: center;
				padding: 5px;
				position: relative;
				z-index: 4;

				&:hover {
					background-color: var(--background-secondary);
				}
			}

			img {
				width: 35px;
				height: 35px;
				border-radius: 50%;
			}
		}
	}
</style>
