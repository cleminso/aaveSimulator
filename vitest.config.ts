import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./test.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    pool: "forks", // Better for DOM manipulation tests
  },
});
