<script>
  import { data } from "stores";

  import Tile from "components/Tile.svelte";
  import Loading from "components/Loading.svelte";
  import ChartSektoren from "components/ChartSektoren.svelte";
  import LayoutScrollytelling from "components/LayoutScrollytelling.svelte";
  import IntersectionObserver from "components/IntersectionObserver.svelte";

  $: currentData = $data ? $data["sektoren"] : null;
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

  .tile-title {
    margin-top: 0;
  }

  .wrapper {
    width: calc(100% - 20px);
    height: auto;
    margin: auto;
  }

  .tile-paragraph {
    margin-bottom: 0;
  }

  .sticky {
    top: 40vh;
    position: sticky;
  }
</style>

<div class="emissionen container">
  {#if currentData}
    <LayoutScrollytelling>
      <div class="sticky" slot="vis">
        <ChartSektoren step={stepVis} />
      </div>
      <div class="wrapper" slot="text">
        {#each currentData as item}
          <IntersectionObserver on:step={handle} bind:step={item.step}>
            <Tile active={item.step === stepVis}>
              <h3 class="tile-title">{item.text.title}</h3>
              <p class="tile-paragraph">{item.text.paragraph}</p>
            </Tile>
          </IntersectionObserver>
        {/each}
      </div>
    </LayoutScrollytelling>
  {:else}
    <Loading />
  {/if}
</div>
