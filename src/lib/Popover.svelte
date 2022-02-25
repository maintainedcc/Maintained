<script lang="ts">
	import AccountManager from "./AccountManager.svelte";
	import Modal from "./Modal.svelte";

	export let shown = false;
	let show: () => any; // Show account modal
</script>

{#if shown}
	<div class="popover">
		<button on:click={show}>Account</button>
		<a href="/auth/logout" rel="external">Log Out</a>
		<Modal bind:show><AccountManager /></Modal>
	</div>
{/if}

<style lang="scss">
	@import "./scss/mixins.scss";

	.popover {
		@include dash-card;
		border: 1px solid var(--brand-primary);
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		min-height: 60px;
		padding: 8px 15px;
		padding-right: 60px;
		width: 230px;

		position: absolute;
		top: -5px;
		right: -5px;
		z-index: 3;

		a,
		button {
			background-color: #000;
			border: none;
			border-radius: 3px;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			display: block;
			font-size: 0.65rem;
			font-weight: bold;
			text-align: right;
			text-transform: uppercase;

			padding: 10px 15px;
			width: 100%;
		}
	}
</style>
