<script>
  export let data = { source: { label: "", url: "" } };
</script>

<style lang="scss">
  @import "src/style/root.scss";

  .footer {
    padding-bottom: 0.5em;
  }
  .source-label {
    font-size: $font-size-xs;
    color: $color-main-60;
  }
</style>

<div class="footer">
  <span class="source-label"> Quelle:</span>
  <a class="source" href={data.source.url}>{data.source.label}</a>
</div>
