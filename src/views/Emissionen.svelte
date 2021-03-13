<script>
  import { data, activeAnchor } from 'stores'

  import Tile from 'components/Tile.svelte'
  import Anchor from 'components/Navigation/Anchor.svelte'
  import Loading from 'components/Loading.svelte'
  import ChartEmissionen from 'components/ChartEmissionen.svelte'
  import LayoutScrollytelling from 'components/LayoutScrollytelling.svelte'
  import IntersectionObserver from 'components/Intersectionobserver.svelte'

  let step
  $: currentData = $data ? $data['emissionen'] : null

  function handleActiveStep(e) {
    const stepCurrent = e.detail
    step = stepCurrent
    activeAnchor.set(stepCurrent)
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
    margin-top: 0 !important;
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
            <Anchor anchorId={item.step} />
            <Tile active={item.step === step}>
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
