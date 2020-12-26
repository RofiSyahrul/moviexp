import React, { memo } from 'react';
import { Image, ImageProps } from 'goods-core';
import isEqual from 'react-fast-compare';
import {
  handleError,
  LazyImageHookProps,
  useLazyImage,
} from './lazy-image.hook';

interface LazyImageProps
  extends Omit<ImageProps, 'src' | 'alt'>,
    LazyImageHookProps {
  alt: string;
}

const LazyImage = memo<LazyImageProps>(
  ({ src, setVisible, objectFit, ...props }) => {
    const { imageRef, imageSrc, isLoading } = useLazyImage({ src, setVisible });

    return (
      <Image
        ref={imageRef}
        src={imageSrc}
        onError={handleError}
        objectFit={isLoading ? 'cover' : objectFit}
        {...props}
      />
    );
  },
  isEqual
);

LazyImage.displayName = 'LazyImage';

export default LazyImage;
