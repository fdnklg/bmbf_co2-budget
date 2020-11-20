<script>
  import { activeColor } from "stores";

  let zip;
  const validate = (e) => {
    const value = zip.value;
  };
</script>

<style>
  .form {
    display: flex;
    outline: none;
    background-color: none;
    flex-direction: column;
    box-shadow: none;
  }
</style>

<form style="background-color: {$activeColor}" class="form">
  <input bind:this={zip} class="zip" />
  <button type="button" value="Submit" on:click={validate} />
</form>
