<script lang="ts">
  import { onMount } from 'svelte';

  import ChevronLeft from '$lib/icons/chevron-left.svelte';

  const MIN_INDEX = 0;
  const RATIO = 100;

  let activeIndex = 0;
  let maxIndex = 0;
  let sliderContent: HTMLDivElement;

  function updateMaxIndex() {
    const { clientWidth, scrollWidth } = sliderContent;
    const totalSlidesFloat = scrollWidth / clientWidth;
    const totalSlidesInt = Math.floor(totalSlidesFloat);
    maxIndex =
      totalSlidesFloat === totalSlidesInt
        ? totalSlidesInt - 1
        : totalSlidesInt;
  }

  onMount(() => {
    updateMaxIndex();
  });

  function handleNext() {
    activeIndex += 1;
  }

  function handlePrev() {
    activeIndex -= 1;
  }

  $: translateX =
    -Math.max(MIN_INDEX, Math.min(activeIndex, maxIndex)) * RATIO;
</script>

<svelte:window on:resize={updateMaxIndex} />

<div class="slider">
  <button
    class="btn slider__prev"
    disabled={activeIndex <= MIN_INDEX}
    on:click={handlePrev}
  >
    <ChevronLeft ariaLabel="Previous" />
    <span class="visually-hidden">Previous</span>
  </button>

  <div class="slider__mask">
    <div
      bind:this={sliderContent}
      class="slider__content"
      style:transform={`translate3d(${translateX}%, 0px, 0px)`}
    >
      <slot />
    </div>
  </div>

  <button
    class="btn slider__next"
    disabled={activeIndex >= maxIndex}
    on:click={handleNext}
  >
    <ChevronLeft ariaLabel="Next" rotate={180} />
    <span class="visually-hidden">Next</span>
  </button>
</div>

<style lang="scss">
  .slider {
    position: relative;
    width: 100%;
    padding: 0 var(--left-right-gutter);
    overflow: hidden;
  }

  .slider__mask {
    overflow-x: visible;
  }

  .slider__content {
    display: block;
    margin: -4px;
    transition: transform 0.5s ease-in;
    white-space: nowrap;
  }

  .slider__prev,
  .slider__next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: calc(var(--left-right-gutter) - 8px);
    overflow: hidden;
    padding: 0;
    color: var(--color-neutral-05);
    background-color: rgb(var(--rgb-neutral-40), 0.5);
    box-shadow: var(--shadow-low);
    border-radius: 0;
  }

  .slider__prev {
    left: 0;
  }

  .slider__next {
    right: 0;
  }

  .slider__prev:disabled,
  .slider__next:disabled {
    display: none;
  }
</style>
