
<script lang="ts">
	import IconButton from "./IconButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { BadgeField } from "./util/schema";

	export let field: BadgeField;

	const dispatch = createEventDispatcher();
</script>

<div class="field">
	<input type="text" data-color="{field.color}" bind:value="{field.content}"
		on:keypress="{()=>dispatch("update")}" on:change="{()=>dispatch("update")}">
	<IconButton icon="color" medium="{true}" />
	<IconButton icon="plugin" medium="{true}" />
	<IconButton icon="trash" medium="{true}" />
</div>

<style lang="scss">
	.field {
		display: flex;
		align-items: center;
		column-gap: 2px;
		
		input {
			background-color: #000;
			border: none;
			border-radius: 5px;
			box-sizing: border-box;
			color: #fff;
			font-family: inherit;
			font-size: 0.65rem;
			flex: 1 1;
			margin: 0;
			margin-right: 10px;
			padding: 6px 20px;
			height: 35px;
		}

		[data-color="0"] {
			background-color: #555;
		}
		[data-color="1"] {
			background-color: #556;
		}
		[data-color="2"] {
			background-color: #013;
		}
		[data-color="3"] {
			background-color: #111;
		}
		[data-color="4"] {
			background-color: #AB2;
		}
		[data-color="5"] {
			background-color: #F80;
		}
		[data-color="6"] {
			background-color: #F20;
		}
	}
</style>