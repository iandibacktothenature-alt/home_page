/** @type {import('tailwindcss').Config} */
const scale = (role: string) => {
  const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  return steps.reduce<Record<string, string>>((acc, s) => {
    acc[s] = `oklch(var(--${role}-${s}) / <alpha-value>)`;
    return acc;
  }, {});
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: scale('background'),
        accent: scale('accent'),
        primary: scale('primary'),
        secondary: scale('secondary'),
        foreground: scale('foreground'),
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        body: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
        display: ['var(--font-heading)'],
        serif: ['var(--font-heading)'],
        label: ['var(--font-label)'],
      },
    },
  },
  plugins: [],
};