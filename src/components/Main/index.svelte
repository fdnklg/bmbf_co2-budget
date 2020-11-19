<script>
  import { onMount } from "svelte";
  import { items } from "content";

  import { activeVisItem, activeCategory, selectedData, data } from "stores";

  import { observe, getId } from "./util.js";

  import Map from "components/Map/index.svelte";
  import Barchart from "components/Barchart/index.svelte";

  let barchartOverview, barchartDetail;

  const setActiveArticleItem = (elm) => {
    const articleId = getId(elm.id);
    activeVisItem.set(parseInt(articleId));
  };

  const setActiveCategory = (category) => {
    activeCategory.set(category);
  };

  onMount(async () => {
    const articleItems = document.querySelectorAll(".article-item");

    // set observe for markers
    observe(
      barchartOverview,
      () => setActiveCategory("emissions"),
      () => null
    );

    observe(
      barchartDetail,
      () => setActiveCategory("emissionsDetail"),
      () => null
    );

    Array.from(articleItems).forEach((article) => {
      observe(
        article,
        () => setActiveArticleItem(article),
        () => null
      );
    });
  });
</script>

<style>
  main {
    max-width: 100%;
    display: flex;
    flex-direction: column;
  }

  article {
    padding: 0 var(--space-m);
  }

  .map {
    height: 50vh;
  }
</style>

<main>
  <Barchart />

  <div class="marker" bind:this={barchartOverview}>
    marker: emissions overview
  </div>

  {#each items as item, index}
    {#if index === 2}
      <div class="marker" bind:this={barchartDetail}>
        marker: emissions detail
      </div>
    {/if}
    <div class="article-item padding" id={`article-item-${index}`}>
      <h2>{item.headline}</h2>
      <p>{item.paragraph}</p>
    </div>
  {/each}

  <div class="vis map sticky">
    <Map lat={35} lon={-84} zoom={3.5} />
  </div>

  <article id="articles-wrapper">
    {#each items as item, index}
      <div class="article-item" id={`article-item-${index}`}>
        <h2>{item.headline}</h2>
        <p>{item.paragraph}</p>
      </div>
    {/each}
  </article>
</main>
