
<script lang="ts">
	import IconButton from "./IconButton.svelte";
	import { createEventDispatcher } from "svelte";
	import type { BadgeField } from "./util/schema";

	export let field: BadgeField;
	export let showExtras = true;
	$: field.iconURI = field.content.match(/^:(.+):/)?.[1];
	$: field.width = calculateWidth(field.content, "11px Verdana");
	$: iconURL = `https://unpkg.com/simple-icons@v6/icons/${field.iconURI}.svg`;

	const dispatch = createEventDispatcher();
	function upd() { dispatch("update"); }

	// Extra options per badge field
	let optsShown = false;
	function toggleOpts() {
		if (!optsShown) dispatch("toggle");
		optsShown = !optsShown;
	}
	export function collapseOpts() {
		optsShown = false;
	}

	function calculateWidth(content: string, font: string) {
		content = content.replace(/:.+:/, "");
		let ctx = document.createElement('canvas').getContext("2d");
		ctx.font = font;        
		return Math.ceil(ctx.measureText(content).width);
	}

	// Deletes badge field
	export let enableDelete = false;
	function del() {
		dispatch("delete");
	}

	// Updates individual badge field color
	function setColor(num: number) {
		field.color = num;
		dispatch("update");
	}
	function colorToName(num: number) {
		switch(num) {
			case 0: return "Simple";
			case 1: return "Slate";
			case 2: return "Seabed";
			case 3: return "Subterranean";
			case 4: return "Savannah";
			case 5: return "Sahara";
			case 6: return "Sunset";
		}
	}
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
{#if optsShown}
<div class="options">
	<p>{colorToName(field.color)}</p>
	{#each Array(7) as _, i}
	<button
		class="color-opt" class:active="{field.color === i}"
		data-color="{i}" on:click="{()=>setColor(i)}">
	</button>
	{/each}
</div>
{/if}

<style lang="scss">
	.field {
		display: flex;
		align-items: center;
		column-gap: 2px;
		flex: 1 1;

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

	.options {
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

	.field, .options {
		[data-color="0"] {
			background-color: #555;
			border-color: #555;
		}
		[data-color="1"] {
			background-color: #556;
			border-color: #556;
		}
		[data-color="2"] {
			background-color: #013;
			border-color: #013;
		}
		[data-color="3"] {
			background-color: #111;
			border-color: #111;
		}
		[data-color="4"] {
			background-color: #AB2;
			border-color: #AB2;
		}
		[data-color="5"] {
			background-color: #F80;
			border-color: #F80;
		}
		[data-color="6"] {
			background-color: #F20;
			border-color: #F20;
		}
	}
</style>