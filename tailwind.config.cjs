/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mint: '#A8DADC',
                blush: '#FFB7B2',
                cream: '#FFF5E1',
            },
        },
    },
    plugins: [],
};