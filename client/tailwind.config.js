import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.slate[800],
          hover: colors.slate[700],
        },

        surface: {
          DEFAULT: colors.white,
          muted: colors.slate[100],
          subtle: colors.slate[50],
        },

        border: {
          DEFAULT: colors.slate[200],
          strong: colors.slate[300],
        },

        text: {
          main: colors.slate[900],
          muted: colors.slate[600],
          subtle: colors.slate[400],
          inverse: colors.white,
        },

        success: colors.green[600],
        danger: colors.red[500],
        warning: colors.amber[600],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
