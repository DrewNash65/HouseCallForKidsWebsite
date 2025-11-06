import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'Manrope', 'Inter', 'sans-serif']
      },
      colors: {
        brand: {
          base: '#24C7BE',
          dark: '#0D918B',
          light: '#9BE7E1'
        },
        lilac: '#B6A4FF',
        blush: '#F7D6D0',
        sage: '#E3F2EF',
        midnight: '#0C1424',
        mist: '#F8FAFC'
      },
      boxShadow: {
        gentle: '0 20px 45px rgba(13, 31, 52, 0.16)',
        card: '0 14px 32px rgba(6, 16, 29, 0.18)'
      },
      backgroundImage: {
        'comfort-gradient': 'radial-gradient(circle at top left, rgba(155, 231, 225, 0.45), transparent 55%), radial-gradient(circle at top right, rgba(182, 164, 255, 0.4), transparent 60%), linear-gradient(180deg, #0F1C30 0%, #0D1424 60%, #101827 100%)'
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
        full: '9999px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
