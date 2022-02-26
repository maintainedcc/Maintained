<script lang="ts">
	import ManageFields from "./ManageFields.svelte";
	import ManageLinkDirect from "./ManageLinkDirect.svelte";
	import ManagePrimaryStyle from "./ManagePrimaryStyle.svelte";
	import { deleteBadge } from "$lib/util/api";
	import { closeModal } from "$lib/util/modal";
	import { fade } from "svelte/transition";
	import { user } from "$lib/util/data";
	import type { Badge, Project } from "$lib/util/schema";

	export let badge: Badge;
	export let project: Project;

	const tai = import.meta.env.VITE_MAINTAINED_TAI_BASE;
	$: previewURL = `${tai}/${$user.name}/${project.title}/${badge.id}?${badge.hash}`;

	// Handles delete confirmation of badge
	let delStage = 0;
	let delText = "Delete Badge";
	async function del(e: Event) {
		if (delStage === 0) {
			delText = "Confirm Deletion";
			delStage = 1;
		} else {
			delStage = 0;
			await deleteBadge(project.title, badge.id);
			closeModal.set(e);
		}
	}
</script>

<section class="manager">
	<h2>Badge Manager</h2>
	<h3>Preview</h3>
	<span class="preview"><img src={previewURL} alt="Badge Preview" /></span>
	<h3>Primary Style</h3>
	<ManagePrimaryStyle bind:badge on:update />
	<h3>Secondary Effects</h3>
	<select>
		<option value="">None</option>
	</select>
	<h3>Link Direct</h3>
	<ManageLinkDirect bind:badge project={project.title} on:update />
	<h3>Badge Fields</h3>
	<ManageFields bind:badge on:update />
	<br />
	<div class="row">
		{#if badge.hash}
			<p class="hash" transition:fade>Hash: {badge.hash.substring(0, 12)}</p>
		{/if}
		<button class="delete" on:click={del}>{delText}</button>
	</div>
</section>

<style lang="scss">
	.manager {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}

	.preview {
		max-width: 100%;
		overflow-x: auto;

		img {
			width: fit-content;
		}
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.hash {
			flex: 1 1;
			font-size: 0.5em;
			text-transform: uppercase;
			opacity: 0.5;
		}
	}

	button.delete {
		border-color: var(--brand-primary);
		width: fit-content;

		&:hover {
			background-color: var(--brand-primary);
		}
	}
</style>
