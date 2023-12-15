<script lang="ts">
  import type {
    TouchEventHandler,
    TransitionEventHandler,
  } from 'svelte/elements';

  import ChevronLeft from '$lib/icons/chevron-left.svelte';

  import {
    getLeftSlidesAndRemoveThem,
    getRightSlidesAndRemoveThem,
    getSlidesWraper,
    getTotalSlides,
    useNavigateSlider,
    useTotalSlides,
  } from './slider.hooks';

  const MIN_SLIDES_TO_REMOVE_ORIGINAL_SLIDE = 3;
  const SWIPE_THRESHOLD_RATIO = 0.25;
  const TRANSLATION_RATIO = 100;

  let isDragging = false;
  let startX = 0;
  let touchMoveDelta = 0;

  let translateX = '';

  const { sliderContent, totalSlides, updateTotalSlides } =
    useTotalSlides();

  const {
    disabledTransition,
    goToNextSlide,
    goToPrevSlide,
    offsetDecrement,
    offsetIncrement,
    translationIndex,
  } = useNavigateSlider();

  $: disabledNext = $translationIndex >= $totalSlides - 1;
  $: disabledPrev = $translationIndex <= 0;

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
    touchMoveDelta = currentX - startX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = event => {
    if (!isDragging) return;

    const deltaX = startX - event.changedTouches[0].clientX;
    const threshold =
      event.currentTarget.clientWidth * SWIPE_THRESHOLD_RATIO;

    if (deltaX > threshold && !disabledNext) {
      goToNextSlide();
    } else if (deltaX < -threshold && !disabledPrev) {
      goToPrevSlide();
    }

    touchMoveDelta = 0;
    isDragging = false;
  };

  const handleTransitionEnd: TransitionEventHandler<
    HTMLDivElement
  > = event => {
    const sliderContent = event.currentTarget;

    const totalActualSlides = getTotalSlides(sliderContent);
    if (totalActualSlides <= 1) return;

    totalSlides.set(totalActualSlides);
    const isFirstSlide = $translationIndex === 0;
    const isLastSlide = $translationIndex === totalActualSlides - 1;

    if (!isFirstSlide && !isLastSlide) return;

    const shouldRemoveOriginalSlide =
      totalActualSlides >= MIN_SLIDES_TO_REMOVE_ORIGINAL_SLIDE;
    const sliderWidth = sliderContent.clientWidth;

    const slidesWrapper = getSlidesWraper(sliderContent);
    const slides = slidesWrapper.children;

    let rightSlides: Node[] = [];
    let leftSlides: Node[] = [];

    if (isFirstSlide || !shouldRemoveOriginalSlide) {
      rightSlides = getRightSlidesAndRemoveThem(
        slides,
        sliderWidth,
        shouldRemoveOriginalSlide,
      );
    }

    if (isLastSlide || !shouldRemoveOriginalSlide) {
      leftSlides = getLeftSlidesAndRemoveThem(
        slides,
        sliderWidth,
        shouldRemoveOriginalSlide,
      );
    }

    if (rightSlides.length > 0) {
      const translateX = -($translationIndex + 1) * TRANSLATION_RATIO;
      sliderContent.style.transition = 'unset';
      sliderContent.style.transform = `translate3d(${translateX}%, 0, 0)`;
      offsetIncrement();
      slidesWrapper.prepend(...rightSlides);
    }

    if (leftSlides.length > 0) {
      if (shouldRemoveOriginalSlide) {
        const translateX =
          -($translationIndex - 1) * TRANSLATION_RATIO;
        sliderContent.style.transition = 'unset';
        sliderContent.style.transform = `translate3d(${translateX}%, 0, 0)`;
        offsetDecrement();
      }

      slidesWrapper.append(...leftSlides);
    }
  };

  $: {
    const baseTranslateX = -$translationIndex * TRANSLATION_RATIO;

    if (touchMoveDelta && !disabledNext) {
      translateX = `calc(${baseTranslateX}% + ${touchMoveDelta}px)`;
    } else {
      translateX = `${baseTranslateX}%`;
    }
  }
</script>

<svelte:window on:resize={updateTotalSlides} />

<div class="slider">
  <button
    class="btn slider__prev"
    disabled={disabledPrev}
    on:click={goToPrevSlide}
  >
    <ChevronLeft ariaLabel="Previous" />
    <span class="visually-hidden">Previous</span>
  </button>

  <div class="slider__mask">
    <div
      bind:this={$sliderContent}
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
      on:transitionend={handleTransitionEnd}
      class="slider__content"
      style:transform={`translateX(${translateX})`}
      style:transition={$disabledTransition ? 'unset' : undefined}
    >
      <slot />
    </div>
  </div>

  <button
    class="btn slider__next"
    disabled={disabledNext}
    on:click={goToNextSlide}
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
