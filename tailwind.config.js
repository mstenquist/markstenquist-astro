/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontSize: {
        'base': ['1.125rem', '1.75rem'], // 18px with line-height 28px (was 16px/24px)
      },
    },
  },
  plugins: [],
}

