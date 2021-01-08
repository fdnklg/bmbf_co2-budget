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

    &.small {
      position: absolute;
      top: -10px;
      right: 0px;
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 100%;
      border: 2px solid $color-main-20;

      &.active {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
        border: 2px solid $color-main;
      }
    }
  }

  .active {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border: 2px solid $color-main;
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
    color: $color-main;
    line-height: $line-height-s;
    text-align: center;
  }
</style>

<li class="item" on:click={() => handleClick(isType, value)}>
  <div class="icon {isType} {value} {isActive(isType, value) ? 'active' : ''}">
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
  <span class="label">{@html label}</span>
</li>
