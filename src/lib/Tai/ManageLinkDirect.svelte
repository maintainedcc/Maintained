<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { user } from "$lib/util/data";
	import type { Badge } from "$lib/util/schema";

	export let badge: Badge;
	export let project: string;
	$: redirect = `/redirect?b=${$user.name}/${project}/${badge.id}`;

	const dispatch = createEventDispatcher();
</script>

<input
	type="url"
	placeholder="Link Direct URL"
	bind:value={badge.redirect}
	on:keyup={() => dispatch("update")}
	on:change={() => dispatch("update")}
/>
{#if badge.redirect}
	<a href="{redirect}" target="_blank" class="caption">test redirect in new tab</a>
{/if}

<style lang="scss">
	.caption {
		align-self: flex-end;
		color: var(--text-secondary);
		font-size: 0.6rem;
		text-decoration: underline;
	}
</style>
