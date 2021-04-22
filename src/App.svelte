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

  import {
    parseDataEmissionen,
    parseDataSektoren,
    parseDataSzenarien,
    loadFile,
  } from 'utils'

  import { zipcodesUrl, sektorenUrl, airportsUrl } from 'config'
  import { steps } from 'constants'

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

  .title-wrapper {
    width: calc(100% - 2em);
    margin: auto;
  }
  .container {
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    color: $color-main;
    margin: 0 auto;
  }

  p.addition {
    color: $color-main-60;
    line-height: 150%;
    font-size: $font-size-xs;
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
  <Navigation />

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.start}>
    <Anchor anchorId={steps.start} />
    <Section>
      Unser Austoß an Treibhausgasen ist einer der Haupt&shy;treiber
      des globalen Klimawandels. Der Großteil entfällt dabei auf
      CO₂-Emmissionen.

      <br />
      <br />

      Auf viele Formen der CO₂-Produktion haben wir als Bürger*innen nur
      indirekten Einfluss, z.B. durch unsere Kauf- und Konsumentscheidungen. Bei der
      Mobilität ist dies anders. Durch die Wahl unserer Verkehrsmittel 
      können wir einen direkten Beitrag zur Reduktion von CO₂-Emmissionen leisten.
    </Section>
  </IntersectionObserver>

  <div class="title-wrapper">
    <Title>Wieviel CO₂ verursachen wir durch unsere Mobilität?</Title>
  </div>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.emissionen}>
    <Anchor anchorId={steps.emissionen} />
    <Emissionen />
  </IntersectionObserver>

  <Section>
    PKWs haben einen hohen Anteil an der CO₂-Produktion im Bereich Verkehr.
    Hier liegt ein großes Potenzial für Einsparungen, die wir
    Bürger*innen durch die Wahl unserer Verkehrsmittel direkt Beeinflussen können.
  </Section>

  <div class="title-wrapper">
    <Title>Verkehrsemissionen steigen weiter</Title>
  </div>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.sektoren}>
    <Anchor anchorId={steps.sektoren} />
    <Sektoren />
  </IntersectionObserver>

  <Section>
    Unser persönlicher CO₂-Fußabdruck wird meistens in Tonnen oder Kilogramm pro Person pro Jahr gemessen. 
    Doch solche Angaben sind wenig hilfreich, wenn wir verstehen
    wollen, was z.B. die auf politischer Ebene vereinbarten Ziele zur CO₂-Reduktion im Kampf gegen den Klimawandel
    für uns im Alltag bedeuten.<br /><br />
    Deshalb haben wir ein Werkzeug entwickelt, das CO₂-Fußabdrücke in
    Bewegungsprofile übersetzt. Im folgenden kannst du dir dies auf dich
    persönlich zugeschnitten anzeigen lassen.<br /><br />
    <p class="addition">
      <strong>Privatsphäre geht vor:</strong>
      Die von dir hier angegebenen Information werden von uns nicht gespeichert.
      Diese Seite nutzt keine Cookie- oder Tracking-Technologien.
    </p>
  </Section>

  <IntersectionObserver on:step={handleActiveStep} bind:step={steps.szenarien}>
    <Anchor anchorId={steps.szenarien} />
    <Onboarding />
  </IntersectionObserver>

  {#if $userInput}
    <Szenarien />
    <Section>
      Zusätzlich zum alltäglichen Verkehr reisen viele von uns regelmäßig
      mit dem Flugzeug. Flugreisen, insbesondere Langstrecken, produzieren
      unglaublich viel CO₂. In der folgenden Ansicht wird der CO₂-Fußabdruck
      einer Flugreise in Bezug zu Zug- und Autoreisen gestellt.<br /><br />
      <p class="addition">
        Beim alltäglichen Verkehr sind Flugreisen nicht inbegriffen, da
        der CO₂-Ausstoß so extrem hoch ist, dass er hier nicht abgebildet werden könnte.
      </p>
    </Section>

    <IntersectionObserver
      on:step={handleActiveStep}
      bind:step={steps.flughaefen}>
      <Anchor anchorId={steps.flughaefen} />
      <Flughaefen />
    </IntersectionObserver>

    <Section>
      <Title>Gemeinsam ans Ziel</Title>
      Natürlich ist eine Reduktion von CO₂ nicht einfach nur über eine entsprechende 
      Wahl des Verkehrsmittels möglich, denn neben Mobilität
      produzieren wir in all unseren anderen Lebensbereichen ebenfalls CO₂ und
      unser gesamter Fußabdruck wird daraus addiert. Nichtsdesto
      trotz soll dieser Artikel darauf aufmerksam machen, welchen Einfluss
      unsere Wahl beim Fortbewegungsmittel auf unseren CO₂-Fußabdruck hat und was
      das Erreichen der Klimaziele auch für unsere Mobilität bedeutet.<br /><br />
      Im Bereich Mobilität kann jede*r von uns einen Beitrag zur Rettung des
      Klimas beitragen. Manche von uns sind auf ein Auto aus beruflichen oder
      gesundheitlichen Gründen angewiesen. Umso wichtiger ist es, dass
      diejenigen, die einen Beitrag zur CO₂-Reduktion leisten können, dies auch tun.<br /><br />

      <p>Weitere Mobilitätsprofile ausprobieren:</p>
      <Button primary={true} handleClick={scrollToOnboarding}>
        Zurück zur Auswahl
      </Button>
    </Section>

    <Share />
    <IntersectionObserver on:step={handleActiveStep} bind:step={steps.appendix}>
      <Anchor anchorId={steps.appendix} />
      <Appendix />
    </IntersectionObserver>
  {/if}
</div>
