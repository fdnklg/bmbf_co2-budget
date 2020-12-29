<script>
  import SelectGroup from "components/SelectGroup/index.svelte";
  import Input from "components/Input.svelte";
  import Tile from "components/Tile.svelte";
  import Intro from "components/SelectGroup/Intro.svelte";

  import { transportTypes, distances } from "config";
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .container {
    margin: auto;

    @include respond-max-screen-phablet {
      width: calc(100% - 20px);
    }
  }

  .inner {
    max-width: 550px;
    width: 550px;

    @include respond-max-screen-phablet {
      width: 100%;
    }
  }
</style>

<div class="onboarding container">
  <Tile active={true}>
    <div class="inner">
      <SelectGroup data={transportTypes} isType="transportTypes" />
      <SelectGroup data={distances} isType="distances" />
      <Intro
        title="In welchem Raum bist du unterwegs?"
        subtitle="Wähle deine deutsche gültige Postleitzahl." />
      <Input />
    </div>
  </Tile>
</div>
