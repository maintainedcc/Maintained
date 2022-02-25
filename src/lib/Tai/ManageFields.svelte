
<script lang="ts">
  import BadgeField from "$lib/Tai/Field.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Badge } from "$lib/util/schema";

  export let badge: Badge;

  const dispatch = createEventDispatcher();

  // Only allows one field to have expanded options at a time
  let collapseOpts: (() => void)[] = [];
  const collapseAll = () => collapseOpts.forEach(collapse => collapse());

  // Adds a new default field to the badge
  function addField() {
    badge.fields.push({
      content: "New Field",
      color: 4,
      width: 70
    });
    badge.fields = badge.fields;
    dispatch("update");
  }

  // Removes a field from the badge
  function deleteField(id: number) {
    badge.fields.splice(id, 1);
    badge.fields = badge.fields;
    dispatch("update");
  }
</script>

{#each badge.fields as field, i}
<BadgeField bind:field="{field}"
  on:update
  on:delete="{()=>deleteField(i)}"
  on:toggle="{collapseAll}"
  bind:collapseOpts="{collapseOpts[i]}"
  enableDelete="{badge.fields.length > 1}" />
{/each}
<button on:click="{addField}">add badge field</button>