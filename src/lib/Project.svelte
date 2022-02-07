
<script lang="ts">
	import BadgeEditor from "$lib/BadgeEditor.svelte";
	import IconButton from "./IconButton.svelte";
	import Modal from "./Modal.svelte";
	import ProjectSettings from "./ProjectSettings.svelte";
	import { createBadge } from "./util/api";
	import type { Project } from "./util/schema";

	export let project: Project;
	let show: () => any; // Opens project settings modal
</script>

<div class="project">
	<a name="{project.title}">
		<h2><span>{project.title}</span></h2>
		<span class="spacer" />
		<IconButton icon="add" on:click="{()=>createBadge(project.title)}" />
		<IconButton icon="kebab" on:click="{show}" />
		<Modal bind:show><ProjectSettings project={project} /></Modal>
	</a>
	<p class="description">
		@org <b>&bull;</b> repository <b>&bull;</b> all branches
	</p>
	<div class="badges">
		{#each project.badges as badge}
		<BadgeEditor badge="{badge}" />
		{/each}
	</div>
</div>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		column-gap: 10px;
		
		.spacer {
			flex: 1 1;
		}
	}

	h2 {
		display: flex;
		align-items: center;
		column-gap: 10px;
		font-size: 1rem;
		margin: 0;
		margin-bottom: 8px;

		&::before {
			background-color: var(--green);
			border-radius: 5px;
			content: "";
			display: block;
			height: 25px;
			width: 25px;
		}

		&::after {
			background-color: var(--background-secondary);
			border-radius: 5px;
			color: var(--text-secondary);
			content: "Saving";
			font-size: 0.6rem;
			text-transform: lowercase;
			margin-left: 10px;
			padding: 2px 8px;
		}
	}

	.description {
		color: var(--blue);
		font-size: 0.6rem;
		margin: 0;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;

		b {
			color: var(--text-secondary);
		}
	}

	.badges {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
</style>