import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "DIAGNAL_",
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
