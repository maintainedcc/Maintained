<script context="module">
	export function load({ error, status }) {
		return { props: { title: `${status}: ${error.message}` } };
	}
</script>

<script lang="ts">
	import Splash from "./_splash.svelte";
	export let title: string;
</script>

<Splash>
	<span slot="heading">{title}</span>
	<a href="/" class="link" slot="description">/ Return Home</a>
</Splash>
