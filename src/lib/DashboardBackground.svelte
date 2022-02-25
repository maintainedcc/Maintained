<script lang="ts">
	import { preferences } from "$lib/util/preferences";
</script>

<div class="bg" class:red={$preferences.appTheme === "red"}>
	<div class="left-deco" />
	<div class="left-deco a" />
	<div class="left-deco b" />
	<div class="left-deco c" />
</div>

<style lang="scss">
	.bg {
		background-color: var(--brand-primary-light);
		position: fixed;
		top: -10vmax;
		right: -10vmax;
		bottom: -10vmax;
		left: -10vmax;
		z-index: -1;

		&.red {
			background-color: var(--brand-primary);
		}
		&.red .left-deco {
			background-color: var(--brand-primary);
		}

		.left-deco {
			background-color: var(--brand-primary-light);
			-webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
			clip-path: polygon(0 0, 100% 100%, 0% 100%);
			position: fixed;
			left: -10vmax;
			bottom: -10vmax;
			height: 30vmax;
			width: 45vmax;
			z-index: -1;

			&.a {
				background-color: var(--brand-a);
				height: 40vmax;
				width: 60vmax;
				z-index: -2;
			}
			&.b {
				background-color: var(--brand-b);
				height: 50vmax;
				width: 75vmax;
				z-index: -3;
			}
			&.c {
				background-color: var(--brand-c);
				height: 60vmax;
				width: 90vmax;
				z-index: -4;
			}
		}
	}
</style>
