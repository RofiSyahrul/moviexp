import React, { memo } from 'react';
import { Image, ImageProps } from 'goods-core';
import isEqual from 'react-fast-compare';
import { LazyImageHookProps, useLazyImage } from './lazy-image.hook';

interface LazyImageProps
  extends Omit<ImageProps, 'src' | 'alt'>,
    Omit<LazyImageHookProps, 'onClick'> {
  alt: string;
}

const LazyImage = memo<LazyImageProps>(
  ({ src, setVisible, objectFit, cursor, onClick: onCLickProp, ...props }) => {
    const {
      imageRef,
      imageSrc,
      isError,
      isLoading,
      onClick,
      onError,
    } = useLazyImage({
      src,
      setVisible,
      onClick: onCLickProp,
    });

    return (
      <Image
        ref={imageRef}
        src={isError ? require('@img/no-image-poster.png') : imageSrc}
        onError={onError}
        onClick={onClick}
        objectFit={isLoading ? 'cover' : objectFit}
        cursor={
          isError && typeof onCLickProp === 'function' ? 'not-allowed' : cursor
        }
        {...props}
      />
    );
  },
  isEqual
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
