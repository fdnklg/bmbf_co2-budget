<script>
  import * as animateScroll from 'svelte-scrollto'
  import { activeAnchor, userInput } from 'stores'
  import { navItems } from 'config'

  animateScroll.setGlobalOptions({
    offset: 200,
    duration: 750,
  })

  function isVisible(step) {
    return ![
      'start',
      '3.1',
      '3.2',
      '3.3',
      '3.4',
      '3.5',
      '3.6',
      'appendix',
    ].includes(step)
  }

  function hasNoPointerEvents(userInput, itemStep) {
    if (!userInput) {
      if (
        ['4.0', 'end', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6'].includes(
          itemStep
        )
      ) {
        return 'disabled'
      }
    }
  }

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
    display: none;
    left: 25px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border-radius: 3px;
    padding: 10px;
    z-index: 10;

    @include respond-min-screen-large {
      &.isVisible {
        display: block;
      }
    }

    .disabled {
      pointer-events: none;
      color: $color-main-20;
    }

    ul {
      padding-left: 7px;
      margin-bottom: 10px;
    }
  }

  .nav-item {
    text-transform: uppercase;
    font-size: $font-size-xxs;
    letter-spacing: $letter-spacing-m;
    color: $color-main-40;
    list-style: none;
    cursor: pointer;

    &.sub {
      text-transform: unset;
      font-size: $font-size-xs;
      letter-spacing: 0px;
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

<div class="nav {isVisible($activeAnchor) ? 'isVisible' : ''}">
  <ul>
    {#each navItems as navItem}
      <li
        class="nav-item {$activeAnchor == navItem.id ? 'active' : ''} {hasNoPointerEvents($userInput, navItem.id)}"
        data-id={navItem.id}
        on:click={(e) => handleClick(e, navItem.offsetY)}>
        {navItem.label}
      </li>
      {#if navItem.items}
        <ul>
          {#each navItem.items as navSubItem}
            <li
              class="nav-item sub {$activeAnchor == navSubItem.id ? 'active' : ''} {hasNoPointerEvents($userInput, navSubItem.id)}"
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
