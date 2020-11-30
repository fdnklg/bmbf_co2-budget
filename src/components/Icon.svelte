<script>
  import search from "../../icons/search.svg";
  import valid from "../../icons/valid.svg";
  import invalid from "../../icons/invalid.svg";

  export let name = "search";

  const icons = {
    search,
    valid,
    invalid,
  };

  console.log(name);
</script>

<style>
</style>

<span class="icon {name}">
  {@html icons[name]}
</span>
