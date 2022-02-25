<script lang="ts">
	export let href: string;
</script>

<a class="project-link" {href}>
	<slot />
</a>

<style lang="scss">
	.project-link {
		border-radius: 5px;
		box-sizing: border-box;
		color: var(--text-secondary);
		cursor: pointer;
		display: flex;
		align-items: center;
		column-gap: 10px;
		font-size: 0.85rem;
		font-weight: normal;
		padding: 0 8px;
		transition-duration: 0.3s;

		&::before {
			background-color: var(--green);
			border-radius: 3px;
			content: "";
			display: block;
			min-height: 20px;
			min-width: 20px;
			transition-duration: 0.3s;
		}

		&:hover {
			background-color: var(--background-secondary);
		}
	}
</style>
