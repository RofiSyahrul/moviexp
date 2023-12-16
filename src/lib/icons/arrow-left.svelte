<script lang="ts">
  export let ariaLabel: string | undefined = undefined;
  export let rotate = 0;
  export let size = 16;
  export let strokeWidth = 2;
</script>

<svg
  aria-label={ariaLabel}
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style:transform={`rotate(${rotate}deg)`}
>
  <path
    d="M10 3.5L6 8L10 12.5"
    stroke="currentColor"
    stroke-width={strokeWidth}
  />
</svg>
