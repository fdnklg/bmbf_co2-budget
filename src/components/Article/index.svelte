<script>
  import { onMount, afterUpdate } from "svelte";
  import { activeVisItem } from "stores";
  import { items } from "content";

  const getId = (string) => {
    return string.match(/(?:-)(\d+)$/)[1]; // match number after last - (dash)
  };

  const observe = (target, activeVisItem) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const articleId = getId(entries[0].target.id);
          activeVisItem.set(parseInt(articleId));
        }
      },
      {
        threshold: [0.9],
        delay: 100,
        trackVisibility: true,
      }
    );
    return observer.observe(target, activeVisItem);
  };

  onMount(async () => {
    const articleItems = document.querySelectorAll(".article-item");
    const articlesWrapper = document.getElementById("articles-wrapper");

    Array.from(articleItems).forEach((article) => {
      observe(article, activeVisItem);
    });
  });

  afterUpdate(() => {
    console.log($activeVisItem);
  });
</script>

<style>
  article {
    padding: 0 var(--space-m);
  }
</style>

<article id="articles-wrapper">
  {#each items as item, index}
    <div class="article-item" id={`article-item-${index}`}>
      <h2>{item.headline}</h2>
      <p>{item.paragraph}</p>
    </div>
  {/each}
</article>
