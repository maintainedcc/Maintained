
<script lang="ts">
	import Hero from "$lib/Hero.svelte";
</script>

<Hero />
<div class="overview">
	<section>
		<br>
		<h2>maintained.cc<br><span>Workspace</span></h2>
		<p><b>Maintained</b> Repository Badging</p>
	</section>
	<section>
		<h2>maintained <b>mai</b><br><span>Cloud Environments</span></h2>
		<p><b>Mai</b> Environment Management <sup>soon tm</sup></p>
	</section>
	<section>
		<h2>maintained <b>manta</b><br><span>Mutators as a Service</span></h2>
		<p><b>Manta</b> Cloud Mutation Layer <sup>soon tm</sup></p>
	</section>
	<section class="center">
		<h2>explore all maintained products</h2>
		<p>except there aren't any more right now.</p>
	</section>
</div>

<style lang="scss">
	.overview {
		background-color: #fff;
		padding: 40px 0;
		position: absolute;
		left: 0;
		right: 0;

		> section {
			max-width: var(--max-width);
			min-height: 300px;
			margin: auto;
			padding: 10px 0;

			&:nth-child(2n) {
				text-align: right;
			}
			&.center {
				text-align: center;
			}
		}

		h2 {
			line-height: 1.2;

			span {
				font-size: 2.5rem;
				color: #f90;
			}
		}
	}
</style>