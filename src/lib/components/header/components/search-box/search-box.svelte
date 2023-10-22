<script lang="ts">
  import Input from './components/input.svelte';
  import Suggestion from './components/suggestion.svelte';

  export let label: string;

  let isOpen = false;
  let searchValue = '';

  async function handleSearch(_search: string) {}

  $: handleSearch(searchValue);
</script>

<button class="btn">
  <!-- Search icon -->
</button>

<div class="search-dropdown">
  <Input {label} bind:value={searchValue} />
  <Suggestion {isOpen} />
</div>

<style lang="scss">
  .btn {
    --btn-size: 48px;
    width: var(--btn-size);
    height: var(--btn-size);
    transition: inherit;
  }

  .search-dropdown {
    width: 0;
    overflow: hidden;
    transition: inherit;
  }

  @include search-box-shown {
    .btn {
      --btn-size: 0px;
    }

    .search-dropdown {
      width: 100%;
    }
  }

  @include lg {
    .btn {
      --btn-size: 0px;
    }

    .search-dropdown {
      width: 400px;
    }
  }
</style>
