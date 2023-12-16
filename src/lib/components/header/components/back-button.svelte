<script lang="ts">
  import goBack from '$lib/client/go-back';

  function handleBackButtonClick() {
    goBack('/');
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
