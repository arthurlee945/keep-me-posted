/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "class",
    theme: {
        screens: {
            sm: { max: "639px" },
            lg: { max: "1023px" },
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            content: {
                darkCheckmark: `url("data:image/svg+xml,%3Csvg fill='%2318181B' width='100%25' height='100%25' viewBox='-3.5 0 19 19' xmlns='http://www.w3.org/2000/svg' class='cf-icon-svg'%3E%3Cpath d='M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z'/%3E%3C/svg%3E")`,
                lightCheckmark: `url("data:image/svg+xml,%3Csvg fill='%23FAFAFA' width='100%25' height='100%25' viewBox='-3.5 0 19 19' xmlns='http://www.w3.org/2000/svg' class='cf-icon-svg'%3E%3Cpath d='M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z'/%3E%3C/svg%3E")`,
            },
        },
    },
    plugins: [],
};
