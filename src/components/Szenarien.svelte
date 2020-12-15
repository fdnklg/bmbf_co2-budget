<script>
  import { afterUpdate } from "svelte";
  import { szenarienData } from "stores";

  import Waypoint from "components/Waypoint.svelte";
  import Paragraph from "components/Paragraph.svelte";
  import Gap from "components/Gap.svelte";

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

<style>
</style>

<div class="wrapper szenarien">
  {#each items as item}
    <svelte:component this={item.component} {...item} />
  {/each}
</div>
