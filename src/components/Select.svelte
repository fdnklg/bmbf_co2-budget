<script>
  export let selected
  export let items
</script>

<style lang="scss">
  .select {
    position: relative;
    margin-top: 5px;
    &::after {
      position: absolute;
      content: '\25BC';
      right: 12px;
      transform: translateY(5px);
      font-size: 8px;
    }
    select {
      width: 100%;
      appearance: none;
    }
  }
</style>

<div class="select">
  <select bind:value={selected}>
    {#each items as item}
      <option value={item.id} selected={selected === item.id}>{item.name}</option>
    {/each}
  </select>
</div>
