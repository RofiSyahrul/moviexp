import { onMount } from 'svelte';
import { derived, writable } from 'svelte/store';

export function getTotalSlides(sliderContent: HTMLDivElement) {
  const { clientWidth, scrollWidth } = sliderContent;
  return clientWidth > 0 ? Math.ceil(scrollWidth / clientWidth) : 0;
}

export function useTotalSlides() {
  let sliderContent: HTMLDivElement;

  const sliderContentStore = writable<HTMLDivElement>();
  const totalSlides = writable(0);

  const unsubscribeSliderContentStore = sliderContentStore.subscribe(
    $sliderContent => {
      sliderContent = $sliderContent;
    },
  );

  function updateTotalSlides() {
    totalSlides.set(getTotalSlides(sliderContent));
  }

  onMount(() => {
    updateTotalSlides();
    return unsubscribeSliderContentStore;
  });

  return {
    sliderContent: sliderContentStore,
    totalSlides,
    updateTotalSlides,
  };
}

export function useNavigateSlider() {
  const activeIndex = writable(0);
  const translationOffsetIndex = writable(0);
  const disabledTransition = writable(false);

  const translationIndex = derived(
    [activeIndex, translationOffsetIndex],
    ([$activeIndex, $translationOffsetIndex]) =>
      $activeIndex + $translationOffsetIndex,
  );

  const disabledPrev = derived(
    [activeIndex, translationOffsetIndex],
    ([$activeIndex, $translationOffsetIndex]) =>
      $activeIndex === 0 && $translationOffsetIndex === 0,
  );

  function goToNextSlide() {
    disabledTransition.set(false);
    activeIndex.update(prev => prev + 1);
  }

  function goToPrevSlide() {
    disabledTransition.set(false);
    activeIndex.update(prev => prev - 1);
  }

  function offsetIncrement() {
    disabledTransition.set(true);
    translationOffsetIndex.update(prev => prev + 1);
  }

  function offsetDecrement() {
    disabledTransition.set(true);
    translationOffsetIndex.update(prev => prev - 1);
  }

  return {
    disabledPrev,
    disabledTransition,
    goToNextSlide,
    goToPrevSlide,
    offsetDecrement,
    offsetIncrement,
    translationIndex,
  };
}

export function getSlidesWraper(slider: HTMLElement) {
  const firstChild = slider.children[0];
  if (firstChild?.tagName.startsWith('ASTRO-')) {
    return firstChild;
  }
  return slider;
}

export function getRightSlidesAndRemoveThem(
  slides: HTMLCollection,
  sliderWidth: number,
  shouldRemoveOriginalSlide: boolean,
) {
  let totalRightSlidesWidth = 0;
  const totalActualSlides = slides.length;
  const rightSlides: Node[] = [];

  for (let index = totalActualSlides - 1; index >= 0; index--) {
    const rightSlide = slides[index];
    totalRightSlidesWidth += rightSlide.clientWidth;

    if (totalRightSlidesWidth > sliderWidth) break;

    rightSlides.unshift(rightSlide.cloneNode(true));
    if (shouldRemoveOriginalSlide) rightSlide.remove();
  }

  return rightSlides;
}

export function getLeftSlidesAndRemoveThem(
  slides: HTMLCollection,
  sliderWidth: number,
  shouldRemoveOriginalSlide: boolean,
) {
  let index = 0;
  let totalLeftSlidesWidth = 0;
  const leftSlides: Node[] = [];

  while (index < slides.length) {
    const leftSlide = slides[index];
    totalLeftSlidesWidth += leftSlide.clientWidth;

    if (totalLeftSlidesWidth > sliderWidth) break;

    leftSlides.push(leftSlide.cloneNode(true));
    if (shouldRemoveOriginalSlide) {
      leftSlide.remove();
    } else {
      index += 1;
    }
  }

  return leftSlides;
}
