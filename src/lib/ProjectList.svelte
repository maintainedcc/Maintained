
<script lang="ts">
	import ProjectLink from "$lib/ProjectLink.svelte";
	import IconButton from "$lib/IconButton.svelte";
	import Modal from "./Modal.svelte";
	import ProjectCreate from "./ProjectCreate.svelte";
	import type { Project } from "./util/schema";

	export let projects: Project[];
	let show: () => any; // Show project creation modal
</script>

<section class="projects">
	<div class="header">
		<h2>Projects</h2>
		<IconButton icon="add" small="{true}" on:click="{show}" />
		<Modal bind:show><ProjectCreate /></Modal>
	</div>
	<ul>
		{#each projects as project}
		<li><ProjectLink href="#{project.title}">
			{project.title}
		</ProjectLink></li>
		{/each}
	</ul>
	<br>
	<h2>Teams</h2>
	<ul>
		<li>Project F</li>
		<li>Project G</li>
		<li>Project H</li>
	</ul>
</section>

<style lang="scss">
	.projects {
		background-color: var(--background-primary);
		border-radius: 10px;
		box-sizing: border-box;
		padding: 30px;
		width: 240px;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;
		}
	}

	h2 {
		font-size: 1rem;
		margin: 0;
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: 6px;
		line-height: 2;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>