<script>
  import { data } from "stores";

  import Tile from "components/Tile.svelte";
  import Loading from "components/Loading.svelte";
  import ChartEmissionen from "components/ChartEmissionen.svelte";
  import LayoutScrollytelling from "components/LayoutScrollytelling.svelte";
  import IntersectionObserver from "components/IntersectionObserver.svelte";

  let step;
  $: currentData = $data ? $data["emissionen"] : null;

  function handleActiveStep(e) {
    step = e.detail;
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
    top: 45vh;
    position: sticky;
  }
</style>

<div class="emissionen container">
  {#if currentData}
    <LayoutScrollytelling>
      <div class="sticky" slot="vis">
        <ChartEmissionen {step} />
      </div>
      <div class="wrapper" slot="text">
        {#each currentData as item}
          <IntersectionObserver
            on:step={handleActiveStep}
            bind:step={item.step}>
            <Tile active={item.step === step}>
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
