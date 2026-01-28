/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#D64923',
                secondary: '#2C8597',
                accent: '#EBB148',
                neutral: '#FFFFFF',
                textMain: '#333333',
                // Keeping some variations for convenience
                stone: {
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    900: '#1c1917',
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['"Lato"', '"Inter"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
