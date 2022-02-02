
<script lang="ts">
	import BadgeButton from "$lib/BadgeButton.svelte";
</script>

<section class="hero">
	<div class="left-deco a"></div>
	<div class="left-deco b"></div>
	<div class="left-deco c"></div>
	<h1>maintained</h1>
	<h2>Overengineered repository management</h2>
	<BadgeButton href="http://localhost:8999/oauth/login"
		left="Get Started" right="With GitHub" />
</section>
<section class="overview">
	<div>
		<br>
		<h2>Maintained Workspace</h2>
		<p><b>Maintained</b> Repository Badges</p>
		<p><b>Mai</b> Environment Management <sup>soon tm</sup></p>
		<p><b>Manta</b> Cloud Mutation Layer <sup>soon tm</sup></p>
	</div>
</section>

<style lang="scss">
	.hero {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		min-height: 60vh;

		.left-deco {
			-webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
			clip-path: polygon(0 0, 100% 100%, 0% 100%);
			position: absolute;
			left: 0;

			&.a {
				background-color: #fa0;
				height: 25vh;
				width: 40vw;
				top: 35vh;
				z-index: 2;
			}
			&.b {
				background-color: #fc5;
				height: 35vh;
				width: 55vw;
				top: 25vh;
				z-index: 1;
			}
			&.c {
				background-color: #fd9;
				height: 45vh;
				width: 70vw;
				top: 15vh;
				z-index: 0;
			}
		}
	}

	h1 {
		background-color: #fff;
		background-clip: text;
		color: transparent;
		line-height: 1;
		font-size: 7rem;
		margin: 0;
		margin-top: 5vh;

		width: max-content;
		position: relative;
	}

	h2 {
		color: #f88;
		font-size: 1.8rem;
		font-weight: 700;
		margin-top: 0;
		text-transform: uppercase;
	}

	.overview {
		background-color: #fff;
		padding: 20px 0;
		position: absolute;
		left: 0;
		right: 0;

		> div {
			max-width: 1500px;
			min-height: 300px;
			margin: auto;
		}
	}
</style>