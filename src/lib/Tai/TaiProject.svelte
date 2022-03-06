<script lang="ts">
	import BadgeEditor from "$lib/Tai/BadgeEditor.svelte";
	import { createBadge } from "$lib/util/api";
	import type { Project } from "$lib/util/schema";

	export let project: Project;
</script>

<div class="badges">
	{#each project.badges as badge}
		<BadgeEditor bind:badge {project} />
	{/each}
	<button on:click={() => createBadge(project.title)}>Create New Badge</button>
</div>

<style lang="scss">
	.badges {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		flex: 1 1;
	}

	button {
		background-color: transparent;
		border: var(--blue) 1px solid;
		border-radius: 3px;
		box-sizing: border-box;
		cursor: pointer;

		font-family: inherit;
		font-size: 0.6rem;
		letter-spacing: 1px;
		text-transform: uppercase;

		margin: 0;
		padding: 8px 15px;

		transition-duration: 0.2s;

		&:hover {
			background-color: var(--blue);
			color: white;
		}
	}
</style>
