<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { BadgeField } from "$lib/util/schema";

	const dispatch = createEventDispatcher();
	export let field: BadgeField;
	export let shown = false;

	// Updates individual badge field color
	function setColor(num: number) {
		field.color = num;
		dispatch("update");
	}

	// Translates color enum to readable name
	function colorToName(num: number) {
		switch (num) {
			case 0:
				return "Simple";
			case 1:
				return "Slate";
			case 2:
				return "Seabed";
			case 3:
				return "Subterranean";
			case 4:
				return "Savannah";
			case 5:
				return "Sahara";
			case 6:
				return "Sunset";
		}
	}
</script>

{#if shown}
	<div class="options">
		<p>{colorToName(field.color)}</p>
		{#each Array(7) as _, i}
			<button
				class="color-opt"
				class:active={field.color === i}
				data-color={i}
				on:click={() => setColor(i)}
			/>
		{/each}
	</div>
{/if}

<style lang="scss">
	@import "../scss/mixins.scss";

	.options {
		@include data-color;
		border-left: var(--blue) 2px solid;
		border-radius: 1px;
		display: flex;
		align-items: center;
		column-gap: 10px;
		margin-bottom: 5px;
		padding: 2px 10px;

		p {
			flex: 1 1;
			margin: 0;
		}

		button {
			border: 3px solid;
			border-radius: 5px;
			padding: 0;
			height: 20px;
			width: 20px;

			&.active {
				background-color: transparent;
			}
		}
	}
</style>
