<script lang="ts">
  import { onMount } from 'svelte';
  import type { TouchEventHandler } from 'svelte/elements';

  import ChevronLeft from '$lib/icons/chevron-left.svelte';

  const MIN_INDEX = 0;
  const RATIO = 100;

  let activeIndex = 0;
  let isDragging = false;
  let maxIndex = 0;
  let sliderContent: HTMLDivElement;
  let startX = 0;
  let translateXDiff = 0;

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

  const handleTouchStart: TouchEventHandler<
    HTMLDivElement
  > = event => {
    isDragging = true;
    startX = event.touches[0].clientX;
  };

  const handleTouchMove: TouchEventHandler<
    HTMLDivElement
  > = event => {
    if (!isDragging) return;

    const currentX = event.touches[0].clientX;
    translateXDiff = currentX - startX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = event => {
    if (!isDragging) return;

    const deltaX = startX - event.changedTouches[0].clientX;
    const threshold = event.currentTarget.clientWidth / 4;

    if (deltaX > threshold && activeIndex < maxIndex) {
      handleNext();
    } else if (deltaX < -threshold && activeIndex > 0) {
      handlePrev();
    }

    translateXDiff = 0;
    isDragging = false;
  };

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
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
      class="slider__content"
      style:transform={`translateX(calc(${translateX}% + ${translateXDiff}px))`}
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
    display: flex;
    flex-wrap: nowrap;
    margin: -4px;
    width: 100%;
    transition: transform 0.5s ease-in;
    white-space: nowrap;
  }

  .slider__prev,
  .slider__next {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
    padding: 0;
    color: var(--color-neutral-05);
    background-color: rgb(var(--rgb-neutral-40), 0.5);
    box-shadow: var(--shadow-low);
  }

  .slider__prev {
    left: 0;
    width: calc(var(--left-right-gutter) - 8px);
    border-radius: 0 8px 8px 0;
  }

  .slider__next {
    right: 0;
    width: var(--left-right-gutter);
    border-radius: 8px 0 0 8px;
  }

  .slider__prev:disabled,
  .slider__next:disabled {
    display: none;
  }
</style>
