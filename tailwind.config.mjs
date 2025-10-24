/** @type {import('tailwindcss').Config} */
const config = {
  // ▼▼▼ ダークモードを "class" で制御する設定 ▼▼▼
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ▼▼▼ カスタムカラーとフォントの定義 ▼▼▼
      colors: {
        "primary": "#13a4ec",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22", // これが背景色
      },
      fontFamily: {
        "display": ["Space Grotesk", "Noto Sans JP", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
};

export default config;

