<script>
  import { afterUpdate, createEventDispatcher } from 'svelte'

  export let selected
  export let items
  export let event = 'select'
  const dispatch = createEventDispatcher()

  $: value = selected ? selected.id : 'none'

  afterUpdate(() => {
    console.log(value, selected)
    dispatch(event, value)
  })
</script>

<style lang="scss">
  .select {
    select {
      width: 100%;
    }
  }
</style>

<div class="select">
  <select bind:value>
    {#each items as item}
      <option value={item.id} selected={value === item.id}>{item.name}</option>
    {/each}
  </select>
</div>
