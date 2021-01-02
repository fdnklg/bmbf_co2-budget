<script>
  import search from '../../icons/search.svg'
  import valid from '../../icons/valid.svg'
  import invalid from '../../icons/invalid.svg'

  import bike from '../../icons/bike.svg'
  import publ from '../../icons/public.svg'
  import ecar from '../../icons/ecar.svg'
  import ecar_extra from '../../icons/ecar_extra.svg'
  import car from '../../icons/car.svg'
  import car_mf from '../../icons/car_mf.svg'
  import car_mf_extra from '../../icons/car_mf_extra.svg'
  import arrow_down from '../../icons/arrow_down.svg'
  import twitter from '../../icons/twitter.svg'
  import facebook from '../../icons/facebook.svg'

  export let name = 'search'

  const icons = {
    search,
    valid,
    twitter,
    facebook,
    invalid,
    bike,
    public: publ,
    ecar,
    ecar_extra,
    car,
    car_mf,
    car_mf_extra,
    arrow_down,
  }
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
