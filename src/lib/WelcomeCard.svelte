
<section class="welcome">
  <h2>Welcome</h2>
  <p>This is your dashboard, where you can manage all of your data in Maintained. You can create projects, badges, workers, and more.</p>
</section>

<style lang="scss">
  @import "./scss/mixins.scss";

  .welcome {
    @include dash-card;
    display: flex;
    flex-direction: column;
    flex: 1 1;
  }

  h2 {
		font-size: 1rem;
		margin: 0;
  }
  p {
    line-height: 1.5;
    font-size: 0.8rem;
    margin-top: 10px;
		margin-bottom: 0;
  }
</style>