// @ts-check
import { defineConfig } from "astro/config";

// import preact from "@astrojs/preact";
// 只使用 React 组件
import react from "@astrojs/react";
import rehypePrettyCode from "rehype-pretty-code";

import vercel from "@astrojs/vercel";

const prettyCodeOptions = {
    // themes: {
    //     light: "vitesse-light",
    //     dark: "vitesse-dark",
    // },
    theme: "vitesse-light",
    // 启用自动换行，避免代码块出现水平滚动条
    wrap: true,
    // (可选) 显示行号
    showLineNumbers: true,
    keepBackground: false,
};
// https://astro.build/config
export default defineConfig({
    // site: "https://w3b5h3ll.github.io",
    site: "https://paulwang.vercel.app/",
    integrations: [
        // preact(),

        react(),
    ],

    markdown: {
        // syntaxHighlight: "shiki",
        syntaxHighlight: false,
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    },

    adapter: vercel(),
});
// shikiConfig: {
//     // 从 https://github.com/shikijs/shiki/blob/main/docs/themes.md 选择你喜欢的主题
//     // 例如：'nord', 'dracula', 'github-dark', 'one-dark-pro'
//     // theme: "nord",
//     // 或者为亮色和暗色模式设置不同主题
//     themes: {
//       light: 'vitesse-light',
//       dark: 'vitesse-dark',
//     },
//     // 启用自动换行，避免代码块出现水平滚动条
//     wrap: true,
//     // (可选) 显示行号
//     // showLineNumbers: true,
// },
//     },
// });
