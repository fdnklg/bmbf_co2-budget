<script>
  import Isochrones from 'projects/Isochrones.svelte'
  import Maps from 'projects/Maps.svelte'

  const activeProject = 'maps'
</script>

<style lang="scss">
  @import 'src/style/root.scss';
</style>

<div>
  {#if activeProject === 'isochrones'}
    <Isochrones />
  {:else}
    <Maps />
  {/if}
</div>
