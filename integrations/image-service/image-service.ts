import type {
  AstroConfig,
  ImageMetadata,
  ImageOutputFormat,
  ImageQuality,
} from 'astro';
import { baseService } from 'astro/assets';
import sharpService from 'astro/assets/services/sharp';

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

const TMDB_IMAGE_WIDTHS_CONFIG = {
  backdrop: [300, 780, 1280],
  logo: [45, 92, 154, 185, 300, 500],
  poster: [92, 154, 185, 342, 500, 780],
  profile: [45, 185],
  still: [92, 185, 300],
};

type TMDBImageType = keyof typeof TMDB_IMAGE_WIDTHS_CONFIG;

type ImageConfig = AstroConfig['image'];

type ImageTransform = {
  'data-tmdb-img'?: string;
  densities?: (number | `${number}x`)[] | undefined;
  format?: ImageOutputFormat | undefined;
  height?: number | undefined;
  quality?: ImageQuality | undefined;
  src: ImageMetadata | string;
  width?: number | undefined;
  widths?: number[] | undefined;
};

interface TMDBImageTransform
  extends Omit<ImageTransform, 'data-tmdb-img' | 'src'> {
  'data-tmdb-img': TMDBImageType;
  src: string;
}

type SrcSetValue = {
  transform: ImageTransform;
  descriptor?: string;
  attributes?: Record<string, any>;
};

const TMDB_IMAGE_TYPES = new Set(
  Object.keys(TMDB_IMAGE_WIDTHS_CONFIG),
);

function isTMDBImage(
  options: ImageTransform,
): options is TMDBImageTransform {
  const { 'data-tmdb-img': tmdbImageType, src } = options;
  return (
    !!tmdbImageType &&
    TMDB_IMAGE_TYPES.has(tmdbImageType) &&
    typeof src === 'string' &&
    src.startsWith('/')
  );
}

function getImageWidth(
  tmdbImageType: TMDBImageType,
  width?: number,
  fallback?: 'original',
): 'original' | `w${number}`;

function getImageWidth(
  tmdbImageType: TMDBImageType,
  width?: number,
  fallback?: `w${number}`,
): `w${number}`;

function getImageWidth(
  tmdbImageType: TMDBImageType,
  width?: number,
  fallback: 'original' | `w${number}` = 'original',
): 'original' | `w${number}` {
  if (width == null) return fallback;

  const imageWidths = TMDB_IMAGE_WIDTHS_CONFIG[tmdbImageType];
  for (const fixedImageWidth of imageWidths) {
    if (width <= fixedImageWidth) return `w${fixedImageWidth}`;
  }

  return fallback;
}

function getImageSizes(tmdbImageType: TMDBImageType): string[] {
  const MAX_VIEWPORT_WIDTH = 1200;
  const imageWidths = TMDB_IMAGE_WIDTHS_CONFIG[tmdbImageType];
  const maxIteration = imageWidths.length - 1;
  const viewportDiff = Math.floor(MAX_VIEWPORT_WIDTH / maxIteration);

  let viewport = viewportDiff;
  let index = 0;
  const imageSizes: string[] = [];

  while (viewport <= MAX_VIEWPORT_WIDTH && index < maxIteration) {
    const width = imageWidths[index];
    imageSizes.push(`(max-width: ${viewport}px) ${width}px`);
    viewport += viewportDiff;
    index += 1;
  }

  imageSizes.push(`${imageWidths.at(-1)}px`);

  return imageSizes;
}

const imageService = {
  async getURL(
    options: ImageTransform,
    imageConfig: ImageConfig,
  ): Promise<string> {
    if (!isTMDBImage(options)) {
      return await baseService.getURL(options, imageConfig);
    }

    const { 'data-tmdb-img': tmdbImageType, src, width } = options;
    const imageWidth = getImageWidth(tmdbImageType, width);
    return TMDB_IMAGE_URL + '/' + imageWidth + src;
  },

  async getSrcSet(
    options: ImageTransform,
    imageConfig: ImageConfig,
  ): Promise<SrcSetValue[]> {
    if (!isTMDBImage(options)) {
      return (
        (await baseService.getSrcSet?.(options, imageConfig)) ?? []
      );
    }

    const { 'data-tmdb-img': tmdbImageType } = options;

    const imageWidths = TMDB_IMAGE_WIDTHS_CONFIG[tmdbImageType];
    return imageWidths.map(width => {
      return {
        transform: { ...options, width },
        descriptor: `${width}w`,
      };
    });
  },

  async getHTMLAttributes(
    options: ImageTransform,
    imageConfig: ImageConfig,
  ): Promise<Record<string, any>> {
    const htmlAttributes =
      (await baseService.getHTMLAttributes?.(options, imageConfig)) ??
      {};

    if (!isTMDBImage(options)) {
      return htmlAttributes;
    }

    return {
      ...htmlAttributes,
      sizes: getImageSizes(options['data-tmdb-img']).join(', '),
    };
  },

  async validateOptions(
    options: ImageTransform,
    imageConfig: ImageConfig,
  ): Promise<ImageTransform> {
    if (isTMDBImage(options)) return options;

    return (
      (await baseService.validateOptions?.(options, imageConfig)) ??
      options
    );
  },

  parseURL: baseService.parseURL,
  transform: sharpService.transform,
};

export default imageService;
