<script>
  import { afterUpdate } from "svelte";
  import { szenarienData, szenarienDataActive } from "stores";

  import Waypoint from "components/Waypoint.svelte";
  import Paragraph from "components/Paragraph.svelte";
  import Gap from "components/Gap.svelte";
  import Map from "components/Map/index.svelte";
  import Legend from "components/Legend/index.svelte";
  import Widget from "components/Widget/index.svelte";

  let items = [];

  afterUpdate(() => {
    if ($szenarienData) {
      const waypoints = [
        {
          data: "start",
        },
        {
          data: "szenarioEins",
        },
        {
          data: "szenarioZwei",
        },
        {
          data: "szenarioDrei",
        },
        {
          data: "szenarioVier",
        },
        {
          data: "end",
        },
      ];

      items = [
        {
          component: Waypoint,
          id: "start",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["start"].text,
        },
        {
          component: Gap,
        },
        {
          component: Waypoint,
          id: "szenarioEins",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["szenarioEins"].text,
        },
        {
          component: Gap,
        },
        {
          component: Waypoint,
          id: "szenarioZwei",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["szenarioZwei"].text,
        },
        {
          component: Gap,
        },
        {
          component: Waypoint,
          id: "szenarioDrei",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["szenarioDrei"].text,
        },
        {
          component: Gap,
        },
        {
          component: Waypoint,
          id: "szenarioVier",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["szenarioVier"].text,
        },
        {
          component: Gap,
        },
        {
          component: Waypoint,
          id: "end",
          key: "szenarien",
          waypoints: waypoints,
        },
        {
          component: Paragraph,
          text: $szenarienData["end"].text,
        },
        {
          component: Gap,
        },
      ];
    }
  });
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .szenarien {
  }

  .map-container {
    height: 100vh;
    width: 100vw;
    top: 0;
    position: sticky;
  }
</style>

<div class="container szenarien">
  <!-- <Widget /> -->
  <div class="map-container">
    <Map
      data={$szenarienDataActive}
      hasPulsingDot={true}
      lat={35}
      lon={-84}
      zoom={3.5} />
  </div>
  <Legend />
  <div class="wrapper">
    {#each items as item}
      <svelte:component this={item.component} {...item} />
    {/each}
  </div>
</div>
