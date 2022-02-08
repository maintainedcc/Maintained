
<script lang="ts">
  import { createProject } from "$lib/util/api";
  import { closeModal } from "$lib/util/modal";

  let projectName: string;

  function create(e: Event) {
    if (!projectName) return false;
    else createProject(projectName);
    closeModal.set(e);
    e.preventDefault();
    return false;
  }
</script>

<form>
  <h2>Create Project</h2>
  <div class="group">
    <label for="project-name">Project Name</label>
    <input id="project-name" name="project-name"
      type="text" placeholder="New Project"
      required bind:value="{projectName}">
  </div>
  <button on:click="{create}">Create Project</button>
</form>

<style lang="scss">
  .group, form {
    display: flex;
    flex-direction: column;
  }
  .group {
    margin-bottom: 15px;
    row-gap: 5px;
  }

  button {
    align-self: flex-end;
    width: fit-content;
  }
</style>