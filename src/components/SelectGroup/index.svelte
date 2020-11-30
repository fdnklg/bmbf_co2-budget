<script>
  import Item from "./item.svelte";
  import Intro from "./intro.svelte";
  export let data;
  export let isType;

  const { title, subtitle, hasIntro, elements } = data;
</script>

<style>
  .container {
    margin-bottom: 20px;
  }

  .wrapper {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }
</style>

<div class="container">
  {#if hasIntro}
    <Intro {title} {subtitle} />
  {/if}
  <ol class="wrapper">
    {#each elements as elm}
      <Item
        label={elm.label}
        value={elm.value}
        {isType}
        icon={elm.icon}
        isHTML={elm.isHTML} />
    {/each}
  </ol>
</div>
