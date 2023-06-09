import { type Config } from "tailwindcss";

const screens = {
  sm: "320px",
  md: "768px",
  lg: "1440px",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#FFF6E8",
        200: "#FFE1B5",
        300: "#FFCD82",
        400: "#FFB94F",
        500: "#FBAB34",
        600: "#E09422",
        700: "#AD721A",
        800: "#7A4E0C",
        900: "#472C04",
        DEFAULT: "#FBAB34",
      },
      secondary: {
        100: "#F6F6F6",
        200: "#F4F3F8",
        300: "#E0DEEA",
        400: "#ACABB7",
        500: "#8C8A97",
        600: "#716F7A",
        700: "#5F5C6B",
        800: "#4E4B59",
        900: "#33303E",
        DEFAULT: "#8C8A97",
      },
      tertiary: {
        100: "#E8FAF1",
        200: "#D1F6E3",
        300: "#A4EDC6",
        400: "#8DE8B8",
        500: "#1BD171",
        600: "#18B863",
        700: "#149E55",
        800: "#0E6B3A",
        900: "#07381E",
        DEFAULT: "#1BD171",
      },
      quaternary: {
        100: "#FFF2F3",
        200: "#FFCFD0",
        300: "#FF9497",
        400: "#FA7D80",
        500: "#EC3237",
        600: "#D42D31",
        700: "#A12226",
        800: "#6E171A",
        900: "#3B0C0E",
        DEFAULT: "#EC3237",
      },
      white: "#FFFFFF",
      black: "#000000",
      body: "#5D6670",
      transparent: "transparent",
    },
    fontSize: {
      h1: ["3rem", { lineHeight: "3.5rem", letterSpacing: "-1" }],
      h2: ["2.5rem", { lineHeight: "3rem", letterSpacing: "-1" }],
      h3: ["2rem", { lineHeight: "2.5rem", letterSpacing: "0" }],
      h4: ["1.5rem", { lineHeight: "2rem", letterSpacing: "0" }],
      h5: ["1.25rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
      base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
      label: ["0.875rem", { lineHeight: "1rem", letterSpacing: "0" }],
      "small-label": [
        "0.75rem",
        { lineHeight: "0.875rem", letterSpacing: "0" },
      ],
    },
    fontWeight: {
      normal: "400",
      bold: "700",
    },
    fontFamily: {},
    screens,
    container: {
      screens,
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "3rem",
        lg: "7rem",
      },
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/tailwindcss"),
    require("tailwind-scrollbar-hide"),
  ],
} satisfies Config;
