import {sveltekit} from "@sveltejs/kit/vite";
import {imagetools} from "vite-imagetools";
import {defineConfig} from "vite";
import {ViteMinifyPlugin} from "vite-plugin-minify";

export default defineConfig({
  define: {__URL__: JSON.stringify("https://pivotiiii.pages.dev")},
  plugins: [
    imagetools(),
    sveltekit(),
    ViteMinifyPlugin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: false, // Svelte hydration markers müssen erhalten bleiben
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
      decodeEntities: true
    })
  ],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2
      }
    }
  }
});
