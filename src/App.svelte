<script>
  import Map from "./components/Map/index.svelte";
  export let name;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    height: calc(100% - 2em);
    width: calc(100% - 2em);
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Map lat={35} lon={-84} zoom={3.5} />
</main>
