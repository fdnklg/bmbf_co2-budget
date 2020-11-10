<script>
  import List from "components/List/index.svelte";
  import Main from "components/Main/index.svelte";
</script>

<style>
  .container {
    height: auto;
    max-width: 550px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: var(--color-main);
  }

  .intro {
    padding: 0 var(--space-m);
  }
</style>

<div class="container">
  <header>
    <!-- intro and teaser here -->
    <div
      style="height: 100vh; display: flex; justify-content: center; align-items: center; border: 1px solid black;">
      <span>Teaser</span>
    </div>
  </header>
  <section class="intro">
    <List />
  </section>
  <Main />
</div>
