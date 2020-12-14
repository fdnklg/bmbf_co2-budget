<script>
  import Waypoint from "components/Waypoint.svelte";
  import Paragraph from "components/Paragraph.svelte";
  import Gap from "components/Gap.svelte";

  import { activeVis, activeWaypoint } from "stores";

  // @TODO:
  // - get real data from fetched data here!

  const TRAVELGROUP_PERCENT = "Daten Hier";
  const TRAVELGROUP_DISTANCE = "50km";
  const RAUMTYP = "Daten Hier";

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
      data: "end",
    },
  ];

  const items = [
    {
      component: Waypoint,
      id: "start",
      key: "szenarien",
      setActiveVis: (id) => activeVis.set(id),
      setActiveWaypoint: (id) => activeWaypoint.set(id),
      waypoints: waypoints,
    },
    {
      component: Paragraph,
      text: `${TRAVELGROUP_PERCENT} % der Menschen in ${RAUMTYP} reisen täglich eine Strecke von ${TRAVELGROUP_DISTANCE} km.`,
    },
    {
      component: Gap,
    },
    {
      component: Waypoint,
      id: "szenarioEins",
      key: "szenarien",
      setActiveVis: (id) => activeVis.set(id),
      setActiveWaypoint: (id) => activeWaypoint.set(id),
      waypoints: waypoints,
    },
    {
      component: Paragraph,
      text: `${TRAVELGROUP_PERCENT} % der Menschen in ${RAUMTYP} reisen täglich eine Strecke von ${TRAVELGROUP_DISTANCE} km.`,
    },
    {
      component: Gap,
    },
    {
      component: Waypoint,
      id: "szenarioZwei",
      key: "szenarien",
      setActiveVis: (id) => activeVis.set(id),
      setActiveWaypoint: (id) => activeWaypoint.set(id),
      waypoints: waypoints,
    },
    {
      component: Paragraph,
      text: `${TRAVELGROUP_PERCENT} % der Menschen in ${RAUMTYP} reisen täglich eine Strecke von ${TRAVELGROUP_DISTANCE} km.`,
    },
    {
      component: Gap,
    },
    {
      component: Waypoint,
      id: "szenarioDrei",
      key: "szenarien",
      setActiveVis: (id) => activeVis.set(id),
      setActiveWaypoint: (id) => activeWaypoint.set(id),
      waypoints: waypoints,
    },
    {
      component: Paragraph,
      text: `${TRAVELGROUP_PERCENT} % der Menschen in ${RAUMTYP} reisen täglich eine Strecke von ${TRAVELGROUP_DISTANCE} km.`,
    },
    {
      component: Gap,
    },
    {
      component: Waypoint,
      id: "end",
      key: "szenarien",
      setActiveVis: (id) => activeVis.set(id),
      setActiveWaypoint: (id) => activeWaypoint.set(id),
      waypoints: waypoints,
    },
    {
      component: Paragraph,
      text: `${TRAVELGROUP_PERCENT} % der Menschen in ${RAUMTYP} reisen täglich eine Strecke von ${TRAVELGROUP_DISTANCE} km.`,
    },
    {
      component: Gap,
    },
  ];
</script>

<style>
</style>

<div class="wrapper szenarien">
  {#each items as item}
    <svelte:component this={item.component} {...item} />
  {/each}
</div>
