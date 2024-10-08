import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';

const colors = {
  primary: {
    DEFAULT: '#5E2885',
    50: '#B98ADB',
    100: '#AF7AD7',
    200: '#9C5BCD',
    300: '#8A3BC4',
    400: '#7432A4',
    500: '#5E2885',
    600: '#3F1B5A',
    700: '#210E2F',
    800: '#030104',
    900: '#000000',
  },
  success: {
    DEFAULT: '#168375',
    50: '#6BE6D6',
    100: '#5AE3D1',
    200: '#37DDC7',
    300: '#22C8B3',
    400: '#1CA594',
    500: '#168375',
    600: '#0E534A',
    700: '#06231F',
    800: '#000000',
    900: '#000000',
  },
  info: {
    DEFAULT: '#3F88C5',
    50: '#CCDFF0',
    100: '#BCD6EB',
    200: '#9DC2E1',
    300: '#7EAFD8',
    400: '#5E9BCE',
    500: '#3F88C5',
    600: '#2F6B9D',
    700: '#224D72',
    800: '#153046',
    900: '#08131B',
  },
  warning: {
    DEFAULT: '#FFBA08',
    50: '#FFEDC0',
    100: '#FFE8AB',
    200: '#FFDC82',
    300: '#FFD15A',
    400: '#FFC531',
    500: '#FFBA08',
    600: '#CF9500',
    700: '#976D00',
    800: '#5F4400',
    900: '#271C00',
  },
  error: {
    DEFAULT: '#D00000',
    50: '#FF8989',
    100: '#FF7474',
    200: '#FF4B4B',
    300: '#FF2323',
    400: '#F90000',
    500: '#D00000',
    600: '#980000',
    700: '#600000',
    800: '#280000',
    900: '#000000',
  },
};

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors,
    },
  },
  plugins: [containerQueries],
} satisfies Config;
