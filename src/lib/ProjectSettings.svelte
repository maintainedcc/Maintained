
<script lang="ts">
  import type { Project } from "$lib/util/schema";

  export let project: Project;
</script>

<section class="project-settings">
  <h2>{project.title}</h2>
  <p>{JSON.stringify(project.defaultBadge)}</p>
</section>

<style lang="scss">
  h2 {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 1rem;
    margin: 0;
    margin-bottom: 8px;

    &::before {
      background-color: var(--green);
      border-radius: 5px;
      content: "";
      display: block;
      height: 25px;
      width: 25px;
    }

    &::after {
      background-color: #eee;
      border-radius: 5px;
      content: "Saving";
      font-size: 0.6rem;
      text-transform: lowercase;
      margin-left: 10px;
      padding: 2px 8px;
    }
  }
</style>