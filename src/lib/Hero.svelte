
<script lang="ts">
	import BadgeButton from "$lib/BadgeButton.svelte";
</script>

<section class="hero">
	<div class="left-deco a"></div>
	<div class="left-deco b"></div>
	<div class="left-deco c"></div>
	<div class="right-deco"></div>
	<h1>maintained</h1>
	<h2>Overengineered repository management</h2>
	<BadgeButton href="http://localhost:8999/oauth/login"
		left="Get Started" right="With GitHub" />
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

    .right-deco {
      background-color: #fff;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0% 100%);
      clip-path: polygon(100% 0, 100% 100%, 0% 100%);
      height: 3vh;
      width: 100vw;
			position: absolute;
			right: 0;
      top: 57vh;
      z-index: 3;
    }
	}

	h1 {
		background-color: #fff;
		background-clip: text;
		color: transparent;
		line-height: 1;
		font-size: 5rem;
		margin: 0;
		margin-top: 5vh;

		width: max-content;
		position: relative;
	}

	h2 {
		color: #f88;
		font-size: 1.3rem;
		font-weight: 700;
		margin-top: 0;
		text-transform: uppercase;
	}

  @media (min-width: 1600px) {
    h1 {
      font-size: 7rem;
    }
    h2 {
      font-size: 1.8rem;
    }
  }
</style>