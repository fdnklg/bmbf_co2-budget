<script>
  import SelectGroup from "components/SelectGroup/index.svelte";
  import Input from "components/Input.svelte";
  import Tile from "components/Tile.svelte";
  import Intro from "components/SelectGroup/Intro.svelte";

  import { transportTypes, distances } from "config";
</script>

<style lang="scss">
  .container {
    margin: auto;
  }

  .inner {
    max-width: 550px;
    width: 550px;
    padding: 30px;
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
