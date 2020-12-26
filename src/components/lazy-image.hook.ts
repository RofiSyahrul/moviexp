import { useEffect, useRef, useState } from 'react';

export interface LazyImageHookProps {
  src: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HookReturn {
  imageSrc: string;
  isLoading: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
}

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+B8AAqcB0ialKdoAAAAASUVORK5CYII=';

export function handleError(e: React.SyntheticEvent<HTMLImageElement>): void {
  e.currentTarget.src = require('@img/no-image-poster.png');
}

export function useLazyImage({
  src,
  setVisible = () => {},
}: LazyImageHookProps): HookReturn {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const isLoading = src !== imageSrc;

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;
    const imageEl = imageRef.current;

    if (imageEl && isLoading) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                setVisible(true);
                observer.unobserve(imageEl);
              }
            });
          },
          { threshold: 0.5, rootMargin: '0%' }
        );
        observer.observe(imageEl);
      } else {
        setImageSrc(src);
        setVisible(true);
      }
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve && imageEl) {
        observer.unobserve(imageEl);
      }
    };
  }, [imageRef, src, isLoading]);

  return { imageSrc, isLoading, imageRef };
}
