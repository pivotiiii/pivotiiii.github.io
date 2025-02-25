import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {TanStackRouterVite} from "@tanstack/router-plugin/vite";
import {imagetools} from "vite-imagetools";
import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";

const ReactCompilerConfig = {
    target: "19",
};

// https://vitejs.dev/config/
export default defineConfig({
    define: {__URL__: JSON.stringify("https://pivotiiii.pages.dev")},
    plugins: [
        imagetools(),
        pluginPurgeCss(),
        TanStackRouterVite({autoCodeSplitting: true}),
        react({babel: {plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]}}),
    ],
});
