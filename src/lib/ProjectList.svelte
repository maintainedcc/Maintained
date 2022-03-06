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
		<IconButton icon="add" small={true} on:click={show} />
		<Modal bind:show><ProjectCreate /></Modal>
	</div>
	<ul>
		{#each projects as project}
			<li>
				<ProjectLink href="#{project.title}">
					{project.title}
				</ProjectLink>
			</li>
		{/each}
	</ul>
	<br />
	<div class="header">
		<h2>Teams</h2>
	</div>
	<ul>
		<li><ProjectLink href="#">Shared Project</ProjectLink></li>
	</ul>
	<span class="spacer" />
	<footer>&copy; maintained.cc 2022</footer>
</section>

<style lang="scss">
	@import "./scss/mixins.scss";

	.projects {
		@include dash-card;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 30px;
		padding-right: 20px;
		width: 230px;

		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 12px;
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

	.spacer {
		display: block;
		flex: 1 1;
		min-height: 30px;
	}

	footer {
		color: var(--text-secondary);
		font-size: 0.6rem;
		letter-spacing: 1px;
	}
</style>
