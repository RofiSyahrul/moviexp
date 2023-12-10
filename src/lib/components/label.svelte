<script lang="ts">
  import clsx from 'clsx';

  let className = '';

  export { className as class };
  let component: 'div' | 'li' = 'div';
</script>

<svelte:element this={component} class={clsx('label', className)}>
  <slot />
</svelte:element>

<style lang="scss">
  .label {
    padding: 4px 8px;
    border-radius: 9999px;
    color: var(--color-neutral-10);
    background-color: var(--color-green-80);
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
  }
</style>
