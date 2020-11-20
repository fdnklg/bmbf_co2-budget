<script>
  import { activeColor, zipcodes } from "stores";

  $: isValid = true;

  let zip;
  const validate = (e) => {
    const value = zip.value;
    isValid = $zipcodes.includes(value);
    console.log(isValid, value);
  };
</script>

<style lang="scss">
  .form {
    display: flex;
    outline: none;
    background-color: none;
    flex-direction: column;
    box-shadow: none;
  }

  .error {
    font-size: var(--font-size-s);
    line-height: var(--line-height-m);
  }

  .form {
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    padding: 15px;

    label {
      font-size: var(--font-size-s);
      letter-spacing: var(--spacing-l);
      line-height: var(--line-height-m);
      opacity: 0.5;
      color: white;
    }

    button {
      position: absolute;
      right: 15px;
      top: 20px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background-color: white;
      border: 0px solid transparent;
    }
  }

  .zipInput {
    background-color: transparent;
    border: 0px solid transparent;
    margin: 0;
    padding: 0;
    color: white;

    &::placeholder {
      color: white;
    }
  }
</style>

<div>
  <form style="background-color: {$activeColor}" class="form">
    <label for="zipcode">Postleitzahl</label>
    <input
      id="zipcode"
      bind:this={zip}
      on:click={(event) => {
        console.log(event);
        event.preventDefault();
        console.log('click');
      }}
      placeholder="z.B. 10115 (Berlin)"
      class="zipInput" />
    <button type="button" value="Submit" on:click={validate}>v</button>
  </form>
  {#if !isValid}
    <p class="error">
      Die eingegebene Postleitzahl ist ungültig. Bitte versuche erneut eine
      <strong>deine Postleitzahl</strong>
      einzugeben.
    </p>
  {/if}
</div>
