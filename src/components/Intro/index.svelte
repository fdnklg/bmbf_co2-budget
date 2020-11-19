<script>
  import { items } from "content";
</script>

<style>
  .intro {
    padding: 0 var(--space-m);
  }
</style>

<section class="intro">
  <div id="list-items" class="wrapperItems">
    {#each items as item}
      <div>
        <p>{item.paragraph}</p>
      </div>
    {/each}
  </div>
</section>
