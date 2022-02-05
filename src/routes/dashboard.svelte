
<script lang="ts">
	import DashboardBackground from "$lib/DashboardBackground.svelte";
	import DashboardHeader from "$lib/DashboardHeader.svelte";
	import ProjectList from "$lib/ProjectList.svelte";
	import Project from "$lib/Project.svelte";
</script>

<DashboardBackground />
<div class="dashboard">
	<DashboardHeader />
	<div class="content">
		<ProjectList />
		<section>
			<Project />
			<Project />
			<Project />
		</section>
	</div>
</div>

<style lang="scss">
	.dashboard {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		row-gap: 30px;
		max-width: 1000px;
		margin: 30px auto;
	}

	.content {
		display: flex;
		column-gap: 30px;

		section {
			background-color: var(--background-primary);
			border-radius: 10px;
    	box-sizing: border-box;
			display: flex;
			flex-direction: column;
			row-gap: 30px;
			flex: 1 1;
			padding: 30px 50px;
		}
	}
</style>