<script>
  import * as animateScroll from 'svelte-scrollto'
  import { activeAnchor } from 'stores'
  import { navItems } from 'config'

  animateScroll.setGlobalOptions({
    offset: 200,
    onStart: (element, offset) => {
      console.log(element)
      if (element) {
        console.log('Start scrolling to element:', element)
      } else if (offset) {
        console.log(
          `Start scrolling to page offset: (${offset.x}, ${offset.y})`
        )
      }
    },
  })

  function handleClick(event, offsetY) {
    const id = event.target.dataset.id
    activeAnchor.set(id)
    switch (id) {
      case 'start':
        animateScroll.scrollToTop()
        break
      case 'end':
        animateScroll.scrollToBottom()
        break
      default:
        animateScroll.scrollTo({ element: `[id='${id}']`, offset: offsetY })
        break
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .nav {
    position: fixed;
    left: 10px;
    top: 40vh;
    z-index: 1000;

    ul {
      padding-left: 10px;
    }
  }

  .nav-item {
    margin-bottom: 5px;
    color: $color-main;
    list-style: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 0.75;
    }

    &.active {
      opacity: 1;
      @include transition-m;
    }
  }
</style>

<div class="nav">
  <ul>
    {#each navItems as navItem}
      <li
        class="nav-item {$activeAnchor == navItem.id ? 'active' : ''}"
        data-id={navItem.id}
        on:click={handleClick}>
        {navItem.label}
      </li>
      {#if navItem.items}
        <ul>
          {#each navItem.items as navSubItem}
            <li
              class="nav-item {$activeAnchor == navItem.id ? 'active' : ''}"
              data-id={navSubItem.id}
              on:click={(e) => handleClick(e, navSubItem.offsetY)}>
              {navSubItem.label}
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </ul>
</div>
