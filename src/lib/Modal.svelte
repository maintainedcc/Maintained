<script lang="ts">
	import { closeModal } from "./util/modal";
	import { sineInOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	import { onDestroy } from "svelte";

	let shown = false;
	export const show = () => (shown = true);
	const hide = () => (shown = false);

	let unsub = closeModal.subscribe(hide);
	onDestroy(unsub);

	export function beam(n: Node, ..._: any[]) {
		return {
			delay: 0,
			duration: 450,
			css: (t: number) => {
				const x = sineInOut(t);
				return `
        border-radius: ${200 - 200 * x}vw;
        width: ${x * 110}vmax;
        height: ${x * 110}vmax;
        opacity: ${0.5 + 0.5 * x};`;
			}
		};
	}
</script>

{#if shown}
	<div class="cover" transition:beam on:click={hide} />
	<div
		class="flyout"
		in:fly={{ y: 25, delay: 100, duration: 750 }}
		out:fly={{ y: 25, delay: 100, duration: 750 }}
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	.cover {
		background-color: #0007;
		margin: auto;
		position: fixed;
		top: -100vmax;
		left: -100vmax;
		bottom: -100vmax;
		right: -100vmax;
		z-index: 20;
	}

	.flyout {
		background-color: var(--background-primary);
		border-radius: 10px;

		margin: auto;
		padding: 30px;
		max-height: calc(100vh - 120px);
		height: min-content;
		width: 360px;

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		overflow-y: auto;

		:global {
			h2 {
				font-size: 1rem;
				margin: 0;
			}

			h3,
			label {
				color: var(--blue);
				display: block;
				font-family: "Urbanist", sans-serif;
				font-size: 0.6rem;
				letter-spacing: 1px;
				text-transform: uppercase;
				margin: 0;
				margin-top: 16px;
			}

			p {
				display: block;
				font-size: 0.65rem;
				letter-spacing: 1px;
				line-height: 1.5;
				margin: 0;
			}

			button,
			input {
				background-color: transparent;
				border: var(--blue) 1px solid;
				border-radius: 3px;
				box-sizing: border-box;

				font-family: inherit;
				font-size: 0.65rem;
				letter-spacing: 1px;

				margin: 0;
				padding: 8px 15px;

				transition-duration: 0.2s;
			}

			input {
				padding: 9px 19px;
			}

			button {
				cursor: pointer;
				font-size: 0.6rem;
				text-transform: uppercase;

				&:hover {
					background-color: var(--blue);
					color: white;
				}
			}
		}
	}
</style>
