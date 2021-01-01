<script>
  import * as animateScroll from 'svelte-scrollto'
  import { activeAnchor } from 'stores'
  import { navItems } from 'config'
  import { afterUpdate } from 'svelte'

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
    console.log(
      event.target.dataset.id,
      $activeAnchor,
      $activeAnchor === event.target.dataset.id
    )
    switch (id) {
      case 'start':
        animateScroll.scrollToTop()
        break
      case 'end':
        animateScroll.scrollToBottom()
        break
      default:
        animateScroll.scrollTo({
          element: `[id='anchor-${id}']`,
          offset: offsetY,
        })
        break
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .nav {
    position: fixed;
    left: 25px;
    top: 40vh;
    z-index: 1000;

    ul {
      padding-left: 7px;
      margin-bottom: 10px;
    }
  }

  .nav-item {
    font-family: 'Post Grotesk Bold';
    color: $color-main-40;
    list-style: none;
    cursor: pointer;

    &.sub {
      font-family: 'Post Grotesk Regular';
    }

    &:hover {
      color: $color-main-60;
    }

    &.active {
      color: $color-main;
      @include transition-s;
    }
  }
</style>

<div class="nav">
  <ul>
    {#each navItems as navItem}
      <li
        class="nav-item {$activeAnchor == navItem.id ? 'active' : ''}"
        data-id={navItem.id}
        on:click={(e) => handleClick(e, navItem.offsetY)}>
        {navItem.label}
      </li>
      {#if navItem.items}
        <ul>
          {#each navItem.items as navSubItem}
            <li
              class="nav-item sub {$activeAnchor == navSubItem.id ? 'active' : ''}"
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
