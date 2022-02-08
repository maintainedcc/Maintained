
<script lang="ts">
  import IconButton from "$lib/IconButton.svelte";
  import ProjectTitle from "$lib/ProjectTitle.svelte";
  import { closeModal } from "$lib/util/modal";
  import type { Project } from "$lib/util/schema";

  export let project: Project;
</script>

<section class="project-settings">
	<ProjectTitle project="{project}">
		<IconButton icon="x" on:click="{closeModal.set}" />
	</ProjectTitle>
  <p>{JSON.stringify(project.defaultBadge)}</p>
</section>

<style lang="scss">
</style>