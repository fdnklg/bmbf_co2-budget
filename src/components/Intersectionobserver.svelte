<script>
  import { onMount } from "svelte";

  export let once = false;
  export let top = 0;
  export let bottom = 0;
  export let left = 0;
  export let right = 0;

  let isRatioSmaller = false;
  let isScrollingUp;
  let prevY;
  let isEnter;
  let isYSmaller = false;
  let prevRatio = null;
  let intersecting = false;
  let container;

  onMount(() => {
    if (typeof IntersectionObserver !== "undefined") {
      const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          intersecting = entry.isIntersecting;

          isRatioSmaller = entry.intersectionRatio < prevRatio ? true : false;
          isYSmaller = entry.boundingClientRect.y < prevY ? true : false;

          // Scrolling down/up
          if (isYSmaller) {
            if (!isRatioSmaller) {
              isEnter = true;
              isScrollingUp = false;
            } else {
              isEnter = false;
              isScrollingUp = false;
            }
          } else if (!isYSmaller) {
            if (isRatioSmaller) {
              isScrollingUp = true;
              isEnter = false;
            } else {
              isEnter = true;
              isScrollingUp = true;
            }
          }

          if (intersecting && once) {
            observer.unobserve(container);
          }

          prevRatio = entries[0].intersectionRatio;
          prevY = entry.boundingClientRect.y;
        },
        {
          rootMargin,
        }
      );

      observer.observe(container);
      return () => observer.unobserve(container);
    }

    function handler() {
      const bcr = container.getBoundingClientRect();
      intersecting =
        bcr.bottom + bottom > 0 &&
        bcr.right + right > 0 &&
        bcr.top - top < window.innerHeight &&
        bcr.left - left < window.innerWidth;

      if (intersecting && once) {
        window.removeEventListener("scroll", handler);
      }
    }

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  });
</script>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<div bind:this={container}>
  <slot {isScrollingUp} {isEnter} {intersecting} />
</div>
