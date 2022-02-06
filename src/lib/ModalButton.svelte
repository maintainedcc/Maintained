
<script lang="ts">
  import IconButton from "$lib/IconButton.svelte";
  import { sineInOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  export let icon: string;
  let shown = false;

  function toggleShown() {
    shown = !shown;
  }
  
  export function beam(n: Node, ..._: any[]) {
    return {
      delay: 0, duration: 450,
      css: (t: number) => {
        const x = sineInOut(t);
        return `
        border-radius: ${200-200*x}vw;
        width: ${x*110}vmax;
        height: ${x*110}vmax;
        opacity: ${0.5+0.5*x};`; }};
  }
</script>

<IconButton icon={icon} on:click="{toggleShown}" />
{#if shown}
<div class="cover" transition:beam on:click="{toggleShown}" />
<div class="flyout"
  in:fly="{{y:25, delay: 100, duration:750}}"
  out:fly="{{y:25, delay: 100, duration:750}}">
  <slot />
</div>
{/if}

<style lang="scss">
  .cover {
    background-color: #0007;
    margin: auto;
    position: fixed;
    top: -100vmax;
    left: -100vmax;
    bottom: -100vmax;
    right: -100vmax;
  }
  
  .flyout {
    background-color: var(--background-primary);
    border-radius: 10px;
    box-sizing: border-box;

    margin: auto;
    padding: 30px;
    max-height: calc(100vh - 60px);
    height: max-content;
    width: 500px;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
</style>