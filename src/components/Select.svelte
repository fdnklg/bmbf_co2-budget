<script>
  export let selected
  export let items
</script>

<style lang="scss">
  .select {
    position: relative;
    margin-top: 5px;
    select {
      width: 100%;
    }
  }
</style>

<div class="select">
  <select bind:value={selected}>
    {#each items as item}
      <option value={item.id}>{item.name}</option>
    {/each}
  </select>
</div>
