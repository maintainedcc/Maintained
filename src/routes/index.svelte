<script lang="ts">
	import Hero from "$lib/Hero.svelte";
</script>

<Hero />
<div class="overview">
	<section class="cards">
		<div>
			<h2>maintained <b>oss</b><br /><span>Open Source Software</span></h2>
			<p>
				<a href="https://github.com/maintainedcc">Maintained is OSS</a> under the ISL license, allowing
				you to deploy your own stack with Docker or another custom solution.
			</p>
		</div>
		<div>
			<h2>maintained.cc<br /><span>Workspace</span></h2>
			<p>Show off your repositories with dynamic and customizable badges.</p>
			<img src="/img/workspace-1.jpg" alt="Workspace Screenshot" />
		</div>
		<div>
			<h2>
				maintained <b>manta</b> <code>soon<sup>tm</sup></code><br /><span>Serverless Mutations</span
				>
			</h2>
			<p>
				Write API middleware in the cloud, effortlessly mutating data before your code even recieves
				it. Use it with your own programs or write powerful dynamic badges in Maintained.
			</p>
		</div>
	</section>
	<section class="center">
		<h2>Pricing</h2>
		<p>
			Maintained will always remain 100% free and accessible for personal use.
			<a href="https://ivy.direct/github-sponsors">Learn more for commercial uses.</a>
		</p>
	</section>
	<section class="center">
		<h2>Gallery</h2>
		<section class="cards">
			<div>
				<h2>Workspace<br /><span>Badge Editor</span></h2>
				<img src="/img/workspace-2.jpg" alt="Workspace Screenshot" />
			</div>
			<div>
				<h2>Workspace<br /><span>Advanced Badge</span></h2>
				<img src="/img/workspace-3.jpg" alt="Workspace Screenshot" />
			</div>
		</section>
	</section>
	<section class="center">
		<h2>GitHub</h2>
		<p><a href="https://github.com/maintainedcc">maintainedcc</a></p>
		<p><a href="https://github.com/maintainedcc/Tai">maintainedcc/Tai</a></p>
		<p><a href="https://github.com/maintainedcc/Maintained">maintainedcc/Maintained</a></p>
		<br /><br /><br />
		<p>&copy; 2022</p>
	</section>
</div>

<style lang="scss">
	.overview {
		background-color: #fff;
		padding: 40px 0;
		position: absolute;
		left: 0;
		right: 0;

		.cards {
			display: flex;
			justify-content: center;
			column-gap: 20px;
			flex-wrap: wrap;
			row-gap: 20px;

			> div {
				border-radius: 5px;
				box-shadow: #0005 0 3px 5px;
				flex: 1 1;
				min-width: 300px;
				max-width: 300px;
				padding: 5px 25px;
				padding-bottom: 25px;
			}

			img {
				border-radius: 5px;
				max-width: 100%;
				margin: 15px 0;
			}

			h2 {
				border-bottom: 1px solid var(--brand-primary);
				line-height: 1.35;
				font-size: 1rem;
				padding-bottom: 10px;

				span {
					font-size: 1.25rem;
					color: var(--text-brand);
				}
			}

			p {
				font-size: 0.9rem;
				letter-spacing: 0.25px;
				line-height: 1.65;
			}
		}

		> section {
			max-width: var(--max-width);
			min-height: 200px;
			margin: auto;
			padding: 10px 15px;

			&:nth-child(2n) {
				text-align: right;
			}
			&.center {
				text-align: center;
			}

			p {
				letter-spacing: 0.25px;
				line-height: 1.75;
				max-width: 500px;
				margin: auto;
			}
		}

		a {
			color: var(--brand-primary);
			text-decoration: underline;
		}
	}
</style>
