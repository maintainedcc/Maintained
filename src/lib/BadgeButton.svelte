<script lang="ts">
	export let href: string;
	export let left: string;
	export let right: string;
</script>

<a class="badge" {href}>
	<span>{left}</span>
	<span>{right}</span>
</a>

<style lang="scss">
	.badge {
		--badge-padding: 16px;

		border-radius: calc(var(--badge-padding) / 5);
		display: flex;
		letter-spacing: 0.5px;
		font-family: "Poppins";
		font-size: 0.7rem;
		font-weight: 800;
		text-decoration: none;
		text-transform: uppercase;
		width: max-content;
		overflow: hidden;

		span {
			background-color: #000;
			color: #fff;
			padding: calc(var(--badge-padding) / 2) var(--badge-padding);
		}
		span:last-child {
			background-image: linear-gradient(45deg, var(--green) 50%, var(--blue) 50.1%);
			background-size: 295%;
			background-position-x: 0%;
			transition-duration: 0.7s;
		}

		&:hover,
		&:focus {
			span:last-child {
				background-position-x: 100%;
			}
		}
	}

	@media (min-width: 768px) {
		.badge {
			--badge-padding: 35px;
			font-size: 0.9rem;
		}
		.badge span {
			padding: calc(var(--badge-padding) / 3) var(--badge-padding);
		}
	}

	@media (min-width: 1600px) {
		.badge {
			--badge-padding: 45px;
			font-size: 1rem;
		}
	}
</style>
