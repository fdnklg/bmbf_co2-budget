<script>
  import search from "../../icons/search.svg";
  import valid from "../../icons/valid.svg";
  import invalid from "../../icons/invalid.svg";

  import bike from "../../icons/bike.svg";
  import publ from "../../icons/public.svg";
  import ecar from "../../icons/ecar.svg";
  import car from "../../icons/car.svg";
  import car_mf from "../../icons/car_mf.svg";
  import arrow_down from "../../icons/arrow_down.svg";

  export let name = "search";

  const icons = {
    search,
    valid,
    invalid,
    bike,
    public: publ,
    ecar,
    car,
    car_mf,
    arrow_down,
  };
</script>

<style lang="scss">
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<span class="icon {name}">
  {@html icons[name]}
</span>
