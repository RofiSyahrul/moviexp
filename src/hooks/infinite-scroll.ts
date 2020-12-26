import { useEffect } from 'react';

interface HookProps {
  containerSelector: string;
  onNextPage(): void;
}

export function useInfiniteScroll({
  containerSelector,
  onNextPage,
}: HookProps): void {
  useEffect(() => {
    function handleScroll() {
      const container = document.querySelector(
        containerSelector
      ) as HTMLElement;
      if (!container) return;
      const { clientHeight } = container;
      const { innerHeight, pageYOffset } = window;
      const windowBottomPos = innerHeight + pageYOffset;
      if (windowBottomPos - clientHeight >= 0) {
        onNextPage();
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: false,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
