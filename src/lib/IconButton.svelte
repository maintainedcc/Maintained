
<script lang="ts">
	export let icon: string;
	export let active = false;
	export let medium = false;
	export let small = false;
</script>

<button class="icon-btn" on:click class:small class:medium class:active>
	<svg><use xlink:href="/img/icon.svg#{icon}"></use></svg>
</button>

<style lang="scss">
	.icon-btn {
		background-color: transparent;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		display: grid;
		place-items: center;
		padding: 10px;
		margin: 0;
		height: 40px;
		width: 40px;
		outline: none;
		transition-duration: 0.2s;

		> svg {
			height: 20px;
			width: 20px;
		}

		&:hover, &:focus {
			background-color: var(--background-secondary);
			color: var(--text-primary);
		}

		&:active {
			transform: scale(0.95);
		}

		&.active {
			background-color: var(--background-secondary);
		}

		&.medium {
			padding: 5px;
			height: 35px;
			width: 35px;

			> svg {
				height: 18px;
				width: 18px;
			}
		}

		&.small {
			padding: 5px;
			height: 30px;
			width: 30px;

			> svg {
				height: 18px;
				width: 18px;
			}
		}
	}
</style>