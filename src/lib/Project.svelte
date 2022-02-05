
<script lang="ts">
	import BadgeEditor from "$lib/BadgeEditor.svelte";
	import IconButton from "./IconButton.svelte";
	import type { Project } from "./util/schema";

	export let project: Project;
</script>

<div class="project">
	<a name="{project.title}">
		<h2><span>{project.title}</span></h2>
		<IconButton icon="kebab" />
	</a>
	<p class="description">
		@org <b>&bull;</b> repository <b>&bull;</b> all branches
	</p>
	<div class="badges">
		{#each project.badges as badge}
		<BadgeEditor badge="{badge}" />
		{/each}
	</div>
</div>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h2 {
		display: flex;
		align-items: center;
		column-gap: 10px;
		font-size: 1.2rem;
		margin: 0;
		margin-bottom: 8px;

		&::before {
			background-color: var(--green);
			border-radius: 5px;
			content: "";
			display: block;
			height: 25px;
			width: 25px;
		}

		&::after {
			background-color: #eee;
			border-radius: 5px;
			content: "Saving";
			font-size: 0.6rem;
			text-transform: lowercase;
			margin-left: 10px;
			padding: 2px 8px;
		}
	}

	.description {
		color: var(--blue);
		font-size: 0.6rem;
		margin: 0;
		margin-bottom: 20px;
		text-transform: uppercase;
		letter-spacing: 1px;

		b {
			color: #999;
		}
	}

	.badges {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
</style>