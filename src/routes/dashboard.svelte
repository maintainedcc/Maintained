<script lang="ts">
	import DashboardBackground from "$lib/DashboardBackground.svelte";
	import DashboardHeader from "$lib/DashboardHeader.svelte";
	import ProjectList from "$lib/ProjectList.svelte";
	import Project from "$lib/Project.svelte";
	import WelcomeCard from "$lib/WelcomeCard.svelte";

	import { onMount } from "svelte";
	import { getUser } from "$lib/util/api";
	import { user } from "$lib/util/data";

	onMount(async () => await getUser());
</script>

<DashboardBackground />
<div class="dashboard">
	<DashboardHeader />
	<div class="content">
		<ProjectList projects={$user.projects} />
		<div>
			<WelcomeCard />
			<section>
				{#each $user.projects as project}
					<Project bind:project />
				{/each}
			</section>
		</div>
	</div>
</div>

<style lang="scss">
	@import "../lib/scss/mixins.scss";
	$gap: 5px;

	.dashboard {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		row-gap: $gap;
		max-width: 1000px;
		margin: 10px auto;
	}

	.content {
		display: flex;
		column-gap: $gap;

		> div {
			display: flex;
			flex-direction: column;
			row-gap: $gap;
			flex: 1 1;
		}

		section {
			display: flex;
			flex-direction: column;
			row-gap: $gap;
		}
	}
</style>
