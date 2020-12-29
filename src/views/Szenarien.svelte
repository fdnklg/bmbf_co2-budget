<script>
  import { szenarienData } from "stores";

  import Map from "components/Map/index.svelte";
  import Loading from "components/Loading.svelte";
  import IntersectionObserver from "components/IntersectionObserver.svelte";
  import Tile from "components/Tile.svelte";
  import Legend from "components/Legend/index.svelte";
  import Widget from "components/Widget/index.svelte";

  function handleActiveStep(e) {
    step = e.detail;
  }

  let step;

  $: data = $szenarienData ? $szenarienData : null;

  $: currentData = $szenarienData
    ? $szenarienData.find((d) => d.step == step)
    : false;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .szenario {
    margin-left: 20px;
    height: 500px;
    width: 400px;
  }

  .sticky {
    height: 100vh;
    width: 100vw;
    top: 0;
    position: sticky;
  }
</style>

<div class="container szenarien">
  {#if data}
    <div class="sticky">
      <Map
        data={currentData}
        hasPulsingDot={true}
        lat={35}
        lon={-84}
        zoom={3.5} />
    </div>
    {#each data as item}
      <div class="szenario">
        <IntersectionObserver
          rootMargin={`-${0.25 * 100}% 0% -${100 - 0.25 * 100}% 0%`}
          on:step={handleActiveStep}
          bind:step={item.step}>
          <Tile isMap={true} active={item.step === step}>
            <h3 class="tile-title">{item.text.title}</h3>
            <p class="tile-paragraph">{item.text.paragraph}</p>
          </Tile>
        </IntersectionObserver>
      </div>
    {/each}
  {:else}
    <Loading />
  {/if}

  <!-- <Widget />
  <Legend />
  <div class="wrapper">
    {#each items as item}
      <svelte:component this={item.component} {...item} />
    {/each}
  </div>
  -->
</div>
