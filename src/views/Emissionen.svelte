<script>
  import { data } from "stores";
  import { afterUpdate } from "svelte";

  import Tile from "components/Tile.svelte";
  import Loading from "components/Loading.svelte";
  import ChartEmissionen from "components/ChartEmissionen.svelte";
  import LayoutScrollytelling from "components/LayoutScrollytelling.svelte";
  import IntersectionObserver from "components/IntersectionObserver.svelte";

  $: currentData = $data ? $data["emissionen"] : null;
  let stepVis;

  function handle(e) {
    stepVis = e.detail;
  }
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .container {
    width: 100vw;
    @include max-width;
  }

  .tileTitle {
    margin-top: 0;
  }

  .tileParagraph {
    margin-bottom: 0;
  }

  .sticky {
    top: 30vh;
    position: sticky;
  }
</style>

<div class="emissionen container">
  {#if currentData}
    <LayoutScrollytelling>
      <div class="sticky" slot="vis">
        <ChartEmissionen step={stepVis} />
      </div>
      <div slot="text">
        {#each currentData as item}
          <IntersectionObserver on:step={handle} bind:step={item.step}>
            <Tile active={item.step === stepVis}>
              <h3 class="tileTitle">{item.text.title}</h3>
              <p class="tileParagraph">{item.text.paragraph}</p>
            </Tile>
          </IntersectionObserver>
        {/each}
      </div>
    </LayoutScrollytelling>
  {:else}
    <Loading />
  {/if}
</div>
