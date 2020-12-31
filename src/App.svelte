<script>
  import { onMount } from 'svelte'
  import { zipcodes, data } from 'stores'

  import datasets from 'data'

  import {
    parseDataEmissionen,
    parseDataSektoren,
    parseDataSzenarien,
    loadFile,
  } from 'utils'

  import { zipcodesUrl, sektorenUrl, airportsUrl } from 'config'

  import Header from 'components/Header/index.svelte'
  import Section from './components/Section.svelte'
  import Title from './components/Title.svelte'

  import Emissionen from 'views/Emissionen.svelte'
  import Sektoren from './views/Sektoren.svelte'
  import Onboarding from './views/Onboarding.svelte'
  import Szenarien from 'views/Szenarien.svelte'
  import Flughaefen from 'views/Flughaefen.svelte'

  onMount(async () => {
    let parsed = {}
    const codes = await loadFile(zipcodesUrl)
    const sektoren = await loadFile(sektorenUrl, ';')
    const airports = await loadFile(airportsUrl, ',')

    parsed['emissionen'] = parseDataEmissionen(datasets)
    parsed['sektoren'] = parseDataSektoren(sektoren, datasets)
    parsed['szenarien'] = parseDataSzenarien(datasets)
    parsed['airports'] = airports

    zipcodes.set(codes.columns)
    data.set(parsed)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  global {
    .sticky {
      position: sticky;
      top: 25%;
    }
  }
  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    color: $color-main;
    margin: 0 auto;
  }
  .article-item {
    transform: translateZ(0);
    background-color: $color-light;
    max-width: $size-content;
    margin: 50px auto;
    padding: 20px;
    @include box-shadow;

    @include respond-max-screen-phablet {
      max-width: 100%;
    }
  }
  .wrapper-onboarding {
    margin: 0 auto;
    width: $size-content;

    @include respond-max-screen-phablet {
      width: auto;
    }
  }

  .map {
    height: 100vh;
    margin: 50px 0;
  }
</style>

<div class="container">
  <Header />

  <Section>
    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.

    <br />
    <br />

    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat. Damit
    Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und weshalb man
    die Lust anklagt und den Schmerz lobet, so will ich Euch Alles eröffnen und
    auseinander setzen, was jener Begründer der Wahrheit und gleichsam
    Baumeister des glücklichen Lebens selbst darüber gesagt hat.
  </Section>

  <Title>Wo entstehen die meisten CO2-Emissionen?</Title>

  <Emissionen />

  <Section>
    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
  </Section>

  <Title>Die Verkehrsziele hängen hinterher</Title>

  <Sektoren />

  <Section>
    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
  </Section>

  <Onboarding />

  <Szenarien />

  <Section>
    Damit Ihr indess erkennt, woher dieser ganze Irrthum gekommen ist, und
    weshalb man die Lust anklagt und den Schmerz lobet, so will ich Euch Alles
    eröffnen und auseinander setzen, was jener Begründer der Wahrheit und
    gleichsam Baumeister des glücklichen Lebens selbst darüber gesagt hat.
  </Section>

  <Flughaefen />
</div>
