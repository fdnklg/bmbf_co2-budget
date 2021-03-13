<script>
  export let anchorId
</script>

<style>
  .anchor {
    height: 30px;
  }
</style>

<div class="anchor" id="anchor-{anchorId}">
  <slot />
</div>
