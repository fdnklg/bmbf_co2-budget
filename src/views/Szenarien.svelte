<script>
  import { szenarienData, activeAnchor } from 'stores'

  import Map from 'components/Map/index.svelte'
  import Anchor from 'components/Navigation/Anchor.svelte'
  import Loading from 'components/Loading.svelte'
  import IntersectionObserver from 'components/IntersectionObserver.svelte'
  import Tile from 'components/Tile.svelte'

  function handleActiveStep(e) {
    step = e.detail
    activeAnchor.set(e.detail)
  }

  let step

  $: data = $szenarienData ? $szenarienData : null

  $: currentData = $szenarienData
    ? $szenarienData.find((d) => d.step == step)
    : false
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .szenario {
    margin-left: 20px;
    height: 500px;
    width: 400px;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
      margin-left: 10px;
    }
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
        animate={false}
        lon={-84}
        zoom={3.5} />
    </div>
    {#each data as item}
      <div class="szenario">
        <Anchor anchorId={item.step}>
          <IntersectionObserver
            rootMargin={`-${0.25 * 100}% 0% -${100 - 0.55 * 100}% 0%`}
            on:step={handleActiveStep}
            bind:step={item.step}>
            <Tile isMap={true} active={item.step === step}>
              <h3 class="tile-title">{item.text.title}</h3>
              <p class="tile-paragraph">{item.text.paragraph}</p>
            </Tile>
          </IntersectionObserver>
        </Anchor>
      </div>
    {/each}
  {:else}
    <Loading />
  {/if}
</div>
