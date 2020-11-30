<script>
  export let isSticky;
  export let activeWaypoint;
  export let color = "red";

  const setColor = (wp) => {
    if (wp === "start") return "black";
    if (wp === "end") return "grey";
    return wp;
  };
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .container {
    width: 100%;
    color: white;
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
  style="background-color: {setColor($activeWaypoint)}">
  Chart Container
</div>
