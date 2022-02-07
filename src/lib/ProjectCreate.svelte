
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
  <div class="group">
    <button on:click="{create}">Create Project</button>
  </div>
</form>

<style lang="scss">
  .group, form {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  .group {
    row-gap: 5px;
  }

  label {
    color: var(--blue);
    display: block;
    font-size: 0.6rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  input, button {
    background-color: transparent;
    border: 1px solid var(--blue);
    border-radius: 3px;
    box-sizing: border-box;
    display: block;
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
    width: 100%;
  }

  button {
    align-self: flex-end;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.6rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0.5rem 1.5rem;
    width: fit-content;
    transition-duration: 0.3s;

    &:hover {
      background-color: var(--background-secondary);
    }
  }
</style>