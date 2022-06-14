const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: "/220613_fixed_scrolling",
  build: {
    outDir: "docs",
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./src/index.html"),
        demo01: resolve(__dirname, "./src/demo01/index.html"),
        demo02: resolve(__dirname, "./src/demo02/index.html"),
      },
    },
  },
});
