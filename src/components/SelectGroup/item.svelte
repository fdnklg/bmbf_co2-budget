<script>
  import { travelType, distance, activeColor } from "stores";
  import Icon from "components/Icon.svelte";

  export let label;
  export let value;
  export let icon;
  export let isHTML;
  export let isType;
  export let iconExtra;

  $: isActive = (isType, value) => {
    if (isType === "distances") return value === $distance;
    if (isType === "transportTypes") return value === $travelType;
  };

  const handleClick = (isType, value) => {
    if (isType === "distances") distance.set(value);
    if (isType === "transportTypes") travelType.set(value);
  };
</script>

<style lang="scss">
  @import "src/style/root.scss";
  .item {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
  }
  .icon {
    width: 54px;
    height: 54px;
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
    }
  }

  .active {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border: 2px solid $color-main;
    &.car {
      border-color: $color-car;
    }
    &.ecar {
      border-color: $color-ecar;
    }
    &.car_mf {
      border-color: $color-car_mf;
    }
    &.public {
      border-color: $color-public;
    }
    &.bike {
      border-color: $color-bike;
    }
  }

  .value {
    font-size: $font-size-l;
    font-family: "Post Grotesk Bold";
    color: $color-main;
  }

  .metric {
    color: $color-main-40;
    line-height: 120%;
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
    {#if isType === 'transportTypes'}
      <Icon name={value} />
    {/if}
  </div>
  {#if iconExtra}
    <div class="icon small {value} {isActive(isType, value) ? 'active' : ''}">
      <Icon name={iconExtra} />
    </div>
  {/if}
  <span class="label">{label}</span>
</li>
