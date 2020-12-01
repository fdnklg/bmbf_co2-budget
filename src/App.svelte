<script>
  import { onMount } from "svelte";

  import datasets from "data";
  import { zipcodes, activeWaypoint, activeKey, data } from "stores";

  import {
    parseDataEmissionen,
    parseDataSektoren,
    loadFile,
    nextUntil,
  } from "utils";

  import { zipcodesUrl, sektorenUrl } from "config";

  import Header from "components/Header/index.svelte";
  import Waypoint from "components/Waypoint.svelte";
  import Gap from "components/Gap.svelte";
  import ChartEmissionen from "components/ChartEmissionen.svelte";
  import ChartSektoren from "components/ChartSektoren.svelte";

  let embedContents = {};

  const setActiveWaypoint = (id) => {
    activeWaypoint.set(id);
  };

  const setActiveKey = (key) => {
    activeKey.set(key);
  };

  onMount(async () => {
    let parsed = {};
    const codes = await loadFile(zipcodesUrl);
    const sektoren = await loadFile(sektorenUrl, ";");

    parsed["emissionen"] = parseDataEmissionen(datasets);
    parsed["sektoren"] = parseDataSektoren(sektoren, datasets);

    zipcodes.set(codes.columns);
    data.set(parsed);

    const embedContainers = document.querySelectorAll(".embed");
    embedContainers.forEach((embedContainer) => {
      const id = embedContainer.getAttribute("data-embed-id");
      embedContents[id] = [];

      const siblings = nextUntil(
        embedContainer,
        '[data-waypoint="end"]',
        true
      ).filter((d) => d.nodeType === Node.ELEMENT_NODE);

      siblings.forEach((sibling) => {
        if (sibling.matches(".waypoint")) {
          const waypointId = sibling.getAttribute("data-waypoint");
          embedContents[id].push({
            type: "waypoint",
            data: waypointId,
          });
        }
      });
    });

    console.log("embedContents", embedContainers);
  });
</script>

<style lang="scss">
  @import "src/style/root.scss";

  global {
    .sticky {
      position: sticky;
      top: 25%;
    }
  }
  .container {
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: $color-main;
    margin: 0 auto;
  }
  .article-item {
    transform: translateZ(0);
    background-color: $color-light;
    max-width: $size-content;
    margin: 50px auto;
    padding: 20px;
    @include box-shadow;
  }

  .chart-section {
    display: block;
    border-top: 1px solid $color-light-20;
    border-bottom: 1px solid $color-light-20;

    .article-item {
      margin-left: 600px;
    }
  }
</style>

<div class="container">
  <Header />

  <p class="article-item">
    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
  </p>

  <div class="section emissionen">
    <ChartEmissionen />

    <Waypoint
      id="start"
      waypoints={embedContents['emissionen']}
      key="emissionen"
      {setActiveKey}
      {setActiveWaypoint} />

    <Gap />

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Waypoint
      id="transition"
      waypoints={embedContents['emissionen']}
      {setActiveWaypoint} />

    <Gap />

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Waypoint
      id="end"
      waypoints={embedContents['emissionen']}
      {setActiveWaypoint} />

    <Gap />
  </div>

  <div class="section sektoren">
    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>
    <ChartSektoren />

    <Waypoint
      id="start"
      waypoints={embedContents['sektoren']}
      key="sektoren"
      {setActiveKey}
      {setActiveWaypoint} />

    <Gap />

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Waypoint
      id="verkehr"
      waypoints={embedContents['sektoren']}
      key="sektoren"
      {setActiveKey}
      {setActiveWaypoint} />

    <Gap />

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>
  </div>
</div>
