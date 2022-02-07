
<script lang="ts">
  import { closeModal } from "./util/modal";
  import { sineInOut } from "svelte/easing";
  import { fly } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";

  let shown = false;
  export const show = () => shown = true;
  const hide = () => shown = false;

  let unsub = closeModal.subscribe(hide);
  onDestroy(unsub);
  
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

{#if shown}
<div class="cover" transition:beam on:click="{hide}" />
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

    margin: auto;
    padding: 30px;
    max-height: calc(100vh - 60px);
    height: min-content;
    width: 360px;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;

    :global(h2) {
      font-size: 1rem;
      margin: 0;
    }
  }
</style>