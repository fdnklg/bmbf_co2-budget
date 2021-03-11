<script>
  import { appendix } from 'constants'

  const logos = [
    {
      url: '/data/BMBF_Logo.svg',
      alt: 'Link zum Code auf Github',
      maxWidth: '153px',
      height: '77px',
      text:
        'Gefördert durch das <a target="_blank" href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a> zu finden.',
      width: '100%',
    },
    {
      url: '/data/github.png',
      alt: 'Link zum Code auf Github',
      maxWidth: '65px',
      text:
        'Der Code zum Projekt ist auf <a target="_blank" href="https://github.com/">GitHub</a> zu finden.',
      width: 'calc(50% - 1em)',
    },
    {
      url: '/data/vislab@2x.jpg',
      alt: 'Link zum Code auf Github',
      maxWidth: '75px',
      text:
        'Ein Projekt von <a target="_blank" href="https://vislab.io">Vislab.io</a> als Teil des Forschungsvorhaben LoCobSS.',
      width: '50%',
    },
  ]
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .container {
    width: 100%;
    padding-top: 50px;
    border-top: 1px solid $color-main-20;
    margin: 100px 0;
  }

  .item-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 0 30px 0;
  }

  .item-text {
    margin: 15px 0 0 0;
  }

  .logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .appendix {
    max-width: 720px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 150%;
    font-size: $font-size-xs;
    color: $color-main-60;
    margin: auto;
  }

  .row {
    width: calc(50% - 1em);

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }

  .title {
    letter-spacing: $letter-spacing-s;
    font-family: $font-bold;
    color: $color-main;
  }

  .partners {
    display: table;
  }

  .partners > div {
    display: table-row;
  }

  .partners > div > div {
    display: table-cell;
    vertical-align: middle;
  }

  .partners img {
    max-width: 200px;
    width: 80%;
  }
</style>

<div class="container">
  <div class="appendix">
    <div class="row">
      <h3 class="title">Methodik</h3>
      {@html appendix.method}
    </div>
    <div class="row">
      <h3 class="title">Das Projekt</h3>
      <div class="logos">
        {#each logos as item}
          <div class="item-wrapper" style="width: {item.width};">
            <img
              src={item.url}
              alt={item.alt}
              style="max-width: {item.maxWidth}; height: {item.height}" />
            <span class="item-text">{@html item.text}</span>
          </div>
        {/each}
      </div>
      <div class="sources">
        <h3 class="title">Quellen</h3>
        <ul>
          {#each appendix.sources as source}
            <li>
              <a href={source[0]}>{@html source[1]}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- <div class="appendix">
  <div class="partners">
    <div>
      <div>
        <span>Ein Projekt von:</span><br />
        <a href="https://www.vislab.io"><img
            style="margin-top:5px; margin-bottom:2px;"
            src="/data/vislab@2x.jpg"
            alt="VISLAB.io" /></a><br />
        Als Teil des Forschungsvorhaben
        <strong>LoCobSS</strong>.
      </div>
      <div>
        <img
          src="/data/bmbf@x2.jpg"
          alt="Gefördert vom Bundesministerium für Bildung und Forschung" />
      </div>
    </div>
  </div>
  <div>
    <div>
      <div
        style="width:100%; text-align:center; margin-bottom:20px; margin-top:30px;">
        <span>Public Money &raquo; Public Code</span><br />
        <a href=""><img
            style="max-width:120px; margin-top:5px;"
            src="/data/github.png"
            alt="GitHub" /></a>
      </div>
    </div>
  </div>
  <span class="title">Methodik</span>
  <p class="method">
    {@html appendix.method}
  </p>
  <span class="title">Quellen</span>
  {#each appendix.sources as source}
    <a class="source" href={source[0]}>{@html source[1]}</a>
  {/each}
</div> -->
