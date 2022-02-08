
<script lang="ts">
	import BadgeManager from "./BadgeManager.svelte";
	import Modal from "./Modal.svelte";
	import { user } from "./util/data";
	import type { Badge, Project } from "./util/schema";

	export let badge: Badge;
	export let project: Project;
	let show: () => any; // Opens badge manager modal

	function copy() {
		const host = import.meta.env.VITE_MAINTAINED_API_BASE;
		const url = `${host}/${$user.name}/${project.title}/${badge.id}`;
		const text = `![${url}](${url})`;
		navigator.clipboard.writeText(text);
	}
</script>

<div class="group">
	<div class="editor">
		{#each badge.fields.slice(0, 2) as field}
		<input data-color="{field.color}" type="text" placeholder="Badge Content" bind:value="{field.content}">
		{/each}
		{#if badge.fields.length > 2}
		<button>+{badge.fields.length - 2}</button>
		{/if}
	</div>
	<div class="controls">
		<button on:click="{copy}"><svg><use xlink:href="/img/icon.svg#clipboard"></use></svg></button>
		<button on:click="{show}"><svg><use xlink:href="/img/icon.svg#settings" /></svg></button>
		<Modal bind:show><BadgeManager bind:badge="{badge}" project="{project}" /></Modal>
	</div>
</div>

<style lang="scss">
	.group {
		column-gap: 20px;
		justify-content: space-between;
	}

	.group, .editor, .controls {
		display: flex;
		align-items: center;
	}

	.editor {
		flex: 1 1;
	}

	input {
		background-color: #000;
		border: none;
		box-sizing: border-box;
		color: #fff;
		font-family: inherit;
		font-size: 0.7rem;
		flex: 1 1;
		margin: 0;
		padding: 12px 20px;
		height: 45px;
	}

	button {
		background-color: #000;
		border: none;
		color: #fff;
		cursor: pointer;
		display: grid;
		place-items: center;
		font-family: inherit;
		font-size: 0.7rem;
		font-weight: bold;
		margin: 0;
		padding: 0;
		height: 45px;
		width: 48px;

		svg {
			height: 16px;
			width: 16px;
		}
	}

	input:first-child, button:first-child {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}
	input:last-child, button:last-child {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
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
</style>