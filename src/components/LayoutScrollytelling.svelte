<script>
</script>

<style>
  .layout-scrollytelling {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="layout-scrollytelling">
  <div class="column">
    <slot name="vis" />
  </div>
  <div class="column">
    <slot name="text" />
  </div>
</div>
