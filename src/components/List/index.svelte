<script>
  import { items } from "content";
</script>

<style>
</style>

<div id="list-items" class="wrapperItems">
  {#each items as item}
    <div>
      <p>{item.paragraph}</p>
    </div>
  {/each}
</div>
