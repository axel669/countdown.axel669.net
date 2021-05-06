import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import {terser} from "rollup-plugin-terser"
import html from "@rollup/plugin-html"

import appInfo from "./app-info.js"

const branch = process.env.BRANCH || "v0.0.0"
const version = branch.split("/").pop()

const template = (options) => `<!doctype html>
<html>
    <head>
        <title>${options.title}</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width" />
        <link rel="icon" type="image/png" href="https://axel669.net/images/megaman-rounded.png" />
    </head>

    <body>
        <script src="${options.files.js[0].fileName}"></script>
    </body>
</html>
`

export default {
    input: "./src/main.js",
    output: {
        file: `./output/app-${version}.js`,
        format: "iife",
    },
    plugins: [
        svelte(),
        resolve(),
        commonjs(),
        terser(),
        html({
            filename: "./output/index.html",
            title: appInfo.name,
            template,
        })
    ]
}
