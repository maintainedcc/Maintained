
<script lang="ts">
  import type { Badge } from "./util/schema";

  export let badge: Badge;
</script>

<section class="manager">
  <h2>Badge Manager</h2>
  <p>{JSON.stringify(badge)}</p>
</section>

<style lang="scss">

</style>