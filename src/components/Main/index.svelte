<script>
  import { onMount } from 'svelte'
  import { items, travelTypes, distances } from 'content'

  import { activeCategory } from 'stores'

  import { observe, getId } from './util.js'

  import Map from 'components/Map/index.svelte'
  import Barchart from 'components/Barchart/index.svelte'
  import SelectGroup from 'components/SelectGroup/index.svelte'
  import Input from 'components/Input.svelte'

  let markerBarStart, markerBarTrans, markerBarZoom

  const setActiveCategory = (category) => {
    activeCategory.set(category)
  }

  onMount(async () => {
    const articleItems = document.querySelectorAll('.article-item')

    // set observe for markers
    observe(
      markerBarStart,
      () => setActiveCategory('start'),
      () => null
    )

    observe(
      markerBarTrans,
      () => setActiveCategory('transition'),
      () => null
    )

    observe(
      markerBarZoom,
      () => setActiveCategory('zoom'),
      () => null
    )
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  main {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }

  article {
    padding: 0 var(--space-m);
  }

  .marker {
    @include marker;
  }

  .map {
    height: 50vh;
  }
</style>

<main>
  <Barchart />

  <div class="marker" bind:this={markerBarStart}>
    marker: emissions overview
  </div>

  {#each items as item, index}
    {#if index === 1}
      <div class="marker" bind:this={markerBarTrans}>
        marker: emissions transition
      </div>
    {/if}
    {#if index === 2}
      <div class="marker" bind:this={markerBarZoom}>marker: emissions zoom</div>
    {/if}
    <div class="article-item padding" id={`article-item-${index}`}>
      <h2>{item.headline}</h2>
      <p>{item.paragraph}</p>
    </div>
  {/each}

  <article id="articles-wrapper">
    {#each items as item, index}
      <div class="article-item" id={`article-item-${index}`}>
        <h2>{item.headline}</h2>
        <p>{item.paragraph}</p>
      </div>
    {/each}

    <SelectGroup data={distances} isType="distances" />
    <SelectGroup data={travelTypes} isType="travelTypes" />
    <Input />
    <div class="vis map sticky">
      <Map animate={false} lat={35} lon={-84} zoom={3.5} />
    </div>

    {#each items as item, index}
      <div class="article-item" id={`article-item-${index}`}>
        <h2>{item.headline}</h2>
        <p>{item.paragraph}</p>
      </div>
    {/each}

    {#each items as item, index}
      <div class="article-item" id={`article-item-${index}`}>
        <h2>{item.headline}</h2>
        <p>{item.paragraph}</p>
      </div>
    {/each}
  </article>
</main>
