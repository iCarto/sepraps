import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            port: 3000,
        },
        define: {
            "process.env": env,
        },
        build: {manifest: true},
        base: env.mode === "production" ? "/static/" : "/",
    };
});
