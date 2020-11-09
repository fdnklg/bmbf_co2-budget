<script>
  import { onMount, afterUpdate } from "svelte";
  import { activeArticle, activeVisItem } from "stores";
  import { items } from "content";

  const getId = (string) => {
    return string.match(/(?:-)(\d+)$/)[1]; // match number after last - (dash)
  };

  const observe = (target, activeArticle) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const articleId = getId(entries[0].target.id);
          activeArticle.set(articleId);
        }
      },
      {
        threshold: [0.75],
        delay: 100,
        trackVisibility: true,
      }
    );
    return observer.observe(target, activeArticle);
  };

  onMount(async () => {
    const articleItems = document.querySelectorAll(".article-item");
    const articlesWrapper = document.getElementById("articles-wrapper");

    Array.from(articleItems).forEach((article) => {
      observe(article, activeArticle);
    });
  });

  afterUpdate(() => {
    console.log($activeArticle);
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
      <p>{item.paragraph}</p>
    </div>
  {/each}
</article>
