<script>
  import { szenarienData } from "stores";
  import { onMount } from "svelte";
  import Map from "components/Map/index.svelte";
  import Indicator from "./Indicator.svelte";
  import Icon from "components/Icon.svelte";

  const szenarioKeys = ["szenarioZwei", "szenarioDrei", "szenarioVier"];

  export let duration = 8000;
  let szenarioIndex = 0;
  $: key = szenarioKeys[szenarioIndex];
  $: current = $szenarienData ? $szenarienData[key] : false;

  onMount(() => {
    const interval = setInterval(() => {
      szenarioIndex =
        szenarioIndex === szenarioKeys.length - 1 ? 0 : szenarioIndex + 1;
      key = szenarioKeys[szenarioIndex];
    }, duration);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .container {
    height: 100vh;
  }

  .intro {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    position: absolute;
    bottom: 0px;
  }

  .inner {
    width: 550px;
    margin: auto;
    text-align: center;
    padding-bottom: 40px;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
      padding-bottom: 10px;
    }
  }
  .title {
    font-size: $font-size-xxl;
    line-height: $line-height-s;
    margin-bottom: 10px;

    @include respond-max-screen-medium {
      font-size: $font-size-l;
    }
  }

  .start {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-size: $font-size-xs;
    letter-spacing: $letter-spacing-s;
    padding-bottom: 20px;

    .label {
      padding-bottom: 5px;
    }
  }
  .gradient {
    width: 100vw;
    height: 50vh;
    position: absolute;
    bottom: 0;
    /* webkit example */
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(255, 255, 255, 0)),
      to(rgba(255, 255, 255, 1)),
      color-stop(0.5, #fff)
    );
  }

  .authors {
    font-size: $font-size-xs;
    letter-spacing: $letter-spacing-s;

    a {
      padding-bottom: 3px;
      border-bottom: 1px solid $color-main-40;
      text-decoration: none;
      color: $color-main;

      &:hover {
        opacity: 0.5;
        transition: opacity 125ms ease-in-out;
      }
    }
  }

  .text {
    color: $color-main-40;
  }
</style>

<header>
  <div class="container">
    {#if current}
      <Map
        data={current}
        hasPulsingDot={true}
        lat={current.centroid.x}
        lon={current.centroid.y}
        zoom={[current.centroid.zoom]} />
    {/if}
    <div class="gradient" />
    <div class="intro">
      <div class="inner">
        <h1 class="title">Wie weit komme ich mit meinem CO2-Budget?</h1>
        <span class="authors">von
          <a target="_blank" href="https://www.sebastianmeier.eu/">SEBASTIAN
            MEIER</a>
          und
          <a target="_blank" href="https://fabiandinklage.com">FABIAN DINKLAGE</a></span>
        <p class="text">
          Die individuelle Mobilität hat einen spürbaren Einfluss auf den
          Klimawandel. Erfahre, wie nachhaltig deine Art der Mobilität ist und
          du ändern kannst, um einen positiven Beitrag zu leisten.
        </p>
      </div>
      <div class="start">
        <span class="label">Starten</span>
        <Icon name="arrow_down" />
      </div>
    </div>
    {#if current}
      <Indicator
        items={szenarioKeys}
        index={szenarioIndex}
        current={current.centroid} />
    {/if}
  </div>
</header>
