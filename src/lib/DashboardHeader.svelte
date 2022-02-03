
<script lang="ts">
  import IconButton from "$lib/IconButton.svelte";
</script>

<header>
  <span>
    <IconButton icon="grid" />
    <h1>maintained <b>workspace</b></h1>
  </span>
  <nav>
    <IconButton icon="bell" />
    <IconButton icon="help" />
    <br>
    <button class="account">
      <img src="/favicon.png" alt="Account">
    </button>
	</nav>
</header>

<style lang="scss">
	header {
    background-color: var(--background-primary);
    border-radius: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25px 30px;

		nav, span {
			display: flex;
      align-items: center;
			column-gap: 10px;
		}
    span {
      column-gap: 5px;
    }

    h1 {
      font-size: 1.5rem;
      margin: 0;
    }

    .account {
      background-color: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: grid;
      place-items: center;
      padding: 5px;
      transition-duration: 0.2s;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      &:hover {
        background-color: #eee;
      }
    }
	}
</style>