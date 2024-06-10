import plugin from "tailwindcss/plugin";

function colorWithOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}),${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colorWithOpacity("--color-primary"),
        secondary: colorWithOpacity("--color-secondary"),
        light: colorWithOpacity("--color-white"),
        "light-0": colorWithOpacity("--color-light-1"),
        "light-1": colorWithOpacity("--color-gray-1"),
        "light-2": colorWithOpacity("--color-gray-2"),
        "dark-1": colorWithOpacity("--color-dark-1"),
        "dark-2": colorWithOpacity("--color-dark-2"),
        "dark-3": colorWithOpacity("--color-dark-3"),
      },

      fontFamily: {
        montserrat: "var(--font-montserrat)",
      },
      backgroundImage: {
        "hero-image":
          "linear-gradient(to right bottom, rgba(36, 42, 46, 0.8), rgba(36, 42, 46, 0.8)), url('./src/assets/home-cover.jpg')",
      },
      keyframes: {
        rotate: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        spin: "rotate 2s infinite linear",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".gradient-text-type-1": {
          "@apply bg-gradient-to-bl from-primary to-secondary text-transparent bg-clip-text":
            {},
        },
        ".label-1": {
          "@apply text-[1rem] xl:text-[1.125rem] uppercase font-semibold": {},
        },
        ".italic-light-text": {
          "@apply text-[1rem] xl:text-[1.125rem] text-light-1 font-extralight italic":
            {},
        },
        ".heading-1": {
          "@apply text-[2rem] lg:text-[3.4rem]  font-semibold": {},
        },
      });
    }),
  ],
};
