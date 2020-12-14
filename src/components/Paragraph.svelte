<script>
  export let text;
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .article-item {
    transform: translateZ(0);
    background-color: $color-light;
    max-width: $size-content;
    margin: 50px auto;
    padding: 20px;
    @include box-shadow;
  }
</style>

<div class="article-item">{text}</div>
