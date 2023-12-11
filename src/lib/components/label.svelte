<script lang="ts">
  import clsx from 'clsx';

  let className = '';

  export { className as class };
  export let component: 'div' | 'li' = 'div';
  export let color: 'green' | 'white' = 'green';
</script>

<svelte:element
  this={component}
  class={clsx('label', `label_${color}`, className)}
>
  <slot />
</svelte:element>

<style lang="scss">
  .label {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
  }

  .label_green {
    color: var(--color-neutral-10);
    background-color: var(--color-green-80);
  }

  .label_white {
    color: var(--color-neutral-40);
    background-color: var(--color-neutral-10);
    border: 1px solid var(--color-neutral-20);
  }
</style>
