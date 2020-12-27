<script>
  import SelectGroup from "components/SelectGroup/index.svelte";
  import Input from "components/Input.svelte";
  import Tile from "components/Tile.svelte";

  import { transportTypes, distances } from "config";
</script>

<style lang="scss">
  .container {
    margin: auto;
  }

  .inner {
    max-width: 550px;
    padding: 30px;
  }
</style>

<div class="onboarding container">
  <Tile active={true}>
    <div class="inner">
      <SelectGroup data={distances} isType="distances" />
      <SelectGroup data={transportTypes} isType="transportTypes" />
      <Input />
    </div>
  </Tile>
</div>
