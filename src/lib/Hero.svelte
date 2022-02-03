
<script lang="ts">
	import BadgeButton from "$lib/BadgeButton.svelte";
	const loginURL = import.meta.env.VITE_MAINTAINED_LOGIN_URL as string;
</script>

<section class="hero">
	<div class="left-deco a"></div>
	<div class="left-deco b"></div>
	<div class="left-deco c"></div>
	<div class="right-deco"></div>
	<h1>maintained</h1>
	<h2>Overengineered repository management</h2>
	<BadgeButton href="{loginURL}"
		left="Get Started" right="With GitHub" />
</section>

<style lang="scss">
  .hero {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		min-height: 65vh;

		.left-deco {
			-webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
			clip-path: polygon(0 0, 100% 100%, 0% 100%);
			position: absolute;
			left: 0;

			&.a {
				background-color: var(--brand-a);
				height: 25vh;
				width: 40vw;
				top: 40vh;
				z-index: 0;
			}
			&.b {
				background-color: var(--brand-b);
				height: 35vh;
				width: 55vw;
				top: 30vh;
				z-index: -1;
			}
			&.c {
				background-color: var(--brand-c);
				height: 45vh;
				width: 70vw;
				top: 20vh;
				z-index: -2;
			}
		}

    .right-deco {
      background-color: var(--background-primary);
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0% 100%);
      clip-path: polygon(100% 0, 100% 100%, 0% 100%);
      height: 5vh;
      width: 100vw;
			position: absolute;
			right: 0;
      top: calc(60vh + 1px);
      z-index: 3;
    }
	}

	h1 {
    background-color: var(--brand-primary);
    border-radius: 2px;
    color: #fff;
		line-height: 1;
		font-size: 2.5rem;
		margin: 0;
    padding-left: 2px;

		width: max-content;
		position: relative;
	}

	h2 {
		color: var(--brand-secondary);
		font-size: 0.9rem;
		font-weight: 700;
		margin-top: 0;
    max-width: 300px;

    text-align: right;
    text-shadow:
      1px 1px 0 var(--brand-primary);
		text-transform: uppercase;
    z-index: 2;
	}

  @media (min-width: 512px) {
    h1 {
      font-size: 3.5rem;
    }
    h2 {
      max-width: unset;
    }
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 5rem;
		  margin-top: 3vh;
    }
    h2 {
      font-size: 1.3rem;
    }
  }

  @media (min-width: 1600px) {
    h1 {
      font-size: 7rem;
		  margin-top: 5vh;
    }
    h2 {
      font-size: 1.8rem;
    }
  }
</style>