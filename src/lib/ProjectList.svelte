
<script lang="ts">
	import ProjectLink from "$lib/ProjectLink.svelte";
	import { createProject } from "./util/api";
	import type { Project } from "./util/schema";

	export let projects: Project[];
</script>

<section class="projects">
	<h2>Projects</h2>
	<ul>
		{#each projects as project}
		<li><ProjectLink href="#{project.title}">
			{project.title}
		</ProjectLink></li>
		{/each}
		<button on:click="{() => createProject("New Project")}">Create Project</button>
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
	}

	h2 {
		font-size: 1rem;
		margin: 0;
		margin-bottom: 10px;
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