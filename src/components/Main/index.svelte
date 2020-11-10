<script>
  import { onMount, afterUpdate } from "svelte";
  import { activeVisItem, chartData } from "stores";
  import { items } from "content";
  import data from "data";

  import { observe, getId } from "./util.js";

  import Map from "components/Map/index.svelte";
  import Chart from "../Chart/Chart.svelte";
  import Bars from "../Chart/Bars.svelte";
  import Header from "../Chart/Header.svelte";
  import Footer from "../Chart/Footer.svelte";
  import Annotation from "../Chart/Annotation.svelte";

  let barchart, barchartOverview, barchartDetail;

  const { emissions, emissionsDetail } = data;
  const { d } = emissions;

  const options = {
    threshold: [0.9],
    delay: 100,
    trackVisibility: true,
  };

  const setActiveArticleItem = (elm) => {
    const articleId = getId(elm.target.id);
    activeVisItem.set(parseInt(articleId));
  };

  const setDataDetail = () => {
    chartData.set(transform(emissionsDetail));
  };

  const setDataOverview = () => {
    chartData.set(transform(emissions));
  };

  const transform = (data) => {
    data.d = data.d
      .sort((a, b) => b.value - a.value)
      .map((d) => {
        d.x = (d.value * 100).toFixed(1);
        d.y = 1;
        return d;
      });
    return data;
  };

  chartData.set(transform(emissions));

  onMount(async () => {
    const articleItems = document.querySelectorAll(".article-item");

    observe(barchartOverview, setDataOverview, () => null, options);

    observe(barchartDetail, setDataDetail, () => null, options);

    Array.from(articleItems).forEach((article) => {
      observe(article, setActiveArticleItem, () => null, options);
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

  .vis {
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: rgba(26, 25, 43, 0.016) 0px 2.8px 2.2px,
      rgba(26, 25, 43, 0.02) 0px 12.5px 10px,
      rgba(26, 25, 43, 0.024) 0px 22.3px 17.9px,
      rgba(26, 25, 43, 0.027) 0px 41.8px 33.4px,
      rgba(26, 25, 43, 0.02) 0px 100px 80px;
  }

  .bar {
    height: 275px;
  }

  .map {
    height: 50vh;
  }

  .padding {
    padding: 0 var(--space-m);
  }

  .barchart {
    padding: 1em var(--space-s) 2em var(--space-xs);
  }

  .sticky {
    position: sticky;
    top: 0;
  }
</style>

<main>
  <div bind:this={barchart} class="vis bar sticky padding">
    <Header data={$chartData.meta} />
    <div class="barchart">
      <Chart subset={$chartData.meta.subset} x1={0} x2={100} y1={0} y2={100}>
        <Bars data={$chartData.d} />
        <Annotation data={$chartData.annotation} />
      </Chart>
    </div>
    <Footer data={$chartData.meta} />
  </div>
  <div class="barchartOverview" bind:this={barchartOverview} />
  {#each items as item, index}
    {#if index === 2}
      <div class="barchartDetail" bind:this={barchartDetail} />
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
