
<script lang="ts">
  import BadgeField from "./BadgeField.svelte";
  import { createEventDispatcher } from "svelte";
  import { deleteBadge } from "./util/api";
  import { closeModal } from "./util/modal";
  import type { Badge, Project } from "./util/schema";

  export let badge: Badge;
  export let project: Project;

  const dispatch = createEventDispatcher();

  function addField() {
    badge.fields.push({
      content: "New Field",
      color: 4,
      width: 70
    });
    badge.fields = badge.fields;
    dispatch("update");
  }

  let delStage = 0;
  let delText = "Delete Badge";
  async function del(e: Event) {
    if (delStage === 0) {
      delText = "Confirm Delete?";
      delStage = 1;
    }
    else {
      delStage = 0;
      await deleteBadge(project.title, badge.id);
      closeModal.set(e);
    }
  }
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
  <BadgeField bind:field="{field}" on:update />
  {/each}
  <button on:click="{addField}">add badge field</button>
  <br>
  <button class="delete" on:click="{del}">{delText}</button>
</section>

<style lang="scss">
  .manager {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  button.delete {
    border-color: var(--brand-primary);
    align-self: flex-end;
    width: fit-content;

    &:hover {
      background-color: var(--brand-primary);
    }
  }
</style>