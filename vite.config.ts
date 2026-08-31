import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Mirrors the "/api/*" redirect in netlify.toml so dev and deploy behave the same.
const policyApiUrl =
  process.env.VITE_POLICY_API_URL ||
  "https://subtle-caring-walleye.ngrok-free.app";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    allowedHosts: true,
    proxy: {
      "/api": {
        target: policyApiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
