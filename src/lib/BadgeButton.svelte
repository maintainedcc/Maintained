
<script lang="ts">
	export let href: string;
	export let left: string;
	export let right: string;
</script>

<a class="badge" href="{href}">
	<span>{left}</span>
	<span>{right}</span>
</a>

<style lang="scss">
	.badge {
		--badge-padding: 36px;

		border-radius: 0.4rem;
		display: flex;
		letter-spacing: 0.5px;
		font-family: "Poppins";
		font-size: 0.9rem;
		font-weight: 800;
		text-decoration: none;
		text-transform: uppercase;
		width: max-content;
		overflow: hidden;

		span {
			background-color: #000;
			color: #fff;
			padding: calc(var(--badge-padding)/3) var(--badge-padding);
		}
		span:first-child {
			padding-right: calc(var(--badge-padding) - 10px);
		}
		span:last-child {
			background-image: linear-gradient(45deg, #a5b800 50%, #00b8a5 50.1%);
			background-size: 270%;
			background-position-x: 0%;
			padding-left: calc(var(--badge-padding) - 10px);
			transition-duration: 0.7s;
		}

		&:hover, &:focus {
			span:last-child {
				background-position-x: 100%;
			}
		}
	}

	@media (min-width: 1600px) {
		.badge {
			--badge-padding: 45px;
			font-size: 1rem;
		}
	}
</style>