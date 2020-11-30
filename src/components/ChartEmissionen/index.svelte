<script>
  export let isSticky;
  export let color = "red";
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .container {
    width: 100%;
    height: 500px;
    margin: 0 auto;
    top: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div
  data-embed-id="emissionen"
  class="container embed {isSticky ? 'sticky' : ''}"
  style="background-color: {color}">
  Chart Container
</div>
