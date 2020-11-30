<script>
  export let handleClick = () => {};
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .btnSmall {
    @include font-small;
    background-color: transparent;
    border: none;
    padding: 0 0 3px 0;
    border-radius: 0px;
    border-bottom: 1px solid var(--color-grey-0);
  }
</style>

<button class="btnSmall" on:click={handleClick}>
  <slot />
</button>
