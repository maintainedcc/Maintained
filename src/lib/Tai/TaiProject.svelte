<script lang="ts">
	import BadgeEditor from "$lib/Tai/BadgeEditor.svelte";
	import type { Project } from "$lib/util/schema";

	export let project: Project;
</script>

<div class="badges">
	{#each project.badges as badge}
		<BadgeEditor bind:badge {project} />
	{/each}
</div>

<style lang="scss">
	.badges {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		flex: 1 1;
	}
</style>
