
<script lang="ts">
  import IconButton from "$lib/IconButton.svelte";
</script>

<header>
  <h1>maintained.cc</h1>
  <nav>
    <IconButton icon="bell" />
    <IconButton icon="help" />
    <br>
    <a href="">Account</a>
	</nav>
</header>

<style lang="scss">
	header {
    background-color: var(--background-primary);
    border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25px 50px;

		nav {
			display: flex;
      align-items: center;
			column-gap: 20px;
		}

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }
	}
</style>