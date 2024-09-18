import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import process from "process"; // Import process polyfill

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // Define process.env to avoid client-side errors
  },
});
