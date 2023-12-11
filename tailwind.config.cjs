// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.{astro,svelte}'],
  darkMode: 'class',
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.btn': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 6px',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '24px',
          border: 'none',
          outline: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '30%',
          },
          '&:hover:not(:disabled)': {
            filter: 'brightness(80%)',
          },
        },
        '.scrollbar::-webkit-scrollbar-track': {
          width: '6px',
          backgroundColor: 'var(--color-neutral-10)',
          borderRadius: '3px',
        },
        '.scrollbar::-webkit-scrollbar': {
          width: '6px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          width: '6px',
          height: '20%',
          backgroundColor: 'var(--color-green-50)',
          borderRadius: '3px',
        },
        '.spinner': {
          boxSizing: 'border-box',
          border: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 0.4s linear infinite',
          borderTopColor: 'var(--color-green-50)',
          borderLeftColor: 'var(--color-green-50)',
        },
        '.visually-hidden': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          padding: '0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          border: '0',
          clip: 'rect(0, 0, 0, 0)',
        },
      });
    }),
  ],
};
