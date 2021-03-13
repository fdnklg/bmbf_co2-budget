<script>
  import { data, activeAnchor } from 'stores'

  import Tile from 'components/Tile.svelte'
  import Loading from 'components/Loading.svelte'
  import Anchor from 'components/Navigation/Anchor.svelte'
  import ChartSektoren from 'components/ChartSektoren.svelte'
  import LayoutScrollytelling from 'components/LayoutScrollytelling.svelte'
  import IntersectionObserver from 'components/Intersectionobserver.svelte'

  $: currentData = $data ? $data['sektoren'] : null
  let stepVis

  function handle(e) {
    stepVis = e.detail
    activeAnchor.set(e.detail)
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .container {
    width: 100vw;
    max-width: 100%;
    @include max-width;
  }

  .tile-title {
    margin-top: 0;
  }

  .wrapper {
    width: calc(100% - 2em);
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
            <Anchor anchorId={item.step} />
            <Tile active={item.step === stepVis}>
              <h3 class="tile-title">{item.text.title}</h3>
              <p class="tile-paragraph">
                {@html item.text.paragraph}
              </p>
            </Tile>
            <div class="gap" />
          </IntersectionObserver>
        {/each}
      </div>
    </LayoutScrollytelling>
  {:else}
    <Loading />
  {/if}
</div>
