
<script lang="ts">
	import DashboardBackground from "$lib/DashboardBackground.svelte";
	import DashboardHeader from "$lib/DashboardHeader.svelte";
	import ProjectList from "$lib/ProjectList.svelte";
</script>

<DashboardBackground />
<div class="dashboard">
	<DashboardHeader />
	<div class="content">
		<ProjectList />
		<section>
			<h2>Project A</h2>
			<p>Badges</p>
			<br>
			<h2>Project B</h2>
			<p>Badges</p>
			<br>
			<h2>Project C</h2>
			<p>Badges</p>
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
			flex: 1 1;
			padding: 30px 50px;
		}

		h2 {
			font-size: 1.2rem;
			margin: 0;
			margin-bottom: 10px;
		}
	}
</style>