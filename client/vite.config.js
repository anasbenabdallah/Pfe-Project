import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Enable JSX parsing for both .js and .jsx files
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      // Allows you to omit file extensions in imports
      entries: [{ find: /^~/, replacement: "" }],
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
});

// i added extension because i get many times error to change the extension from js to jsx
