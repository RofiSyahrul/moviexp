<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<div>
  <input id="search-input" bind:value />
  <label for="search-input">{label}</label>
</div>

<div>
  <!-- Search Icon -->
</div>

<div>
  <label for="search-input">
    <!-- Chevron Icon -->
  </label>
</div>
