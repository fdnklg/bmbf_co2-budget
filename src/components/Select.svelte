<script>
  import { afterUpdate, createEventDispatcher, onMount } from 'svelte'

  export let selected
  export let items
  export let event
  const dispatch = createEventDispatcher()

  $: value = 'none'

  afterUpdate(() => {
    dispatch(event, value)
  })

  onMount(() => {
    value = selected.id
  })
</script>

<style lang="scss">
  .select {
    position: relative;
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
  <select bind:value>
    {#each items as item}
      <option value={item.id} selected={value === item.id}>{item.name}</option>
    {/each}
  </select>
</div>
