import {sveltekit} from "@sveltejs/kit/vite";
import {imagetools} from "vite-imagetools";
import {defineConfig} from "vite";
import {ViteMinifyPlugin} from "vite-plugin-minify";

export default defineConfig(({command}) => ({
  define: {
    __URL__: JSON.stringify(command === "serve" ? "http://localhost:5173" : "https://pivotiiii.pages.dev"),
    __WORKER_URL__: JSON.stringify(
      command === "serve" ? "ws://localhost:8787" : "wss://mastermind-worker.pivotiiii.workers.dev"
    )
  },
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
}));
