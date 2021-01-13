<script>
  import Map3D from 'components/Map3D/index.svelte'
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    position: sticky;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    top: 0;
  }
</style>

<div class="container">
  <Map3D />
</div>
