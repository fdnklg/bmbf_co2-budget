<script>
  import Intersectionobserver from "./Intersectionobserver.svelte";

  export let top = 0;
  export let bottom = 0;
  export let waypoints;
  export let id;
  export let setActiveWaypoint;

  const handleIsIntersecting = (e, obj) => {
    const { isScrollingUp, isEnter, intersecting } = obj;

    /*
        Intersection Observer provides three props:
        isScrollingUp, isEnter, intersecting
    */

    console.log(
      "isScrollingUp, isEnter, intersecting",
      isScrollingUp,
      isEnter,
      intersecting
    );

    if (isScrollingUp && !isEnter) {
      if (waypoints && id !== "start") {
        const matchIndex = waypoints.map((elm) => elm.data).indexOf(id);
        const prevWaypoint = waypoints[matchIndex - 1];
        setActiveWaypoint(prevWaypoint.data);
      }
    } else if (!isScrollingUp && intersecting) {
      setActiveWaypoint(id);
    }
  };

  const color = (id) => {
    if (id === "start") return "black";
    if (id === "end") return "grey";
    return id;
  };
</script>

<style>
  .waypoint {
    height: auto;
    width: 100%;
    background-color: green;
    margin: 0 auto;
  }
</style>

<div class="waypoint" data-waypoint={id}>
  <Intersectionobserver
    let:intersecting
    let:isEnter
    let:isScrollingUp
    {top}
    {bottom}>
    {#if intersecting}
      <div
        class="waypoint"
        use:handleIsIntersecting={{ isScrollingUp, isEnter, intersecting }}
        style="background-color: {color(id)}">
        Waypoint
      </div>
    {:else}
      <div
        class="waypoint"
        use:handleIsIntersecting={{ isScrollingUp, isEnter, intersecting }}
        style="background-color: {id}">
        Waypoint
      </div>
    {/if}
  </Intersectionobserver>
</div>
