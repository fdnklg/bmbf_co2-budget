<script>
  export let text
  export let url
  export let hashtags
  export let via
  export let related

  $: query = [
    text && `text=${encodeURIComponent(text)}`,
    url && `url=${encodeURIComponent(url)}`,
    hashtags && `hashtags=${hashtags}`,
    via && `via=${encodeURIComponent(via)}`,
    related && `related=${encodeURIComponent(related)}`,
  ]
    .filter(Boolean)
    .join('&')

  $: href = `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`

  function open(e) {
    e.preventDefault()

    const w = 600
    const h = 400
    const x = (screen.width - w) / 2
    const y = (screen.height - h) / 2
    const features = `width=${w},height=${h},left=${x},top=${y}`

    window.open(href, '_blank', features)
  }
</script>

<style lang="scss">
</style>

<a target="_blank" noreferrer {href} on:click={open}>
  <slot />
</a>
