<script>
  import { activeWaypoint } from "stores";
  export let color;

  const config = {
    start: [{ icon: "icon here", text: "start" }],
    szenarioEins: [
      { icon: "icon here", text: "szenarioEins" },
      { icon: "icon here", text: "szenarioEins" },
    ],
    szenarioZwei: [{ icon: "icon here", text: "szenarioZwei" }],
    szenarioDrei: [{ icon: "icon here", text: "szenarioDrei" }],
    szenarioVier: [{ icon: "icon here", text: "szenarioVier" }],
    end: [{ icon: "icon here", text: "end" }],
  };

  $: activeLegend = config[$activeWaypoint] ? config[$activeWaypoint] : [];
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .legend {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 20px;
    right: 20px;
    z-index: 1;
  }

  .item {
    display: flex;
  }
</style>

<div class="legend">
  {#each activeLegend as item}
    <div class="item">
      <div>{item.icon}</div>
      <div>{item.text}</div>
    </div>
  {:else}
    <div>keine Daten</div>
  {/each}
</div>
