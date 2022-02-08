
<script lang="ts">
  import BadgeField from "./BadgeField.svelte";
  import type { Badge } from "./util/schema";

  export let badge: Badge;
</script>

<section class="manager">
  <h2>Badge Manager</h2>
  <h3>Primary Style</h3>
  <select name="" id="">
    <option value="">Maintained Default</option>
  </select>
  <h3>Secondary Effects</h3>
  <select name="" id="">
    <option value="">None</option>
    <option value="">Border Glow</option>
  </select>
  <h3>Link Direct</h3>
  <input type="text" placeholder="Link Direct URL" />
  <h3>Badge Fields</h3>
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
</style>