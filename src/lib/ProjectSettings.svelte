<script lang="ts">
	import IconButton from "$lib/IconButton.svelte";
	import ProjectTitle from "$lib/ProjectTitle.svelte";
	import { deleteProject } from "$lib/util/api";
	import { closeModal } from "$lib/util/modal";
	import type { Project } from "$lib/util/schema";

	export let project: Project;

	let delStage = 0;
	let delText = "Delete Project";
	async function del(e: Event) {
		if (delStage === 0) {
			delText = "Confirm Delete?";
			delStage = 1;
		} else {
			delStage = 0;
			await deleteProject(project.title);
			closeModal.set(e);
		}
	}
</script>

<section class="project-settings">
	<ProjectTitle {project}>
		<IconButton icon="x" on:click={closeModal.set} />
	</ProjectTitle>
	<p>{JSON.stringify(project.defaultBadge)}</p>
	<br />
	<button class="delete" on:click={del}>{delText}</button>
</section>

<style lang="scss">
	.project-settings {
		display: flex;
		flex-direction: column;
	}

	button.delete {
		border-color: var(--brand-primary);
		align-self: flex-end;
		width: fit-content;

		&:hover {
			background-color: var(--brand-primary);
		}
	}
</style>
