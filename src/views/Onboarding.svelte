<script>
  import SelectGroup from 'components/SelectGroup/index.svelte'
  import Input from 'components/Input.svelte'
  import Tile from 'components/Tile.svelte'
  import Intro from 'components/SelectGroup/intro.svelte'

  import { travelTypes, distances } from 'config'
  import { getDocumentHeight } from 'utils'

  const inputClass = 'onboarding-input'

  window.onscroll = function (ev) {
    const documentHeight = getDocumentHeight()
    if (window.innerHeight + window.scrollY >= documentHeight) {
      const inputNode = document.querySelector(`.${inputClass}`)
      const hintNode = document.querySelector(`.input-hint`)

      inputNode.classList.add('blink')
      hintNode.classList.add('visible')
      hintNode.classList.add('highlight')

      setTimeout(() => {
        inputNode.classList.remove('blink')
      }, 300)

      setTimeout(() => {
        hintNode.classList.remove('highlight')
      }, 300)
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    margin: auto;
    margin-bottom: 100px;

    @include respond-max-screen-phablet {
      width: calc(100% - 40px);
    }
  }

  .wrapper {
    width: 100%;
  }
</style>

<div class="onboarding container">
  <Tile large={true} active={true}>
    <div class="wrapper">
      <SelectGroup data={travelTypes} isType="travelTypes" />
      <SelectGroup data={distances} isType="distances" />
      <Intro
        subtitleClassname="input-hint"
        title="In welchem Raum bist du unterwegs?"
        subtitle="Gib deine Postleitzahl ein und bestätige. <br/> Oder fahre mit einer zufälligen
      Postleitzahl fort." />
      <Input className={inputClass} />
    </div>
  </Tile>
</div>
