<script>
  import { appendix } from 'constants'
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .title {
    margin-bottom: 1px;
    letter-spacing: $letter-spacing-s;
    // font-family: 'Post Grotesk Bold';
  }

  .method {
    margin-top: 0px;
  }

  .appendix {
    display: flex;
    flex-direction: column;
    line-height: 150%;
    color: $color-main-60;
    font-size: $font-size-xs;
  }
</style>

<div class="appendix">
  <span class="title">Methodik</span>
  <p class="method">{appendix.method}</p>
  <span class="title">Quellen</span>
  {#each appendix.sources as source}
    <a class="source" href={source[0]}>{source[1]}</a>
  {/each}
</div>
