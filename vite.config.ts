import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/", // Make sure this is set correctly
    server: {
      allowedHosts: true,
    },
    // Expose env variables to the client
    define: {
      "process.env": env,
    },
  };
});
