<script lang="ts">
  import goBack from '$lib/client/go-back';

  export let backDestinations: string[] = [];

  function handleBackButtonClick() {
    goBack(...backDestinations);
  }
</script>

<button on:click={handleBackButtonClick} class="btn" title="Back">
  <slot />
</button>

<style>
  .btn {
    width: 100%;
    height: 100%;
    padding: 0;
  }
</style>
