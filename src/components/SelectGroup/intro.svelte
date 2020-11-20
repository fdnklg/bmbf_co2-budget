<script>
  export let title;
  export let subtitle;
</script>

<style>
  .title {
    font-size: var(--font-size-xl);
  }

  .subtitle {
    font-size: var(--font-sizes-s);
  }
</style>

<div class="intro">
  <h2 class="title">{title}</h2>
  <span class="subtitle">{subtitle}</span>
</div>
