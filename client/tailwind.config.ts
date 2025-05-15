import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FF3347",
        blue: "#0078FA",
        green: "#00BD7D",
        orange: "#FF7C3C",
        pink: "#FE77AC",
        purple: "#7957F1",
        cyan: "#00C9CC",
        mediumBlue: "#CCE4FE",
        mediumGreen: "#CCF2E5",
        mediumOrange: "#FFE5D8",
        mediumPink: "#FFE4EE",
        mediumPurple: "#E4DDFC",
        mediumCyan: "#CCF4F5",

        lightBlue: "#E6F2FF",
        lightGreen: "#E6F9F2",
        lightOrange: "#FFF2EC",
        lightPink: "#FFF2F7",
        lightPurple: "#F2EEFE",
        lightCyan: "#E6FAFA",
      },
    },
  },
  plugins: [],
};
export default config;
