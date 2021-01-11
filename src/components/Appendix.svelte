<script>
  import { appendix } from 'constants'
</script>

<style lang="scss">
  @import 'src/style/root.scss';

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
  <p>{appendix.method}</p>
  <span class="title">Quellen</span>
  {#each appendix.sources as source}<a href={source[1]}>{source[0]}</a>{/each}
</div>
