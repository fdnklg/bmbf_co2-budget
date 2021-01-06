<script>
  import Icon from 'components/Icon.svelte'
  import TwitterShare from 'components/TwitterShare.svelte'

  const Icons = [
    {
      name: 'twitter',
      text: 'Der Text zum Projekt',
      url: 'https://fabiandinklage.com',
    },
    {
      name: 'facebook',
      url: 'https://fabiandinklage.com',
    },
  ]
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .container {
    position: fixed;
    display: flex;
    top: $space-l;
    right: $space-l;
    align-items: center;
  }

  .label {
    padding-right: 5px;
  }

  .icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    background-color: $color-main;
    margin-left: 10px;

    &:hover {
      background-color: $color-main-60;
      @include transition-s;
    }
  }
</style>

<div class="social container">
  <span class="label">Teilen</span>
  {#each Icons as d}
    <TwitterShare type={d.name} text={d.text} url={d.url} via={d.via}>
      <div class="icon">
        <Icon name={d.name} />
      </div>
    </TwitterShare>
  {/each}
</div>
