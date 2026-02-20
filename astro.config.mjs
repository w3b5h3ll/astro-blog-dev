// @ts-check
import { defineConfig } from "astro/config";

// 使用 Preact 替代 React，减少 bundle 大小
import preact from "@astrojs/preact";
import rehypePrettyCode from "rehype-pretty-code";

import vercel from "@astrojs/vercel";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
        // 使用 Preact 替代 React，减少约 120KB bundle 大小
        preact({
            compat: true, // 启用 React 兼容模式
        }),
    ],

    markdown: {
        // syntaxHighlight: "shiki",
        syntaxHighlight: false,
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeKatex],
        remarkPlugins: [remarkMath],
        // shikiConfig: {
        //     themes: {
        //         light: "everforest-dark",
        //         dark: "everforest-dark",
        //     },
        //     // 启用自动换行，避免代码块出现水平滚动条
        //     wrap: true,
        //     // (可选) 显示行号
        //     // showLineNumbers: true,
        // },
    },

    adapter: vercel(),

    // Vite 构建优化配置
    vite: {
        build: {
            cssCodeSplit: true, // CSS 代码分割
            rollupOptions: {
                output: {
                    manualChunks: {
                        // 将大型依赖分离成独立 chunk
                        crypto: ["crypto-js"],
                        rehype: ["rehype-katex", "rehype-pretty-code"],
                        remark: ["remark-math"],
                    },
                },
            },
        },
        ssr: {
            // 确保本地字体包在 SSR 时正确处理
            noExternal: ["@fontsource-variable/*", "@fontsource/*"],
        },
    },

    // 预加载配置 - 提升导航性能
    prefetch: {
        prefetchAll: true,
        defaultStrategy: "viewport", // 当链接进入视口时预加载
    },
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
