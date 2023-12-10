<script lang="ts">
  export let isOpen: boolean;
</script>

<div data-is-open={isOpen} class="suggestion"></div>

<style lang="scss">
  .suggestion {
    position: absolute;
    display: none;
  }

  .suggestion[data-is-open='true'] {
    display: flex;
  }
</style>
