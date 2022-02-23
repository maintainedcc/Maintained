
<script lang="ts">
	import BadgeField from "./BadgeField.svelte";
	import BadgeManager from "./BadgeManager.svelte";
	import Modal from "./Modal.svelte";
	import { updateBadge } from "./util/api";
	import { user } from "./util/data";
	import type { Badge, Project } from "./util/schema";

	export let badge: Badge;
	export let project: Project;
	let show: () => any; // Opens badge manager modal

	function copy() {
		const host = import.meta.env.VITE_MAINTAINED_TAI_BASE;
		const url = `${host}/${$user.name}/${project.title}/${badge.id}`;
		const text = `![${url}](${url})`;
		navigator.clipboard.writeText(text);
	}

	let timeout: NodeJS.Timer;
	function update() {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => updateBadge(project.title, badge), 300);
	}
</script>

<div class="group">
	<div class="editor">
		{#each badge.fields.slice(0, 2) as field}
		<BadgeField bind:field="{field}" on:update="{update}" showExtras="{false}" />
		{/each}
		{#if badge.fields.length > 2}
		<button>+{badge.fields.length - 2}</button>
		{/if}
	</div>
	<div class="controls">
		<button on:click="{copy}"><svg><use xlink:href="/img/icon.svg#clipboard"></use></svg></button>
		<button on:click="{show}"><svg><use xlink:href="/img/icon.svg#settings" /></svg></button>
	</div>
	<Modal bind:show><BadgeManager bind:badge="{badge}" project="{project}" on:update="{update}" /></Modal>
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

	.editor, .controls {
		border-radius: 5px;
		overflow: hidden;
	}

	.editor {
		flex: 1 1;
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
</style>