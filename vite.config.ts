import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import {TanStackRouterVite} from "@tanstack/router-plugin/vite";

const ReactCompilerConfig = {
    target: "19",
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        TanStackRouterVite({autoCodeSplitting: true}),
        react({babel: {plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]}}),
    ],
});
