const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: "/220620_fixed_scrolling",
  root: "src",
  build: {
    outDir: "../docs",
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./src/index.html"),
        demo01: resolve(__dirname, "./src/demo01/index.html"),
        demo02: resolve(__dirname, "./src/demo02/index.html"),
        demo03: resolve(__dirname, "./src/demo03/index.html"),
      },
      output: {
        // JSの出力先
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        // CSSの出力先
        assetFileNames: `assets/css/[name].[ext]`,
      }
    },
  },
});
