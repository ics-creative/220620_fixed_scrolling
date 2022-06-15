const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: "./",

  build: {
    outDir: "docs",
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        top: resolve(__dirname, "./index.html"),
        demo01: resolve(__dirname, "./demo01.html"),
        demo02: resolve(__dirname, "./demo02.html"),
        demo03: resolve(__dirname, "./demo03.html"),
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
