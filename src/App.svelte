<script>
  import { onMount } from "svelte";

  import datasets from "data";
  import {
    zipcodes,
    activeWaypoint,
    activeKey,
    data,
    szenarienDataActive,
  } from "stores";

  import {
    parseDataEmissionen,
    parseDataSektoren,
    parseDataSzenarien,
    loadFile,
    nextUntil,
  } from "utils";

  import { zipcodesUrl, sektorenUrl, transportTypes, distances } from "config";

  import Header from "components/Header/index.svelte";
  import Waypoint from "components/Waypoint.svelte";
  import Gap from "components/Gap.svelte";
  import ChartEmissionen from "components/ChartEmissionen.svelte";
  import ChartSektoren from "components/ChartSektoren.svelte";
  import SelectGroup from "components/SelectGroup/index.svelte";
  import Input from "components/Input.svelte";
  import Map from "components/Map/index.svelte";
  import Widget from "components/Widget/index.svelte";

  $: currentIsos = $szenarienDataActive
    ? $szenarienDataActive.isochrones
    : "distance";

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
    parsed["szenarien"] = parseDataSzenarien(datasets);

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

  .wrapper-onboarding {
    margin: 0 auto;
    width: $size-content;
  }

  .map {
    height: 100vh;
    margin: 50px 0;
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

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <Waypoint
      id="transition"
      waypoints={embedContents['emissionen']}
      {setActiveWaypoint} />

    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <Waypoint
      id="end"
      waypoints={embedContents['emissionen']}
      {setActiveWaypoint} />
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

    <Waypoint
      id="landwirtschaft"
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

    <Gap />
    <Waypoint
      id="end"
      waypoints={embedContents['sektoren']}
      key="sektoren"
      {setActiveKey}
      {setActiveWaypoint} />
  </div>
  <div class="section onboarding">
    <p class="article-item">
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>
    <div class="wrapper-onboarding">
      <SelectGroup data={distances} isType="distances" />
      <SelectGroup data={transportTypes} isType="transportTypes" />
      <Input />
    </div>
    <div data-embed-id="szenarien" class="vis map sticky embed">
      <Widget />
      <Map lat={35} lon={-84} zoom={3.5} />
    </div>
    <Waypoint
      id="start"
      waypoints={embedContents['szenarien']}
      key="szenarien"
      {setActiveKey}
      {setActiveWaypoint} />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <Waypoint
      id="szenarioEins"
      waypoints={embedContents['szenarien']}
      key="szenarien"
      {setActiveKey}
      {setActiveWaypoint} />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <Waypoint
      id="szenarioZwei"
      waypoints={embedContents['szenarien']}
      key="szenarien"
      {setActiveKey}
      {setActiveWaypoint} />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <Waypoint
      id="szenarioDrei"
      waypoints={embedContents['szenarien']}
      key="szenarien"
      {setActiveKey}
      {setActiveWaypoint} />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Gap />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>

    <Waypoint
      id="end"
      waypoints={embedContents['szenarien']}
      key="szenarien"
      {setActiveKey}
      {setActiveWaypoint} />
    <Gap />

    <p class="article-item">
      <strong>{currentIsos}</strong>
      Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
      weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
      eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
      gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
    </p>
  </div>

  <Gap />
</div>
