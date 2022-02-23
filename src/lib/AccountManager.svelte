
<script lang="ts">
  import { user } from "$lib/util/data";
</script>

<section class="account">
  <h2>
    <img src="https://github.com/{$user.name}.png" alt="You!">
    <span>Your Account</span>
  </h2>
  <h3>Account Type</h3>
  <p>Founder ($0/year)</p>
  <div class="row">
    <div>
      <h3>Storage</h3>
      <p>{JSON.stringify($user).length} bytes / unlimited</p>
    </div>
    <div>
      <h3>Bandwidth</h3>
      <p>unlimited</p>
    </div>
  </div>
  <h3>GitHub Token</h3>
  <p>The token Maintained uses to verify you only uses the public data scope. You may revoke your token <a href="">on GitHub</a> if you wish. <b>This does not delete your data.</b></p>
  <br>
  <button class="delete">Close My Account</button>
</section>

<style lang="scss">
  .account, div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 8px;

    h2 {
      display: flex;
      align-items: center;
      column-gap: 15px;
    }

    h2 img {
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    column-gap: 30px;
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