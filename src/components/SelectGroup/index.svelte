<script>
  import Item from './item.svelte'
  import Intro from './intro.svelte'
  export let data
  export let isType
  export let last

  const { title, subtitle, hasIntro, elements } = data
</script>

<style lang="scss">
  .container {
    margin-bottom: 30px;

    &.last {
      margin-bottom: 0px;
    }
  }

  .wrapper {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
</style>

<div class="container {last ? 'last' : ''}">
  {#if hasIntro}
    <Intro {title} {subtitle} />
  {/if}
  <ol class="wrapper">
    {#each elements as elm}
      <Item
        label={elm.label}
        value={elm.value}
        iconExtra={elm.iconExtra ? elm.iconExtra : false}
        {isType}
        icon={elm.icon}
        isHTML={elm.isHTML} />
    {/each}
  </ol>
</div>
