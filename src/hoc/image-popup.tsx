import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import { Box, Icon, Image } from 'goods-core';
import { Modal } from 'goods-ui';

interface ImagePopupAction {
  openImagePopup(e: React.MouseEvent<HTMLImageElement>): void;
}

const ImagePopupContext = createContext<ImagePopupAction>({
  openImagePopup() {},
});

export function useImagePopup(): ImagePopupAction {
  return useContext(ImagePopupContext);
}

interface ImagePopupProps {
  src: string;
  onClose(): void;
}

const ImagePopup = memo<ImagePopupProps>(({ src, onClose }) => {
  return (
    <Modal id='image-popup' isOpen={Boolean(src)} px='0' py='0' maxH='95vh'>
      <Box posi='relative' s='100%' radius='inherit'>
        <Box
          as='button'
          className='close-btn'
          posi='sticky'
          fASelf='flex-end'
          top='8px'
          right='8px'
          p='xxxs'
          onClick={onClose}
          bg='green50'
          cursor='pointer'
          b='none'
          w='fit-content'
          radius='m'
          z={10}
        >
          <Icon name='close' c='white' />
        </Box>
        <Image src={src} alt='popup-img' w mt='-40px' />
      </Box>
    </Modal>
  );
}, isEqual);

interface HookReturn extends ImagePopupAction, ImagePopupProps {}

let timeout: NodeJS.Timeout;

function usePopup(): HookReturn {
  const [src, setSrc] = useState('');

  const openImagePopup = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      setSrc(e.currentTarget.src);
    },
    []
  );

  const onClose = useCallback(() => {
    const popup = document.getElementById('image-popup');
    const closeBtn = document.querySelector('#image-popup .close-btn');
    if (popup instanceof HTMLElement && closeBtn instanceof HTMLElement) {
      closeBtn.style.position = 'absolute';
      popup.style.animationName = 'zoom-out';
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSrc('');
      }, 200);
      return;
    }
    setSrc('');
  }, []);

  return { src, openImagePopup, onClose };
}

export const withImagePopup = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  Component: React.ComponentType<P>
): React.FC<P> => props => {
  const { src, openImagePopup, onClose } = usePopup();

  return (
    <ImagePopupContext.Provider value={{ openImagePopup }}>
      <Component {...props} />
      <ImagePopup src={src} onClose={onClose} />
    </ImagePopupContext.Provider>
  );
};
