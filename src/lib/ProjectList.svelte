
<script lang="ts">
  import ProjectLink from "$lib/ProjectLink.svelte";


</script>

<section class="projects">
  <h2>Projects</h2>
  <ul>
    <li><ProjectLink /></li>
    <li><ProjectLink /></li>
    <li><ProjectLink /></li>
    <li><ProjectLink /></li>
    <li><ProjectLink /></li>
  </ul>
  <br>
  <h2>Teams</h2>
  <ul>
    <li>Project F</li>
    <li>Project G</li>
    <li>Project H</li>
  </ul>
</section>

<style lang="scss">
  .projects {
		background-color: var(--background-primary);
		border-radius: 10px;
    box-sizing: border-box;
		padding: 30px 30px;
    width: 240px;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0;
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    line-height: 2;
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>