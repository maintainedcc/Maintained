
<script lang="ts">
	import BadgeEditor from "$lib/Tai/BadgeEditor.svelte";
	import IconButton from "$lib/IconButton.svelte";
	import Modal from "$lib/Modal.svelte";
	import ProjectSettings from "$lib/ProjectSettings.svelte";
	import ProjectTitle from "$lib/ProjectTitle.svelte";
	import { createBadge } from "$lib/util/api";
	import type { Project } from "$lib/util/schema";

	export let project: Project;
	let show: () => any; // Opens project settings modal
</script>

<div class="project">
	<ProjectTitle project="{project}">
		<IconButton icon="add" on:click="{()=>createBadge(project.title)}" />
		<IconButton icon="kebab" on:click="{show}" />
		<Modal bind:show><ProjectSettings project={project} /></Modal>
	</ProjectTitle>
	<p class="description">
		@org <b>&bull;</b> repository <b>&bull;</b> all branches
	</p>
	<div class="nav-split">
		<nav>
			<button>Tai</button>
			<button>Mai</button>
			<button>Manta</button>
		</nav>
		<div class="badges">
			{#each project.badges as badge}
			<BadgeEditor bind:badge="{badge}" project="{project}" />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
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

	.nav-split {
		display: flex;
		column-gap: 20px;
		
		nav {
			border-radius: 3px;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			button {
				background-color: #000;
				border: none;
				color: #fff;
				font-family: inherit;
				text-align: left;
				text-transform: uppercase;

				margin: 0;
				padding: 0 10px;
				height: 35px;
				width: 55px;
			}
		}

		.badges {
			display: flex;
			flex-direction: column;
			row-gap: 10px;
			flex: 1 1;
		}
	}
</style>