
<script lang="ts">
	import FieldColorOptions from "$lib/Tai/FieldColorOptions.svelte";
	import IconButton from "$lib/IconButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { BadgeField } from "$lib/util/schema";

	export let field: BadgeField;
	export let showExtras = true;
	$: field.iconURI = field.content.match(/^:(.+):/)?.[1];
	$: field.width = calculateWidth(field.content, "11px Verdana");
	$: iconURL = `${import.meta.env.VITE_MAINTAINED_TAI_BASE}/icon/${field.iconURI}`;

	const dispatch = createEventDispatcher();
	function upd() { dispatch("update"); }

	// Extra options per badge field
	let optsShown = false;
	function toggleOpts() {
		if (!optsShown) dispatch("toggle");
		optsShown = !optsShown;
	}
	export const collapseOpts = () => { optsShown = false };

	function calculateWidth(content: string, font: string) {
		content = content.replace(/:.+:/, "");
		let ctx = document.createElement('canvas').getContext("2d");
		ctx.font = font;        
		return Math.ceil(ctx.measureText(content).width);
	}

	// Deletes badge field
	export let enableDelete = false;
	const del = () => dispatch("delete");
</script>

<div class="field" class:full="{!showExtras}">
	<span class="input" class:hasIcon="{!!field.iconURI}">
		{#if field.iconURI}
		<object data="{iconURL}" title="{field.iconURI}">ERR</object>
		{/if}
		<input type="text" spellcheck="false"
			data-color="{field.color}"
			bind:value="{field.content}"
			on:keyup="{upd}"
			on:change="{upd}">
	</span>
	{#if showExtras}
		<IconButton icon="color" medium="{true}" on:click="{toggleOpts}" active="{optsShown}" />
		<IconButton icon="plugin" medium="{true}" />
		{#if enableDelete}
		<IconButton icon="trash" medium="{true}" on:click="{del}" />
		{/if}
	{/if}
</div>
<FieldColorOptions bind:field="{field}" bind:shown="{optsShown}" on:update />

<style lang="scss">
	@import "../scss/mixins.scss";

	.field {
		@include data-color;
		display: flex;
		align-items: center;
		column-gap: 2px;
		flex: 1 1;

		&:first-child {
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			max-width: 50%;
			min-width: 50%;
		}

		&:last-child {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}

		&.full {
			.input {
				margin-right: 0;
			}
			
			input {
				border-radius: 0;
				font-size: 0.7rem;
				flex: 1 1;
				padding: 12px 20px;
				height: 45px;
			}
		}

		.input {
			flex: 1 1;
			margin-right: 10px;
			position: relative;
		}

		object {
			display: grid;
			place-items: center;
			font-size: 0.5rem;
			font-weight: 700;
			line-height: 1;

			filter: invert(1);
			margin: auto;
			height: 18px;
			width: 18px;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 15px;
		}
		
		input {
			background-color: #000;
			border: none;
			border-radius: 5px;
			box-sizing: border-box;
			color: #fff;
			font-family: inherit;
			font-size: 0.65rem;
			margin: 0;
			padding: 6px 20px;
			height: 35px;
			width: 100%;
		}

		.input.hasIcon {
			input {
				padding-left: 45px;
			}
		}
	}
</style>