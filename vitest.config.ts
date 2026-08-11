import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // api/ handlers are plain JS (Vercel functions), so their tests are .js too.
    include: ["src/**/*.{test,spec}.{ts,tsx}", "api/**/*.{test,spec}.js"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
