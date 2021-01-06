<script>
  import { activeColor, zipcodes, activeZipcode } from 'stores'

  import Icon from 'components/Icon.svelte'
  import ButtonSmall from 'components/ButtonSmall.svelte'

  $: isValid = true
  $: isEditing = true

  let zip

  const validate = (e) => {
    const value = zip.value
    isValid = $zipcodes.includes(value)
    isEditing = false

    if (isValid) {
      activeZipcode.set(value)
    }
  }

  const setIconName = (isValid, isEditing) => {
    if (isEditing) return 'search'
    if (!isValid) return 'invalid'
    return 'valid'
  }

  const setRandomZip = () => {
    const exampleZipCodes = [52531, 41372, 52070] // @TODO add more
    const randIndex = Math.floor(Math.random() * exampleZipCodes.length)
    zip.value = exampleZipCodes[randIndex]
    validate()
  }

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      validate()
    } else {
      isEditing = true
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .form {
    position: relative;
    height: 35px;
    display: flex;
    justify-content: center;
    padding: 10px;
    max-width: 50%;
    outline: none;
    background-color: white;
    border: 1px solid $color-main-20;
    flex-direction: column;
    box-shadow: none;
    @include transition-s;

    @include respond-max-screen-phablet {
      max-width: 100%;
    }

    label {
      font-size: $font-size-s;
      letter-spacing: $letter-spacing-s;
      line-height: $line-height-m;
      color: $color-main-60;
    }
    button {
      position: absolute;
      right: 15px;
      top: 20px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 0px solid transparent;
      @include transition-s;
    }
  }

  .error {
    font-size: $font-size-s;
    line-height: $line-height-m;
  }

  .zipInput {
    background-color: transparent;
    border: 0px solid transparent;
    margin: 0;
    padding: 0;
    color: $color-main;
    font-family: 'Post Grotesk Bold';
    font-size: $font-size-s;

    &::placeholder {
    }
  }
</style>

<div>
  <form style="background-color: {$activeColor}" class="form">
    <label for="zipcode">Postleitzahl</label>
    <input
      id="zipcode"
      bind:this={zip}
      on:keydown={handleKeydown}
      placeholder="z.B. 10115 (Berlin)"
      class="zipInput" />
    <!-- <button
      style="background-color: {$activeColor.light}"
      type="button"
      value="Submit"
      on:click={validate}>
      <Icon name={setIconName(isValid, isEditing)} />
    </button> -->
  </form>
  {#if !isValid && !isEditing}
    <p class="error">
      Die eingegebene Postleitzahl ist ungültig. Bitte versuche erneut eine
      <strong>deine Postleitzahl</strong>
      einzugeben.
    </p>
  {/if}
  <ButtonSmall handleClick={setRandomZip}>
    Wähle deutsche Beispiel-Postleitzahl.
  </ButtonSmall>
</div>
