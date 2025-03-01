import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {TanStackRouterVite} from "@tanstack/router-plugin/vite";
import {imagetools} from "vite-imagetools";

const ReactCompilerConfig = {
    target: "19",
};

// https://vitejs.dev/config/
export default defineConfig({
    define: {__URL__: JSON.stringify("https://pivotiiii.pages.dev")},
    plugins: [
        imagetools(),
        TanStackRouterVite({autoCodeSplitting: true}),
        react({babel: {plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]}}),
    ],
});
