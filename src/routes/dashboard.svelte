
<script lang="ts">
	import DashboardBackground from "$lib/DashboardBackground.svelte";
	import DashboardHeader from "$lib/DashboardHeader.svelte";
	import ProjectList from "$lib/ProjectList.svelte";
	import Project from "$lib/Project.svelte";

	import { onMount } from "svelte";
	import { getUser } from "$lib/util/api";
	import { user } from "$lib/util/data";

	onMount(async () => await getUser());
</script>

<DashboardBackground />
<div class="dashboard">
	<DashboardHeader />
	<div class="content">
		<ProjectList projects="{$user.projects}" />
		<section>
			{#each $user.projects as project}
			<Project bind:project="{project}" />
			{/each}
		</section>
	</div>
</div>

<style lang="scss">
	.dashboard {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		max-width: 1000px;
		margin: 30px auto;
	}

	.content {
		display: flex;
		column-gap: 10px;

		section {
			background-color: var(--background-primary);
			border-radius: 5px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			row-gap: 40px;
			flex: 1 1;
			padding: 25px 40px;
			padding-bottom: 35px;
		}
	}
</style>