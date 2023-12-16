import { onMount } from 'svelte';
import { derived, writable, type Writable } from 'svelte/store';

import { activeIndexStorage } from './slider.storage';

export function getTotalSlides(sliderContent: HTMLDivElement) {
  const { clientWidth, scrollWidth } = sliderContent;
  return clientWidth > 0 ? Math.ceil(scrollWidth / clientWidth) : 0;
}

function getAstroIsland(sliderContent: HTMLDivElement) {
  let element: HTMLElement = sliderContent;
  while (element.parentElement) {
    element = element.parentElement;
    if (element.tagName === 'ASTRO-ISLAND') {
      return element;
    }
  }

  return null;
}

export function useSlider() {
  let sliderContent: HTMLDivElement;

  const uid = writable<string>();
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

  function setAstroIslandUID() {
    const astroIsland = getAstroIsland(sliderContent);
    const astroIslandUID = astroIsland?.getAttribute('uid');
    if (astroIslandUID) uid.set(astroIslandUID);
  }

  onMount(() => {
    updateTotalSlides();
    setAstroIslandUID();
    return unsubscribeSliderContentStore;
  });

  return {
    sliderContent: sliderContentStore,
    totalSlides,
    uid,
    updateTotalSlides,
  };
}

export function useNavigateSlider(uidStore: Writable<string>) {
  let $uid: string;
  let $activeIndex = 0;

  const activeIndex = writable(0);
  const translationOffsetIndex = writable(0);
  const disabledTransition = writable(false);

  const translationIndex = derived(
    [activeIndex, translationOffsetIndex],
    ([$activeIndex, $translationOffsetIndex]) =>
      $activeIndex + $translationOffsetIndex,
  );

  function goToNextSlide() {
    disabledTransition.set(false);
    activeIndex.update(prev => prev + 1);
  }

  function goToPrevSlide() {
    disabledTransition.set(false);
    activeIndex.update(prev => prev - 1);
  }

  function updateOffset(increment: number) {
    disabledTransition.set(true);
    translationOffsetIndex.update(prev => prev + increment);
  }

  const unsubscribeActiveIndexStore = activeIndex.subscribe(
    newValue => {
      $activeIndex = newValue;
    },
  );

  const unsubscribeUIDStore = uidStore.subscribe(newValue => {
    $uid = newValue;

    if (!$uid) return;

    const initialActiveIndex = activeIndexStorage.get($uid);
    if (typeof initialActiveIndex === 'number') {
      activeIndex.set(initialActiveIndex);
    }
  });

  onMount(() => {
    function storeActiveIndex() {
      if ($uid) {
        activeIndexStorage.set($uid, $activeIndex);
      }
    }

    window.addEventListener('beforeunload', storeActiveIndex);

    return () => {
      unsubscribeActiveIndexStore();
      unsubscribeUIDStore();
      storeActiveIndex();
      window.removeEventListener('beforeunload', storeActiveIndex);
    };
  });

  return {
    activeIndex,
    disabledTransition,
    goToNextSlide,
    goToPrevSlide,
    translationIndex,
    updateOffset,
  };
}

export function getSlidesWraper(slider: HTMLElement) {
  const firstChild = slider.children[0];
  if (firstChild?.tagName.startsWith('ASTRO-')) {
    return firstChild;
  }
  return slider;
}

export function getWidth(element: Element) {
  return element.getBoundingClientRect().width;
}

export function getRightSlidesAndRemoveThem(
  slides: HTMLCollection,
  maxTotalWidth: number,
  shouldRemoveOriginalSlide: boolean,
) {
  let totalRightSlidesWidth = 0;
  const totalActualSlides = slides.length;
  const rightSlides: Node[] = [];

  for (let index = totalActualSlides - 1; index >= 0; index--) {
    const rightSlide = slides[index];
    totalRightSlidesWidth += getWidth(rightSlide);

    if (totalRightSlidesWidth > maxTotalWidth) break;

    rightSlides.unshift(rightSlide.cloneNode(true));
    if (shouldRemoveOriginalSlide) rightSlide.remove();
  }

  return rightSlides;
}

export function getLeftSlidesAndRemoveThem(
  slides: HTMLCollection,
  maxTotalWidth: number,
  shouldRemoveOriginalSlide: boolean,
) {
  let index = 0;
  let totalLeftSlidesWidth = 0;
  const leftSlides: Node[] = [];

  while (index < slides.length) {
    const leftSlide = slides[index];
    totalLeftSlidesWidth += getWidth(leftSlide);

    if (totalLeftSlidesWidth > maxTotalWidth) break;

    leftSlides.push(leftSlide.cloneNode(true));
    if (shouldRemoveOriginalSlide) {
      leftSlide.remove();
    } else {
      index += 1;
    }
  }

  return leftSlides;
}
