<script lang="ts">
	import { fly } from "svelte/transition";
	import type { Project } from "$lib/util/schema";

	export let project: Project;
	export let status = "";
</script>

<a name={project.title}>
	<h2>{project.title}</h2>
	{#if status}
		<span class="status" transition:fly={{ y: 5 }}>{status}</span>
	{/if}
	<span class="spacer" />
	<slot />
</a>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		column-gap: 10px;
		margin-bottom: 2px;

		.spacer {
			flex: 1 1;
		}
	}

	h2 {
		display: flex;
		align-items: center;
		column-gap: 10px;
		font-size: 1rem;
		margin: 0;

		&::before {
			background-color: var(--green);
			border-radius: 5px;
			content: "";
			display: block;
			height: 25px;
			width: 25px;
		}
	}

	.status {
		background-color: var(--background-secondary);
		border-radius: 5px;
		color: var(--text-secondary);
		font-size: 0.6rem;
		font-weight: bold;
		text-transform: lowercase;
		margin-left: 10px;
		padding: 4px 8px;
	}
</style>
