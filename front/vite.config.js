import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import {viteStaticCopy} from "vite-plugin-static-copy";
import {lingui} from "@lingui/vite-plugin";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [
            react({
                babel: {
                    plugins: ["macros"],
                },
            }),
            lingui(),
            tsconfigPaths(),
            viteStaticCopy({
                targets: [
                    {
                        src: env.CONFIG_CUSTOM_LOGO,
                        dest: "logo",
                        rename: "logo_senasa.jpg",
                    },
                ],
            }),
        ],
        server: {
            port: 3000,
        },
        define: {
            "process.env": env,
            __CUSTOM_THEME__:
                JSON.parse(JSON.stringify(env.CONFIG_CUSTOM_THEME || {})) || {},
            __CUSTOM_LOCALE__: JSON.stringify(env.CONFIG_CUSTOM_LOCALE),
            __CUSTOM_CURRENCY__: JSON.stringify(env.CONFIG_CUSTOM_CURRENCY),
        },
        build: {manifest: true},
        base: env.mode === "production" ? "/static/" : "/",
    };
});
