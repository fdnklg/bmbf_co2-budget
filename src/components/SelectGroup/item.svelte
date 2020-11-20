<script>
  export let label;
  export let value;
  export let icon;
  export let isHTML;
  export let isType;

  import { type, distance } from "stores";

  $: isActive = (isType, value) => {
    if (isType === "distances") return value === $distance;
    if (isType === "typesMobility") return value === $type;
  };

  const handleClick = (isType, value) => {
    if (isType === "distances") distance.set(value);
    if (isType === "typesMobility") type.set(value);
  };
</script>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    &.active {
      .icon {
        background-color: var(--color-grey-0);
      }
      .label {
        font-weight: bold;
      }
    }
  }
  .icon {
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-grey-1);
  }

  .label {
    font-size: var(--font-size-s);
  }
</style>

<li
  class="item {isActive(isType, value) ? 'active' : ''}"
  on:click={() => handleClick(isType, value)}>
  <div class="icon">
    {#if isHTML}
      {@html icon}
    {:else}<img src={icon} alt={label} />{/if}
  </div>
  <span class="label">{label}</span>
</li>
