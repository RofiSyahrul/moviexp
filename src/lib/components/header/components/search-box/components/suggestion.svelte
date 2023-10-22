<script lang="ts">
  export let isOpen: boolean;
</script>

<div aria-hidden={!isOpen} class="suggestion"></div>

<style lang="scss">
  .suggestion {
    position: absolute;
    display: flex;
  }

  .suggestion[aria-hidden='true'] {
    display: none;
  }
</style>
