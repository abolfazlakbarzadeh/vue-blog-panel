import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ["**/*.test.ts", "**/*.test.js"],
    globals: true,
    environment: "happy-dom",
  },
});
