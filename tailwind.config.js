/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#782f31",
        "inverse-on-surface": "#313030",
        "primary": "#ffb3b2",
        "on-tertiary-fixed-variant": "#5b403c",
        "inverse-surface": "#e5e2e1",
        "on-tertiary": "#422a27",
        "background": "#131313",
        "on-surface": "#e5e2e1",
        "surface-tint": "#ffb3b2",
        "surface-variant": "#353534",
        "tertiary-container": "#37201d",
        "on-error-container": "#ffdad6",
        "on-tertiary-fixed": "#2b1613",
        "surface": "#131313",
        "primary-fixed-dim": "#ffb3b2",
        "tertiary-fixed-dim": "#e4beb9",
        "primary-fixed": "#ffdad8",
        "inverse-primary": "#964647",
        "secondary-fixed": "#ebe1d7",
        "error-container": "#93000a",
        "tertiary": "#e4beb9",
        "on-secondary-fixed-variant": "#4c463f",
        "on-secondary": "#353029",
        "surface-container-highest": "#353534",
        "on-secondary-container": "#c0b7ae",
        "on-background": "#e5e2e1",
        "on-tertiary-container": "#a78581",
        "secondary-fixed-dim": "#cec5bb",
        "surface-container": "#201f1f",
        "outline": "#a28c8b",
        "surface-dim": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-high": "#2a2a2a",
        "secondary-container": "#4e4841",
        "on-surface-variant": "#dac1c0",
        "surface-container-low": "#1c1b1b",
        "on-secondary-fixed": "#1f1b15",
        "primary-container": "#4d0e13",
        "secondary": "#cec5bb",
        "surface-bright": "#3a3939",
        "error": "#ffb4ab",
        "on-primary-container": "#cf7373",
        "on-error": "#690005",
        "outline-variant": "#544242",
        "on-primary-fixed": "#3e030a",
        "on-primary": "#5b191c",
        "tertiary-fixed": "#ffdad5"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "32px",
        "margin-mobile": "24px",
        "unit": "8px",
        "container-max": "1440px",
        "margin-desktop": "80px"
      },
      fontFamily: {
        "display": ["Playfair Display", "serif"],
        "body": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Playfair Display", "serif"],
        "label-caps": ["Inter", "sans-serif"],
        "headline-lg": ["Playfair Display", "serif"],
        "display-xl": ["Playfair Display", "serif"],
        "body-lg": ["Inter", "sans-serif"],
        "display-xl-mobile": ["Playfair Display", "serif"],
        "body-sm": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["32px", { "lineHeight": "120%", "fontWeight": "600" }],
        "label-caps": ["12px", { "lineHeight": "100%", "letterSpacing": "0.15em", "fontWeight": "600" }],
        "headline-lg": ["48px", { "lineHeight": "120%", "fontWeight": "600" }],
        "display-xl": ["96px", { "lineHeight": "100%", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "display-xl-mobile": ["48px", { "lineHeight": "110%", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "160%", "letterSpacing": "0.01em", "fontWeight": "300" }],
        "body-sm": ["14px", { "lineHeight": "150%", "fontWeight": "400" }]
      }
    }
  },
  plugins: []
}
