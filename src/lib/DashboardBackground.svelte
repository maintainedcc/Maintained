
<div class="bg">
	<div class="left-deco"></div>
	<div class="left-deco a"></div>
	<div class="left-deco b"></div>
	<div class="left-deco c"></div>
</div>

<style lang="scss">
  .left-deco {
    background-color: var(--brand-primary);
    -webkit-clip-path: polygon(0 0, 100% 100%, 0% 100%);
    clip-path: polygon(0 0, 100% 100%, 0% 100%);
    position: fixed;
    left: 0;
    bottom: 0;
    height: 25vh;
    width: 25vw;
    z-index: -1;

    &.a {
      background-color: var(--brand-a);
      height: 45vh;
      width: 45vw;
      z-index: -2;
    }
    &.b {
      background-color: var(--brand-b);
      height: 60vh;
      width: 60vw;
      z-index: -3;
    }
    &.c {
      background-color: var(--brand-c);
      height: 75vh;
      width: 75vw;
      z-index: -4;
    }
  }
</style>