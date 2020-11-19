<script>
  import { onMount } from "svelte";

  import datasets from "data";
  import { data } from "stores";

  import { parseData } from "utils";

  import Main from "components/Main/index.svelte";
  import Intro from "components/Intro/index.svelte";
  import Header from "components/Header/index.svelte";

  onMount(async () => {
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
