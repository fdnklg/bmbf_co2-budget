<script>
  import { data } from "stores";
  import { afterUpdate } from "svelte";

  import Loading from "components/Loading.svelte";
  import ChartEmissionen from "components/ChartEmissionen.svelte";
  import LayoutScrollytelling from "components/LayoutScrollytelling.svelte";
  import IntersectionObserver from "components/IntersectionObserver.svelte";

  $: currentData = $data ? $data["emissionen"] : null;
  let stepVis;

  function handle(e) {
    stepVis = e.detail;
  }

  afterUpdate(() => {
    console.log("currentData", currentData);
  });
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .container {
    width: 100vw;
    height: 100vh;
    background-color: grey;
    @include max-width;
  }
</style>

<div class="emissionen container">
  {#if currentData}
    <LayoutScrollytelling>
      <div slot="vis">
        <ChartEmissionen step={stepVis} />
      </div>
      <div class="wrapper" slot="text">
        {#each currentData as item}
          <IntersectionObserver on:step={handle} bind:step={item.step}>
            <span>{item.text}</span>
          </IntersectionObserver>
        {/each}
      </div>
    </LayoutScrollytelling>
  {:else}
    <Loading />
  {/if}
</div>
