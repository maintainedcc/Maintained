
<script lang="ts">
  import BadgeField from "./BadgeField.svelte";
  import type { Badge } from "./util/schema";

  export let badge: Badge;
</script>

<section class="manager">
  <h2>Badge Manager</h2>
  <p>Primary Style</p>
  <select name="" id="">
    <option value="">Maintained Default</option>
  </select>
  <p>Secondary Effects</p>
  <select name="" id="">
    <option value="">None</option>
    <option value="">Border Glow</option>
  </select>
  <p>Link Direct</p>
  <input type="text" placeholder="Link Direct URL" />
  <p>Badge Fields</p>
  {#each badge.fields as field}
  <BadgeField field="{field}" />
  {/each}
  <button>add badge field</button>
  <p>{JSON.stringify(badge)}</p>
</section>

<style lang="scss">
  .manager {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  p {
    color: var(--blue);
    display: block;
    font-size: 0.6rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
    margin-top: 16px;
  }
</style>