<script lang="ts">
  let className = '';

  export { className as class };
  export let component: 'div' | 'main' = 'div';
  export let endpoint: string;
  export let selector: string;

  let currentPage = 1;
  let element: HTMLElement;
  let isLoading = false;
  let hasMore = true;

  async function loadMore() {
    isLoading = true;

    const endpointURL = new URL(endpoint, window.location.origin);
    endpointURL.searchParams.set('page', String(currentPage));

    try {
      const response = await fetch(endpointURL, {
        headers: { 'X-Trigger': 'infinite-list' },
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const newDocument = parser.parseFromString(html, 'text/html');
      const bodyChildren = newDocument.body.children;

      if (bodyChildren.length === 0) {
        hasMore = false;
        return;
      }

      const container = element.querySelector(selector);
      container?.append(...bodyChildren);
    } catch (error) {
      hasMore = false;
      // eslint-disable-next-line no-console
      console.error('Failed to load more from ' + endpointURL, error);
    } finally {
      isLoading = false;
    }
  }

  function handleScroll() {
    const currentHeight = window.innerHeight + window.scrollY;
    const offsetHeight = document.body.offsetHeight - 200;

    if (currentHeight >= offsetHeight && !isLoading && hasMore) {
      currentPage += 1;
      loadMore();
    }
  }
</script>

<svelte:window on:scroll={handleScroll} />

<svelte:element
  this={component}
  bind:this={element}
  class={className}
>
  <slot />

  {#if isLoading}
    <div class="loading" title="Loading...">
      <span class="spinner" />
      <span class="visually-hidden">Loading...</span>
    </div>
  {/if}
</svelte:element>

<style lang="scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px auto;
    width: 100%;

    .spinner {
      width: 64px;
      height: 64px;
    }
  }
</style>
