import { useCallback, useEffect, useRef, useState } from 'react';

export interface LazyImageHookProps {
  src: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?(e: React.MouseEvent<HTMLImageElement>): void;
}

interface HookReturn {
  imageSrc: string;
  isLoading: boolean;
  isError: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
  onClick(e: React.MouseEvent<HTMLImageElement>): void;
  onError(): void;
}

const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8+B8AAqcB0ialKdoAAAAASUVORK5CYII=';

export function useLazyImage({
  src,
  setVisible = () => {},
  onClick: onClickProp,
}: LazyImageHookProps): HookReturn {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isError, setIsError] = useState(false);
  const isLoading = src !== imageSrc;

  const imageRef = useRef<HTMLImageElement>(null);

  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      if (isError) return;
      if (typeof onClickProp === 'function') {
        onClickProp(e);
      }
    },
    [isError]
  );

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

  return { imageSrc, isLoading, isError, imageRef, onClick, onError };
}
