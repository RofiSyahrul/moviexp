<script lang="ts">
  export let ariaLabel: string | undefined = undefined;
  export let rotate = 0;
  export let size = 16;
  export let strokeWidth = 4;
</script>

<svg
  aria-label={ariaLabel}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style:transform={`rotate(${rotate}deg)`}
>
  <path
    d="M15 18L9 12L15 6"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
