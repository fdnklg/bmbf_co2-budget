<script>
  import { travelType, distance, travelTypeRides } from 'stores'
  import Icon from 'components/Icon.svelte'

  export let label
  export let value
  export let icon
  export let isHTML
  export let isType
  export let iconExtra

  $: isActive = (isType, value) => {
    if (isType === 'distances') return value === $distance
    if (isType === 'travelTypes') return value === $travelType
    if (isType === 'travelTypeRides') return value === $travelTypeRides
  }

  const handleClick = (isType, value) => {
    if (isType === 'distances') distance.set(value)
    if (isType === 'travelTypes') travelType.set(value)
    if (isType === 'travelTypeRides') travelTypeRides.set(value)
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .item {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.125s ease-in-out;

    &:hover {
      .label {
        color: $color-main;
      }

      .icon {
        border: 2px solid $color-main-40;
      }
    }

    &.active {
      .label {
        color: $color-main;
      }

      .icon {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.125);
        border: 2px solid $color-main;
      }
    }
  }
  .icon {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid $color-main-20;
    background-color: white;
    transition: all 0.125s ease-in-out;

    &.small {
      position: absolute;
      top: -10px;
      right: 0px;
      width: 26px;
      height: 26px;
      background: white;
      border-radius: 100%;
      border: 2px solid $color-main-20;

      &.active {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.125);
        border: 2px solid $color-main;
      }
    }
  }

  .value {
    font-size: $font-size-m;
    font-family: 'Post Grotesk Bold';
    color: $color-main;
    line-height: 100%;
  }

  .metric {
    color: $color-main-40;
    font-size: $font-size-xs;
    line-height: 100%;
  }

  .label {
    font-size: $font-size-xs;
    width: 80px;
    margin-top: 10px;
    color: $color-main-40;
    line-height: $line-height-s;
    text-align: center;
    transition: all 0.125s ease-in-out;

    &.active {
      color: $color-main;
      font-family: $font-bold;
    }

    @include respond-max-screen-phablet {
      width: 67px;
    }
  }
</style>

<li
  class="item {isActive(isType, value) ? 'active' : ''}"
  on:click={() => handleClick(isType, value)}>
  <div class="icon {isType} {value}">
    {#if isType === 'distances'}
      <span class="value">{value}</span>
      <span class="metric">km</span>
    {/if}
    {#if isType === 'travelTypes' || isType === 'travelTypeRides'}
      <Icon name={value} />
    {/if}
  </div>
  {#if iconExtra}
    <div class="icon small {value} {isActive(isType, value) ? 'active' : ''}">
      <Icon name={iconExtra} />
    </div>
  {/if}
  <span
    class="label {isActive(isType, value) ? 'active' : ''}">{@html label}</span>
</li>
