<script>
  import * as animateScroll from 'svelte-scrollto'
  import { onMount } from 'svelte'
  import {
    zipcodes,
    data,
    userInput,
    activeAnchor,
    activeZipcode,
  } from 'stores'

  import Button from 'components/Button.svelte'

  import datasets from 'data'
  let step

  import {
    parseDataEmissionen,
    parseDataSektoren,
    parseDataSzenarien,
    loadFile,
  } from 'utils'

  import { zipcodesUrl, sektorenUrl, airportsUrl, metadata } from 'config'
  import { steps } from 'constants'

  import Meta from 'components/Meta.svelte'
  import Header from 'components/Header/index.svelte'
  import Title from 'components/Title.svelte'
  import Section from 'components/Section.svelte'
  import Navigation from 'components/Navigation/index.svelte'
  import Anchor from 'components/Navigation/Anchor.svelte'
  import IntersectionObserver from 'components/Intersectionobserver.svelte'
  import Share from 'components/Share.svelte'
  import Appendix from 'components/Appendix.svelte'

  import Emissionen from 'views/Emissionen.svelte'
  import Sektoren from 'views/Sektoren.svelte'
  import Onboarding from 'views/Onboarding.svelte'
  import Szenarien from 'views/Szenarien.svelte'
  import Flughaefen from 'views/Flughaefen.svelte'

  function handleActiveStep(e) {
    step = e.detail
    activeAnchor.set(e.detail)
  }

  function scrollToOnboarding() {
    animateScroll.scrollTo({
      element: `[id='anchor-3.0']`,
      offset: 0,
    })
  }

  onMount(async () => {
    let parsed = {}
    const codes = await loadFile(zipcodesUrl)
    const sektoren = await loadFile(sektorenUrl, ';')
    const airports = await loadFile(airportsUrl, ',')

    const randomZipcode = parseInt(
      codes.columns[parseInt(codes.columns.length * Math.random())]
    )
    activeZipcode.set(randomZipcode)

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
    .disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    .sticky {
      position: sticky;
      top: 25%;
    }
  }
  .container {
    width: 100vw;
    max-width: 100%;
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
  <Meta meta={metadata} />
  <Header />
  <Navigation />

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.start}>
    <Anchor anchorId={steps.start} />
    <Section>
      Unser gemeinsamer Austoß an Treibhausgasen ist einer der Haupt&shy;treiber
      des globalen Klimawandels. Der Großteil entfällt dabei auf
      CO2-Emmissionen.

      <br />
      <br />

      Auf viele Formen der CO2-Produktion haben wir, als Bürger*innen, nur
      indirekten Einfluss, z.B. durch unsere Kaufentscheidungen. Bei der
      Mobilität ist dies anders. Durch die Wahl unserer Verkehrsmittel und
      unsere Gewohnheiten können wir einen direkten Beitrag leisten.
    </Section>
  </IntersectionObserver>

  <Title>Wieviel CO2 verursachen wir durch unsere Mobilität?</Title>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.emissionen}>
    <Anchor anchorId={steps.emissionen} />
    <Emissionen />
  </IntersectionObserver>

  <Section>
    Der große Anteil der PKWs an der CO2-Produktion im Bereich Verkehr legt
    nahe, dass es hier ein großes Potential für Einsparungen gibt, die wir
    Bürger*innen direkt Beeinflussen können.
  </Section>

  <Title>Verkehrs-Emissionen steigen weiter</Title>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.sektoren}>
    <Anchor anchorId={steps.sektoren} />
    <Sektoren />
  </IntersectionObserver>

  <Section>
    Unser persönlicher Fußabdruck wird meistens in Tonnen oder Kilogramm CO2
    umschrieben. Doch solche Angaben sind wenig hilfreich wenn wir verstehen
    wollen, was z.B. die Ziele der CO2-Reduktion im Kampf gegen den Klimawandel
    für uns im Alltag bedeuten.<br /><br />
    Deshalb haben wir ein Werkzeug entwickelt, um CO2-Fußabdrücke in
    Bewegungsprofile zu übersetzen. Im folgenden kannst du dir dies auf dich
    persönlich zugeschnitten anzeigen lassen.<br /><br />
    <strong>Privatsphäre geht vor:</strong>
    <i>Die von dir hier angegebenen Information werden von uns nicht
      gespeichert. Diese Seite nutzt keine Cookie- oder Tracking-Technologien.</i>
  </Section>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.szenarien}>
    <Anchor anchorId={steps.szenarien} />
    <Onboarding />
  </IntersectionObserver>

  {#if $userInput}
    <Szenarien />
    <Section>
      Neben dem alltäglichen Verkehr, reisen viele von uns aber auch immer
      wieder mit dem Flugzeug. Flugreisen, gerade Langstrecken, produzieren
      unglaublich viel CO2. In der folgenden Ansicht wird der CO2-Fußabdruck
      einer Flugreise in Bezug zu Zug- und Autoreisen gestellt.<br /><br />
      <small>Beim alltäglichen Verkehr haben wir Flugreisen außenvor gelassen,
        da dies extrem viel über dem deutschen Durchschnitt liegt.</small>
    </Section>

    <IntersectionObserver
      on:step={handleActiveStep}
      bind:step={steps.flughaefen}>
      <Anchor anchorId={steps.flughaefen} />
      <Flughaefen />
    </IntersectionObserver>

    <Section>
      <Title>Gemeinsam ans Ziel</Title>
      Im Bereich Mobilität kann jeder von uns einen Beitrag zur Rettung des
      Klimas beitragen. Manche von uns sind auf ein Auto aus beruflichen oder
      gesundheitlichen Gründen angewiesen. Umso wichtiger ist es, dass
      diejenigen die einen Beitrag leisten können, dies auch tun.<br /><br />

      <p>Weitere Mobilitätsprofile ausprobieren:</p>
      <Button primary={true} handleClick={scrollToOnboarding}>
        Zur Auswahl
      </Button>
    </Section>

    <Share />
    <Section>
      <Appendix />
    </Section>
  {/if}
</div>
