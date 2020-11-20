<script>
  import { onMount } from "svelte";

  import datasets from "data";
  import { data, zipcodes } from "stores";

  import { parseData, loadFile } from "utils";

  import Main from "components/Main/index.svelte";
  import Intro from "components/Intro/index.svelte";
  import Header from "components/Header/index.svelte";

  /*

  Validation:

  - check if postal code is included in zip code array
  - if it's included:
    - load isocrone that match with zip code
    - zoom to location
    - show isochrone on map
  - if NOT included:
    - show feedback, that postal code doesn't exist or isn't valid and show information that tells you to type avalid germany postal code

  */

  onMount(async () => {
    const codes = await loadFile(`zipcodes.txt`);
    zipcodes.set(codes.columns);

    data.set(parseData(datasets));
  });
</script>

<style>
  .container {
    height: auto;
    max-width: 550px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: var(--color-main);
  }
</style>

<div class="container">
  <Header />
  <Intro />
  <Main />
</div>
