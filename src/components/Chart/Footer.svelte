<script>
  export let data;
</script>

<style>
  .source-label {
    font-size: var(--font-size-s);
    color: var(--color-grey-0);
  }
</style>

<div class="footer">
  <span class="source-label"> Quelle:</span>
  {@html data.src}
</div>
