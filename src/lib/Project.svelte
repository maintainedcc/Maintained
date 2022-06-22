<script lang="ts">
	import IconButton from "$lib/IconButton.svelte";
	import MaiProject from "$lib/Mai/MaiProject.svelte";
	import MantaProject from "$lib/Manta/MantaProject.svelte";
	import Modal from "$lib/Modal.svelte";
	import ProjectSettings from "$lib/ProjectSettings.svelte";
	import ProjectTitle from "$lib/ProjectTitle.svelte";
	import TaiProject from "$lib/Tai/TaiProject.svelte";
	import { createBadge } from "$lib/util/api";
	import type { Project } from "$lib/util/schema";

	export let project: Project;
	let show: () => any; // Opens project settings modal

	const views = [TaiProject, MaiProject, MantaProject];
	let selectedView = 0;
	function switchView(view: number) {
		selectedView = view;
	}
</script>

<div class="project">
	<ProjectTitle {project}>
		<IconButton icon="add" on:click={() => createBadge(project.title)} />
		<IconButton icon="kebab" on:click={show} />
		<Modal bind:show><ProjectSettings {project} /></Modal>
	</ProjectTitle>
	<p class="description">
		Maintained <b>&bull;</b> Personal Project
	</p>
	<div class="nav-split">
		<nav>
			<button class:active={selectedView === 0} on:click={() => switchView(0)}>
				<span>Tai</span>
			</button>
			<button class:active={selectedView === 1} on:click={() => switchView(1)}>
				<span>Mai</span>
			</button>
			<button class:active={selectedView === 2} on:click={() => switchView(2)}>
				<span>Manta</span>
			</button>
		</nav>
		<svelte:component this={views[selectedView]} {project} />
	</div>
</div>

<style lang="scss">
	@import "./scss/mixins.scss";

	.project {
		@include dash-card;
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

	.nav-split {
		display: flex;
		column-gap: 20px;

		nav {
			display: flex;
			flex-direction: column;
			row-gap: 5px;

			button {
				background-color: transparent;
				border: none;
				color: var(--text-secondary);
				cursor: pointer;
				font-family: inherit;
				font-size: 0.65rem;
				font-weight: 600;
				text-align: left;
				text-transform: uppercase;

				margin: 0;
				padding: 0;
				padding-left: 20px;
				height: 30px;
				width: 95px;
				position: relative;

				span {
					height: fit-content;
					margin: auto;
					position: absolute;
					top: 0;
					bottom: 0;
					z-index: 1;
				}

				&:before,
				&:after {
					border-radius: 5px;
					content: "";
					display: block;
					margin: auto;
					position: absolute;
					top: 0;
					bottom: 0;
					opacity: 0;
					transition-duration: 0.3s;
				}

				&:hover:before,
				&.active:before {
					background-color: var(--background-secondary);
					right: -6px;
					left: 0px;
					opacity: 1;
				}

				&.active:after {
					background-color: var(--blue);
					height: 20px;
					width: 4px;
					left: 6px;
					opacity: 1;
				}
			}
		}
	}
</style>
