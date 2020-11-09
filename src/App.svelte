<script>
  import Vis from "components/Vis/index.svelte";
  import List from "components/List/index.svelte";
  import Article from "components/Article/index.svelte";
</script>

<style>
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: var(--color-main);
  }

  main {
    max-width: 100%;
    display: flex;
    flex-direction: column;
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
  <main>
    <Vis />
    <Article />
  </main>
</div>
