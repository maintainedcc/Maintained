<script lang="ts" context="module">
	export async function load({ url }) {
		const base = import.meta.env.VITE_MAINTAINED_API_BASE;
		const path = `${base}/${url.searchParams.get("b")}/json`;
		const badge = await fetch(path).then((r) => r.json());

		if (badge?.redirect)
			return {
				props: {
					redirect: badge.redirect,
					source: url.searchParams.get("b").split("/")[0]
				}
			};
		else return { error: "Not Found", status: 404 };
	}
</script>

<script lang="ts">
	import Splash from "./_splash.svelte";

	export let redirect: string;
	export let source: string;
</script>

<Splash>
	<span slot="heading"><b>{source}</b> is redirecting you:</span>
	<a class="link" href={redirect} slot="description">{redirect}</a>
	<span slot="footer">
		<span>Link Direct</span>
		<span>&bull;</span>
		<span>Beware of suspicious URLs.</span>
	</span>
</Splash>
