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
        primary: "#00A79D",

        brandGreen: "#00A79D",
        brandYellow: "#FBB040",
        brandRed: "#FF5B65",

        brandGreenL: "#6BCCC6",
        brandYellowL: "#FDC87A",
        brandRedL: "#FF8D94",

        brandGreenN: "#26C2B9",
        brandYellowN: "#FFA825",
        brandRedN: "#FF3844",
        //--------------------------------
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
