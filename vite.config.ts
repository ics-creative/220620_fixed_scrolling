import {resolve} from "path";
import {defineConfig} from "vite";

export default defineConfig({
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
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        // CSSの出力先
        assetFileNames: `assets/[name].[ext]`,
      }
    },
  },
});
