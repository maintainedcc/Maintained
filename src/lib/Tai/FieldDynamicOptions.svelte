<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type { BadgeField } from "$lib/util/schema";

	const dispatch = createEventDispatcher();
	export let field: BadgeField;
	export let shown = false;
</script>

{#if shown}
	<div class="options">
		<p>Dynamic Source</p>
		<input
			type="url"
			name="dynaSour"
			id="dynaSour"
			placeholder="https://..."
			bind:value={field.source}
			on:change={() => dispatch("update")}
		/>
	</div>
{/if}

<style lang="scss">
	.options {
		border-left: var(--blue) 2px solid;
		border-radius: 1px;
		display: flex;
		align-items: center;
		column-gap: 10px;
		margin-bottom: 5px;

		p {
			flex: 1 1;
			margin: 0;
			padding: 2px 10px;
		}

		input {
			flex: 1 1;
		}
	}
</style>
