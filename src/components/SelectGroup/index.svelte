<script>
  import Item from "./item.svelte";
  export let data;
  export let isType;

  const { title, subtitle, hasIntro, elements } = data;
</script>

<style>
  .container {
  }

  .wrapper {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
  }

  .title {
    font-size: var(--font-size-xl);
  }

  .subtitle {
    font-size: var(--font-sizes-s);
  }
</style>

<div class="container">
  {#if hasIntro}
    <div class="intro">
      <h2 class="title">{title}</h2>
      <span class="subtitle">{subtitle}</span>
    </div>
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
