import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("https://api.kinopoisk.dev"),
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});