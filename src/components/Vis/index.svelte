<script>
  import Map from "components/Map/index.svelte";
</script>

<style>
  .vis {
    align-items: center;
    justify-content: center;
    height: 50vh;
    position: sticky;
    top: 0;
  }
</style>

<div class="vis">
  <Map lat={35} lon={-84} zoom={3.5} />
</div>
