
<script lang="ts">
  import type { Badge } from "./util/schema";

  export let badge: Badge;
</script>

<div class="group">
  <div class="editor">
    {#each badge.fields as field}
    <input type="text" placeholder="Badge Content" bind:value="{field.content}">
    {/each}
    <button>+3</button>
  </div>
  <div class="controls">
    <button><svg><use xlink:href="/img/icon.svg#clipboard"></use></svg></button>
    <button><svg><use xlink:href="/img/icon.svg#settings"></use></svg></button>
  </div>
</div>

<style lang="scss">
  .group {
    column-gap: 20px;
    justify-content: space-between;
  }

  .group, .editor, .controls {
    display: flex;
    align-items: center;
  }

  .editor {
    flex: 1 1;
  }

  input {
    background-color: #000;
    border: none;
    box-sizing: border-box;
    color: #fff;
    font-family: inherit;
    font-size: 0.7rem;
    flex: 1 1;
    margin: 0;
    padding: 12px 20px;
    height: 45px;
  }

  button {
    background-color: #000;
    border: none;
    color: #fff;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-family: inherit;
    font-size: 0.7rem;
    font-weight: bold;
    margin: 0;
    padding: 0;
    height: 45px;
    width: 48px;

    svg {
      height: 16px;
      width: 16px;
    }
  }

  input:first-child, button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  input:last-child, button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>