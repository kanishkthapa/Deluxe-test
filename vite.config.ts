import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const policyApiUrl =
    env.POLICY_API_URL ||
    env.VITE_POLICY_API_URL ||
    "https://sandbox-cluster.e2e.api.stere.io/staging/sia-sandbox-1";

  return {
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
  };
});
