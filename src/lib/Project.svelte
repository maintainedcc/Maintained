
<script lang="ts">

</script>

<div class="project">
  <h2>
    <span>Project Name</span>
  </h2>
  <p class="description">
    @org <b>&bull;</b> repository <b>&bull;</b> all branches
  </p>
  <p>Badge Editors</p>
</div>

<style lang="scss">
  h2 {
    display: flex;
    align-items: center;
    column-gap: 10px;
    font-size: 1.2rem;
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
  }

  .description {
    color: var(--blue);
    font-size: 0.6rem;
    margin: 0;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;

    b {
    color: #999;
    }
  }
</style>