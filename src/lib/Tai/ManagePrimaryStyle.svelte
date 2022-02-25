
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Badge } from "$lib/util/schema";

  export let badge: Badge;
  const dispatch = createEventDispatcher();
</script>

<select bind:value="{badge.style}" on:change="{()=>dispatch("update")}">
  <option value="{0}">Plastic</option>
  <option value="{1}">Flat</option>
  <option value="{2}">FTB</option>
</select>