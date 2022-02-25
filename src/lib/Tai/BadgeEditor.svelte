<script lang="ts">
	import BadgeField from "$lib/Tai/Field.svelte";
	import BadgeManager from "$lib/Tai/BadgeManager.svelte";
	import Modal from "$lib/Modal.svelte";
	import { updateBadge } from "$lib/util/api";
	import { user } from "$lib/util/data";
	import type { Badge, Project } from "$lib/util/schema";

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
		timeout = setTimeout(async () => {
			const noHashBadge = { ...badge, hash: undefined };
			await updateBadge(project.title, noHashBadge);
			const msgUint8 = new TextEncoder().encode(JSON.stringify(noHashBadge));
			const hashBuffer = await crypto.subtle.digest("SHA-1", msgUint8);
			const hashArray = Array.from(new Uint8Array(hashBuffer));
			badge.hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
		}, 200);
	}
</script>

<div class="group">
	<div class="editor">
		{#each badge.fields.slice(0, 2) as field}
			<BadgeField bind:field on:update={update} showExtras={false} />
		{/each}
		{#if badge.fields.length > 2}
			{#each badge.fields.slice(2) as field}
				<div class="color-stripe" data-color={field.color} />
			{/each}
			<button on:click={show}>+{badge.fields.length - 2}</button>
		{/if}
	</div>
	<div class="controls">
		<button on:click={copy}><svg><use xlink:href="/img/icon.svg#clipboard" /></svg></button>
		<button on:click={show}><svg><use xlink:href="/img/icon.svg#settings" /></svg></button>
	</div>
	<Modal bind:show><BadgeManager bind:badge {project} on:update={update} /></Modal>
</div>

<style lang="scss">
	@import "../scss/mixins.scss";
	@include data-color;

	.group,
	.editor,
	.controls {
		border-radius: 5px;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.group {
		column-gap: 20px;
		justify-content: space-between;
	}
	.editor {
		flex: 1 1;
	}

	.color-stripe {
		display: block;
		height: 45px;
		width: 5px;
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
